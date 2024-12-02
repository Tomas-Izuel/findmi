import ConfirmMessage from "@/components/register/ConfirmMessage";
import RegisterForm from "@/components/register/RegisterForm";
import { AuthSearchParamsSchema, AuthStatus } from "@/edge/auth/register.type";
import { redirect } from "next/navigation";

const RegisterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const response = await searchParams;
  const { status, id } = AuthSearchParamsSchema.parse(response);

  if (status === AuthStatus.CONFIRMED && id) {
    redirect(`/musicos/${id}`);
  }
  return (
    <main className="flex justify-center items-center pt-8 h-full px-5">
      <section className="bg-tertiary text-secondary p-4 rounded-lg">
        {status === AuthStatus.WAITING_CONFIRMATION ? (
          <ConfirmMessage />
        ) : (
          <>
            <h2 className="text-center">
              Regístrate y adentrate en el ambiente musical de tu ciudad
            </h2>
            <RegisterForm />
          </>
        )}
      </section>
    </main>
  );
};

export default RegisterPage;
