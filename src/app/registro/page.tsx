import RegistroForm from "@/components/registro/form";
import React from "react";

const Registro = () => {
  return (
    <main className="w-full h-full overflow-y-scroll p-8 lg:px-48 lg:py-24 bg-gradient-to-b from-slate-50 to-purple-100">
      <RegistroForm />
    </main>
  );
};

export default Registro;
