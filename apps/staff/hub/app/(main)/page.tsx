"use client"

import { 
  ShieldCheck, UserCog, ExternalLink, 
  Activity, Users, ShieldAlert, HeartPulse,
  Stethoscope, LayoutDashboard, ChevronRight,
  BookOpen, PencilLine
} from "lucide-react";
import { useEffect, useState } from "react";
import { login, userRepository } from "@livfit/lib";
import { useRouter } from "next/navigation";

export default function StaffHubLandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const profile = await userRepository.getCurrentProfile();
      if (profile?.role) {
        const role = profile.role.toUpperCase();
        const clinicalRoles = ['HEPATOLOGIST', 'TRANSPLANT_COORDINATOR', 'GASTROENTEROLOGIST', 'SURGEON', 'DOCTOR', 'SPECIALIST'];
        
        if (role === 'ADMIN' || role === 'SUPERADMIN') {
          router.push('/admin/assignments');
        } else if (role === 'DIETICIAN') {
          router.push('/dietician');
        } else if (role === 'HEALTH_EDUCATOR') {
          router.push('/content/blogs');
        } else if (clinicalRoles.includes(role)) {
          router.push('/external');
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const handleMockLogin = async (email: string, target: string) => {
    setLoading(true);
    try {
      await login(email, "password");
      window.location.href = target;
    } catch (error) {
      console.error("Login failed", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Establishing Secure Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-4">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-widest">Unified Professional Gateway</span>
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Professional <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Workspace</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Select your professional role to access the LivFit clinical management environment.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Admin Workspace */}
          <div className="group cursor-pointer" onClick={() => handleMockLogin("admin@livfit.app", "/admin/assignments")}>
            <div className="h-full p-8 rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <UserCog className="h-40 w-40" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Platform Admin</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    System-wide oversight, user management, and clinical assignment mapping.
                  </p>
                </div>
                <div className="flex items-center text-blue-600 font-black text-[10px] uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter Admin Console <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Dietician Workspace */}
          <div className="group cursor-pointer" onClick={() => handleMockLogin("sarah@livfit.app", "/dietician")}>
            <div className="h-full p-8 rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <Activity className="h-40 w-40" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <HeartPulse className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Dietician Portal</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    Nutritional prehab monitoring, protocol design, and candidate compliance tracking.
                  </p>
                </div>
                <div className="flex items-center text-emerald-600 font-black text-[10px] uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter Clinical Portal <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Creator Workspace */}
          <div className="group cursor-pointer" onClick={() => handleMockLogin("jane@livfit.app", "/content/blogs")}>
            <div className="h-full p-8 rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-purple-900/5 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <BookOpen className="h-40 w-40" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="h-14 w-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                  <PencilLine className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Health Educator</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    Patient literacy management, blog publishing, and educational module design.
                  </p>
                </div>
                <div className="flex items-center text-purple-600 font-black text-[10px] uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter Content Hub <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>

          {/* External / Specialist Workspace */}
          <div className="group cursor-pointer" onClick={() => handleMockLogin("alice@livercenter.org", "/external")}>
            <div className="h-full p-8 rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-orange-900/5 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <Stethoscope className="h-40 w-40" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="h-14 w-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-200">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Specialist Hub</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    External specialist access for surgical readiness and referral management.
                  </p>
                </div>
                <div className="flex items-center text-orange-600 font-black text-[10px] uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter Partner Portal <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col items-center gap-6 pt-12 border-t border-slate-200">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Multi-Tenant Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Grade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit Ready</span>
            </div>
          </div>
          <p className="text-[10px] font-medium text-slate-400 text-center max-w-md">
            Developer Notice: This gateway uses session-mocking for rapid environment validation. Production deployments will enforce SAML/SSO.
          </p>
        </div>
      </div>
    </div>
  );
}
