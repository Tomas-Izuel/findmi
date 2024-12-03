import { z } from "zod";

export enum AuthStatus {
  WAITING_CONFIRMATION = "waiting_confirm",
  CONFIRMED = "confirmed",
}

export const RegisterSchema = z.object({
  email: z
    .string({
      message: "El correo electrónico es requerido",
    })
    .email({
      message: "El correo electrónico no es válido",
    }),
  contraseña: z
    .string({
      message: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    }),
  confirmarContraseña: z.string().refine((data) => data === data, {
    message: "Las contraseñas no coinciden",
  }),
});

export type RegisterType = z.infer<typeof RegisterSchema>;

export const ConfirmRegisterParamsSchema = z.object({
  token_hash: z.string(),
  type: z.enum([
    "email",
    "signup",
    "invite",
    "magiclink",
    "recovery",
    "email_change",
  ]),
  account_id: z.string(),
});
