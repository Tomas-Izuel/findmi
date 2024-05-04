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
import { createMusicianSchema } from "../../schemas/create";
import { useState } from "react";

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [contactCount, setContactCount] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createMusicianType>();

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-section-style">
            {" "}
            <h2>Información básica</h2>
            <Input
              label="Nombre"
              type="text"
              required={true}
              isInvalid={errors.name ? true : false}
              errorMessage={errors.name?.message || ""}
              {...register("name", { required: true, maxLength: 50 })}
            />
            <Input
              label="Apodo"
              type="text"
              isInvalid={errors.nickname ? true : false}
              errorMessage={errors.nickname?.message || ""}
              {...register("nickname", { maxLength: 50 })}
            />
            <Input
              label="Edad"
              type="number"
              required
              isInvalid={errors.age ? true : false}
              errorMessage={errors.age?.message || ""}
              {...register("age", {
                required: true,
                maxLength: 2,
                min: 5,
                max: 99,
              })}
            />
            <Input
              label="Contraseña"
              type="password"
              required
              isInvalid={errors.password ? true : false}
              errorMessage={errors.password?.message || ""}
              {...register("password", { required: true })}
            />
            {Array(contactCount).map((_, index) => (
              <div key={index}>
                <Select label="Red social">
                  <SelectItem key={"daas"} value="facebook">
                    Facebook
                  </SelectItem>
                </Select>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="form-section-style">
            <Textarea
              label="Sobre mi"
              placeholder="Cuenta un poco sobre ti, esto ayudará a otros músicos a conocerte mejor"
              required
              isInvalid={errors.about ? true : false}
              errorMessage={errors.about?.message || ""}
              {...register("about", { required: true })}
            />
            <Divider />
            <h3>¿Como pueden contactarte?</h3>
            <p className="text-sm text-gray-400">
              Debes agregar al menos un contacto
            </p>
            <Button isIconOnly>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
          </div>
        );
    }
  };

  return (
    <form className="w-full p-4 py-10 border-1 rounded-xl shadow-lg relative">
      <div className="absolute w-14 h-14 bg-findmi-secondary text-white -top-7 right-1/2 translate-x-1/2 rounded-full flex justify-center items-center">
        {step}
      </div>
      {renderStepForm()}
      <Button
        className="px-2 py-5 w-full mt-8"
        onClick={() => {
          if (step !== 3) {
            setStep(step + 1);
          }
        }}
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
    </form>
  );
};

export default RegisterForm;
