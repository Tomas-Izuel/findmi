import FormRegister from "@/components/register/FormRegister";
import React from "react";

const RegisterPage = () => {
  return (
    <main className="flex justify-start items-center flex-col lg:px-[21rem] pt-10 gap-8 w-screen overflow-y-scroll">
      <FormRegister />
    </main>
  );
};

export default RegisterPage;
