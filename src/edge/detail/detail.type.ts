import { z } from "zod";

export const UserDataShema = z.object({
  id: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  apodo: z.string().optional(),
  edad: z.number(),
  email: z.string(),
  provincia: z.string(),
});

export const BasicInfoCreationSchema = z.object({
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
  provincia: z.string({
    message: "La provincia es requerida",
  }),
});

export type UserData = z.infer<typeof UserDataShema>;
export type BasicInfo = z.infer<typeof BasicInfoCreationSchema>;
