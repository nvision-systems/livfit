"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Progress, cn } from "@livfit/ui";
import { 
  Activity, Utensils, Users, Search, 
  Filter, Plus, TrendingUp, AlertCircle,
  CheckCircle2, Clock
} from "lucide-react";
import { useEffect } from "react";
import { patientRepository, PatientRecord } from "@livfit/lib";

export default function DieticianDashboard() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientRepository.getAll();
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
    return <div className="p-8 animate-pulse text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Patient Database...</div>;
  }

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Clinical Nutrition Portal
            <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold">LIVE</Badge>
          </h1>
          <p className="text-slate-500 font-medium">Managing 42 transplant candidates in Prehab.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold gap-2">
            <Filter className="h-4 w-4" />
            Risk Filter
          </Button>
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold gap-2 shadow-lg shadow-blue-100">
            <Plus className="h-4 w-4" />
            New Dietary Protocol
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="pt-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Critical Intervention</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-slate-900">05</h3>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="pt-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Compliance</p>
            <h3 className="text-3xl font-black text-slate-900">82%</h3>
            <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }} />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="pt-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Protocols</p>
            <h3 className="text-3xl font-black text-slate-900">12</h3>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="pt-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reviews Pending</p>
            <h3 className="text-3xl font-black text-slate-900">08</h3>
          </CardContent>
        </Card>
      </div>

      {/* Patient Queue */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between pb-6">
          <CardTitle className="text-lg font-bold">Nutritional Risk Queue</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by Patient ID or Risk..." 
              className="h-10 w-72 pl-10 rounded-xl border-slate-200 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Level</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prehab Compliance</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{p.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Last Log: {p.lastLogged}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={cn(
                      "border-none font-black text-[9px] uppercase tracking-widest px-2 py-0.5",
                      p.risk === "High" ? "bg-red-50 text-red-600" : 
                      p.risk === "Medium" ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                    )}>
                      {p.risk} Risk
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black">
                        <span className="text-slate-400">SCORE</span>
                        <span className="text-slate-900">{p.compliance}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            p.compliance < 50 ? "bg-red-500" : "bg-emerald-500"
                          )} 
                          style={{ width: `${p.compliance}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={cn("h-4 w-4", p.status === "On Plan" || p.status === "Stabilized" ? "text-emerald-500" : "text-slate-200")} />
                      <span className="text-xs font-bold text-slate-600">{p.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-bold p-0">
                      Edit Protocol
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
