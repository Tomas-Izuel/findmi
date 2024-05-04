import { z } from "zod";

export const createMusicianSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  age: z.number().min(5).max(99),
  password: z.string(),
  about: z.string(),
  experience: z.string().array(),
});
