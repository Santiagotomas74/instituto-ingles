import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I.N.K Instituto de Inglés | Inglés en San Miguel",
  description:
    "I.N.K Instituto de Inglés es tu destino para aprender inglés en San Miguel. Ofrecemos cursos regulares, intensivos, para profesionales y apoyo escolar, con exámenes en sede propia. ¡Únete a nuestra comunidad de aprendizaje hoy mismo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
