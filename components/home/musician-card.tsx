import Image from "next/image";
import { cn } from "@/lib/utils";

interface MusicianCardProps {
    name: string;
    instrument: string;
    image?: string;
    experience: string;
    location?: string;
    className?: string;
}

// Placeholder images for demo
const placeholderImages = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=600&fit=crop",
];

export function MusicianCard({
    name,
    instrument,
    image,
    experience,
    location,
    className,
}: MusicianCardProps) {
    // Use placeholder if no image
    // eslint-disable-next-line react-hooks/purity
    const imageUrl = image || placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

    return (
        <article
            className={cn(
                "group relative overflow-hidden rounded-2xl cursor-pointer",
                "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                className
            )}
        >
            {/* Full image background */}
            <div className="absolute inset-0 bg-muted">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Top badge - Instrument */}
            <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold uppercase tracking-wide">
                    {instrument}
                </span>
            </div>

            {/* Add button */}
            <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
            </button>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-white text-sm truncate">{name}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/70">{experience}</span>
                    {location && (
                        <>
                            <span className="text-primary text-[10px]">•</span>
                            <span className="text-[10px] text-white/70 truncate">{location}</span>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}
