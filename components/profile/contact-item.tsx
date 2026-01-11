"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { PlatformIcon } from "@/components/ui/platform-icon";
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

interface ContactItemProps {
    contact: Contact;
    onUpdated: (contact: Contact) => void;
    onDeleted: (contactId: string) => void;
}

export function ContactItem({ contact, onUpdated, onDeleted }: ContactItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(contact.value);
    const [isPublic, setIsPublic] = useState(contact.isPublic);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [error, setError] = useState("");

    const handleSave = async () => {
        if (!editValue.trim()) {
            setError("El valor del contacto no puede estar vacío");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/contacts/${contact.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    value: editValue.trim(),
                    isPublic,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al actualizar");
            }

            const data = await response.json();
            onUpdated(data.contact);
            setIsEditing(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al actualizar el contacto");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`/api/contacts/${contact.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al eliminar");
            }

            onDeleted(contact.id);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al eliminar el contacto");
            setIsDeleting(false);
        }
    };

    const handleCancel = () => {
        setEditValue(contact.value);
        setIsPublic(contact.isPublic);
        setIsEditing(false);
        setError("");
    };

    const handleToggleVisibility = async (newValue: boolean) => {
        const oldValue = isPublic;
        setIsPublic(newValue);

        try {
            const response = await fetch(`/api/contacts/${contact.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPublic: newValue }),
            });

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            onUpdated(data.contact);
        } catch {
            // Revertir en caso de error
            setIsPublic(oldValue);
        }
    };

    return (
        <>
            <Card className="p-4 bg-background border-border">
                <div className="flex items-start gap-3">
                    {/* Icono de plataforma */}
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                        <PlatformIcon icon={contact.platform.icon} className="h-5 w-5 text-primary" />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">{contact.platform.name}</p>
                            <Badge
                                variant={isPublic ? "default" : "outline"}
                                className="text-xs"
                            >
                                {isPublic ? "Público" : "Privado"}
                            </Badge>
                        </div>

                        {isEditing ? (
                            <div className="space-y-3 mt-2">
                                <Input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="h-10 text-sm"
                                    disabled={isLoading}
                                />

                                <div className="flex items-center gap-2">
                                    <Switch
                                        id={`visibility-${contact.id}`}
                                        checked={isPublic}
                                        onCheckedChange={setIsPublic}
                                        disabled={isLoading}
                                    />
                                    <Label
                                        htmlFor={`visibility-${contact.id}`}
                                        className="text-sm text-muted-foreground cursor-pointer"
                                    >
                                        Visible para todos
                                    </Label>
                                </div>

                                {error && (
                                    <p className="text-xs text-destructive">{error}</p>
                                )}

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={handleSave}
                                        disabled={isLoading}
                                        className="flex-1"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                            <>
                                                <Check className="h-3 w-3 mr-1" />
                                                Guardar
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={isLoading}
                                    >
                                        <X className="h-3 w-3 mr-1" />
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground truncate">
                                {contact.value}
                            </p>
                        )}
                    </div>

                    {/* Acciones */}
                    {!isEditing && (
                        <div className="flex gap-1">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setIsEditing(true)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </Card>

            {/* Dialog de confirmación de eliminación */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar contacto?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Se eliminará tu contacto de {contact.platform.name} ({contact.value}).
                            Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
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
                                "Eliminar"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
