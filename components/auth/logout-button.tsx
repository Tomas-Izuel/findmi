"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";

export function LogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await signOut();
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full h-12 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Cerrando sesión...
                </>
            ) : (
                <>
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                </>
            )}
        </Button>
    );
}
