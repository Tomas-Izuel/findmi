"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { registerSchema, RegisterSchema } from "@/schema/auth-schema";

import { signup } from "../actions/auth/action";

import { Input } from "../ui/input";
import PasswordInput from "../ui/PasswordInput";

function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      passwordForm: {
        password: "",
        confirm: "",
      },
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDirty = form.formState.isDirty;

  async function onSubmit(values: RegisterSchema) {
    try {
      const response = await signup(values);
      console.log(response);

      if (response?.error) return toast.error(response.error as string);

      toast.success(
        "Usuario creado correctamente, Por favor verifica tu correo",
      );
    } catch {
      toast.error("Error al obtener credenciales");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-full text-Therciary_color"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="bg-white" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordForm.password"
          render={({ field }) => (
            <FormItem className="grid">
              <FormControl>
                <PasswordInput
                  onChange={field.onChange}
                  id="password"
                  placeholder="Contraseña"
                />
              </FormControl>
              <p className="text-[8px]">
                La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1
                numero
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordForm.confirm"
          render={({ field }) => (
            <FormItem className="grid">
              <FormControl>
                <PasswordInput
                  onChange={field.onChange}
                  id="confirm"
                  placeholder="Confirmar contraseña"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-2 text-black w-full bg-button-quaternary"
          type="submit"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? (
            <Loader2Icon className="animate-spin" size={20} />
          ) : (
            "Continuar"
          )}
        </Button>
      </form>
    </Form>
  );
}

export { RegisterForm };
