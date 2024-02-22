"use client";

import { Inter as FontSans } from "next/font/google";
import { initThinBackend } from "thin-backend";
import { ThinBackend } from "thin-backend-react";

import { cn } from "@/lib/utils";
import "../styles/globals.css";

import Nav from "@/components/Nav";

initThinBackend({ host: process.env.NEXT_PUBLIC_BACKEND_URL });

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
    <ThinBackend>
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
    </ThinBackend>
  );
}

//https://rozliczenia.vercel.app/
