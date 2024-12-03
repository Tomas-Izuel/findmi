import Success from "@/components/common/Lotties/Success";
import { Button } from "@/components/ui/button";
import { ConfirmRegisterParamsSchema } from "@/edge/auth/register.type";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
interface ConfirmPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const supabase = await createClient();
  try {
    const { token_hash, account_id, type } = ConfirmRegisterParamsSchema.parse(
      await searchParams
    );

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    setTimeout(() => {
      redirect(`/musicos/${account_id}`);
    }, 5000);

    if (!error) {
      throw new Error("Error verifying OTP");
    }

    return (
      <main className="min-h-[100dvh] bg-gradient-to-br from-tertiary to-background flex items-center justify-center p-4 flex-col text-secondary text-center">
        <h2 className="text-2xl font-bold mb-4">¡Registro Exitoso!</h2>
        <Success className="w-full flex justify-center" />
        <p className="mb-4">
          Verificaste tu dirección de email. ¡Te redirigiremos a tu perfil para
          que puedas empezar a cargar tus perfiles!.
        </p>
      </main>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return (
      <main className="min-h-[100dvh] bg-gradient-to-br from-tertiary to-background flex items-center justify-center p-4 flex-col text-secondary text-center">
        <h2 className="text-2xl font-bold mb-4">
          No pudimos verificar tu mail
        </h2>
        <Success className="w-full flex justify-center" />
        <p className="mb-4">
          Pero no te preocupes, ve al inicio de sesión y ingresá desde ahi.
        </p>
        <Link href="/registro">
          <Button>Ir a inicio de sesión</Button>
        </Link>
      </main>
    );
  }
}
