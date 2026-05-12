"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Tabs, TabsList, TabsTrigger, TabsContent, cn } from "@livfit/ui";
import { 
  Heart, Activity, Calendar, ClipboardCheck, 
  ExternalLink, Users, AlertCircle, TrendingUp,
  UserCheck, History, ArrowRightLeft, Stethoscope
} from "lucide-react";

export default function TransplantCarePortal() {
  const [activeTab, setActiveTab] = useState("recipients");

  const recipients = [
    { name: "Robert Miller", id: "REC-8823", meld: 28, status: "Active", urgency: "High", bloodType: "O+" },
    { name: "Sarah Jenkins", id: "REC-9102", meld: 15, status: "Monitoring", urgency: "Medium", bloodType: "A-" },
    { name: "Michael Chen", id: "REC-7741", meld: 32, status: "Standby", urgency: "Critical", bloodType: "B+" },
  ];

  const donors = [
    { name: "Emily Watson", id: "DON-4412", type: "Living", compatibility: "98%", status: "Screening", bloodType: "O+" },
    { name: "David Kim", id: "DON-5521", type: "Living", compatibility: "85%", status: "Approved", bloodType: "A-" },
    { name: "Lucas Vance", id: "DON-3301", type: "Altruistic", compatibility: "Pending", status: "Recovery", bloodType: "O-" },
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Organ Matching & Recovery</h1>
          </div>
          <p className="text-slate-500 font-medium">External Partner: United Transplant Network • Living Donor Program</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold gap-2">
            <ArrowRightLeft className="h-4 w-4 text-blue-600" />
            Manage Matches
          </Button>
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold gap-2">
            <UserCheck className="h-4 w-4" />
            Onboard Donor
          </Button>
        </div>
      </div>

      {/* Matching Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-blue-50/30">
          <CardContent className="pt-6">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Active Matches</p>
            <h3 className="text-3xl font-black text-slate-900">08</h3>
            <p className="text-xs text-blue-700 font-bold mt-4">In surgical planning</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="pt-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Living Donors</p>
            <h3 className="text-3xl font-black text-slate-900">14</h3>
            <p className="text-xs text-emerald-600 font-bold mt-4">3 newly approved</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="pt-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recipients</p>
            <h3 className="text-3xl font-black text-slate-900">29</h3>
            <p className="text-xs text-slate-500 font-bold mt-4">Awaiting compatibility</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-red-50/50">
          <CardContent className="pt-6">
            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Critical Urgency</p>
            <h3 className="text-3xl font-black text-slate-900">02</h3>
            <p className="text-xs text-red-700 font-bold mt-4">Action required</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area with Tabs */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between pb-4">
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setActiveTab("recipients")}
              className={`text-lg font-bold pb-2 transition-all ${activeTab === "recipients" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              Recipients (Givers)
            </button>
            <button 
              onClick={() => setActiveTab("donors")}
              className={`text-lg font-bold pb-2 transition-all ${activeTab === "donors" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              Living Donors
            </button>
          </div>
          <Input placeholder={`Search ${activeTab}...`} className="h-9 w-64 rounded-lg text-xs" />
        </CardHeader>
        <CardContent className="p-0">
          {activeTab === "recipients" ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">MELD / Blood</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prehab Compliance</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgency</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Matching</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recipients.map((person) => (
                  <tr key={person.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{person.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium tracking-tighter">{person.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-black ${person.meld > 25 ? 'text-red-600' : 'text-slate-900'}`}>{person.meld}</span>
                        <Badge className="bg-slate-100 text-slate-600 border-none text-[9px]">{person.bloodType}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <Activity className="h-3 w-3 text-blue-500" />
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: '85%' }} />
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">85%</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Stethoscope className="h-3 w-3 text-emerald-500" />
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">92%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="rounded-md border-slate-200 text-slate-600 bg-white">{person.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${person.urgency === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-orange-400'}`} />
                        <span className="text-xs font-bold text-slate-700">{person.urgency}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-bold gap-1.5 p-0">
                        Check Compatibility
                        <ArrowRightLeft className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Donor</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Compatibility / Blood</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Monitoring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{donor.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium tracking-tighter">{donor.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{donor.compatibility}</span>
                        <Badge className="bg-slate-100 text-slate-600 border-none text-[9px]">{donor.bloodType}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600">{donor.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={cn(
                        "rounded-md border-none text-[10px] font-black uppercase tracking-wider",
                        donor.status === "Approved" ? "bg-emerald-100 text-emerald-700" : 
                        donor.status === "Recovery" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                      )}>
                        {donor.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-bold gap-1.5 p-0">
                        Post-Op Metrics
                        <Stethoscope className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
