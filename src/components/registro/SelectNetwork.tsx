import { Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { socialNetworks } from "../../data/socialNetworks";

const SelectNetwork = () => {
  const [value, setValue] = useState<string>();
  return (
    <>
      {value ? (
        <Input
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-600 text-small">{value}</span>
            </div>
          }
        />
      ) : (
        <Select label="Red social" onChange={(e) => setValue(e.target.value)}>
          {socialNetworks.map((network) => (
            <SelectItem key={network.value} value={network.value}>
              {network.label}
            </SelectItem>
          ))}
        </Select>
      )}
    </>
  );
};

export default SelectNetwork;
