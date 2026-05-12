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
            onSuccessRedirect="/admin" 
            type="staff" 
            allowSignup={false} 
          />
        </div>
        
        <p className="text-center mt-10 text-slate-500 text-sm font-medium">
          Secure, audit-ready access for clinical staff only.
          <br />
          <span className="text-slate-600">IP: 192.168.1.1 (Internal Logged)</span>
        </p>
      </div>
    </div>
  );
}
