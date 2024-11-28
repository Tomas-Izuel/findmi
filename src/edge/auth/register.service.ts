"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { BasicInfo } from "./register.type";
import { createClient } from "@/utils/supabase/server";

export async function Register(data: BasicInfo) {
  try {
    const client = await createClient();
    const authResponse = await client.auth.signUp({
      email: data.email,
      password: data.contraseña,
    });

    if (authResponse.error) {
      console.log(authResponse.error);
      throw authResponse.error;
    }

    const user = {
      id: authResponse.data.user?.id,
      nombre: data.nombre,
      apellido: data.apellido,
      apodo: data.apodo,
      edad: data.edad,
      email: data.email,
    };

    const response = await client.from("musico").insert(user);

    if (response.error) {
      console.log(response.error);
      throw response.error;
    }

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al registrar el usuario");
  }
}
