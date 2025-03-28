import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/toastProvider";
import {HeroUIProvider} from "@heroui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OYBS Admin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <HeroUIProvider>
        <ToastProvider>
          {children}
        </ToastProvider>  
      </HeroUIProvider>
        </body>
    </html>
  );
}
