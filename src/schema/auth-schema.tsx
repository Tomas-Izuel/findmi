import { z } from "zod";

const passwordForm = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número",
      })
      .trim(),
    confirm: z
      .string()
      .min(8, {
        message:
          "La confirmación de la contraseña debe tener al menos 8 caracteres",
      })
      .trim(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

const registerSchema = z.object({
  email: z.string().email("Email inválido").trim(),
  passwordForm: passwordForm,
});

const loginSchema = z.object({
  email: z.string().email("Email inválido").trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .trim(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, registerSchema };
