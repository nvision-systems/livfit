"use client";

import { Button, Badge, cn, Footer } from "@livfit/ui";
import { 
  Heart, Activity, Users, ShieldCheck, 
  ArrowRight, Globe, Zap, Database
} from "lucide-react";
import Link from "next/link";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-500">
              <Heart className="h-6 w-6 text-slate-950 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">LIVFIT</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="http://localhost:7001" target="_blank">
              <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 font-bold text-xs uppercase tracking-widest gap-2">
                Professional Access <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all">
                Enter Portal
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="h-3 w-3 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next-Gen Clinical Prehab</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black tracking-tight text-white leading-[0.95]">
              Precision Health <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-blue-400 to-indigo-500">
                Without Compromise
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              LivFit is the premium orchestration layer for liver transplant candidates. 
              Bridging the gap between clinical monitoring and daily pre-habilitation protocols.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-16 px-10 text-lg bg-white text-slate-950 hover:bg-emerald-50 font-black rounded-2xl shadow-2xl">
                Launch Patient Portal
              </Button>
            </Link>
            <Link href="http://localhost:7001" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full h-16 px-10 text-lg border-white/10 hover:bg-white/5 text-white font-black rounded-2xl backdrop-blur-sm">
                Professional Gateway
              </Button>
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-20">
            <div className="p-8 rounded-4xl bg-white/3 border border-white/5 backdrop-blur-sm hover:bg-white/5 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time MELD Sync</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Dynamic clinical data integration for accurate risk stratification and protocol adjustment.</p>
            </div>
            
            <div className="p-8 rounded-4xl bg-white/3 border border-white/5 backdrop-blur-sm hover:bg-white/5 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Protocol Adherence</h3>
              <p className="text-slate-500 text-sm leading-relaxed">High-fidelity tracking of exercise, nutrition, and literacy goals mandated by surgical teams.</p>
            </div>

            <div className="p-8 rounded-4xl bg-white/3 border border-white/5 backdrop-blur-sm hover:bg-white/5 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Audit Ready</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Clinical-grade reporting and secure data sharing between patients and transplant centers.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="dark" className="border-white/5" />
    </div>
  );
}
