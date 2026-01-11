import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { ContactStep } from "@/components/onboarding/contact-step";
import { AppRoutes } from "@/lib/routes";

export default async function OnboardingPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(AppRoutes.LOGIN);
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <div className="p-4 flex items-center justify-center border-b border-border">
                <Logo className="h-8 w-8 text-primary" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-6">
                {/* Progress indicator */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="h-1 flex-1 rounded-full bg-primary" />
                    <div className="h-1 flex-1 rounded-full bg-muted" />
                    <div className="h-1 flex-1 rounded-full bg-muted" />
                </div>

                {/* Welcome message */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">
                        ¡Bienvenido, {session.user.name?.split(" ")[0] || "músico"}! 🎸
                    </h1>
                    <p className="text-muted-foreground">
                        Para que otros músicos puedan contactarte, agregá al menos una forma
                        de contacto.
                    </p>
                </div>

                {/* Contact step */}
                <ContactStep />

                {/* Skip option */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                    Podés agregar más formas de contacto después desde tu perfil
                </p>
            </div>
        </div>
    );
}
