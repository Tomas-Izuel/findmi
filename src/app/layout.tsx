import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextUIProv from "@/providers/NextUIProv";
import Nav from "@/components/common/Nav";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "FindMi",
  description: "Find your missing musician to complete your band",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <NextUIProv>
          <div className="fullBody">
            <Nav />
            {children}
          </div>
        </NextUIProv>
      </body>
    </html>
  );
}
