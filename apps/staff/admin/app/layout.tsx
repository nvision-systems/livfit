import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LivFit Admin Console",
  description: "Healthcare monitoring and management platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50/50`}>
        <div className="flex min-h-screen">
          <Sidebar />
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