"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Check, Loader2 } from "lucide-react";
import { PlatformIcon } from "@/components/ui/platform-icon";

interface Platform {
    id: string;
    name: string;
    icon: string | null;
}

interface Contact {
    id: string;
    value: string;
    isPublic: boolean;
    platform: Platform;
}

interface AddContactDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onContactAdded: (contact: Contact) => void;
}

export function AddContactDialog({
    open,
    onOpenChange,
    onContactAdded,
}: AddContactDialogProps) {
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [value, setValue] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingPlatforms, setIsFetchingPlatforms] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            fetchPlatforms();
        }
    }, [open]);

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
                    isPublic,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al agregar");
            }

            const data = await response.json();

            // Obtener info completa del contacto
            const platform = platforms.find((p) => p.id === selectedPlatform);
            if (platform) {
                onContactAdded({
                    id: data.contact.id,
                    value: data.contact.value,
                    isPublic: data.contact.isPublic,
                    platform,
                });
            }

            // Resetear y cerrar
            setSelectedPlatform(null);
            setValue("");
            setIsPublic(true);
            onOpenChange(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al agregar el contacto");
        } finally {
            setIsLoading(false);
        }
    };

    const getPlaceholder = (platformName: string) => {
        const placeholders: Record<string, string> = {
            "WhatsApp": "+54 9 11 1234 5678",
            "Email": "tu@email.com",
            "Instagram": "@tuusuario",
            "Telegram": "@tuusuario",
            "Facebook": "tuusuario",
        };
        return placeholders[platformName] || "Tu contacto";
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Agregar Contacto</DialogTitle>
                    <DialogDescription>
                        Elegí una plataforma y agregá tu información de contacto
                    </DialogDescription>
                </DialogHeader>

                {isFetchingPlatforms ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Selección de plataforma */}
                        <div className="space-y-2">
                            <Label>Plataforma</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {platforms.map((platform) => (
                                    <Card
                                        key={platform.id}
                                        className={`p-3 cursor-pointer transition-all hover:border-primary/50 ${selectedPlatform === platform.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                            }`}
                                        onClick={() => setSelectedPlatform(platform.id)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                                <PlatformIcon
                                                    icon={platform.icon}
                                                    className="h-4 w-4 text-primary"
                                                />
                                            </div>
                                            <span className="text-sm font-medium truncate">
                                                {platform.name}
                                            </span>
                                            {selectedPlatform === platform.id && (
                                                <Check className="h-4 w-4 text-primary ml-auto shrink-0" />
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Valor del contacto */}
                        {selectedPlatform && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="contact-value">Contacto</Label>
                                    <Input
                                        id="contact-value"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder={getPlaceholder(
                                            platforms.find((p) => p.id === selectedPlatform)
                                                ?.name || ""
                                        )}
                                        className="h-11 rounded-xl"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Visibilidad */}
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="contact-public"
                                            className="font-medium cursor-pointer"
                                        >
                                            Contacto público
                                        </Label>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Otros músicos podrán ver este contacto
                                        </p>
                                    </div>
                                    <Switch
                                        id="contact-public"
                                        checked={isPublic}
                                        onCheckedChange={setIsPublic}
                                        disabled={isLoading}
                                    />
                                </div>
                            </>
                        )}

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                                {error}
                            </p>
                        )}

                        {/* Botones */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                                className="flex-1"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={!selectedPlatform || !value.trim() || isLoading}
                                className="flex-1"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Agregando...
                                    </>
                                ) : (
                                    "Agregar"
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
