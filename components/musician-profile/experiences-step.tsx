"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ChevronRight,
    ChevronLeft,
    Plus,
    Trash2,
    MapPin,
} from "lucide-react";

export interface Experience {
    venueName: string;
    description?: string;
    impactScore: number;
}

interface ExperiencesStepProps {
    experiences: Experience[];
    onUpdate: (experiences: Experience[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export function ExperiencesStep({
    experiences,
    onUpdate,
    onNext,
    onBack,
}: ExperiencesStepProps) {
    const [newVenue, setNewVenue] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const addExperience = () => {
        if (!newVenue.trim()) return;

        const newExp: Experience = {
            venueName: newVenue.trim(),
            description: newDescription.trim() || undefined,
            impactScore: 1,
        };

        onUpdate([...experiences, newExp]);
        setNewVenue("");
        setNewDescription("");
    };

    const removeExperience = (index: number) => {
        onUpdate(experiences.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">¿Dónde tocaste?</h2>
                <p className="text-sm text-muted-foreground">
                    Agregá lugares donde hayas tocado. Esto es opcional pero suma puntos.
                </p>
            </div>

            {/* Lista de experiencias agregadas */}
            {experiences.length > 0 && (
                <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                        Tus experiencias ({experiences.length})
                    </Label>
                    <div className="space-y-2 max-h-[30vh] overflow-y-auto">
                        {experiences.map((exp, index) => (
                            <Card
                                key={index}
                                className="p-3 bg-card border-border flex items-start gap-3"
                            >
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{exp.venueName}</p>
                                    {exp.description && (
                                        <p className="text-xs text-muted-foreground truncate">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 text-muted-foreground hover:text-destructive"
                                    onClick={() => removeExperience(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Formulario para agregar */}
            <Card className="p-4 bg-card border-border border-dashed">
                <div className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="venue">Lugar o evento</Label>
                        <Input
                            id="venue"
                            placeholder="Ej: La Trastienda, Cosquín Rock..."
                            value={newVenue}
                            onChange={(e) => setNewVenue(e.target.value)}
                            className="h-10 rounded-lg bg-background border-primary/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción (opcional)</Label>
                        <Input
                            id="description"
                            placeholder="Ej: Guitarrista invitado, show acústico..."
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="h-10 rounded-lg bg-background border-primary/10"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addExperience}
                        disabled={!newVenue.trim()}
                        className="w-full h-10 rounded-lg border-primary/30 hover:bg-primary/10"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar experiencia
                    </Button>
                </div>
            </Card>

            <div className="flex gap-3">
                <Button
                    variant="outline"
                    onClick={onBack}
                    className="flex-1 h-12 rounded-xl border-primary/20 hover:bg-primary/10"
                >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Atrás
                </Button>
                <Button
                    onClick={onNext}
                    className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {experiences.length === 0 ? "Omitir" : "Continuar"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
