import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-cols-2 home-grid grid-rows-8 gap-1 h-full w-full p-1">
      <Image
        className=" rounded-lg row-span-5 w-full h-full object-cover"
        src="/assets/home-basist.webp"
        alt="logo"
        width={200}
        height={200}
      />
      <Image
        className=" rounded-lg row-span-3 col-start-1 row-start-6 w-full h-full object-cover"
        src="/assets/home-guitarrist.webp"
        alt="logo"
        width={200}
        height={200}
      />
      <Image
        className=" rounded-lg row-span-5 col-start-2 row-start-4 w-full h-full object-cover"
        src="/assets/home-singer.webp"
        alt="logo"
        width={200}
        height={200}
      />
      <div className="row-span-3 col-start-2 row-start-1 flex flex-col gap-2 justify-between">
        <h1>
          Encontrá al <span className="text-primary">músico</span> que hace
          falta en tu
          <span className="text-quaternary"> banda</span>
        </h1>
        <div className="flex flex-col gap-3 pb-2">
          <Link href="/registro">
            <Button
              variant="outline"
              className="w-fit border-2 border-quaternary text-quaternary"
            >
              Registrarme
              <ArrowRightCircle className="w-6 h-6" />
            </Button>
          </Link>
          <Link href="/musicos">
            <Button
              variant="outline"
              className="w-fit border-2 border-primary text-primary"
            >
              Buscar un músico
              <ArrowRightCircle className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
