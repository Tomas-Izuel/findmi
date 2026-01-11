import { db } from "@/db";
import {
  musicianProfile,
  profileImage,
  instrument,
  seniorityRange,
  user,
  experience,
} from "@/db/schema";
import { eq, like, gte, and, sql, count } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parámetros de búsqueda
    const name = searchParams.get("name");
    const location = searchParams.get("location");
    const instrumentId = searchParams.get("instrumentId");
    const minSeniority = searchParams.get("minSeniority");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Calcular offset
    const offset = (page - 1) * limit;

    // Construir condiciones de filtro
    const conditions = [eq(musicianProfile.isActive, true)];

    if (name) {
      conditions.push(like(user.name, `%${name}%`));
    }

    if (location) {
      conditions.push(like(user.location, `%${location}%`));
    }

    if (instrumentId) {
      conditions.push(eq(musicianProfile.instrumentId, instrumentId));
    }

    if (minSeniority) {
      conditions.push(
        gte(musicianProfile.calculatedSeniority, parseInt(minSeniority))
      );
    }

    // Query principal con joins
    const profiles = await db
      .select({
        id: musicianProfile.id,
        bio: musicianProfile.bio,
        calculatedSeniority: musicianProfile.calculatedSeniority,
        createdAt: musicianProfile.createdAt,
        user: {
          id: user.id,
          name: user.name,
          location: user.location,
        },
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
      .innerJoin(user, eq(musicianProfile.userId, user.id))
      .innerJoin(instrument, eq(musicianProfile.instrumentId, instrument.id))
      .innerJoin(
        seniorityRange,
        eq(musicianProfile.seniorityRangeId, seniorityRange.id)
      )
      .where(and(...conditions))
      .orderBy(sql`${musicianProfile.calculatedSeniority} DESC`)
      .limit(limit)
      .offset(offset);

    // Obtener imágenes y experiencias para cada perfil
    const profilesWithDetails = await Promise.all(
      profiles.map(async (profile) => {
        const images = await db
          .select()
          .from(profileImage)
          .where(eq(profileImage.profileId, profile.id));

        const experienceCount = await db
          .select({ count: count() })
          .from(experience)
          .where(eq(experience.profileId, profile.id));

        return {
          ...profile,
          primaryImage:
            images.find((img) => img.isPrimary) || images[0] || null,
          experienceCount: experienceCount[0]?.count || 0,
        };
      })
    );

    // Contar total para paginación
    const totalResult = await db
      .select({ count: count() })
      .from(musicianProfile)
      .innerJoin(user, eq(musicianProfile.userId, user.id))
      .innerJoin(instrument, eq(musicianProfile.instrumentId, instrument.id))
      .where(and(...conditions));

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      profiles: profilesWithDetails,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error("Error searching profiles:", error);
    return NextResponse.json(
      { error: "Error al buscar perfiles" },
      { status: 500 }
    );
  }
}
