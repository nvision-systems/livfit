"use client";

import { LoginForm } from "@livfit/ui";
import { ShieldCheck } from "lucide-react";

export default function StaffLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-600 text-white mb-6 shadow-xl shadow-blue-900">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Staff Hub</h1>
          <p className="text-slate-400 font-medium mt-2">Clinical Administration Portal</p>
        </div>

        <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700">
          <LoginForm 
            onSuccessRedirect="/" 
            type="staff" 
            allowSignup={false} 
          />

          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">Developer Access</p>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={async () => {
                  const { login } = await import("@livfit/lib");
                  await login("admin@livfit.app", "password");
                  window.location.href = "/";
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-600 transition-all flex items-center justify-between group"
              >
                <span>Login as <span className="text-blue-400 ml-1">Administrator</span></span>
                <ShieldCheck className="h-4 w-4 text-slate-500 group-hover:text-blue-400" />
              </button>
              
              <button 
                onClick={async () => {
                  const { login } = await import("@livfit/lib");
                  await login("sarah@livfit.app", "password");
                  window.location.href = "/";
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-600 transition-all flex items-center justify-between group"
              >
                <span>Login as <span className="text-emerald-400 ml-1">Dietician</span></span>
                <ShieldCheck className="h-4 w-4 text-slate-500 group-hover:text-emerald-400" />
              </button>

              <button 
                onClick={async () => {
                  const { login } = await import("@livfit/lib");
                  await login("alice@livercenter.org", "password");
                  window.location.href = "/";
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-600 transition-all flex items-center justify-between group"
              >
                <span>Login as <span className="text-orange-400 ml-1">External Specialist</span></span>
                <ShieldCheck className="h-4 w-4 text-slate-500 group-hover:text-orange-400" />
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-10 text-slate-500 text-sm font-medium">
          Secure, audit-ready access for clinical staff only.
          <br />
          <span className="text-slate-600 font-mono text-[10px]">AUTH_MODE: DEV_LOGINS_ENABLED</span>
        </p>
      </div>
    </div>
  );
}
