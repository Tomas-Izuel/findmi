"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Register } from "@/edge/auth/register.service";
import { RegisterSchema, RegisterType } from "@/edge/auth/register.type";
import FireLogo from "./FireLogo";
import ConfirmationMessage from "./ConfirmMessage";

// Definimos un esquema para el login
const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  contraseña: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function AuthForm() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const router = useRouter();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      contraseña: "",
    },
  });

  const registerForm = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      contraseña: "",
      confirmarContraseña: "",
    },
  });

  const onSubmit = async (data: LoginFormData | RegisterType) => {
    try {
      if (activeTab === "register") {
        await Register(data as RegisterType);
        setIsRegistered(true);
      } else {
        // Aquí iría la lógica de login
        console.log("Login attempt with:", data);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Aquí puedes manejar los errores de la API
    }
  };

  if (isRegistered) {
    return <ConfirmationMessage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background rounded-3xl shadow-xl p-6 md:p-8"
    >
      <FireLogo />
      <h1 className="text-2xl font-bold text-center mb-2 text-secondary">
        Estas a un paso
      </h1>
      <p className="text-center text-lightGray mb-6">
        Unite y encontrá músicos que estan en la misma que vos
      </p>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "login" | "register")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Registro
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="text-gray-400 space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-darkGray">
                Email
              </Label>
              <Input
                id="login-email"
                {...loginForm.register("email")}
                className="border-lightGray/20 focus:border-primary focus:ring-primary"
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-contraseña" className="text-darkGray">
                Contraseña
              </Label>
              <Input
                id="login-contraseña"
                type="password"
                {...loginForm.register("contraseña")}
                className="border-lightGray/20 focus:border-primary focus:ring-primary"
              />
              {loginForm.formState.errors.contraseña && (
                <p className="text-red-500 text-sm mt-1">
                  {loginForm.formState.errors.contraseña.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white transition-colors"
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting
                ? "Cargando..."
                : "Iniciar sesión"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="text-gray-400 space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-darkGray">
                Email
              </Label>
              <Input
                id="register-email"
                {...registerForm.register("email")}
                className="border-lightGray/20 focus:border-primary focus:ring-primary"
              />
              {registerForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-contraseña" className="text-darkGray">
                Contraseña
              </Label>
              <Input
                id="register-contraseña"
                type="password"
                {...registerForm.register("contraseña")}
                className="border-lightGray/20 focus:border-primary focus:ring-primary"
              />
              {registerForm.formState.errors.contraseña && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.contraseña.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-contraseña" className="text-darkGray">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirm-contraseña"
                type="password"
                {...registerForm.register("confirmarContraseña")}
                className="border-lightGray/20 focus:border-primary focus:ring-primary"
              />
              {registerForm.formState.errors.confirmarContraseña && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.confirmarContraseña.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white transition-colors"
              disabled={registerForm.formState.isSubmitting}
            >
              {registerForm.formState.isSubmitting
                ? "Cargando..."
                : "Registrarse"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
