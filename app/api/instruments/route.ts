import { db } from "@/db";
import { instrument } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const instruments = await db.select().from(instrument);

  // Agrupar por categoría
  const grouped = instruments.reduce((acc, inst) => {
    if (!acc[inst.category]) {
      acc[inst.category] = [];
    }
    acc[inst.category].push(inst);
    return acc;
  }, {} as Record<string, typeof instruments>);

  return NextResponse.json({
    instruments,
    grouped,
  });
}
