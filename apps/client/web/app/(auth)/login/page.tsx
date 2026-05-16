"use client";

import { LoginForm, Footer } from "@livfit/ui";
import { 
  Heart, Activity, ShieldCheck
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Branding & Storytelling */}
        <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-blue-700 via-blue-600 to-indigo-800 p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">LIVFIT</span>
            </div>
            
            <h1 className="text-5xl font-black leading-tight mb-6">
              Your Journey to a <span className="text-blue-200">Healthier Liver</span> Starts Here.
            </h1>
            <p className="text-xl text-blue-100 font-medium max-w-lg">
              Personalized nutrition, clinical tracking, and expert guidance—all in one place.
            </p>
            
            <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-md">
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-300 mb-2">Platform Purpose</h3>
              <p className="text-sm text-blue-50 leading-relaxed opacity-80">
                LivFit is a specialized clinical coordination platform dedicated to <strong>Liver Transplant Prehab</strong>. We optimize surgical outcomes through evidence-based nutritional protocols and real-time monitoring.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-300" />
                <span className="font-bold">Clinically Backed</span>
              </div>
              <p className="text-sm text-blue-200">Developed with hepatology experts for maximum safety.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-300" />
                <span className="font-bold">Real-time Insights</span>
              </div>
              <p className="text-sm text-blue-200">Monitor your MELD score and compliance daily.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/30">
          <div className="w-full max-w-md">
            <div className="md:hidden flex items-center gap-2 mb-12 justify-center">
              <Heart className="h-6 w-6 text-blue-600" />
              <span className="text-2xl font-black tracking-tighter text-slate-900">LIVFIT</span>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
              <div className="flex flex-col gap-4">
                <p className="text-slate-500 font-medium italic text-sm">
                  * Note: Authentication is not yet implemented. Use the buttons below for demo access.
                </p>
                <button 
                  onClick={() => window.location.href = "/home"}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
                >
                  <Activity className="h-4 w-4 text-emerald-400 group-hover:animate-pulse" />
                  Traverse to Dashboard
                </button>
              </div>
            </div>

            <LoginForm onSuccessRedirect="/" type="patient" />

            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Demo Access</p>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={async () => {
                    const { login } = await import("@livfit/lib");
                    await login("john@example.com", "password");
                    window.location.href = "/home";
                  }}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold border border-slate-200 shadow-sm transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Login as Patient (John)</span>
                  </div>
                  <Heart className="h-4 w-4 text-slate-300 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
              
              <p className="text-[9px] text-slate-400 font-medium mt-6 text-center leading-relaxed">
                *Demo Mode: Direct patient portal access.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer variant="light" className="border-slate-100" />
    </div>
  );
}
