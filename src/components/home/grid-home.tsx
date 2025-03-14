import Image from "next/image";
import { ArrowRightIcon } from "../icons/arrow-right-icon";
import { Button } from "../ui/button";
import { Title } from "../ui/title";

function GridHome() {
  return (
    <section className="md:hidden size-full max-h-screen relative w-full">
      <div className="grid absolute size-full grid-cols-3 gap-3.5 text-Therciary_color">
        <div className="grid grid-rows-3 gap-3.5">
          <div className="relative rounded-lg row-start-1 row-end-3">
            <Image
              src="/home-images/mobile-home-image-1.webp"
              alt="Man playing guitar and singing in the open air"
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              priority
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative rounded-lg row-start-3 row-end-4">
            <Image
              src="/home-images/mobile-home-image-2.webp"
              alt="Woman playing a bass guitar on stage"
              sizes="(max-width: 640px) 100vw, 640px"
              priority
              fill
              className="object-cover object-top rounded-lg"
            />
          </div>
        </div>
        <div className="flex col-span-2 flex-col gap-3.5">
          <div className="flex flex-col gap-3.5">
            <Title
              headingLevel="h1"
              className="text-2xl min-[400px]:text-4xl sm:text-5xl font-semibold"
            >
              Encontrá al <span className="text-button-quaternary">músico</span>{" "}
              que hace falta en tu{" "}
              <span className="text-primary_color">banda</span>
            </Title>
            <div className="flex flex-col gap-3.5">
              <Button
                variant="ghost"
                className="border-2 rounded-xl font-normal self-start text-xs min-[450px]:text-base text-button-quaternary hover:bg-button-quaternary hover:text-secondary_color group border-button-quaternary"
              >
                Registrarme
                <ArrowRightIcon className="stroke-button-quaternary group-hover:stroke-secondary_color hidden min-[430px]:block" />
              </Button>
              <Button
                variant="ghost"
                className="border-2 rounded-xl font-normal self-start text-xs group min-[450px]:text-base text-primary_color hover:bg-primary_color hover:text-Therciary_color border-primary_color"
              >
                Buscar un músico
                <ArrowRightIcon className="stroke-primary_color group-hover:stroke-Therciary_color hidden min-[430px]:block" />
              </Button>
            </div>
          </div>
          <div className="relative w-full grow rounded-lg">
            <Image
              src="/home-images/mobile-home-image-3.webp"
              alt="Man playing guitar and singing in the open air"
              priority
              fill
              className="object-cover object-top rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { GridHome };
