"use client";

import { Card, CardContent, CardHeader, CardTitle, Button, Badge, cn } from "@livfit/ui";
import { 
  ShieldCheck, UserCog, UserPlus, Clock, 
  ShieldAlert, Activity, Users, 
  ArrowRight, BarChart3, Filter,
  Settings, Database
} from "lucide-react";

const requests = [
  { id: "REQ-101", user: "Vikram Singh", diagnosis: "Cirrhosis", meld: 22, date: "10 mins ago", status: "Urgent" },
  { id: "REQ-102", user: "Anita Nair", diagnosis: "Fatty Liver", meld: 7, date: "1 hour ago", status: "New" },
  { id: "REQ-103", user: "Rajesh Kumar", diagnosis: "Hepatitis B", meld: 12, date: "3 hours ago", status: "New" },
];

const dieticians = [
  { id: "D1", name: "Dr. Aris", patients: 12, specialty: "Critical Care", status: "Active" },
  { id: "D2", name: "Dr. Meena", patients: 8, specialty: "Lifestyle/NAFLD", status: "Away" },
  { id: "D3", name: "Dr. Karan", patients: 4, specialty: "Post-Transplant", status: "Active" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10 py-8 px-4 max-w-7xl mx-auto">
      {/* Admin Hero Header */}
      <div className="relative p-12 rounded-[2.5rem] bg-slate-900 overflow-hidden group shadow-2xl shadow-blue-900/10">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-transparent to-indigo-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Platform Oversight Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Clinical <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Operations</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-xl text-lg">
              Manage system-wide clinical assignments, user access, and platform governance for <span className="text-white font-bold">LivFit Networks</span>.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button className="h-12 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black gap-2 transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
              <UserPlus className="h-4 w-4" /> Add Clinical Staff
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-12 rounded-2xl border-white/10 text-white hover:bg-white/5 font-bold gap-2">
                <Settings className="h-4 w-4" /> System
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-2xl border-white/10 text-white hover:bg-white/5 font-bold gap-2">
                <Database className="h-4 w-4" /> Logs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Patients", value: "1,240", icon: Users, color: "blue" },
          { label: "Clinical Staff", value: "34", icon: UserCog, color: "indigo" },
          { label: "Active Requests", value: "03", icon: Clock, color: "orange" },
          { label: "System Health", value: "99.9%", icon: Activity, color: "emerald" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm ring-1 ring-slate-200 rounded-2xl">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center", `bg-${stat.color}-500/10`)}>
                <stat.icon className={cn("h-7 w-7", `text-${stat.color}-600`)} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Pending Requests Queue */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 rounded-3xl overflow-hidden">
          <CardHeader className="bg-white p-8 border-b border-slate-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black text-slate-900">Assignment Queue</CardTitle>
              <p className="text-xs text-slate-500 font-medium tracking-tight mt-1">Pending connection requests from candidates.</p>
            </div>
            <Button variant="ghost" className="text-blue-600 font-bold text-xs uppercase tracking-widest gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {requests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-6 hover:bg-blue-50/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      {req.user.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{req.user}</span>
                        <Badge className={cn(
                          "border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5",
                          req.status === 'Urgent' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-blue-100 text-blue-600'
                        )}>
                          {req.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{req.diagnosis} • MELD: {req.meld}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{req.date}</span>
                    <Button size="sm" className="h-9 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dietician Capacity Card */}
        <Card className="border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 rounded-3xl overflow-hidden">
          <CardHeader className="bg-white p-8 border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">Clinical Load</CardTitle>
            <p className="text-xs text-slate-500 font-medium tracking-tight mt-1">Specialist availability & patient volume.</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {dieticians.map((d) => (
                <div key={d.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{d.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{d.specialty}</p>
                    </div>
                    <Badge variant="outline" className={cn(
                      "text-[8px] font-black uppercase tracking-widest border-none px-2 py-0.5",
                      d.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                    )}>
                      {d.status}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>LOAD INDEX</span>
                      <span className="text-slate-900">{d.patients}/15</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          (d.patients / 15) > 0.8 ? "bg-orange-500" : "bg-blue-500"
                        )} 
                        style={{ width: `${(d.patients / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 mt-4">
                View Full Directory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Snapshot */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden">
        <CardContent className="p-10 flex items-center justify-between gap-12">
          <div className="space-y-4 max-w-md">
            <h3 className="text-2xl font-black text-slate-900">Growth & Compliance</h3>
            <p className="text-slate-500 font-medium">Platform-wide patient enrollment has increased by <span className="text-emerald-600 font-bold">12% this month</span>. Average compliance across all protocols is holding steady at 84%.</p>
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 rounded-2xl flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Enrollments</p>
                  <p className="text-lg font-black text-slate-900">4,281</p>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl flex items-center gap-3">
                <Activity className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Readiness</p>
                  <p className="text-lg font-black text-slate-900">84.2%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-32 flex items-end gap-2 px-8">
            {[40, 55, 45, 70, 60, 85, 75, 95].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group hover:bg-blue-100 transition-all cursor-pointer" style={{ height: `${h}%` }}>
                <div className="absolute inset-x-0 bottom-0 bg-blue-500 rounded-t-lg opacity-0 group-hover:opacity-100 transition-all" style={{ height: '30%' }} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
