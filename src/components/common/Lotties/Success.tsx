"use client";
import React, { FC } from "react";

import Lottie from "react-lottie-player";

import success from "../../../../public/assets/success.json";
import { cn } from "@/lib/utils";

interface SuccessProps {
  className?: string;
}

const Success: FC<SuccessProps> = ({ className }) => {
  return (
    <div className={cn("w-32 h-32", className)}>
      <Lottie loop={false} animationData={success} play />
    </div>
  );
};

export default Success;
