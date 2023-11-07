"use client";
import { Card } from "@nextui-org/react";
import { set, useForm } from "react-hook-form";
import StepHandler from "./stepHandler";
import { useState } from "react";
import StepOne from "./stepOne";
import { Control, FieldValues } from "react-hook-form";
import { Instrumento, Musico } from "@/types/musico";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import { addMusico } from "@/api/api";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Step = 1 | 2 | 3;

interface RegistroFormProps {
  instrumentos: Instrumento[];
}

const RegistroForm = ({ instrumentos }: RegistroFormProps) => {
  const supabase = createClientComponentClient();
  const { control, handleSubmit } = useForm({});
  const [step, setStep] = useState<Step>(1);
  const [isContact, setIsContact] = useState<boolean | undefined>(undefined);
  const [musico, setMusico] = useState<Musico>();
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  const renderStep = (step: Step) => {
    switch (step) {
      case 1:
        return <StepOne control={control} isContact={isContact} />;
      case 2:
        return <StepTwo control={control} instrumentos={instrumentos} />;
      case 3:
        return <StepThree setFile={setFile} />;
      default:
        return null;
    }
  };

  const handleNext = (data: any) => {
    switch (step) {
      case 1:
        checkStep1(data);
        break;
      case 2:
        checkStep2(data);
        break;
      case 3:
        checkStep3(data);
        break;
      default:
        break;
    }
  };

  const checkStep1 = (data: any) => {
    data.telefono = parseInt(data.telefono);
    if (data.email || data.telefono || data.instagram) {
      setIsContact(true);
      setMusico(data);
      setStep(2);
    } else {
      setIsContact(false);
    }
  };

  const checkStep2 = (data: any) => {
    data.instrumento_id = parseInt(data.instrumento_id);
    const instrumento_nombre = instrumentos.find(
      (instrumento) => instrumento.id === data.instrumento_id
    )?.nombre;
    data.instrumento_nombre = instrumento_nombre;
    setMusico({ ...musico, ...data });
    setStep(3);
  };

  const checkStep3 = async (data: any) => {
    try {
      const image = await uploadImage(file!);
      data.image = image;
      setMusico({ ...musico, ...data });
    } catch (error) {}
    handleSubmitMusico({ ...musico });
  };

  const handleSubmitMusico = async (data: any) => {
    setIsLoading(true);
    try {
      await supabase.from("musico").insert(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    const { data, error } = await supabase.storage
      .from("imagenes")
      .upload("public/avatar1.png", file);

    return data;
  };

  return (
    <Card className="p-4 lg:p-8 flex flex-col">
      <h1 className="text-xl lg:text-3xl font-bold">Registrarme como musico</h1>
      <StepHandler step={step} />
      <form onSubmit={handleSubmit(handleNext)} className="flex flex-col gap-3">
        {renderStep(step)}
      </form>
    </Card>
  );
};

export default RegistroForm;
