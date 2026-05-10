import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, Search, Filter, Edit2, Trash2, Calendar } from "lucide-react";

const mealPlans = [
  { id: "M1", title: "High Protein Liver Support", calories: 1800, meals: 5, category: "Recovery", author: "Dr. Smith" },
  { id: "M2", title: "Low Sodium Vegeterian", calories: 1500, meals: 4, category: "Maintenance", author: "Dr. Sarah" },
  { id: "M3", title: "NAFLD Management Plan", calories: 1600, meals: 3, category: "Weight Loss", author: "Dr. Smith" },
];

export default function DietPlansPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diet Plan Builder</h1>
          <p className="text-muted-foreground mt-1">Create, manage, and assign clinical nutrition plans to your patients.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            className="h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Search plans..."
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Category
        </Button>
      </div>

      <div className="grid gap-4">
        {mealPlans.map((plan) => (
          <Card key={plan.id} className="overflow-hidden">
            <div className="flex items-center p-6 gap-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{plan.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                    {plan.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{plan.calories} kcal / day</span>
                  <span>•</span>
                  <span>{plan.meals} meals</span>
                  <span>•</span>
                  <span>By {plan.author}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4 text-slate-600" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
                <Button variant="outline" className="ml-2">
                  Assign to Patient
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Draft Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Quick Templates</h2>
        <div className="grid grid-cols-4 gap-4">
          {["Breakfast", "Lunch", "Snacks", "Dinner"].map((type) => (
            <Card key={type} className="bg-slate-50/50 border-dashed cursor-pointer hover:bg-slate-50 transition-colors">
              <CardContent className="p-6 text-center">
                <Plus className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">{type} Template</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
