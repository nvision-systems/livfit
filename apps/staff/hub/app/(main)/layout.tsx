"use client";

import { Sidebar } from "@livfit/ui";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { userRepository } from "@livfit/lib";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [role, setRole] = useState<string>("staff");

  useEffect(() => {
    const checkSession = async () => {
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
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
