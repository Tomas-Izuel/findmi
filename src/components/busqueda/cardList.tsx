import { Musico } from "@/types/musico";
import MusicoCard from "./card";
import { Divider } from "@nextui-org/react";

interface CardListProps {
  musicos: Musico[];
}

const CardList = ({ musicos }: CardListProps) => {
  return (
    <section className="flex flex-col justify-start items-center">
      <h1 className="text-xl font-semibold">Lista de musicos</h1>
      <Divider className="mb-8" />
      {musicos.map((musico) => (
        <MusicoCard key={musico.id} musico={musico} />
      ))}
    </section>
  );
};

export default CardList;
