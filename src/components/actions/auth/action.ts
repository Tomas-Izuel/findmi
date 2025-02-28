"use server";

import { RegisterSchema } from "@/schema/auth-schema";
import { createClient } from "@/supabase/server";

export async function login(data: { email: string; password: string }) {
  if (!data.email || !data.password)
    return { error: "Error obtaining credentials" };

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function signup(data: RegisterSchema) {
  const supabase = await createClient();

  // Crear el usuario
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.passwordForm.password,
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  if (!signUpData) return { error: "an error occurred creating the user" };

  return { error: null };
}

export async function sendOTP(email: string) {
  console.log(email);
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) return { error: error.message };

  return { error: null };
}
