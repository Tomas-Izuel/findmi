"use client";
import React, { FC } from "react";

import Lottie from "react-lottie-player";

import sending from "../../../../public/assets/sending.json";
import { cn } from "@/lib/utils";

interface SendingProps {
  className?: string;
}

const Sending: FC<SendingProps> = ({ className }) => {
  return (
    <div className={cn("w-32 h-32", className)}>
      <Lottie
        loop={false}
        animationData={sending}
        play
        className="w-full h-full"
      />
    </div>
  );
};

export default Sending;
