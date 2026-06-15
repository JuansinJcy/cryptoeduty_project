import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto E-Duty | Educación Cripto Open Source",
  description:
    "Plataforma educativa open source sobre criptomonedas con wallet ficticia para aprendizaje seguro. 10 módulos, 4 niveles, desde cero hasta experto.",
  keywords: [
    "criptomonedas",
    "educación",
    "blockchain",
    "bitcoin",
    "ethereum",
    "wallet",
    "DeFi",
    "NFT",
    "open source",
    "Crypto E-Duty",
  ],
  authors: [{ name: "Juan Carlos Yépez Kepp" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Crypto E-Duty | Educación Cripto Open Source",
    description:
      "Aprende sobre criptomonedas desde cero. Plataforma educativa con 10 módulos y wallet de práctica.",
    siteName: "Crypto E-Duty",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto E-Duty | Educación Cripto Open Source",
    description:
      "Aprende sobre criptomonedas desde cero. 10 módulos, 4 niveles, wallet educativa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
