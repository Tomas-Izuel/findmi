"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ConfirmEmailType, LoginType, RegisterType } from "./register.type";
import { AUTH_SESSION_COOKIE } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function ConfirmEmail(data: ConfirmEmailType) {
  try {
    const client = await createClient();
    const { error } = await client.auth.verifyOtp({
      type: data.type,
      token_hash: data.token_hash,
    });

    if (error) {
      throw new Error("Error verifying OTP");
    }

    console.log("[ConfirmEmail] email confirmado correctamente");
    return { success: true };
  } catch (error) {
    console.error(`[ConfirmEmail] Error: ${(error as Error).message}`);
    return { success: false };
  }
}

export async function LogIn(data: LoginType) {
  const supabase = await createClient();

  const response = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.contraseña,
  });

  if (response.error) {
    throw new Error("Error al iniciar sesión");
  }

  revalidatePath(`/musicos/${response.data.user.id}`, "layout");
  redirect(`/musicos/${response.data.user.id}`);
}
