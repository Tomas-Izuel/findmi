import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { WizardContainer } from "@/components/musician-profile/wizard-container";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppRoutes } from "@/lib/routes";

export default async function NuevoMusicoPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(AppRoutes.LOGIN);
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-border">
                <Link
                    href={AppRoutes.PROFILE}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="text-sm">Cancelar</span>
                </Link>
                <Logo className="h-6 w-6 text-primary" />
                <div className="w-20" /> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 pb-8">
                <WizardContainer />
            </div>
        </div>
    );
}
