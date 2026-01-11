"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 safe-top">
            <div className="glass border-b border-primary/10">
                <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1">
                        <Logo className="h-7 w-7 text-primary" />
                        <Logo variant="full" className="h-5 text-foreground" />
                    </Link>

                    {/* Auth */}
                    {session ? (
                        <Link href="/perfil">
                            <Avatar className="w-9 h-9 border-2 border-primary/30">
                                <AvatarImage src={session.user.image || ""} />
                                <AvatarFallback className="bg-primary/20 text-primary text-sm">
                                    {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Button asChild size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link href="/login">Ingresar</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
