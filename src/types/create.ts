import type { z } from "zod";
import type { createMusicianSchema } from "../schemas/create";

export type createMusicianType = z.infer<typeof createMusicianSchema>;
