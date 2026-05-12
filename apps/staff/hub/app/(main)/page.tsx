import { Card, CardContent, CardHeader, CardTitle, Button } from "@livfit/ui";
import Link from "next/link";
import { ShieldCheck, UserCog, ExternalLink, BookOpen, Settings, Users, Dumbbell, Utensils } from "lucide-react";
import { getServerSession } from "@livfit/lib";
import { redirect } from "next/navigation";

export default async function StaffHubPage() {
  const session = await getServerSession();
  const role = session?.user?.app_metadata?.role;

  if (role === 'ADMIN') {
    redirect('/admin/assignments');
  }

  if (role === 'DIETICIAN') {
    redirect('/dietician');
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 max-w-6xl mx-auto px-4 py-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Welcome to <span className="text-primary">LivFit Hub</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unified healthcare management and content distribution platform. 
          Please select your professional workspace.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
        {/* Admin Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">Administration</h3>
          <div className="grid gap-4">
            <Link href="/admin/users" className="group">
              <Card className="border-2 transition-all group-hover:border-primary group-hover:shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">User Management</CardTitle>
                    <p className="text-xs text-muted-foreground">Manage roles & access</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/assignments" className="group">
              <Card className="border-2 transition-all group-hover:border-primary group-hover:shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Clinical Assignments</CardTitle>
                    <p className="text-xs text-muted-foreground">Patient-Dietician mapping</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Clinical Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">Clinical Portal</h3>
          <div className="grid gap-4">
            <Link href="/dietician/workouts" className="group">
              <Card className="border-2 transition-all group-hover:border-primary group-hover:shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Workout Plans</CardTitle>
                    <p className="text-xs text-muted-foreground">Design fitness routines</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dietician/meal-plans" className="group">
              <Card className="border-2 transition-all group-hover:border-primary group-hover:shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                    <Utensils className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Meal Plans</CardTitle>
                    <p className="text-xs text-muted-foreground">Nutritional management</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Content & External */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">Communication</h3>
          <div className="grid gap-4">
            <Link href="/content/blogs" className="group">
              <Card className="border-2 transition-all group-hover:border-primary group-hover:shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Educational Content</CardTitle>
                    <p className="text-xs text-muted-foreground">Publish blogs & tips</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/external" className="group">
              <Card className="border-2 transition-all group-hover:border-primary group-hover:shadow-md">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-slate-500/10 text-slate-600">
                    <ExternalLink className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Partner Portal</CardTitle>
                    <p className="text-xs text-muted-foreground">Vendor integrations</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-8">
        <Button variant="ghost" className="gap-2 text-muted-foreground">
          <Settings className="h-4 w-4" />
          Hub Settings
        </Button>
      </div>
    </div>
  );
}
