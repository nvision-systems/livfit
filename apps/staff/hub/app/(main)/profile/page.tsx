"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Badge, Textarea } from "@livfit/ui";
import { 
  User, Mail, Building, Briefcase, Award, 
  Shield, CheckCircle, Clock, Save
} from "lucide-react";
import { getServerSession } from "@livfit/lib";

export default function StaffProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const session = await getServerSession();
      setUser(session?.user?.user_metadata || {
        name: "Dr. Alice Wong",
        email: "alice.wong@livfit.app",
        role: "HEPATOLOGIST",
        specialty: "Transplant Surgery",
        organization_name: "Metropolitan Liver Center",
        medical_license_number: "MD-992384-LX",
        department: "Clinical Liver Care",
        title: "Lead Hepatologist",
        clinical_access_level: 3
      });
      setLoading(false);
    };
    loadProfile();
  }, []);

  if (loading) return <div className="p-12 animate-pulse">Loading credentials...</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-100">
            <span className="text-4xl font-black text-white">AW</span>
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{user.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-none font-bold uppercase tracking-wider text-[10px]">
                {user.role?.replace('_', ' ')}
              </Badge>
              <span className="text-slate-400 font-bold text-sm">• {user.title}</span>
            </div>
          </div>
        </div>
        <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold gap-2">
          <Save className="h-4 w-4" />
          Update Credentials
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Verification Status */}
        <Card className="md:col-span-1 border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-tight">Active Status</p>
                <p className="text-[10px] font-bold text-emerald-600">License Verified 2026</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Access Level</p>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((level) => (
                  <div 
                    key={level} 
                    className={`h-1.5 flex-1 rounded-full ${level <= (user.clinical_access_level || 1) ? 'bg-blue-500' : 'bg-slate-200'}`} 
                  />
                ))}
              </div>
              <p className="text-[10px] font-bold text-slate-500 mt-2">Level 3: Full Medical Authority</p>
            </div>
          </CardContent>
        </Card>

        {/* Clinical Details */}
        <Card className="md:col-span-2 border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-4 border-b border-slate-50">
            <CardTitle className="text-lg font-bold">Clinical & Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Award className="h-3 w-3" />
                Medical License
              </Label>
              <Input value={user.medical_license_number} readOnly className="rounded-xl bg-slate-50 border-slate-100 font-mono font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Briefcase className="h-3 w-3" />
                Primary Specialty
              </Label>
              <Input value={user.specialty} className="rounded-xl border-slate-200 font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Building className="h-3 w-3" />
                Organization
              </Label>
              <Input value={user.organization_name} readOnly className="rounded-xl bg-slate-50 border-slate-100 font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Shield className="h-3 w-3" />
                Department
              </Label>
              <Input value={user.department} className="rounded-xl border-slate-200 font-bold" />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Professional Bio</Label>
              <Textarea 
                placeholder="Briefly describe your clinical focus..." 
                className="rounded-xl border-slate-200 min-h-[100px] resize-none font-medium"
                defaultValue={user.bio || "Specialized in pre- and post-transplant care with a focus on cirrhosis management and nutritional optimization."}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
