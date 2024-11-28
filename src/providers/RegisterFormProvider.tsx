"use client";
import { BasicInfo } from "@/edge/auth/register.type";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface RegisterFormContextType {
  step: number;
  handleChangeStep: (data: BasicInfo) => void;
}

export interface RegisterFormContextProps {
  initialStep?: number;
}

export const RegisterFormContext =
  createContext<RegisterFormContextType | null>(null);

export const RegisterFormProvider: FC<
  PropsWithChildren<RegisterFormContextProps>
> = ({ children, initialStep }) => {
  const [step, setStep] = useState(initialStep || 0);
  const [formData, setFormData] = useState<{
    basicInfo: BasicInfo;
  }>();

  const handleChangeStep = (data: BasicInfo) => {
    setFormData({
      basicInfo: data,
    });
    setStep((prev) => prev + 1);
  };
  return (
    <RegisterFormContext.Provider
      value={{
        step,
        handleChangeStep,
      }}
    >
      {children}
    </RegisterFormContext.Provider>
  );
};

export const useRegisterForm = () => {
  const context = useContext(RegisterFormContext);
  if (!context) {
    throw new Error(
      "useRegisterForm must be used within a RegisterFormProvider"
    );
  }
  return context;
};
