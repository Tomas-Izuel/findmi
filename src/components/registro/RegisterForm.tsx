import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import type { createMusicianType } from "../../types/create";
import { useState } from "react";
import StepForm from "./StepForm";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(2);
  const [storedData, setStoredData] = useState({} as createMusicianType);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createMusicianType>();

  const handleSubmitFormByStep = (data: createMusicianType) => {
    switch (step) {
      case 1:
        setStep(2);
        setStoredData({ ...storedData, ...data });
        break;
      case 2:
        setStep(3);
        break;
    }
  };

  return (
    <motion.form
      animate="visible"
      className="w-full p-4 py-10 border-1 rounded-xl shadow-lg relative bg-white"
    >
      <div className="absolute w-14 h-14 bg-findmi-secondary text-white -top-7 right-1/2 translate-x-1/2 rounded-full flex justify-center items-center">
        {step}
      </div>
      <StepForm step={step} errors={errors} register={register} />
      <Button
        className="px-2 py-5 w-full mt-8"
        onClick={handleSubmit(handleSubmitFormByStep)}
      >
        Siguiente paso
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Button>
    </motion.form>
  );
};

export default RegisterForm;
