"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, User } from "lucide-react";

interface UserInfo {
    id: string;
    email: string;
    name: string | null;
    location: string | null;
    image: string | null;
}

interface EditProfileFormProps {
    user: UserInfo;
}

export function EditProfileForm({ user }: EditProfileFormProps) {
    const router = useRouter();
    const [name, setName] = useState(user.name || "");
    const [location, setLocation] = useState(user.location || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch("/api/user", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim() || null,
                    location: location.trim() || null,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al actualizar");
            }

            setSuccess(true);
            router.refresh();

            // Ocultar mensaje de éxito después de 3 segundos
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al actualizar el perfil");
        } finally {
            setIsLoading(false);
        }
    };

    const hasChanges =
        name.trim() !== (user.name || "") ||
        location.trim() !== (user.location || "");

    return (
        <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Información Personal</h2>
                    <p className="text-sm text-muted-foreground">
                        Actualiza tu nombre y ubicación
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email (solo lectura) */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={user.email}
                        disabled
                        className="bg-muted cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground">
                        El email no se puede cambiar
                    </p>
                </div>

                {/* Nombre */}
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className="h-11 rounded-xl bg-background border-border"
                    />
                </div>

                {/* Ubicación */}
                <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ciudad, Provincia"
                        className="h-11 rounded-xl bg-background border-border"
                    />
                    <p className="text-xs text-muted-foreground">
                        Esto ayuda a otros músicos a encontrarte
                    </p>
                </div>

                {/* Mensajes */}
                {error && (
                    <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="text-sm text-green-600 bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                        ✓ Perfil actualizado correctamente
                    </p>
                )}

                {/* Botón */}
                <Button
                    type="submit"
                    disabled={!hasChanges || isLoading}
                    className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Guardar Cambios
                        </>
                    )}
                </Button>
            </form>
        </Card>
    );
}
