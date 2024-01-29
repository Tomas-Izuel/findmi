"use client";
import { Button, Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { XLogo } from "../icons/Icons";

const FormRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const supabase = createClientComponentClient();

  const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const singInX = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: { redirectTo: "http://localhost:3000/api/callbackX" },
    });
  };

  const singUp = async (data: any) => {
    const { name, email, password } = schema.parse(data);
    if (name && email && password) {
      supabase.auth.signUp({
        email: "example@email.com",
        password: "example-password",
        options: {
          emailRedirectTo: "https://example.com/welcome",
        },
      });
    }
  };

  return (
    <form
      className="border lg:w-[30rem] p-4 lg:p-10 rounded-xl shadow-lg flex flex-col gap-6"
      onSubmit={handleSubmit(singUp)}
    >
      <h2 className="text-center">Deja que tu banda te encuentre</h2>
      <Controller
        rules={{ required: true }}
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label="Nombre/Apodo"
            placeholder="Nombre/Apodo"
            required
            errorMessage={errors.name ? "Campo requerido" : null}
            isInvalid={errors.name ? true : false}
            {...field}
          />
        )}
      />
      <Controller
        rules={{ required: true }}
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label="Correo electrónico"
            placeholder="Correo electrónico"
            type="email"
            required
            errorMessage={errors.name ? "Campo requerido" : null}
            isInvalid={errors.name ? true : false}
            {...field}
          />
        )}
      />
      <Controller
        rules={{ required: true }}
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            required
            errorMessage={errors.name ? "Campo requerido" : null}
            isInvalid={errors.name ? true : false}
            {...field}
          />
        )}
      />
      <Button color="primary" size="lg" type="submit">
        Registrarme
      </Button>
      <Button size="lg" className="bg-black text-white" onClick={singInX}>
        Iniciar sesión con <img src="/icons/x.jpg" alt="" className="w-10" />
      </Button>
    </form>
  );
};

export default FormRegister;
