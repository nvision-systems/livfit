'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from "@livfit/ui";
import { Plus, Trash2, Save, Dumbbell } from "lucide-react";
import { workoutRepository } from "@livfit/lib";

export default function WorkoutManagementPage() {
  const [planName, setPlanName] = useState('');
  const [intensity, setIntensity] = useState('Medium');
  const [exercises, setExercises] = useState([{ name: '', sets: 3, reps: 10, duration_secs: 0 }]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, reps: 10, duration_secs: 0 }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: string, value: any) => {
    const newExercises = [...exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setExercises(newExercises);
  };

  const handleSave = async () => {
    if (!planName) return alert('Please enter a plan name');
    
    // In a real app, we'd select a user ID. For demo, we'll use a placeholder.
    const userId = 'patient-1'; 
    
    try {
      await workoutRepository.createPlan(
        { name: planName, intensity, user_id: userId },
        exercises
      );
      alert('Workout Plan Saved & Assigned!');
      setPlanName('');
      setExercises([{ name: '', sets: 3, reps: 10, duration_secs: 0 }]);
    } catch (error) {
      console.error(error);
      alert('Failed to save plan');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Create Workout Plan</h1>
        <p className="text-muted-foreground mt-1">Design a customized exercise routine for your patient.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="planName">Plan Name</Label>
              <Input 
                id="planName" 
                placeholder="e.g. Post-Surgery Recovery" 
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="intensity">Intensity</Label>
              <select 
                id="intensity"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Exercises
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addExercise} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Exercise
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {exercises.map((ex, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4 bg-slate-50/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Label>Exercise Name</Label>
                  <Input 
                    placeholder="e.g. Walking" 
                    value={ex.name}
                    onChange={(e) => updateExercise(index, 'name', e.target.value)}
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive mt-8"
                  onClick={() => removeExercise(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Sets</Label>
                  <Input 
                    type="number" 
                    value={ex.sets}
                    onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reps</Label>
                  <Input 
                    type="number" 
                    value={ex.reps}
                    onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration (s)</Label>
                  <Input 
                    type="number" 
                    value={ex.duration_secs}
                    onChange={(e) => updateExercise(index, 'duration_secs', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2 px-8">
          <Save className="h-4 w-4" />
          Save and Assign Plan
        </Button>
      </div>
    </div>
  );
}
