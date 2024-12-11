import { z } from "zod";

export enum AuthStatus {
  WAITING_CONFIRMATION = "waiting_confirm",
  CONFIRMED = "confirmed",
}

export const LoginSchema = z.object({
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
});

export type LoginType = z.infer<typeof LoginSchema>;

export const RegisterSchema = LoginSchema.extend({
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
  id: z.string(),
});

export type ConfirmEmailType = z.infer<typeof ConfirmRegisterParamsSchema>;
