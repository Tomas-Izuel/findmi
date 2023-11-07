import { Button } from "@nextui-org/react";
import { BiCloudUpload } from "react-icons/bi";

interface StepThreeProps {
  setFile: (file: File) => void;
}

const StepThree = ({ setFile }: StepThreeProps) => {
  return (
    <>
      <p>Sube una imagen (opcional)</p>
      <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md">
        <input
          id="file-upload"
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
          className="opacity-0 w-full h-full"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
            }
          }}
        />
        <BiCloudUpload className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2" />
      </div>

      <Button
        color="secondary"
        className="text-xl p-7 font-semibold mt-8"
        type="submit"
      >
        Crear
      </Button>
    </>
  );
};

export default StepThree;
