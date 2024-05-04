import {
  Input,
  Textarea,
  Divider,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { type FC } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { createMusicianType } from "../../types/create";
import SocialNetworkField from "./SocialNetworkField";

interface StepFormProps {
  step: 1 | 2 | 3 | 4;
  errors: FieldErrors<createMusicianType>;
  register: UseFormRegister<createMusicianType>;
}

const StepForm: FC<StepFormProps> = ({ step, errors, register }) => {
  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-section-style">
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
          </div>
        );
      case 2:
        return (
          <div className="form-section-style">
            <Textarea
              label="Sobre mi"
              placeholder="Cuenta un poco sobre ti. No coloques experiencia e instrumentos que tocas, eso lo haremos en el siguiente paso"
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
            <SocialNetworkField />
          </div>
        );
    }
  };
  return <>{renderStepForm()}</>;
};

export default StepForm;
