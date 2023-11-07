import { getInstrumentos } from "@/api/api";
import RegistroForm from "@/components/registro/form";
import { Instrumento } from "@/types/musico";
import React from "react";

const Registro = async () => {
  const instrumentos = await getInstrumentos();

  return (
    <main className="w-full h-full overflow-y-scroll p-8 lg:px-48 lg:py-24 bg-gradient-to-b from-slate-50 to-purple-100">
      <RegistroForm instrumentos={instrumentos as Instrumento[]} />
    </main>
  );
};

export default Registro;
