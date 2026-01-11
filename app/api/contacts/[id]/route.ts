import { auth } from "@/lib/auth";
import { db } from "@/db";
import { contact, contactPlatform } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Actualizar contacto
export async function PATCH(request: Request, context: RouteContext) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { id: contactId } = await context.params;
    const body = await request.json();
    const { value, isPublic, platformId } = body;

    // Verificar que el contacto existe y pertenece al usuario
    const [existingContact] = await db
      .select()
      .from(contact)
      .where(
        and(eq(contact.id, contactId), eq(contact.userId, session.user.id))
      )
      .limit(1);

    if (!existingContact) {
      return NextResponse.json(
        { error: "Contacto no encontrado" },
        { status: 404 }
      );
    }

    // Preparar datos a actualizar
    const updateData: {
      value?: string;
      isPublic?: boolean;
      platformId?: string;
    } = {};

    if (value !== undefined) {
      if (!value.trim()) {
        return NextResponse.json(
          { error: "El valor del contacto no puede estar vacío" },
          { status: 400 }
        );
      }
      updateData.value = value.trim();
    }

    if (isPublic !== undefined) {
      updateData.isPublic = Boolean(isPublic);
    }

    if (platformId !== undefined) {
      // Verificar que la plataforma existe
      const [platform] = await db
        .select()
        .from(contactPlatform)
        .where(eq(contactPlatform.id, platformId))
        .limit(1);

      if (!platform) {
        return NextResponse.json(
          { error: "Plataforma no válida" },
          { status: 400 }
        );
      }
      updateData.platformId = platformId;
    }

    // Actualizar contacto
    const [updatedContact] = await db
      .update(contact)
      .set(updateData)
      .where(eq(contact.id, contactId))
      .returning();

    // Obtener datos completos con la plataforma
    const [fullContact] = await db
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
      .where(eq(contact.id, updatedContact.id))
      .limit(1);

    return NextResponse.json({ contact: fullContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Error al actualizar el contacto" },
      { status: 500 }
    );
  }
}

// Eliminar contacto (ruta alternativa más RESTful)
export async function DELETE(_request: Request, context: RouteContext) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { id: contactId } = await context.params;

    // Verificar que el contacto existe y pertenece al usuario
    const [existingContact] = await db
      .select()
      .from(contact)
      .where(
        and(eq(contact.id, contactId), eq(contact.userId, session.user.id))
      )
      .limit(1);

    if (!existingContact) {
      return NextResponse.json(
        { error: "Contacto no encontrado" },
        { status: 404 }
      );
    }

    await db.delete(contact).where(eq(contact.id, contactId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Error al eliminar el contacto" },
      { status: 500 }
    );
  }
}
