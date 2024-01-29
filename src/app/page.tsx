/* eslint-disable @next/next/no-img-element */
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { BiChevronRightCircle } from "react-icons/bi";

export default function Home() {
  return (
    <main className=" flex justify-center items-center flex-col lg:flex-row px-4 pt-32 pb-20 gap-8 lg:gap-28 overflow-y-scroll">
      <div className="lg:hidden flex justify-center items-center w-screen backdrop-blur-sm absolute top-0 pt-4">
        <img src="/assets/Logo.svg" alt="" className=" w-[8rem]" />
      </div>
      <section className=" max-w-[25rem]">
        <h2 className="mb-3 lg:mb-5">
          Encontrá los músicos que hacen falta en tu banda
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 text-xl">
          <Link href="/registro">
            <Button
              color="primary"
              size="lg"
              className="shadow-md  font-semibold"
            >
              Registrarme
              <BiChevronRightCircle />
            </Button>
          </Link>
          <Link href="/musicos">
            <Button
              color="secondary"
              size="lg"
              className="shadow-md  font-semibold"
            >
              Explorar músicos
              <BiChevronRightCircle />
            </Button>
          </Link>
        </div>
      </section>

      <Image
        src="/assets/home-img.jpg"
        alt="Guitarrist"
        width="100%"
        height="100%"
        shadow="lg"
        className="w-48 lg:w-80"
      />
    </main>
  );
}
