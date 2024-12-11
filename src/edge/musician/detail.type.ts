import { z } from "zod";

export const MusicianSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  apodo: z.string().optional(),
  edad: z.number(),
  provincia: z.string(),
});

export const CreateMusicianDTOSchema = z.object({
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
  provincia: z.string({
    message: "La provincia es requerida",
  }),
});

export type Musician = z.infer<typeof MusicianSchema>;
export type CreateMusicianDTO = z.infer<typeof CreateMusicianDTOSchema>;
