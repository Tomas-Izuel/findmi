"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Music, Pencil, Trash2 } from "lucide-react";
import { EditProfileDialog } from "./edit-profile-dialog";
import { DeleteProfileDialog } from "./delete-profile-dialog";

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
        isActive: boolean;
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
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <>
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

                    {/* Badge de estado */}
                    {!profile.isActive && (
                        <Badge
                            variant="outline"
                            className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm"
                        >
                            Inactivo
                        </Badge>
                    )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
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

                    {/* Botones de acción */}
                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setIsEditDialogOpen(true)}
                        >
                            <Pencil className="h-3 w-3 mr-2" />
                            Editar
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => setIsDeleteDialogOpen(true)}
                        >
                            <Trash2 className="h-3 w-3 mr-2" />
                            Eliminar
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Dialogs */}
            <EditProfileDialog
                profile={profile}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />

            <DeleteProfileDialog
                profile={profile}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            />
        </>
    );
}
