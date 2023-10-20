import CardList from "@/components/busqueda/cardList";
import { Musico } from "@/types/musico";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Busqueda = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: musicos } = await supabase.from("musico").select("*");
  const { data: instrumentos } = await supabase.from("instrumento").select("*");

  return (
    <main className="w-full h-full p-8 bg-gradient-to-b from-slate-50 to-purple-100">
      <CardList musicos={musicos as any as Musico[]} />
    </main>
  );
};

export default Busqueda;
