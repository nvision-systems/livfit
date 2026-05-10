import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ShieldCheck, ShieldAlert, Key, Plus, MoreVertical } from "lucide-react";

const roles = [
  { 
    name: "Super Admin", 
    description: "Full system access, including master data and role management.",
    permissions: ["Full Access"],
    count: 1
  },
  { 
    name: "Admin", 
    description: "Manage dieticians, assign patients, and monitor audit logs.",
    permissions: ["Manage Users", "View Logs", "Assign Roles"],
    count: 3
  },
  { 
    name: "Dietician", 
    description: "Clinical role for patient nutrition and workout management.",
    permissions: ["Patient Care", "Chat Access", "Diet Plans"],
    count: 12
  },
];

export default function RolesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Roles & Permissions</h1>
          <p className="text-muted-foreground mt-1">Manage core system access and define healthcare-grade security permissions.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Role
        </Button>
      </div>

      <div className="grid gap-6">
        {roles.map((role) => (
          <Card key={role.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">{role.count} Active Accounts</span>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mt-2">
                {role.permissions.map((permission) => (
                  <div 
                    key={permission} 
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    <Key className="h-3 w-3" />
                    {permission}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed bg-slate-50/50">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <ShieldAlert className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-bold">Audit Requirements</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            All role changes are logged in the immutable master audit log for healthcare compliance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
