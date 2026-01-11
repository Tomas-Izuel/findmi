import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
    contact,
    contactPlatform,
    musicianProfile,
    profileImage,
    experience,
    instrument,
    seniorityRange,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Music, Sparkles } from "lucide-react";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { MusicianProfileCard } from "@/components/musician-profile/profile-card";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { AppRoutes } from "@/lib/routes";

export default async function PerfilPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(AppRoutes.LOGIN);
    }

    // Verificar si el usuario tiene contactos
    const userContacts = await db
        .select({
            id: contact.id,
            value: contact.value,
            isPublic: contact.isPublic,
            platform: {
                id: contactPlatform.id,
                name: contactPlatform.name,
                icon: contactPlatform.icon,
            },
        })
        .from(contact)
        .innerJoin(contactPlatform, eq(contact.platformId, contactPlatform.id))
        .where(eq(contact.userId, session.user.id));

    // Redirigir al onboarding si no tiene contactos
    if (userContacts.length === 0) {
        redirect(AppRoutes.ONBOARDING);
    }

    // Obtener perfiles de músico del usuario
    const profiles = await db
        .select({
            id: musicianProfile.id,
            bio: musicianProfile.bio,
            isActive: musicianProfile.isActive,
            calculatedSeniority: musicianProfile.calculatedSeniority,
            createdAt: musicianProfile.createdAt,
            instrument: {
                id: instrument.id,
                name: instrument.name,
                category: instrument.category,
            },
            seniority: {
                id: seniorityRange.id,
                label: seniorityRange.label,
            },
        })
        .from(musicianProfile)
        .innerJoin(instrument, eq(musicianProfile.instrumentId, instrument.id))
        .innerJoin(
            seniorityRange,
            eq(musicianProfile.seniorityRangeId, seniorityRange.id)
        )
        .where(eq(musicianProfile.userId, session.user.id))
        .orderBy(musicianProfile.createdAt);

    // Obtener imágenes y experiencias para cada perfil
    const profilesWithDetails = await Promise.all(
        profiles.map(async (profile) => {
            const images = await db
                .select()
                .from(profileImage)
                .where(eq(profileImage.profileId, profile.id));

            const experiences = await db
                .select()
                .from(experience)
                .where(eq(experience.profileId, profile.id));

            return {
                ...profile,
                images,
                experiences,
                primaryImage: images.find((img) => img.isPrimary) || images[0] || null,
            };
        })
    );

    const user = session.user;
    const initials = user.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : user.email[0].toUpperCase();

    return (
        <div className="flex flex-col min-h-full p-4 pb-20">
            {/* Header del perfil */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Mi Perfil</h1>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Settings className="h-5 w-5" />
                </Button>
            </div>

            {/* Card principal del usuario */}
            <Card className="p-6 bg-card border-border mb-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                        <AvatarImage src={user.image || undefined} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xl">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold">{user.name || "Sin nombre"}</h2>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <Badge className="mt-2 bg-primary/20 text-primary border-0">
                            {profilesWithDetails.length > 0
                                ? `${profilesWithDetails.length} perfil${profilesWithDetails.length > 1 ? "es" : ""}`
                                : "Sin perfiles"}
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Sección de perfiles de músico */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Music className="h-5 w-5 text-primary" />
                        Mis Perfiles de Músico
                    </h3>
                    {profilesWithDetails.length > 0 && (
                        <Link href={AppRoutes.NEW_MUSICIAN}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:bg-primary/10"
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Nuevo
                            </Button>
                        </Link>
                    )}
                </div>

                {profilesWithDetails.length === 0 ? (
                    /* CTA llamativo para crear el primer perfil */
                    <Link href={AppRoutes.NEW_MUSICIAN}>
                        <Card className="p-6 bg-linear-to-br from-primary/20 via-primary/10 to-background border-primary/30 hover:border-primary/50 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                    <Sparkles className="h-7 w-7 text-primary-foreground" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg">Creá tu perfil de músico</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Mostrá tu instrumento, experiencia y conectá con otros
                                        músicos
                                    </p>
                                </div>
                                <Plus className="h-6 w-6 text-primary group-hover:rotate-90 transition-transform" />
                            </div>
                        </Card>
                    </Link>
                ) : (
                    /* Lista de perfiles existentes */
                    <div className="grid grid-cols-1 gap-4">
                        {profilesWithDetails.map((profile) => (
                            <MusicianProfileCard key={profile.id} profile={profile} />
                        ))}

                        {/* Botón para agregar otro perfil */}
                        <Link href={AppRoutes.NEW_MUSICIAN}>
                            <Card className="p-4 border-dashed border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                                <div className="flex items-center justify-center gap-2 text-primary">
                                    <Plus className="h-5 w-5" />
                                    <span className="font-medium">Agregar otro instrumento</span>
                                </div>
                            </Card>
                        </Link>
                    </div>
                )}
            </div>

            {/* Sección de contactos */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Mis Contactos</h3>
                    <Link href={AppRoutes.ONBOARDING}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Agregar
                        </Button>
                    </Link>
                </div>

                <div className="space-y-3">
                    {userContacts.map((c) => (
                        <Card
                            key={c.id}
                            className="p-4 bg-card border-border flex items-center gap-3"
                        >
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <PlatformIcon icon={c.platform.icon} className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{c.platform.name}</p>
                                <p className="text-sm text-muted-foreground">{c.value}</p>
                            </div>
                            {c.isPublic ? (
                                <Badge
                                    variant="outline"
                                    className="text-xs border-primary/30 text-primary"
                                >
                                    Público
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-xs">
                                    Privado
                                </Badge>
                            )}
                        </Card>
                    ))}
                </div>
            </div>

            {/* Acciones */}
            <div className="mt-auto space-y-3">
                <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl border-primary/20 hover:bg-primary/10"
                    asChild
                >
                    <Link href={AppRoutes.EDIT_PROFILE}>Editar perfil</Link>
                </Button>
                <LogoutButton />
            </div>
        </div>
    );
}
