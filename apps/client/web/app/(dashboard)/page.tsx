"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@livfit/ui";
import { 
  Activity, Apple, Dumbbell, MessageSquare, User, Bell, 
  BookOpen, Droplets, TrendingDown, TrendingUp, Calendar,
  ChevronRight, ArrowUpRight, Target, Heart
} from "lucide-react";
import Link from "next/link";
import { workoutRepository, dietRepository, getUser } from "@livfit/lib";

export default function PatientDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [dietPlan, setDietPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [s, u, d] = await Promise.all([
          workoutRepository.getSummary(),
          getUser(),
          dietRepository.getActivePlan ? dietRepository.getActivePlan() : Promise.resolve({ name: "General Health" })
        ]);
        
        // Role-based Redirection Logic
        const role = u?.role?.toUpperCase();
        if (role && role !== 'PATIENT') {
          if (role === 'ADMIN') window.location.href = 'http://localhost:7001/admin/assignments';
          else if (role === 'DIETICIAN') window.location.href = 'http://localhost:7001/dietician';
          else window.location.href = 'http://localhost:7001/external';
          return;
        }

        setSummary(s);
        setUser(u);
        setDietPlan(d);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-slate-500 font-medium animate-pulse">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* Premium Header with Gradient Overlay */}
      <div className="border-b sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-600 font-bold tracking-tight text-xl">LIVFIT</span>
              <Badge variant="outline" className="text-[10px] uppercase tracking-widest px-1.5 py-0">Patient Portal</Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {getGreeting()}, <span className="text-blue-600">{user?.name || "John"}</span>
            </h1>
            <p className="text-slate-500 mt-0.5 font-medium">Your health journey is looking strong today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MELD SCORE</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900">{user?.meldScore || 12}</span>
                <TrendingDown className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link href="/notifications">
                <Button variant="outline" size="icon" className="relative rounded-xl hover:bg-slate-50 border-slate-200">
                  <Bell className="h-5 w-5 text-slate-600" />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="gap-2 rounded-xl border-slate-200 hidden sm:flex">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button className="gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <MessageSquare className="h-4 w-4" />
                Dietician
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Prehab Readiness Widget */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
              <Heart className="h-4 w-4 fill-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">Prehab Readiness Score</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight">
              You are <span className="text-blue-200">88% Ready</span><br />
              for your transplant.
            </h2>
            <p className="text-blue-100 font-medium max-w-md">
              Your physical and nutritional compliance is excellent. Maintain this level to ensure the best possible surgical outcome.
            </p>
            <div className="flex gap-6 pt-2">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-blue-200 opacity-80">Workout</p>
                <p className="text-sm font-bold">92%</p>
              </div>
              <div className="w-px h-8 bg-white/20 self-center" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-blue-200 opacity-80">Nutrition</p>
                <p className="text-sm font-bold">85%</p>
              </div>
              <div className="w-px h-8 bg-white/20 self-center" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-blue-200 opacity-80">Literacy</p>
                <p className="text-sm font-bold">100%</p>
              </div>
            </div>
          </div>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="80" className="stroke-white/20 fill-none" strokeWidth="12" />
              <circle cx="96" cy="96" r="80" className="stroke-white fill-none transition-all duration-1000" strokeWidth="12" strokeDasharray="502" strokeDashoffset={502 * (1 - 0.88)} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black">88%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Prehab</span>
            </div>
          </div>
        </div>

        {/* AI Prehab Insights */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-none shadow-sm ring-1 ring-slate-200 bg-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            <CardContent className="p-8 flex gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">AI Prehab Coach</span>
                  <Badge className="bg-blue-50 text-blue-600 border-none text-[8px] h-4">Beta</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Optimization Tip for Today</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Based on your MELD score and recent activity, your protein absorption is peaking in the morning. <span className="text-blue-600 font-bold">Try moving your main protein intake to breakfast</span> to better support muscle retention before your surgical window.
                </p>
                <div className="pt-2">
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 font-bold hover:bg-transparent group-hover:translate-x-1 transition-transform">
                    Why this matters? <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-linear-to-br from-slate-900 to-slate-800 text-white p-8 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Quick Goal</p>
              <h3 className="text-2xl font-bold">Walk 15 mins</h3>
              <p className="text-slate-400 text-sm font-medium">Improves circulation for better graft acceptance.</p>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold rounded-xl mt-6">
              Start Timer
            </Button>
          </Card>
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white ring-1 ring-slate-200">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="h-16 w-16 text-blue-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-4xl font-black text-slate-900">Stable</div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-2 py-0">Excellent</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
                Last checked: Today, 9:00 AM
              </p>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white ring-1 ring-slate-200">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Apple className="h-16 w-16 text-red-500" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Protein Target</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">{summary?.proteinConsumed || 0}g</span>
                <span className="text-slate-400 font-bold">/ {summary?.proteinGoal || 100}g</span>
              </div>
              <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-red-500 to-orange-400 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min(100, ((summary?.proteinConsumed || 0) / (summary?.proteinGoal || 1)) * 100)}%` }} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white ring-1 ring-slate-200">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Droplets className="h-16 w-16 text-sky-500" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Hydration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">{summary?.fluidsConsumed || 0}L</span>
                <span className="text-slate-400 font-bold">/ {summary?.fluidsGoal || 2.0}L</span>
              </div>
              <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-sky-500 to-blue-400 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min(100, ((summary?.fluidsConsumed || 0) / (summary?.fluidsGoal || 1)) * 100)}%` }} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white ring-1 ring-slate-200">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Dumbbell className="h-16 w-16 text-orange-500" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-900">
                {summary?.workoutCompleted ? "Completed" : "1 Pending"}
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                {summary?.workoutCompleted ? "Goal achieved for today!" : "Target: 20m Low Impact"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mid-Section: Insights & Education */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Nutrition Mastery</CardTitle>
                <p className="text-sm text-slate-500 font-medium">Daily calorie and macronutrient breakdown</p>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Today</Badge>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid grid-cols-3 gap-8 mb-8 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-black text-slate-900">{summary?.caloriesConsumed || 0}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calories</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-slate-900">{summary?.carbsConsumed || 0}g</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Carbs</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-slate-900">{summary?.fatsConsumed || 0}g</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fats</div>
                </div>
              </div>

              {/* Custom SVG Chart Placeholder */}
              <div className="h-[200px] flex items-end justify-between gap-4 px-4">
                {[45, 60, 35, 80, 55, 70, 90].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div 
                      className="w-full bg-slate-100 rounded-t-lg transition-all duration-500 group-hover:bg-blue-100 cursor-pointer"
                      style={{ height: `${h}%` }}
                    >
                      {i === 6 && <div className="absolute top-0 left-0 w-full bg-blue-500 rounded-t-lg transition-all" style={{ height: '100%' }} />}
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">M T W T F S S"[i]</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden bg-linear-to-br from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg">Next Step</h3>
                </div>
                <p className="text-blue-50 font-medium mb-6">Your dietician recommends a 15-minute post-lunch walk to improve digestion.</p>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl">
                  Log Progress
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Recommended Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/blog/1" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">Managing Sodium with NAFLD</p>
                    <p className="text-xs text-slate-500 font-medium">5 min read • Nutrition</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </Link>
                <Link href="/blog/2" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="h-14 w-14 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Dumbbell className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">Gentle Yoga for Liver Health</p>
                    <p className="text-xs text-slate-500 font-medium">12 min video • Exercise</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section: Compliance & Lab Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Lab Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                  <span className="font-bold text-slate-700">Bilirubin</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">1.2 mg/dL</span>
                    <TrendingDown className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                  <span className="font-bold text-slate-700">INR</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">1.1</span>
                    <Badge variant="outline" className="text-[10px] bg-white">Normal</Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                View Full Medical History
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Weekly Compliance</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-6">
              <div className="relative h-28 w-28 flex items-center justify-center">
                <svg className="h-full w-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray={301.59}
                    strokeDashoffset={301.59 * (1 - 0.84)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="text-blue-600 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900">84%</span>
                  <span className="text-[10px] font-bold text-slate-400">SCORE</span>
                </div>
              </div>
              <p className="text-xs text-center text-slate-500 mt-6 font-medium">You've hit your nutrition goals 6 out of the last 7 days. Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Mental Resilience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-widest">Sleep Quality</span>
                    <span className="text-blue-600">7.5h (Deep)</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-widest">Stress Level</span>
                    <span className="text-emerald-600">Low / Stable</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl text-xs font-bold border-slate-200 hover:bg-slate-50 transition-all">
                Daily Mindset Check-in
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-blue-50/30">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Daily Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">Logged Breakfast</p>
                    <p className="text-xs text-slate-500">8:15 AM • 450 kcal</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">Workout: Pushups</p>
                    <p className="text-xs text-slate-500">7:00 AM • 3 sets</p>
                  </div>
                </div>
              </div>
              <Link href="/logs">
                <Button variant="outline" className="w-full mt-6 rounded-xl text-xs font-bold border-slate-200">
                  View Full Audit Log
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
