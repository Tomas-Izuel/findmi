import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getMusicos = async (cookies: any) => {
  const supabase = createServerComponentClient({ cookies });
};
