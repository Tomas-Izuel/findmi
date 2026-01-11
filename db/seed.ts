import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { instrument, seniorityRange, contactPlatform } from "./schema";
import { randomUUID } from "crypto";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

async function main() {
  console.log("🎸 Seeding database...");

  // Seed Instruments
  const instruments = [
    { id: randomUUID(), name: "Guitarra Eléctrica", category: "Cuerdas" },
    { id: randomUUID(), name: "Guitarra Acústica", category: "Cuerdas" },
    { id: randomUUID(), name: "Bajo Eléctrico", category: "Cuerdas" },
    { id: randomUUID(), name: "Bajo Acústico", category: "Cuerdas" },
    { id: randomUUID(), name: "Batería", category: "Percusión" },
    { id: randomUUID(), name: "Percusión", category: "Percusión" },
    { id: randomUUID(), name: "Teclado", category: "Teclas" },
    { id: randomUUID(), name: "Piano", category: "Teclas" },
    { id: randomUUID(), name: "Sintetizador", category: "Teclas" },
    { id: randomUUID(), name: "Voz", category: "Voz" },
    { id: randomUUID(), name: "Coros", category: "Voz" },
    { id: randomUUID(), name: "Violín", category: "Cuerdas" },
    { id: randomUUID(), name: "Viola", category: "Cuerdas" },
    { id: randomUUID(), name: "Violonchelo", category: "Cuerdas" },
    { id: randomUUID(), name: "Contrabajo", category: "Cuerdas" },
    { id: randomUUID(), name: "Saxofón", category: "Vientos" },
    { id: randomUUID(), name: "Trompeta", category: "Vientos" },
    { id: randomUUID(), name: "Trombón", category: "Vientos" },
    { id: randomUUID(), name: "Flauta", category: "Vientos" },
    { id: randomUUID(), name: "Clarinete", category: "Vientos" },
    { id: randomUUID(), name: "Armónica", category: "Vientos" },
    { id: randomUUID(), name: "DJ / Producción", category: "Electrónica" },
  ];

  console.log("🎵 Creating instruments...");
  await db.insert(instrument).values(instruments).onConflictDoNothing();

  // Seed Seniority Ranges
  const seniorityRanges = [
    {
      id: randomUUID(),
      label: "Principiante (0-1 año)",
      minYears: 0,
      maxYears: 1,
      weight: 1,
    },
    {
      id: randomUUID(),
      label: "Novato (1-3 años)",
      minYears: 1,
      maxYears: 3,
      weight: 2,
    },
    {
      id: randomUUID(),
      label: "Intermedio (3-5 años)",
      minYears: 3,
      maxYears: 5,
      weight: 3,
    },
    {
      id: randomUUID(),
      label: "Avanzado (5-10 años)",
      minYears: 5,
      maxYears: 10,
      weight: 4,
    },
    {
      id: randomUUID(),
      label: "Experto (10+ años)",
      minYears: 10,
      maxYears: null,
      weight: 5,
    },
  ];

  console.log("📊 Creating seniority ranges...");
  await db.insert(seniorityRange).values(seniorityRanges).onConflictDoNothing();

  // Seed Contact Platforms
  const contactPlatforms = [
    {
      id: randomUUID(),
      name: "Email",
      icon: "mail",
      urlTemplate: "mailto:{value}",
    },
    {
      id: randomUUID(),
      name: "WhatsApp",
      icon: "message-circle",
      urlTemplate: "https://wa.me/{value}",
    },
    {
      id: randomUUID(),
      name: "Instagram",
      icon: "instagram",
      urlTemplate: "https://instagram.com/{value}",
    },
    {
      id: randomUUID(),
      name: "Facebook",
      icon: "facebook",
      urlTemplate: "https://facebook.com/{value}",
    },
    {
      id: randomUUID(),
      name: "Twitter/X",
      icon: "twitter",
      urlTemplate: "https://x.com/{value}",
    },
    {
      id: randomUUID(),
      name: "YouTube",
      icon: "youtube",
      urlTemplate: "https://youtube.com/@{value}",
    },
    {
      id: randomUUID(),
      name: "Spotify",
      icon: "music",
      urlTemplate: "https://open.spotify.com/artist/{value}",
    },
    {
      id: randomUUID(),
      name: "SoundCloud",
      icon: "cloud",
      urlTemplate: "https://soundcloud.com/{value}",
    },
    {
      id: randomUUID(),
      name: "Bandcamp",
      icon: "disc",
      urlTemplate: "https://{value}.bandcamp.com",
    },
    {
      id: randomUUID(),
      name: "Teléfono",
      icon: "phone",
      urlTemplate: "tel:{value}",
    },
    {
      id: randomUUID(),
      name: "Sitio Web",
      icon: "globe",
      urlTemplate: "{value}",
    },
  ];

  console.log("📱 Creating contact platforms...");
  await db
    .insert(contactPlatform)
    .values(contactPlatforms)
    .onConflictDoNothing();

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    client.close();
  });
