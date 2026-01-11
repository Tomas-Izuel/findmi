import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Obtener información del usuario
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const [userInfo] = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      location: user.location,
      image: user.image,
    })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  return NextResponse.json({ user: userInfo });
}

// Actualizar información del usuario
export async function PATCH(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, location } = body;

    // Validaciones
    if (name !== undefined && typeof name !== "string") {
      return NextResponse.json(
        { error: "Nombre debe ser texto" },
        { status: 400 }
      );
    }

    if (location !== undefined && typeof location !== "string") {
      return NextResponse.json(
        { error: "Ubicación debe ser texto" },
        { status: 400 }
      );
    }

    // Preparar datos a actualizar
    const updateData: {
      name?: string;
      location?: string | null;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    if (name !== undefined) {
      updateData.name = name.trim() || undefined;
    }

    if (location !== undefined) {
      updateData.location = location.trim() || null;
    }

    // Actualizar usuario
    const [updatedUser] = await db
      .update(user)
      .set(updateData)
      .where(eq(user.id, session.user.id))
      .returning({
        id: user.id,
        email: user.email,
        name: user.name,
        location: user.location,
        image: user.image,
      });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Error al actualizar el perfil" },
      { status: 500 }
    );
  }
}
