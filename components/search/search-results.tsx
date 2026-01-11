"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Music, MapPin, Star, Sparkles } from "lucide-react";
import { type SearchFilters } from "./search-filters";
import { getSeniorityLabel } from "@/lib/seniority";
import { getTierConfig } from "@/lib/musician-tiers";

interface ProfileImage {
    id: string;
    url: string;
    isPrimary: boolean;
}

interface SearchProfile {
    id: string;
    bio: string | null;
    calculatedSeniority: number;
    user: {
        id: string;
        name: string | null;
        location: string | null;
    };
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
    experienceCount: number;
}

interface SearchResultsProps {
    filters: SearchFilters;
}

export function SearchResults({ filters }: SearchResultsProps) {
    const [profiles, setProfiles] = useState<SearchProfile[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const isFetchingRef = useRef(false);

    // Construir URL de búsqueda
    const buildSearchUrl = useCallback(
        (pageNum: number) => {
            const params = new URLSearchParams();
            params.set("page", pageNum.toString());
            params.set("limit", "10");

            if (filters.name) params.set("name", filters.name);
            if (filters.location) params.set("location", filters.location);
            if (filters.instrumentId) params.set("instrumentId", filters.instrumentId);
            if (filters.minSeniority) params.set("minSeniority", filters.minSeniority);

            return `/api/search?${params.toString()}`;
        },
        [filters]
    );

    // Fetch profiles
    const fetchProfiles = useCallback(
        async (pageNum: number, append = false) => {
            if (isFetchingRef.current) return;

            isFetchingRef.current = true;
            if (pageNum === 1) {
                setIsLoading(true);
            } else {
                setIsLoadingMore(true);
            }
            setError(null);

            try {
                const response = await fetch(buildSearchUrl(pageNum));
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Error al buscar");
                }

                if (append) {
                    setProfiles((prev) => [...prev, ...data.profiles]);
                } else {
                    setProfiles(data.profiles);
                }

                setHasMore(data.pagination.hasMore);
                setPage(pageNum);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setIsLoading(false);
                setIsLoadingMore(false);
                isFetchingRef.current = false;
            }
        },
        [buildSearchUrl]
    );

    // Fetch inicial y cuando cambian los filtros
    useEffect(() => {
        setProfiles([]);
        setPage(1);
        setHasMore(true);
        fetchProfiles(1, false);
    }, [filters, fetchProfiles]);

    // Scroll handler con pre-fetch al 50%
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const scrollPercentage = scrollTop / (scrollHeight - clientHeight);

            // Pre-fetch cuando llegamos al 50%
            if (scrollPercentage >= 0.5 && hasMore && !isFetchingRef.current) {
                fetchProfiles(page + 1, true);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [hasMore, page, fetchProfiles]);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center p-4">
                <p className="text-destructive text-center">{error}</p>
            </div>
        );
    }

    if (profiles.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <Music className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay resultados</h3>
                <p className="text-sm text-muted-foreground">
                    Probá ajustando los filtros de búsqueda
                </p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto snap-y snap-mandatory"
        >
            {profiles.map((profile) => {
                const tierConfig = getTierConfig(profile.calculatedSeniority);
                return (
                    <div
                        key={profile.id}
                        className="h-full snap-start snap-always flex items-center justify-center p-4"
                    >
                        <Link href={`/musico/${profile.id}`} className="w-full max-w-md h-full">
                            <Card className={`w-full h-full overflow-hidden bg-card border-2 cursor-pointer transition-all flex flex-col ${tierConfig.borderGlow} ${tierConfig.animation} hover:scale-[1.02]`}>
                                {/* Imagen - ocupa la mayor parte */}
                                <div className="relative flex-1 min-h-0">
                                    {profile.primaryImage ? (
                                        <Image
                                            src={profile.primaryImage.url}
                                            alt={profile.user.name || "Músico"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            <Music className="h-16 w-16 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className={`absolute inset-0 bg-linear-to-t ${tierConfig.gradient} via-transparent to-transparent`} />

                                    {/* Badge tier - top left */}
                                    <Badge className={`absolute top-4 left-4 border ${tierConfig.badgeColor} px-3 py-1 text-sm font-bold`}>
                                        {tierConfig.icon} {tierConfig.label}
                                    </Badge>

                                    {/* Badge instrumento - top right */}
                                    <Badge className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white border-white/30 px-3 py-1">
                                        {profile.instrument.name}
                                    </Badge>

                                    {/* Info superpuesta */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-2xl font-bold flex-1">
                                                {profile.user.name || "Sin nombre"}
                                            </h3>
                                            {tierConfig.name === "MASTER" && (
                                                <Sparkles className="h-6 w-6 text-primary animate-pulse-slow" />
                                            )}
                                        </div>

                                        {profile.user.location && (
                                            <p className="text-sm flex items-center gap-2 text-white/90">
                                                <MapPin className="h-4 w-4" />
                                                {profile.user.location}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-white/90">
                                                {getSeniorityLabel(profile.calculatedSeniority)}
                                            </span>
                                            {profile.experienceCount > 0 && (
                                                <span className="text-sm text-amber-300 flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-current" />
                                                    {profile.experienceCount} experiencia{profile.experienceCount > 1 ? "s" : ""}
                                                </span>
                                            )}
                                        </div>

                                        {profile.bio && (
                                            <p className="text-sm text-white/80 line-clamp-2">
                                                {profile.bio}
                                            </p>
                                        )}

                                        {/* Indicador de tap */}
                                        <p className="text-xs text-white/60 text-center mt-2">
                                            Tocá para ver más
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                );
            })}

            {/* Loading more indicator */}
            {isLoadingMore && (
                <div className="h-full flex items-center justify-center snap-start">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}

            {/* End of results */}
            {!hasMore && profiles.length > 0 && (
                <div className="h-32 flex items-center justify-center snap-start">
                    <p className="text-sm text-muted-foreground">
                        No hay más resultados
                    </p>
                </div>
            )}
        </div>
    );
}
