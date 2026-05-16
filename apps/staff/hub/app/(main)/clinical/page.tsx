"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Button, Badge, Input, cn } from "@livfit/ui";
import { 
  Activity, Utensils, Users, Search, 
  Filter, Plus, TrendingUp, AlertCircle,
  CheckCircle2, Clock, ChevronRight,
  BarChart3, ShieldAlert
} from "lucide-react";
import { userRepository, PatientRecord } from "@livfit/lib";

export default function DieticianDashboard() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await userRepository.getClinicalQueue();
        setPatients(data);
      } catch (err) {
        console.error("Failed to fetch patients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing Clinical Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-8 px-4 max-w-7xl mx-auto">
      {/* Dynamic Hero Header */}
      <div className="relative p-10 rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl shadow-blue-900/10 group">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-transparent to-emerald-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
          <Activity className="h-48 w-48 text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <Badge className="bg-emerald-500/10 text-emerald-400 border-none font-black text-[10px] tracking-widest uppercase px-3 py-1">System Operational</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Clinical Nutrition <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">Portal</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg font-medium max-w-xl">
              Precision pre-habilitation monitoring for <span className="text-white font-bold">42 transplant candidates</span> across active protocols.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold gap-3 shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95">
              <Plus className="h-5 w-5" />
              New Dietary Protocol
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 font-bold gap-2">
                <Filter className="h-4 w-4" />
                Risk Matrix
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 font-bold gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Impact Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Critical Intervention", value: "05", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50", trend: "+2 this week" },
          { label: "Avg. Compliance", value: "82%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50", progress: 82 },
          { label: "Active Protocols", value: "12", icon: Utensils, color: "text-blue-500", bg: "bg-blue-50", trend: "Steady" },
          { label: "Reviews Pending", value: "08", icon: Clock, color: "text-orange-500", bg: "bg-orange-50", trend: "Next 24h" }
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm ring-1 ring-slate-200/60 hover:ring-blue-200 transition-all duration-300 group cursor-default">
            <CardContent className="pt-6 pb-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2.5 rounded-xl transition-colors", stat.bg)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">{stat.label}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black text-slate-900 font-mono tracking-tighter">{stat.value}</h3>
                {stat.trend && <span className="text-[10px] font-bold text-slate-400">{stat.trend}</span>}
              </div>
              {stat.progress && (
                <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${stat.progress}%` }} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Refined Patient Queue */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nutritional Risk Queue</h2>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input 
              placeholder="Search Candidate ID or Risk Level..." 
              className="h-12 w-80 pl-12 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all text-sm font-medium"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 overflow-hidden rounded-4xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate Profile</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Index</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">MELD / Compliance</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {patients.filter((p: PatientRecord) => p.name.toLowerCase().includes(search.toLowerCase())).map((p: PatientRecord) => (
                    <tr key={p.id} className="hover:bg-blue-50/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-base">{p.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{p.id}</span>
                              <div className="h-1 w-1 rounded-full bg-slate-300" />
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-slate-300" />
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Log {p.lastLogged}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <Badge className={cn(
                          "border-none font-black text-[9px] uppercase tracking-[0.15em] px-3 py-1 rounded-lg",
                          p.risk === "High" ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : 
                          p.risk === "Medium" ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"
                        )}>
                          {p.risk} Risk
                        </Badge>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-slate-900 font-mono tracking-tighter">{p.meldScore}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MELD</span>
                          </div>
                          <div className="w-40 space-y-1.5">
                            <div className="flex justify-between text-[9px] font-black text-slate-400">
                              <span>PREHAB COMPLIANCE</span>
                              <span className="text-slate-900 font-mono">{p.compliance}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-1000",
                                  p.compliance < 50 ? "bg-red-500" : "bg-emerald-500"
                                )} 
                                style={{ width: `${p.compliance}%` }} 
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3 p-2 px-4 rounded-xl bg-slate-50 w-fit group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            p.status === "On Plan" || p.status === "Stabilized" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-300"
                          )} />
                          <span className="text-xs font-black text-slate-700 uppercase tracking-wide">{p.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
