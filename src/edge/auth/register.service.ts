"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { RegisterType } from "./register.type";
import { AUTH_SESSION_COOKIE } from "@/lib/constants";

export async function Register(data: RegisterType) {
  const client = await createClient();
  const cookiesHandler = await cookies();

  try {
    console.log(`[Register] Iniciando registro para email: ${data.email}`);
    const authResponse = await client.auth.signUp({
      email: data.email,
      password: data.contraseña,
    });

    if (authResponse.error) {
      throw new Error(
        `[Register] Error en auth.signUp: ${authResponse.error.message}`
      );
    }

    console.log(
      `[Register] Usuario creado en la autenticación, ID: ${authResponse.data.user?.id}`
    );

    if (authResponse.data.session?.access_token) {
      cookiesHandler.set(
        AUTH_SESSION_COOKIE,
        authResponse.data.session?.access_token
      );
    }
    return authResponse.data.user;
  } catch (error) {
    console.error(`[Register] Error: ${(error as Error).message}`);
    throw new Error(`Error: ${(error as Error).message}`);
  }
}
