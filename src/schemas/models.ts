import { z } from "zod";
import { TypeInstrument } from "../types/models";

//Instrument DB
export const InstrumentSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.nativeEnum(TypeInstrument),
});

export type InstrumentType = z.infer<typeof InstrumentSchema>;

//Contact DB
export const ContactSchema = z.object({
  id: z.number(),
  network: z.string(),
  href: z.string(),
  musicianId: z.number(),
});

export type ContactType = z.infer<typeof ContactSchema>;

//Experience DB
export const ExperienceSchema = z.object({
  id: z.number(),
  experience: z.number(),
});

export type ExperienceType = z.infer<typeof ExperienceSchema>;

//MusicianInstrument DB
export const MusicianInstrumentSchema = z.object({
  id: z.number(),
  instrumentId: z.number(),
  experienceId: z.number(),
  musicianId: z.number(),
});

export type MusicianInstrumentType = z.infer<typeof MusicianInstrumentSchema>;

//Musician DB
export const MusicianSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  nickname: z.string(),
  contact: z.object({}),
  password: z.string(),
  about: z.string(),
  musicianInstrumentId: z.number(),
  contactId: z.number(),
});

export type MusicianType = z.infer<typeof MusicianSchema>;
