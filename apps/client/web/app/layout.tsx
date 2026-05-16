import type { Metadata } from "next";
import { Rajdhani, DM_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const fontMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "LivFit Patient Portal",
  description: "Monitor your health, diet, and progress",
};

import { Toaster } from "@livfit/ui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased min-h-screen bg-slate-50/50 font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
