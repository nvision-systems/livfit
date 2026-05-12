'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from "@livfit/ui";
import { ChevronLeft, Search, Plus, Save } from "lucide-react";
import { dietRepository } from "@livfit/lib";

const quickAdd = [
  { name: 'Oatmeal', calories: 150, protein: 5 },
  { name: 'Chicken Breast (100g)', calories: 165, protein: 31 },
  { name: 'Boiled Egg', calories: 78, protein: 6 },
  { name: 'Grilled Fish (100g)', calories: 200, protein: 25 },
];

export default function LogMealPage() {
  const router = useRouter();
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLog = async (e?: any) => {
    if (e) e.preventDefault();
    if (!foodName || !calories) return;

    setLoading(true);
    try {
      await dietRepository.logMeal({
        user_id: 'patient-1',
        food_name: foodName,
        calories: parseInt(calories),
        protein: parseInt(protein || '0'),
        logged_at: new Date().toISOString()
      });
      router.push('/diet');
    } catch (error) {
      console.error(error);
      alert('Failed to log meal');
    } finally {
      setLoading(false);
    }
  };

  const selectQuick = (item: typeof quickAdd[0]) => {
    setFoodName(item.name);
    setCalories(item.calories.toString());
    setProtein(item.protein.toString());
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      <header className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Log Food</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Manual Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLog} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="foodName">Food Name</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="foodName" 
                  className="pl-9"
                  placeholder="What did you eat?" 
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories (kcal)</Label>
                <Input 
                  id="calories" 
                  type="number"
                  placeholder="0" 
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input 
                  id="protein" 
                  type="number"
                  placeholder="0" 
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full gap-2" disabled={loading}>
              <Plus className="h-4 w-4" />
              {loading ? 'Logging...' : 'Add to Journal'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <Save className="h-4 w-4 text-blue-500" />
          Quick Add
        </h3>
        <div className="grid gap-3">
          {quickAdd.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => selectQuick(item)}
              className="flex items-center justify-between p-4 bg-white border rounded-lg hover:border-primary hover:shadow-sm transition-all text-left"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.calories} kcal • {item.protein}g protein</p>
              </div>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
