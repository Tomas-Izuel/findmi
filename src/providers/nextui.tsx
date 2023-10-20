"use client";
import { NextUIProvider } from "@nextui-org/react";

const NextuiProvider = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextuiProvider;
