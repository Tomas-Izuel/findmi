import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
    musicianProfile,
    profileImage,
    experience,
    instrument,
    seniorityRange,
    user,
    contact,
    contactPlatform,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    MapPin,
    Star,
    Calendar,
    Music,
    Sparkles,
} from "lucide-react";
import { getTierConfig } from "@/lib/musician-tiers";
import { getSeniorityLabel } from "@/lib/seniority";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { TierIcon } from "@/components/ui/tier-icon";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function MusicianProfilePage({ params }: Props) {
    const resolvedParams = await params;
    const profileId = resolvedParams.id;

    // Obtener sesión para saber si el usuario está autenticado
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Obtener perfil del músico
    const [profile] = await db
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
            user: {
                id: user.id,
                name: user.name,
                location: user.location,
                image: user.image,
            },
        })
        .from(musicianProfile)
        .innerJoin(instrument, eq(musicianProfile.instrumentId, instrument.id))
        .innerJoin(
            seniorityRange,
            eq(musicianProfile.seniorityRangeId, seniorityRange.id)
        )
        .innerJoin(user, eq(musicianProfile.userId, user.id))
        .where(eq(musicianProfile.id, profileId))
        .limit(1);

    if (!profile || !profile.isActive) {
        notFound();
    }

    // Obtener imágenes del perfil
    const images = await db
        .select()
        .from(profileImage)
        .where(eq(profileImage.profileId, profileId))
        .orderBy(profileImage.isPrimary, profileImage.order);

    const primaryImage = images.find((img) => img.isPrimary) || images[0];

    // Obtener experiencias
    const experiences = await db
        .select()
        .from(experience)
        .where(eq(experience.profileId, profileId));

    // Obtener contactos públicos del usuario
    const publicContacts = await db
        .select({
            id: contact.id,
            value: contact.value,
            platform: {
                id: contactPlatform.id,
                name: contactPlatform.name,
                icon: contactPlatform.icon,
            },
        })
        .from(contact)
        .innerJoin(contactPlatform, eq(contact.platformId, contactPlatform.id))
        .where(
            and(eq(contact.userId, profile.user.id), eq(contact.isPublic, true))
        );

    const tierConfig = getTierConfig(profile.calculatedSeniority);

    return (
        <div className="min-h-screen pb-20">
            {/* Header con imagen de portada */}
            <div className="relative h-[60vh] min-h-[400px]">
                {primaryImage ? (
                    <Image
                        src={primaryImage.url}
                        alt={profile.user.name || "Músico"}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Music className="h-24 w-24 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-background" />

                {/* Botón de volver */}
                <div className="absolute top-4 left-4 z-10">
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
                    >
                        <Link href="/buscar">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>

                {/* Badge tier */}
                <Badge
                    className={`absolute top-4 right-4 border ${tierConfig.badgeColor} px-4 py-2 text-base font-bold z-10 flex items-center gap-2`}
                >
                    <TierIcon iconName={tierConfig.iconName} className="h-5 w-5" />
                    {tierConfig.label}
                </Badge>
            </div>

            {/* Contenido */}
            <div className="max-w-2xl mx-auto px-4 -mt-16 relative z-10">
                {/* Card principal con info */}
                <Card
                    className={`relative p-6 bg-card border-2 ${tierConfig.borderColor} ${tierConfig.borderEffect}`}
                    style={
                        tierConfig.borderEffect
                            ? ({
                                "--border-color": `oklch(0.8 0.2 ${tierConfig.hue})`
                            } as React.CSSProperties)
                            : undefined
                    }
                >
                    <div className="space-y-6">
                        {/* Header con nombre y tier */}
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className={`text-3xl ${tierConfig.nameEffect}`}>
                                        {profile.user.name || "Músico Anónimo"}
                                    </h1>
                                    {(tierConfig.name === "MASTER" ||
                                        tierConfig.name === "EXPERT") && (
                                            <Sparkles className={`h-7 w-7 ${tierConfig.textEffect}`} />
                                        )}
                                </div>
                                <Badge className="bg-primary/20 text-primary border-primary/30">
                                    {profile.instrument.name}
                                </Badge>
                            </div>
                        </div>

                        {/* Info básica */}
                        <div className="space-y-3">
                            {profile.user.location && (
                                <div
                                    className={`flex items-center gap-2 ${tierConfig.locationEffect}`}
                                >
                                    <MapPin className="h-5 w-5" />
                                    <span>{profile.user.location}</span>
                                </div>
                            )}

                            <div className={`flex items-center gap-2 ${tierConfig.textEffect}`}>
                                <Calendar className="h-5 w-5" />
                                <span>{getSeniorityLabel(profile.calculatedSeniority)}</span>
                            </div>

                            {experiences.length > 0 && (
                                <div className="flex items-center gap-2 text-amber-500">
                                    <Star className="h-5 w-5 fill-current" />
                                    <span>
                                        {experiences.length} experiencia
                                        {experiences.length > 1 ? "s" : ""}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Bio */}
                        {profile.bio && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Sobre mí</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {profile.bio}
                                </p>
                            </div>
                        )}

                        {/* Experiencias */}
                        {experiences.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Experiencias</h3>
                                <div className="space-y-3">
                                    {experiences.map((exp) => (
                                        <Card
                                            key={exp.id}
                                            className="p-4 bg-muted/30 border-border/50"
                                        >
                                            <div className="flex items-start gap-3">
                                                <Star className="h-5 w-5 text-amber-500 fill-current mt-0.5" />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{exp.venueName}</h4>
                                                    {exp.description && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {exp.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Contactos - solo si está autenticado */}
                {session && publicContacts.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3 px-2">
                            Conectá con {profile.user.name?.split(" ")[0] || "este músico"}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {publicContacts.map((c) => {
                                const href = getContactLink(c.platform.name, c.value);
                                return (
                                    <Button
                                        key={c.id}
                                        asChild
                                        variant="outline"
                                        className="h-auto py-4 px-4 flex-col gap-2 hover:bg-primary/10 hover:border-primary/40 transition-all"
                                    >
                                        <a href={href} target="_blank" rel="noopener noreferrer">
                                            <PlatformIcon
                                                icon={c.platform.icon}
                                                className="h-6 w-6 text-primary"
                                            />
                                            <span className="text-sm font-medium">
                                                {c.platform.name}
                                            </span>
                                        </a>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Mensaje si no está autenticado */}
                {!session && (
                    <Card className="mt-6 p-6 text-center bg-primary/5 border-primary/20">
                        <p className="text-muted-foreground mb-4">
                            Iniciá sesión para ver las opciones de contacto
                        </p>
                        <Button asChild className="bg-primary text-primary-foreground">
                            <Link href="/login">Iniciar sesión</Link>
                        </Button>
                    </Card>
                )}
            </div>
        </div>
    );
}

// Función para generar links directos según la plataforma
function getContactLink(platformName: string, value: string): string {
    const lowerPlatform = platformName.toLowerCase();

    if (lowerPlatform.includes("whatsapp") || lowerPlatform.includes("wpp")) {
        // Eliminar caracteres no numéricos
        const cleanNumber = value.replace(/\D/g, "");
        return `https://wa.me/${cleanNumber}`;
    }

    if (lowerPlatform.includes("email") || lowerPlatform.includes("correo")) {
        return `mailto:${value}`;
    }

    if (lowerPlatform.includes("instagram")) {
        // Eliminar @ si existe
        const username = value.replace("@", "");
        return `https://instagram.com/${username}`;
    }

    if (lowerPlatform.includes("facebook")) {
        return `https://facebook.com/${value}`;
    }

    if (lowerPlatform.includes("telegram")) {
        const username = value.replace("@", "");
        return `https://t.me/${username}`;
    }

    if (lowerPlatform.includes("twitter") || lowerPlatform.includes("x")) {
        const username = value.replace("@", "");
        return `https://twitter.com/${username}`;
    }

    // Default: intentar abrir como URL si parece serlo
    if (value.startsWith("http")) {
        return value;
    }

    return "#";
}
