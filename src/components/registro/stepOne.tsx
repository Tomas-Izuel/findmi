import { Button, Input, Textarea } from "@nextui-org/react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface StepOneProps {
  control: Control<any>;
}

const StepOne = ({ control }: StepOneProps) => {
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
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
        name={"nombre"}
        control={control}
        rules={{ required: true }}
      />
      <Textarea label="Descripción" />
      <h3 className="mt-4">
        Contacto{" "}
        <span className="text-xs font-light">(debes completar al menos 1)</span>
      </h3>
      <Input label="Email" />
      <Input label="Telefono" />
      <Input label="Instagram" />
      <Button color="primary" className="text-xl p-7 font-semibold mt-8">
        Continuar
      </Button>
    </>
  );
};

export default StepOne;
