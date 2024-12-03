import AuthForm from "@/components/register/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-tertiary to-background flex items-start justify-center p-4 pt-2">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </main>
  );
}
