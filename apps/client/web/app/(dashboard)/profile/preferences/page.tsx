'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Checkbox, Label, Switch } from "@livfit/ui";
import { ChevronLeft, Save, Heart, ShieldAlert } from "lucide-react";
import { userRepository, UserPreferences } from "@livfit/lib";
import { useRouter } from 'next/navigation';

const restrictionOptions = [
  { id: 'VEGAN', label: 'Vegan' },
  { id: 'VEGETARIAN', label: 'Vegetarian' },
  { id: 'GLUTEN_FREE', label: 'Gluten Free' },
  { id: 'DAIRY_FREE', label: 'Dairy Free' },
  { id: 'LOW_SODIUM', label: 'Low Sodium' },
  { id: 'DIABETIC_FRIENDLY', label: 'Diabetic Friendly' },
];

const goalOptions = [
  { id: 'WEIGHT_LOSS', label: 'Weight Loss' },
  { id: 'MUSCLE_GAIN', label: 'Muscle Gain' },
  { id: 'LIVER_RECOVERY', label: 'Liver Recovery' },
  { id: 'MAINTENANCE', label: 'Maintenance' },
];

export default function PreferencesPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await userRepository.getPreferences('patient-1');
        setPrefs(data || {
          user_id: 'patient-1',
          dietary_restrictions: [],
          workout_goals: [],
          notification_enabled: true,
          updated_at: new Date().toISOString()
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleRestriction = (id: string) => {
    if (!prefs) return;
    const current = prefs.dietary_restrictions;
    const updated = current.includes(id) 
      ? current.filter(x => x !== id) 
      : [...current, id];
    setPrefs({ ...prefs, dietary_restrictions: updated });
  };

  const toggleGoal = (id: string) => {
    if (!prefs) return;
    const current = prefs.workout_goals;
    const updated = current.includes(id) 
      ? current.filter(x => x !== id) 
      : [...current, id];
    setPrefs({ ...prefs, workout_goals: updated });
  };

  const handleSave = async () => {
    if (!prefs) return;
    setSaving(true);
    try {
      await userRepository.updatePreferences(prefs.user_id, prefs);
      alert('Preferences updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update preferences');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading preferences...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      <header className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Preferences</h1>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              Dietary Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {restrictionOptions.map((opt) => (
              <div key={opt.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={opt.id} 
                  checked={prefs?.dietary_restrictions.includes(opt.id)}
                  onCheckedChange={() => toggleRestriction(opt.id)}
                />
                <Label htmlFor={opt.id}>{opt.label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-primary" />
              Primary Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {goalOptions.map((opt) => (
              <div key={opt.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={opt.id} 
                  checked={prefs?.workout_goals.includes(opt.id)}
                  onCheckedChange={() => toggleGoal(opt.id)}
                />
                <Label htmlFor={opt.id}>{opt.label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive reminders for workouts and meals.</p>
              </div>
              <Switch 
                checked={prefs?.notification_enabled} 
                onCheckedChange={(checked) => setPrefs(prev => prev ? { ...prev, notification_enabled: checked } : null)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="pt-4">
          <Button className="w-full gap-2" size="lg" onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </div>
  );
}
