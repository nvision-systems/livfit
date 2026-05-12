'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@livfit/ui";
import { Apple, Plus, Utensils, Droplets, Info } from "lucide-react";
import { dietRepository, DietPlan, DietLog } from "@livfit/lib";
import Link from 'next/link';

export default function DietPage() {
  const [plans, setPlans] = useState<DietPlan[]>([]);
  const [logs, setLogs] = useState<DietLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const userId = 'patient-1';
        const planData = await dietRepository.getPlans(userId);
        const logData = await dietRepository.getLogs(userId);
        setPlans(planData);
        setLogs(logData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activePlan = plans[0] || { calories_goal: 2000, protein_goal: 120, carbs_goal: 200, fats_goal: 60 };
  
  const todayLogs = logs.filter(l => new Date(l.logged_at).toDateString() === new Date().toDateString());
  const consumed = {
    calories: todayLogs.reduce((acc, l) => acc + l.calories, 0),
    protein: todayLogs.reduce((acc, l) => acc + l.protein, 0),
  };

  if (loading) return <div className="p-8">Loading nutrition...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nutrition & Diet</h1>
          <p className="text-muted-foreground mt-1">Monitor your macros and stay on track with your recovery goals.</p>
        </div>
        <Link href="/diet/log">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Log Meal
          </Button>
        </Link>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Calories Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{consumed.calories} <span className="text-sm font-normal text-muted-foreground">/ {activePlan.calories_goal}</span></div>
            <div className="mt-3 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all" 
                style={{ width: `${Math.min((consumed.calories / activePlan.calories_goal) * 100, 100)}%` }} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Protein Card */}
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{consumed.protein}g <span className="text-sm font-normal text-muted-foreground">/ {activePlan.protein_goal}g</span></div>
            <div className="mt-3 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all" 
                style={{ width: `${Math.min((consumed.protein / activePlan.protein_goal) * 100, 100)}%` }} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Fluid Card (Mocked for now) */}
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fluid Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.2L <span className="text-sm font-normal text-muted-foreground">/ 2.5L</span></div>
            <div className="mt-3 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: '48%' }} />
            </div>
          </CardContent>
        </Card>

        {/* Warning/Alert */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex gap-3 text-amber-800">
              <Info className="h-5 w-5 shrink-0" />
              <p className="text-xs">Sodium intake is slightly high today. Try to avoid processed foods for dinner.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Current Meal Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {plans.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">{plans[0].name}</h3>
                <div className="grid gap-4">
                  {/* We would fetch meal details here */}
                  <div className="p-3 border rounded bg-slate-50 flex justify-between items-center">
                    <span className="font-medium text-sm">Breakfast: High Protein Oats</span>
                    <Badge variant="outline">Clinical Choice</Badge>
                  </div>
                  <div className="p-3 border rounded bg-slate-50 flex justify-between items-center">
                    <span className="font-medium text-sm">Lunch: Grilled Fish with Steamed Greens</span>
                    <Badge variant="outline">Clinical Choice</Badge>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground py-8 text-center italic">No formal meal plan assigned yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Today's Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayLogs.length > 0 ? todayLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center text-sm border-b pb-2">
                  <div>
                    <p className="font-medium">{log.food_name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(log.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{log.calories} kcal</p>
                    <p className="text-xs text-muted-foreground">{log.protein}g protein</p>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground text-center py-8 italic">No logs for today yet.</p>
              )}
              <Link href="/diet/log">
                <Button variant="ghost" className="w-full text-xs" size="sm">Add Entry</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
