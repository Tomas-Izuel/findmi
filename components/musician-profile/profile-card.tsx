
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Music } from "lucide-react";

interface ProfileImage {
    id: string;
    url: string;
    isPrimary: boolean;
}

interface Experience {
    id: string;
    venueName: string;
}

interface MusicianProfileCardProps {
    profile: {
        id: string;
        bio: string | null;
        instrument: {
            id: string;
            name: string;
            category: string;
        };
        seniority: {
            id: string;
            label: string;
        };
        primaryImage: ProfileImage | null;
        experiences: Experience[];
    };
}

export function MusicianProfileCard({ profile }: MusicianProfileCardProps) {
    return (
        <Card className="overflow-hidden bg-card border-border">
            {/* Imagen */}
            <div className="relative aspect-video">
                {profile.primaryImage ? (
                    <Image
                        src={profile.primaryImage.url}
                        alt={profile.instrument.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Music className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge de instrumento */}
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {profile.instrument.name}
                </Badge>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        {profile.seniority.label}
                    </p>
                </div>

                {profile.experiences.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>
                            {profile.experiences.length} experiencia
                            {profile.experiences.length > 1 ? "s" : ""}
                        </span>
                    </div>
                )}

                {profile.bio && (
                    <p className="text-sm text-foreground line-clamp-2">{profile.bio}</p>
                )}
            </div>
        </Card>
    );
}
