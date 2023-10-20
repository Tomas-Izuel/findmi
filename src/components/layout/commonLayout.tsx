import { Button } from "@nextui-org/react";
import { BiAddToQueue, BiHome, BiSearchAlt } from "react-icons/bi";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="w-full bg-gray-100 rounded-xl px-8 py-4 flex justify-between items-center">
      <Button color="primary" variant="ghost" className="">
        <BiHome className="w-6 h-6" />
      </Button>
      <Button color="primary" variant="ghost" className="">
        <BiAddToQueue className="w-6 h-6" />
      </Button>
      <Button color="primary" variant="ghost" className="">
        <BiSearchAlt className="w-6 h-6" />
      </Button>
    </header>
  );
};

export default CommonLayout;
