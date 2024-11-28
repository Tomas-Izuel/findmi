import { RegisterFormProvider } from "@/providers/RegisterFormProvider";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RegisterFormProvider>{children}</RegisterFormProvider>;
}
