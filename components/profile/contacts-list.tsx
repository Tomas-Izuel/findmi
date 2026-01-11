"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Plus } from "lucide-react";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { ContactItem } from "./contact-item";
import { AddContactDialog } from "./add-contact-dialog";

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

interface ContactsListProps {
    contacts: Contact[];
}

export function ContactsList({ contacts: initialContacts }: ContactsListProps) {
    const router = useRouter();
    const [contacts, setContacts] = useState(initialContacts);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const handleContactUpdated = (updatedContact: Contact) => {
        setContacts((prev) =>
            prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
        );
        router.refresh();
    };

    const handleContactDeleted = (contactId: string) => {
        setContacts((prev) => prev.filter((c) => c.id !== contactId));
        router.refresh();
    };

    const handleContactAdded = (newContact: Contact) => {
        setContacts((prev) => [...prev, newContact]);
        router.refresh();
    };

    return (
        <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Contactos</h2>
                        <p className="text-sm text-muted-foreground">
                            Gestiona cómo te pueden contactar
                        </p>
                    </div>
                </div>
                <Badge variant="outline" className="text-xs">
                    {contacts.length} {contacts.length === 1 ? "contacto" : "contactos"}
                </Badge>
            </div>

            {/* Lista de contactos */}
            {contacts.length > 0 ? (
                <div className="space-y-3 mb-4">
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                            onUpdated={handleContactUpdated}
                            onDeleted={handleContactDeleted}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No tienes contactos agregados</p>
                </div>
            )}

            {/* Botón agregar */}
            <Button
                onClick={() => setIsAddDialogOpen(true)}
                variant="outline"
                className="w-full h-11 rounded-xl border-dashed border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
            >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Contacto
            </Button>

            {/* Dialog para agregar contacto */}
            <AddContactDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onContactAdded={handleContactAdded}
            />
        </Card>
    );
}
