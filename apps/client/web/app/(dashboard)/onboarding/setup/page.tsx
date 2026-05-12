"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from "@livfit/ui";
import { calculateMELD } from "@livfit/lib";
import { Activity, User, Info, CheckCircle } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    age: '',
    gender: 'male',
    ethnicity: '',
    diagnosis: '',
    creatinine: '1.0',
    bilirubin: '1.0',
    inr: '1.0',
  });

  const [meldScore, setMeldScore] = useState<number | null>(null);

  const handleCalculateMELD = () => {
    const score = calculateMELD({
      creatinine: parseFloat(form.creatinine),
      bilirubin: parseFloat(form.bilirubin),
      inr: parseFloat(form.inr),
    });
    setMeldScore(score);
  };

  const handleSave = () => {
    if (!form.age || !form.diagnosis) {
      alert('Please fill in your age and diagnosis.');
      return;
    }
    // Logic to save to API
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Personalize Your Experience</h1>
          <p className="text-muted-foreground mt-2">Tailor LivFit to your clinical needs and health goals.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-1">
          {/* General Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Health Profile</CardTitle>
              </div>
              <CardDescription>Basic demographics for personalized clinical tracking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Age</label>
                  <input 
                    type="number" 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="e.g. 45"
                    value={form.age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, age: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Gender</label>
                  <select 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={form.gender}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({...form, gender: e.target.value})}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Ethnicity (Optional)</label>
                <input 
                  type="text" 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="e.g. South Asian"
                  value={form.ethnicity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, ethnicity: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Clinical Diagnosis</label>
                <input 
                  type="text" 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="e.g. NAFLD, Cirrhosis"
                  value={form.diagnosis}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, diagnosis: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* MELD Calculator */}
          <Card className="border-blue-200 bg-blue-50/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <CardTitle>MELD Score Calculator</CardTitle>
              </div>
              <CardDescription>Enter lab values to calculate your Model for End-Stage Liver Disease score.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Creatinine</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={form.creatinine}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, creatinine: e.target.value})}
                  />
                  <p className="text-[10px] text-muted-foreground">mg/dL</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Bilirubin</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={form.bilirubin}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, bilirubin: e.target.value})}
                  />
                  <p className="text-[10px] text-muted-foreground">mg/dL</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">INR</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={form.inr}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, inr: e.target.value})}
                  />
                  <p className="text-[10px] text-muted-foreground">Ratio</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-blue-100 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-600">Calculated MELD Score</p>
                  <p className="text-3xl font-black text-blue-600">{meldScore || '--'}</p>
                </div>
                <Button variant="outline" onClick={handleCalculateMELD} className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Button size="lg" className="w-full h-14 text-lg font-bold" onClick={handleSave}>
            Complete Setup & Start Journey
          </Button>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-green-600" />
            Your data is stored securely and only accessible by your clinical team.
          </div>
        </div>
      </div>
    </div>
  );
}
