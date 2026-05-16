"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, cn } from "@livfit/ui";
import { 
  Users, ShieldCheck, Activity, Search, 
  MapPin, Clock, ArrowUpRight, Zap,
  UserCog, LayoutGrid, ListFilter, AlertTriangle
} from "lucide-react";

const assignments = [
  { id: "P-101", name: "John Doe", risk: "High", suggest: "Dr. Sarah Smith", load: "12/20", priority: "Urgent" },
  { id: "P-102", name: "Jane Smith", risk: "Medium", suggest: "Dr. Mike Jones", load: "8/20", priority: "Standard" },
  { id: "P-103", name: "Alice Wong", risk: "Low", suggest: "Dr. Sarah Smith", load: "12/20", priority: "Standard" },
  { id: "P-104", name: "Robert Miller", risk: "High", suggest: "Dr. Ellen Clark", load: "18/20", priority: "Urgent" },
];

export default function AdminAssignmentsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-10 py-8 px-4 max-w-7xl mx-auto">
      {/* Platform Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Live: Central Hub</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Platform <span className="text-blue-600">Admin</span></h1>
          <p className="text-slate-500 font-medium mt-1">Orchestrating clinical resources across 4 liver centers.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold gap-2">
            <LayoutGrid className="h-4 w-4" /> Node View
          </Button>
          <Button className="rounded-xl bg-slate-900 hover:bg-slate-800 font-bold gap-2 px-6">
            <Zap className="h-4 w-4 fill-emerald-400 text-emerald-400" /> Optimize Flow
          </Button>
        </div>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Clinicians", value: "42", trend: "+3 this week", icon: Users, color: "blue" },
          { label: "Total Patients", value: "1,284", trend: "+12% growth", icon: Activity, color: "emerald" },
          { label: "Pending Mapping", value: "18", trend: "Action required", icon: AlertTriangle, color: "orange" },
          { label: "System Health", value: "99.9%", trend: "Optimal latency", icon: ShieldCheck, color: "indigo" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm ring-1 ring-slate-200 rounded-2xl overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", `bg-${stat.color}-500/10`)}>
                  <stat.icon className={cn("h-5 w-5", `text-${stat.color}-600`)} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
              <p className={cn("text-[10px] font-bold mt-2", stat.color === 'orange' ? 'text-orange-600' : 'text-slate-500')}>
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assignment Control Center */}
      <Card className="border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 overflow-hidden rounded-3xl">
        <CardHeader className="border-b border-slate-100 bg-white p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                <UserCog className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-black text-slate-900">Patient-Clinician Mapping</CardTitle>
                <p className="text-xs text-slate-500 font-medium">Assign patients to care teams based on MELD priority.</p>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search candidates or clinicians..." 
                className="h-12 w-80 pl-12 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 bg-slate-50/50 transition-all text-sm font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Node</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Risk Profile</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Suggested Clinician</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Load</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Mapping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignments.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                          {row.id.split('-')[1]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none">{row.name}</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">{row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge className={cn(
                        "rounded-lg border-none px-3 py-1 text-[10px] font-black tracking-widest uppercase",
                        row.risk === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                      )}>
                        {row.risk} Priority
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-700">{row.suggest}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-32">
                        <div className="flex justify-between text-[10px] font-bold mb-1.5">
                          <span className="text-slate-400">Caseload</span>
                          <span className="text-slate-700">{row.load}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${(parseInt(row.load.split('/')[0]) / parseInt(row.load.split('/')[1])) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Button variant="outline" className="rounded-xl border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-bold text-xs">
                        Finalize Map
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
