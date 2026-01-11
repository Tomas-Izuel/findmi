"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface Instrument {
    id: string;
    name: string;
    category: string;
}

interface SearchFiltersProps {
    onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
    name: string;
    location: string;
    instrumentId: string;
    minSeniority: string;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [filters, setFilters] = useState<SearchFilters>({
        name: "",
        location: "",
        instrumentId: "",
        minSeniority: "",
    });

    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const response = await fetch("/api/instruments");
                const data = await response.json();
                setInstruments(data.instruments || []);
            } catch {
                console.error("Error fetching instruments");
            }
        };

        fetchInstruments();
    }, []);

    const handleFilterChange = (key: keyof SearchFilters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    const handleClear = () => {
        const emptyFilters = {
            name: "",
            location: "",
            instrumentId: "",
            minSeniority: "",
        };
        setFilters(emptyFilters);
        onSearch(emptyFilters);
    };

    const hasActiveFilters = Object.values(filters).some((v) => v !== "");

    return (
        <div className="sticky top-14 z-10 bg-background border-b border-border">
            {/* Search bar principal */}
            <div className="p-4 flex gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar músico..."
                        value={filters.name}
                        onChange={(e) => handleFilterChange("name", e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="pl-9 h-10 rounded-xl bg-muted/50 border-0"
                    />
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className={`h-10 w-10 rounded-xl border-primary/20 ${isExpanded || hasActiveFilters ? "bg-primary/10 text-primary" : ""
                        }`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* Filtros expandidos */}
            {isExpanded && (
                <Card className="mx-4 mb-4 p-4 bg-card border-border animate-in slide-in-from-top-2">
                    <div className="space-y-4">
                        {/* Ubicación */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Ubicación</Label>
                            <Input
                                placeholder="Ciudad o provincia..."
                                value={filters.location}
                                onChange={(e) => handleFilterChange("location", e.target.value)}
                                className="h-9 rounded-lg bg-muted/50 border-0"
                            />
                        </div>

                        {/* Instrumento */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Instrumento</Label>
                            <div className="relative">
                                <select
                                    value={filters.instrumentId}
                                    onChange={(e) => handleFilterChange("instrumentId", e.target.value)}
                                    className="w-full h-9 rounded-lg bg-muted/50 border-0 px-3 text-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Todos los instrumentos</option>
                                    {instruments.map((inst) => (
                                        <option key={inst.id} value={inst.id}>
                                            {inst.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>

                        {/* Experiencia mínima */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                                Experiencia mínima
                            </Label>
                            <div className="relative">
                                <select
                                    value={filters.minSeniority}
                                    onChange={(e) => handleFilterChange("minSeniority", e.target.value)}
                                    className="w-full h-9 rounded-lg bg-muted/50 border-0 px-3 text-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Cualquier nivel</option>
                                    <option value="10">Principiante</option>
                                    <option value="30">Intermedio</option>
                                    <option value="50">Avanzado</option>
                                    <option value="70">Experto</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-2 pt-2">
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClear}
                                    className="text-muted-foreground"
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Limpiar
                                </Button>
                            )}
                            <Button
                                size="sm"
                                onClick={handleSearch}
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <Search className="h-4 w-4 mr-1" />
                                Buscar
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
