import { auth } from "@/lib/auth";
import { db } from "@/db";
import { contact, contactPlatform, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/lib/routes";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { ContactsList } from "@/components/profile/contacts-list";

export default async function EditarPerfilPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(AppRoutes.LOGIN);
    }

    // Obtener información del usuario
    const [userInfo] = await db
        .select({
            id: user.id,
            email: user.email,
            name: user.name,
            location: user.location,
            image: user.image,
        })
        .from(user)
        .where(eq(user.id, session.user.id))
        .limit(1);

    // Obtener contactos del usuario
    const userContacts = await db
        .select({
            id: contact.id,
            value: contact.value,
            isPublic: contact.isPublic,
            platform: {
                id: contactPlatform.id,
                name: contactPlatform.name,
                icon: contactPlatform.icon,
            },
        })
        .from(contact)
        .innerJoin(contactPlatform, eq(contact.platformId, contactPlatform.id))
        .where(eq(contact.userId, session.user.id));

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <Link href={AppRoutes.PROFILE}>
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-xl font-bold">Editar Perfil</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Información personal */}
                <EditProfileForm user={userInfo} />

                {/* Contactos */}
                <ContactsList contacts={userContacts} />
            </div>
        </div>
    );
}
