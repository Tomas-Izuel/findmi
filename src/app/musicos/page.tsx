import { createClient } from "@/utils/supabase/server";

const MusicianPage = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log(data, error);
  return <main>MusicianPage</main>;
};

export default MusicianPage;
