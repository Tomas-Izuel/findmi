import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/lib/routes";

export function HeroSection() {
    return (
        <section className="px-4 py-8">
            <div className="max-w-lg mx-auto">
                {/* Tagline */}
                <div className="space-y-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Encontrá el músico
                        <br />
                        <span className="gradient-text">que te falta</span>
                    </h1>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                        Conectá con guitarristas, bajistas, bateristas y más para tu
                        próximo proyecto musical.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 justify-center mt-6">
                    <Button asChild size="lg" className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href={AppRoutes.SEARCH}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 mr-2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            Buscar músicos
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="rounded-full px-6 border-primary/30 text-primary hover:bg-primary/10"
                    >
                        <Link href={AppRoutes.REGISTER}>Unirme</Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 mt-8 text-center">
                    <div>
                        <p className="text-2xl font-bold gradient-text">150+</p>
                        <p className="text-xs text-muted-foreground">Músicos</p>
                    </div>
                    <div className="w-px bg-border" />
                    <div>
                        <p className="text-2xl font-bold gradient-text">12</p>
                        <p className="text-xs text-muted-foreground">Instrumentos</p>
                    </div>
                    <div className="w-px bg-border" />
                    <div>
                        <p className="text-2xl font-bold gradient-text">50+</p>
                        <p className="text-xs text-muted-foreground">Conexiones</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
