import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  musicianProfile,
  profileImage,
  experience,
  instrument,
  seniorityRange,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";
import { calculateSeniority } from "@/lib/seniority";

// Obtener perfiles del usuario
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const profiles = await db
    .select({
      id: musicianProfile.id,
      bio: musicianProfile.bio,
      isActive: musicianProfile.isActive,
      calculatedSeniority: musicianProfile.calculatedSeniority,
      createdAt: musicianProfile.createdAt,
      instrument: {
        id: instrument.id,
        name: instrument.name,
        category: instrument.category,
      },
      seniority: {
        id: seniorityRange.id,
        label: seniorityRange.label,
      },
    })
    .from(musicianProfile)
    .innerJoin(instrument, eq(musicianProfile.instrumentId, instrument.id))
    .innerJoin(
      seniorityRange,
      eq(musicianProfile.seniorityRangeId, seniorityRange.id)
    )
    .where(eq(musicianProfile.userId, session.user.id));

  // Obtener imágenes y experiencias para cada perfil
  const profilesWithDetails = await Promise.all(
    profiles.map(async (profile) => {
      const images = await db
        .select()
        .from(profileImage)
        .where(eq(profileImage.profileId, profile.id));

      const experiences = await db
        .select()
        .from(experience)
        .where(eq(experience.profileId, profile.id));

      return {
        ...profile,
        images,
        experiences,
        primaryImage: images.find((img) => img.isPrimary) || images[0] || null,
      };
    })
  );

  return NextResponse.json({ profiles: profilesWithDetails });
}

// Crear nuevo perfil de músico (transaccional)
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let uploadedImageUrl: string | null = null;

  try {
    const body = await request.json();
    const {
      instrumentId,
      seniorityRangeId,
      bio,
      imageUrl,
      imagePublicId,
      experiences: experiencesList,
    } = body;

    // Validaciones
    if (!instrumentId || !seniorityRangeId) {
      return NextResponse.json(
        { error: "Instrumento y antigüedad son requeridos" },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Imagen de portada es requerida" },
        { status: 400 }
      );
    }

    // Guardar URL para posible rollback
    uploadedImageUrl = imagePublicId;

    // Verificar que instrumento y seniority existen
    const [instrumentExists] = await db
      .select()
      .from(instrument)
      .where(eq(instrument.id, instrumentId))
      .limit(1);

    if (!instrumentExists) {
      return NextResponse.json(
        { error: "Instrumento no válido" },
        { status: 400 }
      );
    }

    const [seniorityExists] = await db
      .select()
      .from(seniorityRange)
      .where(eq(seniorityRange.id, seniorityRangeId))
      .limit(1);

    if (!seniorityExists) {
      return NextResponse.json(
        { error: "Rango de antigüedad no válido" },
        { status: 400 }
      );
    }

    // Calcular seniority ponderado
    const numExperiences = experiencesList?.length || 0;
    const calculatedSeniorityValue = calculateSeniority(
      seniorityExists.weight,
      numExperiences
    );

    // Ejecutar transacción
    const result = await db.transaction(async (tx) => {
      // 1. Crear perfil de músico
      const profileId = crypto.randomUUID();
      await tx.insert(musicianProfile).values({
        id: profileId,
        userId: session.user.id,
        instrumentId,
        seniorityRangeId,
        bio: bio || null,
        calculatedSeniority: calculatedSeniorityValue,
        isActive: true,
      });

      // 2. Crear imagen de perfil
      await tx.insert(profileImage).values({
        id: crypto.randomUUID(),
        profileId,
        url: imageUrl,
        order: 0,
        isPrimary: true,
      });

      // 3. Crear experiencias si hay
      if (experiencesList && experiencesList.length > 0) {
        const experienceValues = experiencesList.map(
          (exp: {
            venueName: string;
            description?: string;
            impactScore?: number;
          }) => ({
            id: crypto.randomUUID(),
            profileId,
            venueName: exp.venueName,
            description: exp.description || null,
            impactScore: exp.impactScore || 1,
          })
        );

        await tx.insert(experience).values(experienceValues);
      }

      return { profileId };
    });

    return NextResponse.json(
      { success: true, profileId: result.profileId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating musician profile:", error);

    // Rollback: eliminar imagen de Cloudinary si se subió
    if (uploadedImageUrl) {
      try {
        await deleteImage(uploadedImageUrl);
        console.log("Imagen eliminada de Cloudinary por rollback");
      } catch (deleteError) {
        console.error("Error eliminando imagen en rollback:", deleteError);
      }
    }

    return NextResponse.json(
      { error: "Error al crear el perfil de músico" },
      { status: 500 }
    );
  }
}
