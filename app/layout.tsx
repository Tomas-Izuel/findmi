import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Findmi - Encontrá músicos para tu banda",
  description:
    "La plataforma para conectar músicos. Buscá guitarristas, bajistas, bateristas y más para tu proyecto musical.",
  keywords: ["músicos", "banda", "guitarrista", "bajista", "baterista", "música"],
  authors: [{ name: "Findmi" }],
  openGraph: {
    title: "Findmi - Encontrá músicos para tu banda",
    description: "La plataforma para conectar músicos.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f1510",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
