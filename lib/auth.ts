import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3001",
    // IPs locales comunes para testing en móvil
    ...(process.env.NODE_ENV === "development"
      ? ([
          "http://192.168.54.155:3000",
          "http://192.168.0.1:3001",
          "http://192.168.1.1:3000",
          "http://192.168.1.1:3001",
          // Agregar tu IP local específica en .env como MOBILE_TEST_URL si es necesario
          process.env.MOBILE_TEST_URL,
        ].filter(Boolean) as string[])
      : []),
  ],
});

export type Session = typeof auth.$Infer.Session;
