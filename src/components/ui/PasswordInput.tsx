"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function PasswordInput({
  id,
  placeholder = "Enter password",
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative bg-white  rounded-md text-gray-600">
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        className="pr-10"
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}

export default PasswordInput;
