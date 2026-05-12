'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from "@livfit/ui";
import { Plus, Trash2, Save, Utensils } from "lucide-react";
import { dietRepository } from "@livfit/lib";

export default function MealPlanManagementPage() {
  const [planName, setPlanName] = useState('');
  const [macros, setMacros] = useState({ calories: 2000, protein: 120, carbs: 200, fats: 60 });
  const [meals, setMeals] = useState([{ meal_type: 'BREAKFAST', items: [''] }]);

  const addMeal = () => {
    setMeals([...meals, { meal_type: 'LUNCH', items: [''] }]);
  };

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const updateMealType = (index: number, type: string) => {
    const newMeals = [...meals];
    newMeals[index].meal_type = type;
    setMeals(newMeals);
  };

  const addFoodItem = (mealIndex: number) => {
    const newMeals = [...meals];
    newMeals[mealIndex].items.push('');
    setMeals(newMeals);
  };

  const updateFoodItem = (mealIndex: number, foodIndex: number, value: string) => {
    const newMeals = [...meals];
    newMeals[mealIndex].items[foodIndex] = value;
    setMeals(newMeals);
  };

  const handleSave = async () => {
    if (!planName) return alert('Please enter a plan name');
    
    const userId = 'patient-1'; 
    
    try {
      await dietRepository.createPlan(
        { 
          name: planName, 
          user_id: userId,
          calories_goal: macros.calories,
          protein_goal: macros.protein,
          carbs_goal: macros.carbs,
          fats_goal: macros.fats
        },
        meals as any
      );
      alert('Meal Plan Saved & Assigned!');
    } catch (error) {
      console.error(error);
      alert('Failed to save plan');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Create Meal Plan</h1>
        <p className="text-muted-foreground mt-1">Design a nutritional strategy tailored to the patient's liver health.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Macro Targets</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label>Calories</Label>
            <Input type="number" value={macros.calories} onChange={e => setMacros({...macros, calories: parseInt(e.target.value)})} />
          </div>
          <div className="space-y-2">
            <Label>Protein (g)</Label>
            <Input type="number" value={macros.protein} onChange={e => setMacros({...macros, protein: parseInt(e.target.value)})} />
          </div>
          <div className="space-y-2">
            <Label>Carbs (g)</Label>
            <Input type="number" value={macros.carbs} onChange={e => setMacros({...macros, carbs: parseInt(e.target.value)})} />
          </div>
          <div className="space-y-2">
            <Label>Fats (g)</Label>
            <Input type="number" value={macros.fats} onChange={e => setMacros({...macros, fats: parseInt(e.target.value)})} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Meal Structure
          </h2>
          <Button variant="outline" size="sm" onClick={addMeal} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Meal
          </Button>
        </div>

        {meals.map((meal, mIndex) => (
          <Card key={mIndex}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <select 
                className="font-bold bg-transparent border-none focus:ring-0 cursor-pointer"
                value={meal.meal_type}
                onChange={e => updateMealType(mIndex, e.target.value)}
              >
                <option value="BREAKFAST">BREAKFAST</option>
                <option value="LUNCH">LUNCH</option>
                <option value="DINNER">DINNER</option>
                <option value="SNACK">SNACK</option>
              </select>
              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeMeal(mIndex)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {meal.items.map((item, iIndex) => (
                <Input 
                  key={iIndex}
                  placeholder="e.g. 100g Grilled Chicken" 
                  value={item}
                  onChange={e => updateFoodItem(mIndex, iIndex, e.target.value)}
                />
              ))}
              <Button variant="ghost" size="sm" onClick={() => addFoodItem(mIndex)} className="text-xs">
                + Add food item
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="gap-2 px-8">
          <Save className="h-4 w-4" />
          Save and Assign Diet Plan
        </Button>
      </div>
    </div>
  );
}
