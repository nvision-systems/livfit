'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button, Checkbox, Label } from "@livfit/ui";
import { ChevronLeft, Check, SkipForward, Timer, CheckCircle2 } from "lucide-react";
import { workoutRepository, WorkoutExercise } from "@livfit/lib";

function TrackWorkoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('planId');
  
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!planId) return;
    async function loadExercises() {
      try {
        const data = await workoutRepository.getExercises(parseInt(planId!));
        setExercises(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadExercises();
  }, [planId]);

  const toggleComplete = (id: number) => {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFinish = async () => {
    alert('Workout Session Logged! Great job.');
    router.push('/workouts');
  };

  if (loading) return <div className="p-8">Loading session...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <header className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Session Tracking</h1>
      </header>

      <div className="space-y-4">
        {exercises.map((ex) => (
          <Card key={ex.id} className={completed[ex.id] ? "bg-slate-50 border-slate-200 opacity-80" : "border-2"}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-lg">{ex.name}</h3>
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span>{ex.sets} sets</span>
                  <span>{ex.reps} reps</span>
                  {ex.duration_secs! > 0 && <span>{ex.duration_secs}s duration</span>}
                </div>
              </div>
              <Button 
                variant={completed[ex.id] ? "secondary" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => toggleComplete(ex.id)}
              >
                {completed[ex.id] ? <Check className="h-6 w-6 text-green-600" /> : <Timer className="h-6 w-6" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-8 border-t">
        <Button className="w-full h-12 text-lg font-bold gap-2" onClick={handleFinish}>
          <CheckCircle2 className="h-5 w-5" />
          Finish and Log Session
        </Button>
      </div>
    </div>
  );
}

export default function TrackWorkoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading workout session...</div>}>
      <TrackWorkoutContent />
    </Suspense>
  );
}
