"use client";

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string, publicId: string) => void;
    onRemove?: () => void;
    folder?: string;
}

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    folder = "profiles",
}: ImageUploadProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = (result: CloudinaryUploadResult) => {
        onChange(result.secure_url, result.public_id);
    };

    return (
        <div className="flex flex-col gap-4">
            {value && (
                <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <CldImage
                        src={value}
                        alt="Uploaded image"
                        fill
                        className="object-cover"
                        sizes="160px"
                    />
                    {onRemove && (
                        <button
                            type="button"
                            onClick={onRemove}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            <CldUploadWidget
                uploadPreset="findmi_profiles"
                options={{
                    folder,
                    maxFiles: 1,
                    resourceType: "image",
                    clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                    maxFileSize: 5000000, // 5MB
                    cropping: true,
                    croppingAspectRatio: 1,
                    croppingShowDimensions: true,
                }}
                onSuccess={(result) => {
                    setIsLoading(false);
                    if (typeof result.info === "object" && result.info !== null) {
                        handleUpload(result.info as CloudinaryUploadResult);
                    }
                }}
                onQueuesStart={() => setIsLoading(true)}
                onError={() => setIsLoading(false)}
            >
                {({ open }) => (
                    <button
                        type="button"
                        onClick={() => open()}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <span>Subiendo...</span>
                            </>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" x2="12" y1="3" y2="15" />
                                </svg>
                                <span>{value ? "Cambiar imagen" : "Subir imagen"}</span>
                            </>
                        )}
                    </button>
                )}
            </CldUploadWidget>
        </div>
    );
}
