import Link from "next/link";
import { MusicianCard } from "./musician-card";
import { AppRoutes } from "@/lib/routes";

// Mock data - esto vendría de la DB
const featuredMusicians = [
    {
        id: "1",
        name: "Martín García",
        instrument: "Guitarra",
        experience: "5+ años",
        location: "Buenos Aires",
        image: "",
        featured: true,
    },
    {
        id: "2",
        name: "Lucía Fernández",
        instrument: "Bajo",
        experience: "3 años",
        location: "Córdoba",
        image: "",
    },
    {
        id: "3",
        name: "Diego Romero",
        instrument: "Batería",
        experience: "7 años",
        location: "Rosario",
        image: "",
    },
    {
        id: "4",
        name: "Camila Torres",
        instrument: "Voz",
        experience: "4 años",
        location: "Mendoza",
        image: "",
    },
    {
        id: "5",
        name: "Nicolás Pérez",
        instrument: "Teclado",
        experience: "6 años",
        location: "La Plata",
        image: "",
    },
    {
        id: "6",
        name: "Ana Martínez",
        instrument: "Guitarra",
        experience: "8 años",
        location: "CABA",
        image: "",
    },
];

export function BentoGrid() {
    return (
        <section className="px-4 py-6">
            <div className="max-w-lg mx-auto">
                {/* Section header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Músicos destacados</h2>
                    <Link
                        href={AppRoutes.SEARCH}
                        className="text-sm text-primary hover:underline underline-offset-4"
                    >
                        Ver todos
                    </Link>
                </div>

                {/* Bento Grid - 2x3 */}
                <div className="grid grid-cols-2 gap-3">
                    {featuredMusicians.slice(0, 6).map((musician) => (
                        <MusicianCard key={musician.id} {...musician} />
                    ))}
                </div>

                {/* Quick categories */}
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Buscar por instrumento
                    </h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        {[
                            { emoji: "🎸", name: "Guitarra" },
                            { emoji: "🎸", name: "Bajo" },
                            { emoji: "🥁", name: "Batería" },
                            { emoji: "🎹", name: "Teclado" },
                            { emoji: "🎤", name: "Voz" },
                            { emoji: "🎷", name: "Vientos" },
                        ].map((category) => (
                            <Link
                                key={category.name}
                                href={`/buscar?instrumento=${category.name}`}
                                className="shrink-0 px-4 py-2 rounded-full border border-primary/20 text-sm font-medium transition-all hover:bg-primary/10 hover:border-primary/40 hover:text-primary active:scale-95"
                            >
                                {category.emoji} {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
