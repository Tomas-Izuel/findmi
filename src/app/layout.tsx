import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navigation/Navbar";
import DesktopNavbar from "@/components/common/navigation/DesktopNavbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FindMi - Encuentra Músicos Talentosos",
  description:
    "Conecta con músicos talentosos y encuentra al miembro perfecto para tu banda. Únete a la comunidad musical de FindMi.",
  keywords:
    "músicos, banda, talento, música, encontrar músicos, comunidad musical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <DesktopNavbar />
        <Navbar />
      </body>
    </html>
  );
}
