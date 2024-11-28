"use client";
import { useRegisterForm } from "@/providers/RegisterFormProvider";
import BasicInfo from "./BasicInfo";
import InstrumentProfile from "./InstrumentProfile";

const StepFormWrapper = () => {
  const { step } = useRegisterForm();

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return <BasicInfo />;
      case 1:
        return <InstrumentProfile />;
    }
  };
  return renderCurrentStep();
};

export default StepFormWrapper;
