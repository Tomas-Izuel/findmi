"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    Upload,
    Loader2,
    ImageIcon,
    X,
} from "lucide-react";
import Image from "next/image";

interface ImageStepProps {
    imageUrl: string | null;
    imagePublicId: string | null;
    onImageUpload: (url: string, publicId: string) => void;
    onSubmit: () => void;
    onBack: () => void;
    isSubmitting: boolean;
}

export function ImageStep({
    imageUrl,
    imagePublicId: _imagePublicId,
    onImageUpload,
    onSubmit,
    onBack,
    isSubmitting,
}: ImageStepProps) {
    void _imagePublicId; // Prop pasada para consistencia de interfaz
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith("image/")) {
            setError("Por favor selecciona una imagen");
            return;
        }

        // Validar tamaño (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("La imagen no puede superar los 5MB");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            // Obtener firma para upload seguro
            const signatureRes = await fetch("/api/upload");
            if (!signatureRes.ok) {
                throw new Error("Error al preparar la subida");
            }
            const signatureData = await signatureRes.json();

            // Subir a Cloudinary con transformaciones (16:9 optimizado para móvil)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signatureData.apiKey);
            formData.append("timestamp", signatureData.timestamp.toString());
            formData.append("signature", signatureData.signature);
            formData.append("folder", signatureData.folder);
            formData.append("transformation", signatureData.transformation);

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!uploadRes.ok) {
                throw new Error("Error al subir la imagen");
            }

            const uploadData = await uploadRes.json();
            onImageUpload(uploadData.secure_url, uploadData.public_id);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al subir la imagen");
        } finally {
            setIsUploading(false);
        }
    };

    const clearImage = () => {
        onImageUpload("", "");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Tu foto de portada</h2>
                <p className="text-sm text-muted-foreground">
                    Esta imagen será lo primero que vean otros músicos
                </p>
            </div>

            {/* Upload area */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {!imageUrl ? (
                <Card
                    className="p-8 border-dashed border-2 border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center gap-4 text-center">
                        {isUploading ? (
                            <>
                                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                <p className="text-sm text-muted-foreground">Subiendo imagen...</p>
                            </>
                        ) : (
                            <>
                                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Upload className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Subí tu foto</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        JPG, PNG o WebP. Máximo 5MB
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
            ) : (
                <Card className="relative overflow-hidden aspect-video">
                    <Image
                        src={imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                        onClick={clearImage}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Imagen cargada
                        </p>
                    </div>
                </Card>
            )}

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <div className="flex gap-3">
                <Button
                    variant="outline"
                    onClick={onBack}
                    disabled={isSubmitting || isUploading}
                    className="flex-1 h-12 rounded-xl border-primary/20 hover:bg-primary/10"
                >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Atrás
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!imageUrl || isSubmitting || isUploading}
                    className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creando...
                        </>
                    ) : (
                        "Crear perfil"
                    )}
                </Button>
            </div>
        </div>
    );
}
