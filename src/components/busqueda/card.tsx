import { Musico } from "@/types/musico";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import { BiLogoInstagram, BiLogoWhatsapp, BiMailSend } from "react-icons/bi";

interface CardProps {
  musico: Musico;
}

const MusicoCard = ({ musico }: CardProps) => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] flex flex-row h-60"
      shadow="sm"
    >
      <div className="w-1/3 h-60 ">
        <Image
          alt="Album cover"
          shadow="sm"
          className="h-60 object-cover"
          src="/default_image.jpg"
          isBlurred
        />
      </div>
      <CardBody className="w-2/3 flex flex-col">
        <h2 className="font-semibold">{musico.nombre}</h2>
        <p className="text-xs">
          {musico.intrumento_nombre} -{" "}
          <span className=" font-light">{musico.tiempo} años de exp.</span>
        </p>
        <p className="text-sm mt-2">{musico.descripcion}</p>
        <Divider />
        <p className="text-sm mt-2">{musico.experiencia}</p>
        <Divider />
        <div className="p-1">
          {musico.instagram && (
            <a href={musico.instagram}>
              <BiLogoInstagram className="w-5 h-5" />
            </a>
          )}
          {musico.telefono && (
            <a href={`https://api.whatsapp.com/send?phone=${musico.telefono}`}>
              <BiLogoWhatsapp className="w-5 h-5" />
            </a>
          )}
          {musico.email && (
            <a href={""}>
              <BiMailSend className="w-5 h-5" />
            </a>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default MusicoCard;
