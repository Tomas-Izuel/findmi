"use server";

import { createClient } from "@/utils/supabase/server";
import { UserDataShema } from "./detail.type";

export async function getMusicianData(id: string) {
  try {
    const client = await createClient();

    console.log(`[getMusicianDetailPage] Buscando músico con ID: ${id}`);
    const { data, error } = await client
      .from("musicians")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error(
        `[getMusicianDetailPage] Error en la consulta: ${error.message}`
      );
      throw new Error(`Error: ${error.message}`);
    }

    if (!data) {
      console.error(
        `[getMusicianDetailPage] Músico no encontrado con ID: ${id}`
      );
      throw new Error(`Músico no encontrado con ID: ${id}`);
    }

    console.log(`[getMusicianDetailPage] Músico encontrado: ${data.name}`);
    return UserDataShema.safeParse(data);
  } catch (error) {
    console.error(`[getMusicianDetailPage] Error: ${(error as Error).message}`);
    throw new Error(`Error: ${(error as Error).message}`);
  }
}
