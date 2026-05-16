"use client";

import { Sidebar, Footer, cn } from "@livfit/ui";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { userRepository } from "@livfit/lib";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string>("staff");
  const [loading, setLoading] = useState(true);
  const isLandingPage = pathname === "/";

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("MainLayout: [AUTH_CHECK] Path:", pathname);
        const profile = await userRepository.getCurrentProfile();
        
        if (profile) {
          const normalizedRole = profile.role.toUpperCase();
          console.log("MainLayout: [AUTH_SUCCESS] Profile found:", {
            id: profile.id,
            role: normalizedRole,
            email: profile.email
          });
          setRole(normalizedRole);
          setLoading(false);
        } else {
          console.error("MainLayout: [AUTH_FAIL] No profile found in localStorage.");
          // In Demo Mode, we don't redirect, we just show the page with a warning
          setLoading(false);
        }
      } catch (error) {
        console.error("MainLayout: [AUTH_ERROR] Exception during check:", error);
        setLoading(false);
      }
    };
    checkSession();
  }, [router, pathname]);

  if (loading && !isLandingPage) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="h-12 w-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Syncing Session...</p>
      </div>
    );
  }

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className={cn(
      "bg-slate-50/50", 
      !isLandingPage ? "h-screen flex overflow-hidden" : "min-h-screen"
    )}>
      {!isLandingPage && <Sidebar role={role} onLogout={handleLogout} />}
      <main className={cn(
        "flex-1 flex flex-col", 
        !isLandingPage ? "p-8 pb-0 overflow-y-auto" : "p-0"
      )}>
        <div className={cn("flex-1", !isLandingPage ? "mx-auto max-w-7xl w-full" : "max-w-none")}>
          {children}
        </div>
        {!isLandingPage && <Footer variant="transparent" className="border-slate-200/50 mt-8" />}
      </main>
    </div>
  );
}
