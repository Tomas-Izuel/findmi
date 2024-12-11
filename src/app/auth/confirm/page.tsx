import Success from "@/components/common/Lotties/Success";
import { Button } from "@/components/ui/button";
import { ConfirmEmail } from "@/edge/auth/register.service";
import { ConfirmRegisterParamsSchema } from "@/edge/auth/register.type";
import { revalidatePath } from "next/cache";

import Link from "next/link";
interface ConfirmPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const params = ConfirmRegisterParamsSchema.parse(await searchParams);
  const { success } = await ConfirmEmail(params);

  if (success) {
    revalidatePath("/", "layout");
  }

  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-tertiary to-background flex items-center justify-center p-4 flex-col text-secondary text-center">
      {success ? (
        <>
          <h2 className="text-2xl font-bold mb-4">¡Registro Exitoso!</h2>
          <Success className="w-full flex justify-center" />
          <p className="mb-4">
            Verificaste tu dirección de email. ¡Te redirigiremos a tu perfil
            para que puedas empezar a cargar tus perfiles!.
          </p>
          <Link href={`/musico/${params.id}`} prefetch>
            <Button>Ir a tu perfil</Button>
          </Link>
        </>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
