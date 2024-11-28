"use client";

import { BasicInfo, BasicInfoSchema } from "@/edge/auth/register.type";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterForm } from "@/providers/RegisterFormProvider";
import { Register } from "@/edge/auth/register.service";

const BasicInfoStep = () => {
  const { handleChangeStep } = useRegisterForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfo>({
    resolver: zodResolver(BasicInfoSchema),
  });

  const onSubmit = async (data: BasicInfo) => {
    try {
      await Register(data);
      handleChangeStep(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="flex flex-col gap-4 mt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between items-center">
        <h3>Información básica</h3>
        <p>1/3</p>
      </div>
      <div className="flex gap-2">
        <div className="required">
          <label htmlFor="nombre">Nombre</label>
          <Input {...register("nombre")} />
          <span>{errors.nombre?.message && errors.nombre.message}</span>
        </div>
        <div className="required">
          <label htmlFor="apellido">Apellido</label>
          <Input {...register("apellido")} />
          <span>{errors.apellido?.message && errors.apellido.message}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <label htmlFor="apodo">Apodo</label>
          <Input {...register("apodo")} />
        </div>
        <div className="required">
          <label htmlFor="edad">Edad</label>
          <Input type="number" {...register("edad")} />
          <span>{errors.edad?.message && errors.edad.message}</span>
        </div>
      </div>
      <div className="required">
        <label htmlFor="email">Corréo electrónico</label>
        <Input type="email" {...register("email")} />
        <span>{errors.email?.message && errors.email.message}</span>
      </div>
      <div className="required">
        <label htmlFor="contraseña">Contraseña</label>
        <Input type="password" {...register("contraseña")} />
        <span>{errors.contraseña?.message && errors.contraseña.message}</span>
      </div>
      <Button type="submit">Siguiente</Button>
    </form>
  );
};

export default BasicInfoStep;
