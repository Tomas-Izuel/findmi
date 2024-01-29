"use client";
import { NextUIProvider } from "@nextui-org/react";

const NextUIProv = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUIProv;
