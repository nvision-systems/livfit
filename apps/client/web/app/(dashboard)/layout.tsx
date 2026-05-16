"use client";

import { Sidebar, Footer } from "@livfit/ui";
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
      } else {
        router.replace("/login");
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
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        <Footer variant="transparent" className="border-slate-200/50" />
      </main>
    </div>
  );
}
