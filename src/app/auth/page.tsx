export const dynamic = "force-static";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-gradient-to-br from-tertiary to-background flex items-center justify-center p-4 pt-2">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </main>
  );
}
