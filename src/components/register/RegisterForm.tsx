"use client";

import {
  AuthStatus,
  RegisterSchema,
  RegisterType,
} from "@/edge/auth/register.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import PromiseButton from "../ui/promise-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { Register } from "@/edge/auth/register.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { USER_DATA_STORAGE } from "@/lib/constants";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });
  const { push } = useRouter();
  const sendRegister = async (data: RegisterType) => {
    try {
      const user = await Register(data);
      localStorage.setItem(
        USER_DATA_STORAGE,
        JSON.stringify({
          email: user?.email,
          id: user?.id,
        })
      );
      console.log(user);
      // push(`/register?status=${AuthStatus.WAITING_CONFIRMATION}`);
    } catch (error) {
      throw new Error(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <form className="mt-10">
      <div className="required">
        <label htmlFor="email">Corréo electrónico</label>
        <Input type="email" {...register("email")} />
        <span>{errors.email?.message}</span>
      </div>
      <div className="required">
        <label htmlFor="contraseña">Contraseña</label>
        <Input type="password" {...register("contraseña")} />
        <span>{errors.contraseña?.message}</span>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <PromiseButton
          label={"Registrarme"}
          onClickPromise={handleSubmit(sendRegister)}
        />
        <Link href={"login"}>
          <Button className="w-full bg-quaternary h-10">
            Ya tengo una cuenta
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
