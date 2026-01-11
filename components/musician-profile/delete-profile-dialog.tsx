"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface DeleteProfileDialogProps {
    profile: {
        id: string;
        instrument: {
            name: string;
        };
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteProfileDialog({
    profile,
    open,
    onOpenChange,
}: DeleteProfileDialogProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        setIsDeleting(true);
        setError("");

        try {
            const response = await fetch(`/api/musician-profiles/${profile.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al eliminar");
            }

            router.refresh();
            onOpenChange(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al eliminar el perfil");
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar perfil de músico?</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                        <p>
                            Se eliminará tu perfil de <strong>{profile.instrument.name}</strong>,
                            incluyendo todas las experiencias e imágenes asociadas.
                        </p>
                        <p className="text-destructive font-medium">
                            Esta acción no se puede deshacer.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {error && (
                    <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                        {error}
                    </p>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Eliminando...
                            </>
                        ) : (
                            "Eliminar Perfil"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
