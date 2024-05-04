import { useState, type FC } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { createMusicianType } from "../../types/create";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { socialNetworks } from "../../data/socialNetworks";
import SelectNetwork from "./SelectNetwork";

interface SocialNetworkFieldProps {}

const SocialNetworkField: FC<SocialNetworkFieldProps> = () => {
  const [contactCount, setContactCount] = useState(0);
  return (
    <div className="flex justify-center items-end flex-col gap-2">
      {[...Array(contactCount)].map((_, index) => (
        <div key={index} className="flex gap-4 mt-4 w-full">
          <SelectNetwork />
        </div>
      ))}
      <Button isIconOnly onClick={() => setContactCount(contactCount + 1)}>
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
};

export default SocialNetworkField;
