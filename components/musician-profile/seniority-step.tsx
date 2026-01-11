"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ChevronRight, ChevronLeft } from "lucide-react";

interface SeniorityRange {
    id: string;
    label: string;
    minYears: number;
    maxYears: number | null;
    weight: number;
}

interface SeniorityStepProps {
    selectedSeniority: string | null;
    onSelect: (seniorityId: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export function SeniorityStep({
    selectedSeniority,
    onSelect,
    onNext,
    onBack,
}: SeniorityStepProps) {
    const [ranges, setRanges] = useState<SeniorityRange[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRanges();
    }, []);

    const fetchRanges = async () => {
        try {
            const response = await fetch("/api/seniority-ranges");
            const data = await response.json();
            setRanges(data.ranges || []);
        } catch {
            setError("Error al cargar los rangos");
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

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">¿Hace cuánto tocás?</h2>
                <p className="text-sm text-muted-foreground">
                    Esto ayuda a otros músicos a encontrar el match perfecto
                </p>
            </div>

            <div className="space-y-3">
                {ranges.map((range) => (
                    <Card
                        key={range.id}
                        className={`p-4 cursor-pointer transition-all flex items-center justify-between ${selectedSeniority === range.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                            }`}
                        onClick={() => onSelect(range.id)}
                    >
                        <span className="font-medium">{range.label}</span>
                        {selectedSeniority === range.id && (
                            <Check className="h-5 w-5 text-primary" />
                        )}
                    </Card>
                ))}
            </div>

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
                    disabled={!selectedSeniority}
                    className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    Continuar
                    <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
