"use client";

import { useState } from "react";
import { Card, CardContent, Button, Input, Label, Badge } from "@livfit/ui";
import { 
  Check, ChevronRight, ChevronLeft, Loader2, Heart, 
  Target, Activity, User, Shield
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    goal: "",
    meldScore: ""
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(4); // Success step
    }, 2000);
  };

  const goals = [
    { id: "liver", title: "Liver Recovery", desc: "Manage cirrhosis or NAFLD", icon: Heart, color: "text-red-500 bg-red-50" },
    { id: "weight", title: "Weight Control", desc: "Balanced nutrition for BMI goals", icon: Target, color: "text-blue-500 bg-blue-50" },
    { id: "strength", title: "Build Strength", desc: "Safe, low-impact exercise plans", icon: Activity, color: "text-emerald-500 bg-emerald-50" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Stepper */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-12 px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step === s ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-lg" : 
                  step > s ? "bg-emerald-500 text-white" : "bg-white text-slate-400 border border-slate-200"
                }`}>
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`h-1 flex-1 mx-4 rounded-full transition-all duration-500 ${
                    step > s ? "bg-emerald-500" : "bg-slate-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}

        <Card className="border-none shadow-2xl shadow-slate-200 overflow-hidden rounded-3xl">
          <CardContent className="p-0">
            {step === 1 && (
              <div className="p-12">
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-slate-900 mb-2">Create Account</h1>
                  <p className="text-slate-500 font-medium text-lg">Let's start with the basics.</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</Label>
                    <Input 
                      placeholder="John Doe" 
                      className="h-14 rounded-2xl border-slate-200 focus:ring-blue-600 text-lg px-6"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
                    <Input 
                      type="email"
                      placeholder="john@example.com" 
                      className="h-14 rounded-2xl border-slate-200 focus:ring-blue-600 text-lg px-6"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</Label>
                    <Input 
                      type="password"
                      placeholder="Create a strong password" 
                      className="h-14 rounded-2xl border-slate-200 focus:ring-blue-600 text-lg px-6"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                  <Button onClick={nextStep} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-lg mt-4">
                    Continue to Goals <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-12">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Primary Goal</h1>
                    <p className="text-slate-500 font-medium">Select the focus of your health journey.</p>
                  </div>
                  <Button variant="ghost" onClick={prevStep} className="text-slate-400 hover:text-blue-600">
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                </div>
                <div className="grid gap-4">
                  {goals.map((g) => (
                    <div 
                      key={g.id}
                      onClick={() => setFormData({...formData, goal: g.id})}
                      className={`group p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-6 ${
                        formData.goal === g.id ? "border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-100" : "border-slate-100 hover:border-blue-200"
                      }`}
                    >
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 ${g.color}`}>
                        <g.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{g.title}</h3>
                        <p className="text-slate-500 font-medium">{g.desc}</p>
                      </div>
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                        formData.goal === g.id ? "border-blue-600 bg-blue-600" : "border-slate-200"
                      }`}>
                        {formData.goal === g.id && <Check className="h-3 w-3 text-white" strokeWidth={4} />}
                      </div>
                    </div>
                  ))}
                  <Button onClick={nextStep} disabled={!formData.goal} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-lg mt-6">
                    Final Step <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-12">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Clinical Details</h1>
                    <p className="text-slate-500 font-medium">Optional but highly recommended for accuracy.</p>
                  </div>
                  <Button variant="ghost" onClick={prevStep} className="text-slate-400 hover:text-blue-600">
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                </div>
                <div className="space-y-8">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Shield className="h-5 w-5" />
                      <span className="font-bold">MELD Score Insight</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your Model for End-Stage Liver Disease (MELD) score helps us tailor your diet intensity. If you don't know it, you can skip this for now.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Current MELD Score (6-40)</Label>
                    <div className="flex gap-4">
                      <Input 
                        type="number"
                        placeholder="12" 
                        className="h-16 rounded-2xl border-slate-200 focus:ring-blue-600 text-2xl font-black px-6 w-32"
                        value={formData.meldScore}
                        onChange={(e) => setFormData({...formData, meldScore: e.target.value})}
                      />
                      <div className="flex-1 bg-white border border-slate-200 rounded-2xl flex items-center px-6">
                        <span className="text-slate-400 font-medium">
                          {formData.meldScore ? (Number(formData.meldScore) > 15 ? "Higher intensity monitoring" : "Standard monitoring") : "Leave blank to skip"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSubmit} disabled={loading} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-lg">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Crafting Your Plan...</span>
                      </div>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="p-16 text-center">
                <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <Check className="h-12 w-12" strokeWidth={3} />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4">You're All Set!</h1>
                <p className="text-xl text-slate-500 font-medium mb-12 max-w-sm mx-auto">
                  Welcome to the LivFit family. Your personalized nutrition and workout plan is ready.
                </p>
                <Button 
                  onClick={() => router.push("/")}
                  className="w-full max-w-xs h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-xl shadow-xl shadow-blue-200 transition-all hover:scale-[1.05]"
                >
                  Enter Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {step < 4 && (
          <p className="text-center mt-8 text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">
              Sign in instead
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
