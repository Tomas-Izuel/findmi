import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  musicianProfile,
  profileImage,
  experience,
  seniorityRange,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";
import { calculateSeniority } from "@/lib/seniority";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Actualizar perfil de músico
export async function PATCH(request: Request, context: RouteContext) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { id: profileId } = await context.params;
    const body = await request.json();
    const { bio, seniorityRangeId, isActive } = body;

    // Verificar que el perfil existe y pertenece al usuario
    const [existingProfile] = await db
      .select()
      .from(musicianProfile)
      .where(
        and(
          eq(musicianProfile.id, profileId),
          eq(musicianProfile.userId, session.user.id)
        )
      )
      .limit(1);

    if (!existingProfile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 }
      );
    }

    // Preparar datos a actualizar
    const updateData: {
      bio?: string | null;
      seniorityRangeId?: string;
      calculatedSeniority?: number;
      isActive?: boolean;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    if (bio !== undefined) {
      updateData.bio = bio?.trim() || null;
    }

    if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive);
    }

    // Si se actualiza el seniority, recalcular
    if (
      seniorityRangeId &&
      seniorityRangeId !== existingProfile.seniorityRangeId
    ) {
      // Verificar que el seniority existe
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

      updateData.seniorityRangeId = seniorityRangeId;

      // Obtener número de experiencias para recalcular
      const experiences = await db
        .select()
        .from(experience)
        .where(eq(experience.profileId, profileId));

      updateData.calculatedSeniority = calculateSeniority(
        seniorityExists.weight,
        experiences.length
      );
    }

    // Actualizar perfil
    const [updatedProfile] = await db
      .update(musicianProfile)
      .set(updateData)
      .where(eq(musicianProfile.id, profileId))
      .returning();

    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    console.error("Error updating musician profile:", error);
    return NextResponse.json(
      { error: "Error al actualizar el perfil" },
      { status: 500 }
    );
  }
}

// Eliminar perfil de músico
export async function DELETE(_request: Request, context: RouteContext) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { id: profileId } = await context.params;

    // Verificar que el perfil existe y pertenece al usuario
    const [existingProfile] = await db
      .select()
      .from(musicianProfile)
      .where(
        and(
          eq(musicianProfile.id, profileId),
          eq(musicianProfile.userId, session.user.id)
        )
      )
      .limit(1);

    if (!existingProfile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 }
      );
    }

    // Obtener imágenes para eliminarlas de Cloudinary
    const images = await db
      .select()
      .from(profileImage)
      .where(eq(profileImage.profileId, profileId));

    // Eliminar perfil (esto eliminará en cascada las imágenes y experiencias en la DB)
    await db.delete(musicianProfile).where(eq(musicianProfile.id, profileId));

    // Eliminar imágenes de Cloudinary (en background, no bloquear la respuesta)
    if (images.length > 0) {
      // Extraer public IDs de las URLs
      Promise.allSettled(
        images.map(async (img) => {
          try {
            // Extraer public_id de la URL de Cloudinary
            const matches = img.url.match(/\/v\d+\/(.+)\./);
            if (matches?.[1]) {
              await deleteImage(matches[1]);
            }
          } catch (err) {
            console.error("Error deleting image from Cloudinary:", err);
          }
        })
      ).catch((err) => {
        console.error("Error in image deletion batch:", err);
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting musician profile:", error);
    return NextResponse.json(
      { error: "Error al eliminar el perfil" },
      { status: 500 }
    );
  }
}
