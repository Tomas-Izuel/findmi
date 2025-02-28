"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { LoginForm } from "../form/login-form";
import { RegisterForm } from "../form/register-form";
import { buttonVariants } from "../ui/button";
import { Title } from "../ui/title";

enum AuthTabs {
  REGISTER = "register",
  LOGIN = "login",
}

function AuthTab() {
  const [selectedTab, setSelectedTab] = useState<AuthTabs>(AuthTabs.REGISTER);
  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => setSelectedTab(value as AuthTabs)}
      defaultValue={AuthTabs.REGISTER}
      className="flex p-3.5 rounded-2xl min-[400px]:py-10 min-[400px]:px-6 flex-col items-center justify-center gap-10 backdrop-blur-lg max-w-96"
    >
      <Title
        headingLevel="h1"
        title="Estas a un paso de encontrar a tu siguiente grupo"
        className="font-bold text-Therciary_color text-xl min-[400px]:text-2xl text-center"
      />
      <TabsList className="bg-transparent flex gap-2.5 h-auto">
        <TabsTrigger
          className={buttonVariants({
            variant: "outline",
            className: "min-[400px]:w-40",
          })}
          value={AuthTabs.REGISTER}
        >
          Registro
        </TabsTrigger>
        <TabsTrigger
          className={buttonVariants({
            variant: "outline",
            className: "min-[400px]:w-40",
          })}
          value={AuthTabs.LOGIN}
        >
          Inicio de sesión
        </TabsTrigger>
      </TabsList>
      <TabsContent value={AuthTabs.REGISTER}>
        <RegisterForm />
      </TabsContent>
      <TabsContent value={AuthTabs.LOGIN}>
        <LoginForm />
      </TabsContent>
    </Tabs>
  );
}

export { AuthTab };
