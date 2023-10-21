"use client";
import { Card } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import StepHandler from "./stepHandler";
import { useState } from "react";
import StepOne from "./stepOne";
import { Control, FieldValues } from "react-hook-form";

type Step = 1 | 2 | 3;

interface StepProps {
  control: Control<FieldValues, any>;
}

const RegistroForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      instrumento: "",
      genero: "",
      fechaNacimiento: "",
      pais: "",
      ciudad: "",
      descripcion: "",
    },
  });
  const [step, setStep] = useState<Step>(1);

  const renderStep = (step: Step) => {
    switch (step) {
      case 1:
        return <StepOne control={control} />;
      case 2:
        return <StepOne control={control} />;
      case 3:
        return <StepOne control={control} />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 lg:p-8 flex flex-col">
      <h1 className="text-xl lg:text-3xl font-bold">Registrarme como musico</h1>
      <StepHandler step={step} />
      <form action="" className="flex flex-col gap-3">
        {renderStep(step)}
      </form>
    </Card>
  );
};

export default RegistroForm;
