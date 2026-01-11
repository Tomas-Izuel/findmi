import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { generateUploadSignature } from "@/lib/cloudinary";

// GET - Obtener firma para upload (sin body)
export async function GET() {
  try {
    // Verificar autenticación
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Generar firma para upload seguro
    const uploadParams = generateUploadSignature("profiles");

    return NextResponse.json(uploadParams);
  } catch (error) {
    console.error("Error generating upload signature:", error);
    return NextResponse.json(
      { error: "Error al generar firma de upload" },
      { status: 500 }
    );
  }
}

// POST - Obtener firma para upload (con folder personalizado)
export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener folder del body (opcional)
    const body = await request.json().catch(() => ({}));
    const folder = body.folder || "profiles";

    // Generar firma para upload seguro
    const uploadParams = generateUploadSignature(folder);

    return NextResponse.json(uploadParams);
  } catch (error) {
    console.error("Error generating upload signature:", error);
    return NextResponse.json(
      { error: "Error al generar firma de upload" },
      { status: 500 }
    );
  }
}
