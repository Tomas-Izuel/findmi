import { z } from "zod";

export const BasicInfoSchema = z.object({
  nombre: z
    .string({
      message: "El nombre es requerido",
    })
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    }),
  apellido: z
    .string({
      message: "El apellido es requerido",
    })
    .min(2, {
      message: "El apellido debe tener al menos 2 caracteres",
    }),
  apodo: z.string().optional(),
  edad: z.coerce
    .number()
    .positive({
      message: "La edad debe ser un número positivo",
    })
    .int({
      message: "La edad debe ser un número entero",
    }),
  email: z
    .string({
      message: "El correo electrónico es requerido",
    })
    .email({
      message: "El correo electrónico no es válido",
    })
    .min(6, {
      message: "El correo electrónico debe tener al menos 6 caracteres",
    }),
  contraseña: z
    .string({
      message: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  provincia: z.string({
    message: "La provincia es requerida",
  }),
});

export type BasicInfo = z.infer<typeof BasicInfoSchema>;
