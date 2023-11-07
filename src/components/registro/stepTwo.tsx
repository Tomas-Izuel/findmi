import { Instrumento } from "@/types/musico";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface StepTwoProps {
  control: Control<any>;
  instrumentos: Instrumento[];
}

const StepTwo = ({ control, instrumentos }: StepTwoProps) => {
  console.log(instrumentos);
  return (
    <>
      <div className="flex flex-col gap-3">
        <h3>Sobre música</h3>
        <Controller
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { invalid, error },
          }) => (
            <Select
              label="Instrumento"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              isInvalid={invalid}
              errorMessage={error?.message}
            >
              {instrumentos.map((instrumento) => (
                <SelectItem
                  key={instrumento.id}
                  value={instrumento.id}
                  className="text-black"
                >
                  {instrumento.nombre}
                </SelectItem>
              ))}
            </Select>
          )}
          name={"instrumento_id"}
          control={control}
          rules={{ required: true }}
        />
        <Controller
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { invalid, error },
          }) => (
            <Textarea
              label="Experiencia (opcional)"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              placeholder="Bandas en las que estuviste, eventos a los que asististe, etc..."
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
          name={"experiencia"}
          control={control}
        />
        <Controller
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { invalid, error },
          }) => (
            <Input
              label="Años tocando"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              type="number"
              isInvalid={invalid}
              errorMessage={error?.message}
              placeholder="-1 si es menor a 1 año, 0 sin experiencia"
            />
          )}
          name={"tiempo"}
          control={control}
          rules={{ required: true, min: -1, max: 50 }}
        />
      </div>
      <Button
        color="primary"
        className="text-xl p-7 font-semibold mt-8 bottom-5"
        type="submit"
      >
        Continuar
      </Button>
    </>
  );
};

export default StepTwo;
