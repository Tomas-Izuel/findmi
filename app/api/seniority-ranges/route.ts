import { db } from "@/db";
import { seniorityRange } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const ranges = await db
    .select()
    .from(seniorityRange)
    .orderBy(asc(seniorityRange.weight));

  return NextResponse.json({ ranges });
}
