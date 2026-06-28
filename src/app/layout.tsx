import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = localFont({
  src: [
    {
      path: "../../public/fonts/geist-latin-ext.woff2",
      weight: "100 900",
    },
    {
      path: "../../public/fonts/geist-latin.woff2",
      weight: "100 900",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Musion Post — AI Label Manager",
  description:
    "Your AI-powered label manager: strategy, promotion, and growth—automated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex h-full bg-zinc-50 text-zinc-900">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
