import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@livfit/ui";
import { Search, UserCircle, Activity, MessageSquare } from "lucide-react";
import { cn } from "../../lib/utils";

// Mock data based on the healthcare requirements
const patients = [
  { 
    id: "P1", 
    name: "Amit Sharma", 
    age: 45, 
    diagnosis: "Chronic Liver Disease", 
    meld: 14, 
    lastActivity: "2 hours ago",
    status: "Active"
  },
  { 
    id: "P2", 
    name: "Sriya Reddy", 
    age: 32, 
    diagnosis: "Fatty Liver (NAFLD)", 
    meld: 8, 
    lastActivity: "1 day ago",
    status: "Pending Plan"
  },
  { 
    id: "P3", 
    name: "Vikram Singh", 
    age: 58, 
    diagnosis: "Cirrhosis", 
    meld: 22, 
    lastActivity: "15 mins ago",
    status: "Critical"
  },
];

export default function PatientsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assigned Patients</h1>
          <p className="text-muted-foreground mt-1">Manage nutrition and monitor progress for your assigned users.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              className="h-10 w-64 rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Search patients..."
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">{patient.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{patient.id} • {patient.age} yrs</p>
                </div>
              </div>
              <Badge variant={patient.status === 'Critical' ? 'destructive' : 'secondary'}>
                {patient.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Diagnosis:</span>
                  <span className="font-medium">{patient.diagnosis}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">MELD Score:</span>
                  <span className={cn("font-bold px-2 py-0.5 rounded", 
                    patient.meld > 15 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                  )}>
                    {patient.meld}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Activity:</span>
                  <span className="text-muted-foreground">{patient.lastActivity}</span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1 gap-2" size="sm">
                  <Activity className="h-4 w-4" />
                  Details
                </Button>
                <Button className="flex-1 gap-2" size="sm">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
