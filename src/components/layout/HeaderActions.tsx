import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const HeaderActions = () => {
  const [showSearch, setshowSearch] = useState<boolean>(false);

  const handleSearch = () => {
    setshowSearch(!showSearch);
  };
  return <div className="flex justify-between"></div>;
};

export default HeaderActions;
