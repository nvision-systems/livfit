"use client";

import { LoginForm, Footer, toast } from "@livfit/ui";
import { 
  ShieldCheck, Activity, Users, ArrowRight, LayoutDashboard,
  Stethoscope, HeartPulse
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@livfit/lib";

export default function StaffLoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Branding & Storytelling (Professional Variant) */}
        <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-slate-900 via-slate-800 to-blue-950 p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">LIVFIT <span className="text-blue-500">HUB</span></span>
            </div>
            
            <h1 className="text-5xl font-black leading-tight mb-6">
              The <span className="text-blue-400">Clinical Gateway</span> for Liver Transplant Prehab.
            </h1>
            <p className="text-xl text-slate-300 font-medium max-w-lg">
              Manage patient protocols, monitor compliance, and coordinate care across multidisciplinary teams.
            </p>

            <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-md">
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-2">Clinical Mission</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                LivFit HUB serves as the centralized command center for <strong>Pre-Transplant Readiness</strong>. Our goal is to reduce surgical risk by ensuring every candidate meets physiological and nutritional benchmarks before entering the OR.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-blue-400" />
                <span className="font-bold">Protocol Driven</span>
              </div>
              <p className="text-sm text-slate-400">Standardized clinical workflows for consistent prehab outcomes.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="font-bold">Care Coordination</span>
              </div>
              <p className="text-sm text-slate-400">Seamless communication between dieticians, specialists, and coordinators.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/30">
          <div className="w-full max-w-md">
            <div className="md:hidden flex items-center gap-2 mb-12 justify-center">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <span className="text-2xl font-black tracking-tighter text-slate-900">LIVFIT HUB</span>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Professional Access</h2>
              <div className="flex flex-col gap-4">
                <p className="text-slate-500 font-medium italic text-sm">
                  * Note: Authentication is not yet implemented. Please use the persona-based rapid access buttons below.
                </p>
              </div>
            </div>

            <LoginForm onSuccessRedirect="/home" type="staff" allowSignup={false} />

            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">LIVFIT RAPID ACCESS</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={async () => {
                      const toastId = toast.loading("Accessing Platform Governance...");
                      try {
                        await login("super@livfit.app", "password");
                        toast.success("Authorized: Platform Admin", { id: toastId });
                        window.location.href = "/ops";
                      } catch (err) {
                        toast.error("Access Denied", { id: toastId });
                      }
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                      <span>Superadmin</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-all" />
                  </button>

                  <button 
                    onClick={async () => {
                      const toastId = toast.loading("Authenticating Vikram Singh...");
                      try {
                        await login("admin@livfit.app", "password");
                        toast.success("Authorized: Operations Manager", { id: toastId });
                        window.location.href = "/ops";
                      } catch (err) {
                        toast.error("Access Denied", { id: toastId });
                      }
                    }}
                    className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span>Admin</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-all" />
                  </button>
                  <button 
                    onClick={async () => {
                      const toastId = toast.loading("Authenticating Dr. Sarah...");
                      try {
                        await login("sarah@livfit.app", "password");
                        toast.success("Authorized: Clinical Hub", { id: toastId });
                        window.location.href = "/clinical";
                      } catch (err) {
                        toast.error("Access Denied", { id: toastId });
                      }
                    }}
                    className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>Dietician</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-all" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={async () => {
                      const toastId = toast.loading("Authenticating Jane Miller...");
                      try {
                        await login("jane@livfit.app", "password");
                        toast.success("Authorized: Academy Node", { id: toastId });
                        window.location.href = "/academy";
                      } catch (err) {
                        toast.error("Access Denied", { id: toastId });
                      }
                    }}
                    className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      <span>Educator</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-purple-500 transition-all" />
                  </button>

                  <button 
                    onClick={async () => {
                      const toastId = toast.loading("Connecting to Partner Node...");
                      try {
                        await login("alice@livercenter.org", "password");
                        toast.success("Authorized: Specialist Hub", { id: toastId });
                        window.location.href = "/external";
                      } catch (err) {
                        toast.error("Access Denied", { id: toastId });
                      }
                    }}
                    className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <span>Specialist</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-orange-500 transition-all" />
                  </button>
              </div>
              
              <p className="text-[9px] text-slate-400 font-medium mt-8 text-center leading-relaxed italic">
                *Demo Mode: Orchestrated Workspace Bypass Enabled.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer variant="light" className="border-slate-100" />
    </div>
  );
}
