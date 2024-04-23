import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const HeaderActions = () => {
  const [showSearch, setshowSearch] = useState<boolean>(false);

  const handleSearch = () => {
    setshowSearch(!showSearch);
  };
  return (
    <div className="flex gap-5">
      <div className="flex justify-end">
        <div
          className={`pr-10 bg-white border-1 border-findmi-primary translate-x-10 rounded-full overflow-hidden ${
            showSearch ? "expand-in" : "hidden"
          }`}
        >
          {showSearch && (
            <Input
              placeholder="Buscar músico"
              className="transition-in h-10 bg-white"
            />
          )}
        </div>
        <Button
          isIconOnly
          radius="full"
          className={`bg-findmi-primary text-white w-10 h-10 ${
            showSearch && "rotate-[360deg]"
          }`}
          onClick={handleSearch}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            ></path>
          </svg>
        </Button>
      </div>
      <Button
        isIconOnly
        radius="full"
        className="bg-findmi-primary text-white w-10 h-10"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          ></path>
        </svg>
      </Button>
    </div>
  );
};

export default HeaderActions;
