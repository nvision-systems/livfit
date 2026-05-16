"use client";

import { Card, CardContent, CardHeader, CardTitle, Button, Badge, cn } from "@livfit/ui";
import { 
  Stethoscope, ShieldCheck, Share2, 
  Search, Filter, ExternalLink, 
  Microscope, ClipboardCheck, ArrowRight,
  Info,
  Activity
} from "lucide-react";

const partners = [
  { id: "S-201", name: "Dr. Alice Wong", center: "Metro Liver Center", status: "Active", cases: 12 },
  { id: "S-202", name: "Dr. Robert Chen", center: "United Transplant", status: "Pending", cases: 5 },
  { id: "S-203", name: "Dr. Sarah Miller", center: "Global Health Unit", status: "Active", cases: 8 },
];

export default function SpecialistHubPage() {
  return (
    <div className="space-y-10 py-8 px-4 max-w-7xl mx-auto">
      {/* Ecosystem Header */}
      <div className="relative p-12 rounded-[2.5rem] bg-slate-900 overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/20 via-transparent to-blue-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Partner Portal Live</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Specialist <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-400">Hub</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-xl text-lg">
              Collaborative surgical readiness tracking for <span className="text-white font-bold">14 external partner networks</span>.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button className="h-12 px-8 rounded-2xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-black gap-2 transition-all hover:scale-105">
              <Share2 className="h-4 w-4" /> Share Clinical Data
            </Button>
            <Button variant="outline" className="h-12 px-8 rounded-2xl border-white/10 text-white hover:bg-white/5 font-bold gap-2">
              <ExternalLink className="h-4 w-4" /> Network Directory
            </Button>
          </div>
        </div>
      </div>

      {/* Role Context Card */}
      <Card className="border-none bg-blue-50/50 shadow-sm ring-1 ring-blue-100 rounded-2xl">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-black text-blue-900 text-sm uppercase tracking-wider">Access Node Intelligence</h4>
            <p className="text-sm text-blue-700/80 mt-1 leading-relaxed">
              This dashboard is accessed by <span className="font-bold">External Hepatologists, Surgeons, and Insurance Partners</span> to audit clinical outcomes and verify surgical readiness across the referral network.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Network Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Partners", value: "14", icon: Microscope, color: "orange" },
          { label: "Clearance Pending", value: "27", icon: ClipboardCheck, color: "blue" },
          { label: "Network Health", value: "Optimal", icon: Activity, color: "emerald" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm ring-1 ring-slate-200 rounded-2xl">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center", `bg-${stat.color}-500/10`)}>
                <stat.icon className={cn("h-8 w-8", `text-${stat.color}-600`)} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-0.5">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Surgical Queue */}
      <Card className="border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 overflow-hidden rounded-3xl">
        <CardHeader className="bg-white p-8 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-black text-slate-900">Surgical Readiness Queue</CardTitle>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Cross-center patient synchronization for referral audit.</p>
              </div>
            </div>
            <Button variant="ghost" className="text-slate-400 font-bold text-xs uppercase tracking-widest gap-2">
              View Full Audit <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Partner Node</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Affiliated Center</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Cases</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Synchronization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-orange-50/30 transition-all group">
                    <td className="px-8 py-6 font-bold text-slate-900">{partner.name}</td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">{partner.center}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-900">{partner.cases}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Profiles</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge className={cn(
                        "rounded-lg border-none px-3 py-1 text-[10px] font-black tracking-widest uppercase",
                        partner.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                      )}>
                        {partner.status}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Button size="sm" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-orange-500 hover:text-white transition-all text-orange-600 p-0">
                        <Share2 className="h-4 w-4" />
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
  );
}
