import { Card, CardContent, CardHeader, CardTitle, Button } from "@livfit/ui";
import { Activity, Apple, Dumbbell, MessageSquare, User } from "lucide-react";

export default function PatientDashboard() {
  return (
    <div className="p-8 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, John Doe</h1>
          <p className="text-muted-foreground mt-1">Here is your clinical progress overview for today.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Contact Dietician
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MELD Score</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">-2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein Intake</CardTitle>
            <Apple className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85g / 120g</div>
            <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-600" style={{ width: '70%' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts Done</CardTitle>
            <Dumbbell className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 / 5</div>
            <p className="text-xs text-muted-foreground mt-1">On track for weekly goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fluid Intake</CardTitle>
            <Activity className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8L / 2.5L</div>
            <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-600" style={{ width: '72%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Nutrition Summary</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-slate-50/50">
            <p className="text-muted-foreground">Calories & Macro breakdown charts will appear here.</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Workout Completed</p>
                  <p className="text-xs text-muted-foreground">Upper Body Focus</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Meal Logged</p>
                  <p className="text-xs text-muted-foreground">Grilled Chicken Salad</p>
                </div>
                <span className="text-xs text-muted-foreground">4h ago</span>
              </div>
              <div className="flex justify-between items-start border-t pt-4">
                <Button variant="ghost" className="w-full text-xs" size="sm">View All Logs</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
