"use server";

import { createClient } from "@/utils/supabase/server";
import { CreateMusicianDTO, MusicianSchema } from "./detail.type";

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
      return null;
    }

    console.log(`[getMusicianDetailPage] Músico encontrado: ${data.name}`);
    return MusicianSchema.parse(data);
  } catch (error) {
    console.error(`[getMusicianDetailPage] Error: ${(error as Error).message}`);
    throw new Error(`Error: ${(error as Error).message}`);
  }
}

export async function createMusician(data: CreateMusicianDTO, id: string) {
  try {
    const client = await createClient();

    console.log(`[createMusician] Creando músico: ${data.nombre}`);
    const { data: musician, error } = await client
      .from("musicians")
      .insert({
        id,
        ...data
      })
      .single();
    if (error) {
      console.error(
        `[createMusician] Error en la creación: ${error.message}`
      );
      throw new Error(`Error: ${error.message}`);
    }

    console.log(`[createMusician] Músico creado: ${data.nombre}`);
    return MusicianSchema.parse(musician);
  } catch (error) {
    console.error(`[createMusician] Error: ${(error as Error).message}`);
    throw new Error(`Error: ${(error as Error).message}`);
  }
}