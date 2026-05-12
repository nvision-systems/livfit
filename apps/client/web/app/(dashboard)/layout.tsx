"use client";

import { Sidebar } from "@livfit/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [role, setRole] = useState<string>("PATIENT");

  useEffect(() => {
    const checkSession = async () => {
      const { userRepository } = await import("@livfit/lib");
      const profile = await userRepository.getCurrentProfile();
      if (profile?.role) {
        setRole(profile.role);
      }
    };
    checkSession();
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar role={role} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
