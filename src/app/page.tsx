import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" flex justify-center items-center w-screen h-screen gap-24">
      <div className=" hidden lg:block">
        <Image src="/guitar.png" alt=" guitar image" className="w-96" />
      </div>
      <section className="flex flex-col">
        <Image src="/Logo.svg" alt="FindMi" className=" w-64 lg:w-auto" />
        <div className=" lg:text-3xl font-semibold text-gray-700 translate-x-1/6 -translate-y-1/2">
          <p>Busca el musico </p>
          <p>que hace falta en tu banda</p>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4 mt-10">
          <Link href="/registro">
            <Button color="primary" className="w-full">
              Soy musico
            </Button>
          </Link>
          <Link href="/busqueda">
            <Button color="secondary" className="w-full">
              Busco a un musico
            </Button>
          </Link>
        </div>
      </section>
      <p className="absolute bottom-5 text-xs">
        Creada y desarrollada por Tomas Izuel
      </p>
    </main>
  );
}
