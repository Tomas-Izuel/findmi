import { auth } from "@/lib/auth";
import { db } from "@/db";
import { contact } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userContacts = await db
    .select()
    .from(contact)
    .where(eq(contact.userId, session.user.id));

  return NextResponse.json({
    hasContacts: userContacts.length > 0,
    contactCount: userContacts.length,
  });
}
