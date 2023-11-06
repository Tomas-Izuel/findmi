import { Musico } from "@/types/musico";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });

export const getInstrumentos = async () => {
  const { data: instrumentos } = await supabase.from("instrumento").select("*");
  return instrumentos;
};

export const getMusicos = async () => {
  const { data: musicos } = await supabase.from("musico").select("*");
  return musicos;
};

export const addMusico = async (musico: Musico) => {
  const { data: newMusico } = await supabase.from("musico").insert([musico]);
  return newMusico;
};
