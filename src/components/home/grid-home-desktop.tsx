import Image from "next/image";
import { ArrowRightIcon } from "../icons/arrow-right-icon";
import { Button } from "../ui/button";
import { Title } from "../ui/title";

function GridHomeDesktop() {
  return (
    <section className="hidden size-full max-h-screen md:grid relative w-full">
      {/* Grid background */}
      <div className="inset-0 absolute size-full -z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 grid-rows-2">
        {/* Large image spanning 2x2 */}
        <div className="relative rounded-lg col-start-1 row-span-full col-end-3">
          <Image
            src="/home-images/mobile-home-image-3.jpeg"
            alt="Man playing guitar and singing in the open air"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Regular images */}
        <div className="relative rounded-lg">
          <Image
            src="/home-images/mobile-home-image-1.jpeg"
            alt="Woman playing a bass guitar on stage"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="relative rounded-lg">
          <Image
            src="/home-images/mobile-home-image-3.jpeg"
            alt="Man playing guitar and singing in the open air"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Tall image */}
        <div className="relative rounded-lg">
          <Image
            src="/home-images/mobile-home-image-2.jpeg"
            alt="Man playing guitar and singing in the open air"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Wide image */}

        <div className="relative rounded-lg">
          <Image
            src="/home-images/mobile-home-image-1.jpeg"
            alt="Woman playing a bass guitar on stage"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="absolute grid items-center justify-items-end inset-y-0 right-0 w-3/4 bg-gradient-to-l from-black via-black to-transparent text-Therciary_color">
        <div className="w-1/2 grid gap-7 p-3.5">
          <Title
            headingLevel="h1"
            className="text-4xl xl:text-5xl font-semibold"
          >
            Encontrá al <br />{" "}
            <span className="text-button-quaternary">músico</span> que hace{" "}
            <br /> falta en tu <span className="text-primary_color">banda</span>
          </Title>
          <p className="text-gray-200">
            Conecta con músicos talentosos en tu área. Encunetra el guitarrista,
            bajista, baterista o vocalista que tu banda necesita para completar
            tu sonido.
          </p>
          <div className="flex flex-col gap-3.5">
            <Button
              variant="ghost"
              className="border-2 self-center w-full !py-5 max-w-64 xl:max-w-96 rounded-2xl text-button-quaternary hover:bg-button-quaternary hover:text-secondary_color group border-button-quaternary"
            >
              Registrarme
              <ArrowRightIcon className="stroke-button-quaternary group-hover:stroke-secondary_color hidden min-[430px]:block" />
            </Button>
            <Button
              variant="ghost"
              className="border-2 self-center group w-full !py-5 max-w-64 xl:max-w-96 rounded-2xl text-primary_color hover:bg-primary_color hover:text-Therciary_color border-primary_color"
            >
              Buscar un músico
              <ArrowRightIcon className="stroke-primary_color group-hover:stroke-Therciary_color hidden min-[430px]:block" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { GridHomeDesktop };
