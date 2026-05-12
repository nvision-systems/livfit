"use client";

import { Sidebar } from "@livfit/ui";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    // Logic for logout
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar role="patient" onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
