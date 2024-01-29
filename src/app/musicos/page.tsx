import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const MusicsPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: musicos } = await supabase
    .from("musico_instrumento")
    .select("*");

  console.log(musicos);
  return (
    <main className=" flex justify-start items-start flex-col lg:flex-row px-[21rem] pt-10 gap-8 lg:gap-28 overflow-y-scroll">
      <h1>Encontrá músicos</h1>
    </main>
  );
};

export default MusicsPage;
