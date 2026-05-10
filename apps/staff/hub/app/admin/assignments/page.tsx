import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@livfit/ui";
import { UserCheck, UserPlus, Clock, ShieldAlert } from "lucide-react";

// Mock requests for connecting to a dietician
const requests = [
  { id: "REQ-101", user: "Vikram Singh", diagnosis: "Cirrhosis", meld: 22, date: "10 mins ago", status: "Urgent" },
  { id: "REQ-102", user: "Anita Nair", diagnosis: "Fatty Liver", meld: 7, date: "1 hour ago", status: "New" },
  { id: "REQ-103", user: "Rajesh Kumar", diagnosis: "Hepatitis B", meld: 12, date: "3 hours ago", status: "New" },
];

const dieticians = [
  { id: "D1", name: "Dr. Aris", patients: 12, specialty: "Critical Care" },
  { id: "D2", name: "Dr. Meena", patients: 8, specialty: "Lifestyle/NAFLD" },
];

export default function AssignmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignment Management</h1>
        <p className="text-muted-foreground mt-1">Approve dietician requests and assign patients to clinical specialists.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Requests */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Pending Connection Requests</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{req.user}</span>
                      <Badge variant={req.status === 'Urgent' ? 'destructive' : 'secondary'} className="text-[10px]">
                        {req.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{req.diagnosis} • MELD: {req.meld}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{req.date}</p>
                  </div>
                  <Button size="sm" className="gap-2">
                    <UserPlus className="h-3 w-3" />
                    Assign
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dietician Availability */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <CardTitle>Dietician Capacity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dieticians.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <span className="font-bold text-sm">{d.name}</span>
                    <p className="text-xs text-muted-foreground">{d.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(d.patients / 15) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{d.patients}/15 Patients</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Profile</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log / Recent Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-slate-600" />
            <CardTitle>Recent Assignment Logs</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Admin assigned <strong>Amit Sharma</strong> to <strong>Dr. Aris</strong> (Yesterday, 14:20)</p>
            <p>• Admin approved dietician request for <strong>Sriya Reddy</strong> (Yesterday, 09:15)</p>
            <p>• New connection request received from <strong>Vikram Singh</strong> (Today, 04:15)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
