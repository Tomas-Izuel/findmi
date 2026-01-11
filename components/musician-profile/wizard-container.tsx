"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InstrumentStep } from "./instrument-step";
import { SeniorityStep } from "./seniority-step";
import { ExperiencesStep, type Experience } from "./experiences-step";
import { ImageStep } from "./image-step";

const STEPS = ["instrument", "seniority", "experiences", "image"] as const;
type Step = (typeof STEPS)[number];

export function WizardContainer() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>("instrument");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Form state
    const [instrumentId, setInstrumentId] = useState<string | null>(null);
    const [seniorityId, setSeniorityId] = useState<string | null>(null);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imagePublicId, setImagePublicId] = useState<string | null>(null);

    const currentStepIndex = STEPS.indexOf(currentStep);
    const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

    const goToStep = (step: Step) => {
        setCurrentStep(step);
        setError("");
    };

    const handleImageUpload = (url: string, publicId: string) => {
        setImageUrl(url || null);
        setImagePublicId(publicId || null);
    };

    const handleSubmit = async () => {
        if (!instrumentId || !seniorityId || !imageUrl) {
            setError("Faltan datos requeridos");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/musician-profiles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    instrumentId,
                    seniorityRangeId: seniorityId,
                    imageUrl,
                    imagePublicId,
                    experiences,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al crear el perfil");
            }

            router.push("/perfil");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al crear el perfil");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Paso {currentStepIndex + 1} de {STEPS.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Error message */}
            {error && (
                <p className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-lg">
                    {error}
                </p>
            )}

            {/* Step content */}
            {currentStep === "instrument" && (
                <InstrumentStep
                    selectedInstrument={instrumentId}
                    onSelect={setInstrumentId}
                    onNext={() => goToStep("seniority")}
                />
            )}

            {currentStep === "seniority" && (
                <SeniorityStep
                    selectedSeniority={seniorityId}
                    onSelect={setSeniorityId}
                    onNext={() => goToStep("experiences")}
                    onBack={() => goToStep("instrument")}
                />
            )}

            {currentStep === "experiences" && (
                <ExperiencesStep
                    experiences={experiences}
                    onUpdate={setExperiences}
                    onNext={() => goToStep("image")}
                    onBack={() => goToStep("seniority")}
                />
            )}

            {currentStep === "image" && (
                <ImageStep
                    imageUrl={imageUrl}
                    imagePublicId={imagePublicId}
                    onImageUpload={handleImageUpload}
                    onSubmit={handleSubmit}
                    onBack={() => goToStep("experiences")}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
}
