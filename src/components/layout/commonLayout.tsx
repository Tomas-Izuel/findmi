import { Button } from "@nextui-org/react";
import { BiAddToQueue, BiHome, BiSearchAlt } from "react-icons/bi";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="w-full bg-primary px-8 py-4 flex justify-between items-center z-20">
      <Button color="primary" className=" ">
        <BiHome className="w-6 h-6" />
      </Button>
      <Button color="primary" className=" ">
        <BiAddToQueue className="w-6 h-6" />
      </Button>
      <Button color="primary" className=" ">
        <BiSearchAlt className="w-6 h-6" />
      </Button>
    </header>
  );
};

export default CommonLayout;
