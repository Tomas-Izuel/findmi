"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { PlatformIcon } from "@/components/ui/platform-icon";

interface Platform {
    id: string;
    name: string;
    icon: string | null;
    urlTemplate: string | null;
}

export function ContactStep() {
    const router = useRouter();
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingPlatforms, setIsFetchingPlatforms] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPlatforms();
    }, []);

    const fetchPlatforms = async () => {
        try {
            const response = await fetch("/api/platforms");
            const data = await response.json();
            setPlatforms(data.platforms || []);
        } catch {
            setError("Error al cargar las plataformas");
        } finally {
            setIsFetchingPlatforms(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlatform || !value.trim()) {
            setError("Seleccioná una plataforma e ingresá tu contacto");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    platformId: selectedPlatform,
                    value: value.trim(),
                    isPublic: true,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al guardar");
            }

            router.push("/perfil");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al guardar el contacto");
        } finally {
            setIsLoading(false);
        }
    };

    const getPlaceholder = (platformName: string) => {
        const placeholders: Record<string, string> = {
            WhatsApp: "+54 9 11 1234-5678",
            Instagram: "@tu_usuario",
            Email: "tu@email.com",
            Twitter: "@tu_usuario",
            Facebook: "tu.nombre",
            TikTok: "@tu_usuario",
            YouTube: "tu_canal",
            Spotify: "tu_artista",
            SoundCloud: "tu_perfil",
        };
        return placeholders[platformName] || "Tu contacto";
    };

    if (isFetchingPlatforms) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de plataforma */}
            <div className="space-y-3">
                <Label className="text-base">¿Cómo te pueden contactar?</Label>
                <div className="grid grid-cols-3 gap-3">
                    {platforms.map((platform) => (
                        <Card
                            key={platform.id}
                            className={`p-4 cursor-pointer transition-all text-center ${selectedPlatform === platform.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                                }`}
                            onClick={() => setSelectedPlatform(platform.id)}
                        >
                            <div className="flex justify-center mb-1">
                                <PlatformIcon icon={platform.icon} className="h-6 w-6" />
                            </div>
                            <p className="text-xs font-medium truncate">{platform.name}</p>
                            {selectedPlatform === platform.id && (
                                <Check className="h-4 w-4 text-primary mx-auto mt-1" />
                            )}
                        </Card>
                    ))}
                </div>
            </div>

            {/* Input de valor */}
            {selectedPlatform && (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                    <Label htmlFor="contact-value">
                        Tu {platforms.find((p) => p.id === selectedPlatform)?.name}
                    </Label>
                    <Input
                        id="contact-value"
                        type="text"
                        placeholder={getPlaceholder(
                            platforms.find((p) => p.id === selectedPlatform)?.name || ""
                        )}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="h-12 rounded-xl bg-card border-primary/10 focus:border-primary/40"
                        autoFocus
                    />
                </div>
            )}

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading || !selectedPlatform || !value.trim()}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Guardando...
                    </>
                ) : (
                    "Continuar"
                )}
            </Button>
        </form>
    );
}
