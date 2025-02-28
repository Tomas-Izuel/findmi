import { AuthTab } from "@/components/tabs/auth-tab";
import Image from "next/image";

function AuthPage() {
  return (
    <main className="relative p-6 w-full h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 -z-40" />
      <Image
        src="/login-images/login-background-image.jpeg"
        alt="Logo"
        fill
        sizes="100vw"
        className="-z-50 object-cover xl:object-top"
      />
      <AuthTab />
    </main>
  );
}

export default AuthPage;
