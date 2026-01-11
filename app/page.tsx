import Link from "next/link";
import { MusicianCard } from "@/components/home/musician-card";
import { AppRoutes } from "@/lib/routes";

// Mock data - esto vendría de la DB
const featuredMusicians = [
  {
    id: "1",
    name: "Martín García",
    instrument: "Guitarra",
    experience: "5+ años",
    location: "Godoy Cruz",
    image: "https://images.unsplash.com/photo-1565022472425-b6ae14b4b050?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&h=600&fit=crop",
  },
  {
    id: "2",
    name: "Lucía Fernández",
    instrument: "Bajo",
    experience: "3 años",
    location: "Córdoba",
    image: "https://images.unsplash.com/photo-1609940539397-3fa778baf74a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&h=600&fit=crop",
  },
  {
    id: "3",
    name: "Diego Romero",
    instrument: "Batería",
    experience: "7 años",
    location: "Rosario",
    image: "https://images.unsplash.com/photo-1503506584117-5ed92741077a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&h=600&fit=crop",
  },
  {
    id: "4",
    name: "Camila Torres",
    instrument: "Voz",
    experience: "4 años",
    location: "Mendoza",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=600&fit=crop",
  },
  {
    id: "5",
    name: "Nicolás Pérez",
    instrument: "Teclado",
    experience: "6 años",
    location: "La Plata",
    image: "https://images.unsplash.com/photo-1690742319740-9472091ed48f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&h=600&fit=crop",
  },
  {
    id: "6",
    name: "Ana Martínez",
    instrument: "Guitarra",
    experience: "8 años",
    location: "CABA",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=600&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="fixed inset-0 pt-14 pb-16 flex flex-col">
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h1 className="text-lg font-bold">Descubrí músicos</h1>
          <p className="text-xs text-muted-foreground">Tocá para ver más</p>
        </div>
        <Link
          href={AppRoutes.SEARCH}
          className="px-3 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium hover:bg-primary/10 transition-all"
        >
          Ver todos
        </Link>
      </div>

      {/* Bento Grid - fills remaining space */}
      <div className="flex-1 px-3 pb-3 min-h-0">
        <div className="h-full grid grid-cols-2 grid-rows-3 gap-2">
          {/* Large card - spans 2 rows */}
          <MusicianCard
            {...featuredMusicians[0]}
            className="row-span-2"
          />

          {/* Regular cards */}
          <MusicianCard {...featuredMusicians[1]} />
          <MusicianCard {...featuredMusicians[2]} />

          {/* Bottom row - 2 cards side by side */}
          <MusicianCard {...featuredMusicians[3]} />
          <MusicianCard {...featuredMusicians[4]} />
        </div>
      </div>

      {/* Quick filters - horizontal scroll */}
      <div className="px-4 py-2 border-t border-border/50">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {[
            { emoji: "🎸", name: "Guitarra" },
            { emoji: "🎸", name: "Bajo" },
            { emoji: "🥁", name: "Batería" },
            { emoji: "🎹", name: "Teclado" },
            { emoji: "🎤", name: "Voz" },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/buscar?instrumento=${category.name}`}
              className="shrink-0 px-3 py-1.5 rounded-full bg-muted/50 text-xs font-medium transition-all hover:bg-primary/20 hover:text-primary active:scale-95"
            >
              {category.emoji} {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
