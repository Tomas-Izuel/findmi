"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";

interface SeniorityRange {
    id: string;
    label: string;
    minYears: number;
    maxYears: number | null;
}

interface EditProfileDialogProps {
    profile: {
        id: string;
        bio: string | null;
        isActive: boolean;
        instrument: {
            id: string;
            name: string;
        };
        seniority: {
            id: string;
            label: string;
        };
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditProfileDialog({
    profile,
    open,
    onOpenChange,
}: EditProfileDialogProps) {
    const router = useRouter();
    const [bio, setBio] = useState(profile.bio || "");
    const [isActive, setIsActive] = useState(profile.isActive);
    const [selectedSeniority, setSelectedSeniority] = useState(profile.seniority.id);
    const [seniorityRanges, setSeniorityRanges] = useState<SeniorityRange[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingSeniority, setIsFetchingSeniority] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            fetchSeniorityRanges();
            // Reset valores cuando se abre
            setBio(profile.bio || "");
            setIsActive(profile.isActive);
            setSelectedSeniority(profile.seniority.id);
        }
    }, [open, profile]);

    const fetchSeniorityRanges = async () => {
        try {
            const response = await fetch("/api/seniority-ranges");
            const data = await response.json();
            setSeniorityRanges(data.seniorityRanges || []);
        } catch {
            setError("Error al cargar los rangos de antigüedad");
        } finally {
            setIsFetchingSeniority(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/musician-profiles/${profile.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bio: bio.trim() || null,
                    seniorityRangeId: selectedSeniority,
                    isActive,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al actualizar");
            }

            router.refresh();
            onOpenChange(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al actualizar el perfil");
        } finally {
            setIsLoading(false);
        }
    };

    const hasChanges =
        bio.trim() !== (profile.bio || "") ||
        selectedSeniority !== profile.seniority.id ||
        isActive !== profile.isActive;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Editar Perfil de Músico</DialogTitle>
                    <DialogDescription>
                        {profile.instrument.name} • Actualiza tu información
                    </DialogDescription>
                </DialogHeader>

                {isFetchingSeniority ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Instrumento (solo lectura) */}
                        <div className="space-y-2">
                            <Label>Instrumento</Label>
                            <Input
                                value={profile.instrument.name}
                                disabled
                                className="bg-muted cursor-not-allowed"
                            />
                            <p className="text-xs text-muted-foreground">
                                El instrumento no se puede cambiar
                            </p>
                        </div>

                        {/* Antigüedad */}
                        <div className="space-y-2">
                            <Label>Antigüedad</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {seniorityRanges.map((range) => (
                                    <Card
                                        key={range.id}
                                        className={`p-3 cursor-pointer transition-all hover:border-primary/50 ${selectedSeniority === range.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                            }`}
                                        onClick={() => setSelectedSeniority(range.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">
                                                {range.label}
                                            </span>
                                            {selectedSeniority === range.id && (
                                                <Check className="h-4 w-4 text-primary" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {range.minYears}
                                            {range.maxYears ? `-${range.maxYears}` : "+"} años
                                        </p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="bio">Biografía (opcional)</Label>
                            <Textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Contanos sobre tu experiencia musical..."
                                className="min-h-[100px] resize-none"
                                maxLength={500}
                                disabled={isLoading}
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {bio.length}/500 caracteres
                            </p>
                        </div>

                        {/* Estado activo */}
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                            <div className="flex-1">
                                <Label htmlFor="is-active" className="font-medium cursor-pointer">
                                    Perfil activo
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Los perfiles inactivos no aparecen en búsquedas
                                </p>
                            </div>
                            <Switch
                                id="is-active"
                                checked={isActive}
                                onCheckedChange={setIsActive}
                                disabled={isLoading}
                            />
                        </div>

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
                                disabled={!hasChanges || isLoading}
                                className="flex-1"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    "Guardar Cambios"
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
