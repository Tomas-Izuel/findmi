import StepFormWrapper from "@/components/register/StepFormWrapper";

const RegisterPage = () => {
  return (
    <main className="flex justify-center items-start pt-8 h-full px-5">
      <section className="bg-tertiary text-secondary p-4 rounded-lg">
        <h2 className="text-center">
          Regístrate y adentrate en el ambiente musical de tu ciudad
        </h2>
        <StepFormWrapper />
      </section>
    </main>
  );
};

export default RegisterPage;
