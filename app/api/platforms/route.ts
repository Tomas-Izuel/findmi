import { db } from "@/db";
import { contactPlatform } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const platforms = await db.select().from(contactPlatform);
  return NextResponse.json({ platforms });
}
