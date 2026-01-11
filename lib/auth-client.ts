import { createAuthClient } from "better-auth/react";

// En desarrollo, usar la URL del navegador actual para soportar acceso desde móvil
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signOut, signUp, useSession, getSession } = authClient;
