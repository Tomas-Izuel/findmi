import { Instrument, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Instrument).values([
    { name: "Guitarra", type: "Cuerda", id: 1 },
    { name: "Bajo", type: "Cuerda", id: 2 },
    { name: "Batería", type: "Percusión", id: 3 },
    { name: "Piano", type: "Teclado", id: 4 },
    { name: "Violín", type: "Cuerda", id: 5 },
    { name: "Saxofón", type: "Viento", id: 6 },
    { name: "Trompeta", type: "Viento", id: 7 },
    { name: "Flauta", type: "Viento", id: 8 },
    { name: "Contrabajo", type: "Cuerda", id: 11 },
    { name: "Clarinete", type: "Viento", id: 13 },
    { name: "Voz", type: "Vocal", id: 14 },
  ]);
}
