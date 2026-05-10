import { Card, CardContent, CardHeader, CardTitle, Button } from "@livfit/ui";
import Link from "next/link";
import { ShieldCheck, UserCog, ExternalLink, BookOpen, Settings } from "lucide-react";

export default function StaffHubPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 max-w-5xl mx-auto px-4">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Welcome to <span className="text-primary">LivFit Hub</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unified healthcare management and content distribution platform. 
          Please select your professional workspace.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-full">
        {/* Admin Card */}
        <Link href="/admin/assignments" className="group">
          <Card className="h-full border-2 transition-all group-hover:border-primary group-hover:shadow-xl">
            <CardHeader>
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-2">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Administration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage staff assignments, patient loads, and system health.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Dietician Card */}
        <Link href="/dietician" className="group">
          <Card className="h-full border-2 transition-all group-hover:border-primary group-hover:shadow-xl">
            <CardHeader>
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-2">
                <UserCog className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Clinical Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor patient vitals, MELD scores, and nutrition plans.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Content Card */}
        <Link href="/content/blogs" className="group">
          <Card className="h-full border-2 transition-all group-hover:border-primary group-hover:shadow-xl">
            <CardHeader>
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-2">
                <BookOpen className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Content Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Publish blog posts, health tips, and YouTube Shorts.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* External Card */}
        <Link href="/external" className="group">
          <Card className="h-full border-2 transition-all group-hover:border-primary group-hover:shadow-xl">
            <CardHeader>
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-2">
                <ExternalLink className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Partner Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access third-party modules and vendor integration templates.
              </p>
            </CardContent>
          </Card>
        </Link>
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
