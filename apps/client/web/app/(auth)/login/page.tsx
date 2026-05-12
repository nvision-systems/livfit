"use client";

import { LoginForm } from "@livfit/ui";
import { 
  Heart, Activity, ShieldCheck
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
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
            <p className="text-slate-500 font-medium">Enter your credentials to access your dashboard.</p>
          </div>

          <LoginForm onSuccessRedirect="/" type="patient" />
        </div>
      </div>
    </div>
  );
}
