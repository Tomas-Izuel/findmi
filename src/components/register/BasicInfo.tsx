"use client";

import { BasicInfo, BasicInfoSchema } from "@/edge/auth/register.type";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Register } from "@/edge/auth/register.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PromiseButton from "../ui/promise-button";

const BasicInfoStep = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfo>({
    resolver: zodResolver(BasicInfoSchema),
  });

  const onSubmit = async (data: BasicInfo) => {
    try {
      await Register(data);
    } catch (error) {
      console.log(error);
      throw error;
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
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          <span>{errors.nombre?.message}</span>
        </div>
        <div className="required">
          <label htmlFor="apellido">Apellido</label>
          <Controller
            name="apellido"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          <span>{errors.apellido?.message}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <label htmlFor="apodo">Apodo</label>
          <Controller
            name="apodo"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className="required">
          <label htmlFor="edad">Edad</label>
          <Controller
            name="edad"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            )}
          />
          <span>{errors.edad?.message}</span>
        </div>
      </div>
      <div className="required">
        <label htmlFor="email">Corréo electrónico</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input type="email" {...field} />}
        />
        <span>{errors.email?.message}</span>
      </div>
      <div className="flex gap-2">
        <div className="required">
          <label htmlFor="provincia">Provincia</label>
          <Controller
            name="provincia"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mendoza">Mendoza</SelectItem>
                  <SelectItem value="Neuquen">Neuquen</SelectItem>
                  <SelectItem value="Buenos_Aires">Buenos aires</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <span>{errors.provincia?.message}</span>
        </div>
        <div className="required">
          <label htmlFor="contraseña">Contraseña</label>
          <Controller
            name="contraseña"
            control={control}
            render={({ field }) => <Input type="password" {...field} />}
          />
          <span>{errors.contraseña?.message}</span>
        </div>
      </div>
      <PromiseButton
        label="Siguiente paso"
        onClickPromise={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default BasicInfoStep;
