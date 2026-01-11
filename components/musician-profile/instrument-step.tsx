"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ChevronRight } from "lucide-react";

interface Instrument {
    id: string;
    name: string;
    category: string;
}

interface InstrumentStepProps {
    selectedInstrument: string | null;
    onSelect: (instrumentId: string) => void;
    onNext: () => void;
}

export function InstrumentStep({
    selectedInstrument,
    onSelect,
    onNext,
}: InstrumentStepProps) {
    const [grouped, setGrouped] = useState<Record<string, Instrument[]>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchInstruments();
    }, []);

    const fetchInstruments = async () => {
        try {
            const response = await fetch("/api/instruments");
            const data = await response.json();
            setGrouped(data.grouped || {});
        } catch {
            setError("Error al cargar los instrumentos");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return <p className="text-destructive text-center">{error}</p>;
    }

    const categories = Object.keys(grouped);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">¿Qué instrumento tocás?</h2>
                <p className="text-sm text-muted-foreground">
                    Seleccioná el instrumento principal de este perfil
                </p>
            </div>

            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                {categories.map((category) => (
                    <div key={category}>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                            {category}
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                            {grouped[category].map((inst) => (
                                <Card
                                    key={inst.id}
                                    className={`p-3 cursor-pointer transition-all flex items-center justify-between ${selectedInstrument === inst.id
                                        ? "border-primary bg-primary/10"
                                        : "border-border hover:border-primary/50"
                                        }`}
                                    onClick={() => onSelect(inst.id)}
                                >
                                    <span className="text-sm font-medium">{inst.name}</span>
                                    {selectedInstrument === inst.id && (
                                        <Check className="h-4 w-4 text-primary" />
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Button
                onClick={onNext}
                disabled={!selectedInstrument}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
                Continuar
                <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    );
}
