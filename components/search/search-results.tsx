"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Music, MapPin, Star } from "lucide-react";
import { type SearchFilters } from "./search-filters";
import { getSeniorityLabel } from "@/lib/seniority";

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
            className="flex-1 overflow-y-auto"
        >
            <div className="grid grid-cols-2 gap-3 p-4">
                {profiles.map((profile) => (
                    <Card
                        key={profile.id}
                        className="overflow-hidden bg-card border-border cursor-pointer hover:border-primary/30 transition-colors"
                    >
                        {/* Imagen */}
                        <div className="relative aspect-video">
                            {profile.primaryImage ? (
                                <Image
                                    src={profile.primaryImage.url}
                                    alt={profile.user.name || "Músico"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <Music className="h-8 w-8 text-muted-foreground" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Badge instrumento */}
                            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                                {profile.instrument.name}
                            </Badge>
                        </div>

                        {/* Info */}
                        <div className="p-3 space-y-1">
                            <h3 className="font-semibold text-sm truncate">
                                {profile.user.name || "Sin nombre"}
                            </h3>

                            {profile.user.location && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {profile.user.location}
                                </p>
                            )}

                            <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] text-muted-foreground">
                                    {getSeniorityLabel(profile.calculatedSeniority)}
                                </span>
                                {profile.experienceCount > 0 && (
                                    <span className="text-[10px] text-primary flex items-center gap-0.5">
                                        <Star className="h-3 w-3" />
                                        {profile.experienceCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Loading more indicator */}
            {isLoadingMore && (
                <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
            )}

            {/* End of results */}
            {!hasMore && profiles.length > 0 && (
                <p className="text-center text-xs text-muted-foreground py-4">
                    No hay más resultados
                </p>
            )}
        </div>
    );
}
