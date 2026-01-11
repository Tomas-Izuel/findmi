import { auth } from "@/lib/auth";
import { db } from "@/db";
import { contact, contactPlatform } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Obtener contactos del usuario
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userContacts = await db
    .select({
      id: contact.id,
      value: contact.value,
      isPublic: contact.isPublic,
      platform: {
        id: contactPlatform.id,
        name: contactPlatform.name,
        icon: contactPlatform.icon,
      },
    })
    .from(contact)
    .innerJoin(contactPlatform, eq(contact.platformId, contactPlatform.id))
    .where(eq(contact.userId, session.user.id));

  return NextResponse.json({ contacts: userContacts });
}

// Crear nuevo contacto
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { platformId, value, isPublic = true } = body;

    if (!platformId || !value) {
      return NextResponse.json(
        { error: "Plataforma y valor son requeridos" },
        { status: 400 }
      );
    }

    // Verificar que la plataforma existe
    const platform = await db
      .select()
      .from(contactPlatform)
      .where(eq(contactPlatform.id, platformId))
      .limit(1);

    if (platform.length === 0) {
      return NextResponse.json(
        { error: "Plataforma no válida" },
        { status: 400 }
      );
    }

    const newContact = await db
      .insert(contact)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        platformId,
        value,
        isPublic,
      })
      .returning();

    return NextResponse.json({ contact: newContact[0] }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear el contacto" },
      { status: 500 }
    );
  }
}

// Eliminar contacto
export async function DELETE(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get("id");

    if (!contactId) {
      return NextResponse.json(
        { error: "ID de contacto requerido" },
        { status: 400 }
      );
    }

    // Verificar que el contacto pertenece al usuario
    const existingContact = await db
      .select()
      .from(contact)
      .where(eq(contact.id, contactId))
      .limit(1);

    if (
      existingContact.length === 0 ||
      existingContact[0].userId !== session.user.id
    ) {
      return NextResponse.json(
        { error: "Contacto no encontrado" },
        { status: 404 }
      );
    }

    await db.delete(contact).where(eq(contact.id, contactId));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar el contacto" },
      { status: 500 }
    );
  }
}
