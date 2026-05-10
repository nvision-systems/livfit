import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { DieticianSidebar } from "../components/DieticianSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LivFit Dietician Portal",
  description: "Clinical nutrition and patient management",
};

export default function DieticianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50/50`}>
        <div className="flex min-h-screen">
          <DieticianSidebar />
          <main className="flex-1 p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
