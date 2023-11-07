import { Button, Input, Textarea } from "@nextui-org/react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface StepOneProps {
  control: Control<any>;
  isContact: boolean | undefined;
}

const StepOne = ({ control, isContact }: StepOneProps) => {
  return (
    <>
      <h3>Información personal</h3>
      <Controller
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            label="Nombre/Apodo"
            value={value}
            isRequired
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
        name={"nombre"}
        control={control}
        rules={{ required: true }}
      />
      <Controller
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { invalid, error },
        }) => (
          <Textarea
            label="Descripción"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            isRequired
            placeholder="Aqui puedes poner informacion relevante sobre ti como edad, gustos musicales, a que te dedicas, etc..."
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
        name={"descripcion"}
        control={control}
        rules={{ required: true }}
      />
      <h3 className="mt-4">
        Contacto{" "}
        <span
          className={`text-xs font-light ${
            isContact === false && "text-red-500"
          }`}
        >
          (debes completar al menos 1)
        </span>
      </h3>
      <Controller
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            label="Email"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
        name={"email"}
        control={control}
      />
      <Controller
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            label="Telefono"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            type="number"
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
        name={"telefono"}
        control={control}
        rules={{ minLength: 10, maxLength: 10 }}
      />
      <Controller
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            label="Instagram"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
        name={"instagram"}
        control={control}
      />
      <Button
        color="primary"
        className="text-xl p-7 font-semibold mt-8"
        type="submit"
      >
        Continuar
      </Button>
    </>
  );
};

export default StepOne;
