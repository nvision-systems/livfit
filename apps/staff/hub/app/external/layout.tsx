import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LivFit External Template",
  description: "Standard layout for external staff applications",
};

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50/50`}>
        <main className="p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
