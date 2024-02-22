"use client";

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import "../styles/globals.css";

import Nav from "@/components/Nav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}

//https://rozliczenia.vercel.app/
