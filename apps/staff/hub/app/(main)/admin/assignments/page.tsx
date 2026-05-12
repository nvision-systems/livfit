"use client";

import { ModulePlaceholder } from "@livfit/ui";
import { Users } from "lucide-react";

export default function AssignmentsPlaceholder() {
  return (
    <ModulePlaceholder 
      title="Global Patient Assignments"
      description="Efficiently route patients to the correct hepatologists and dieticians based on caseload and surgical urgency. Includes automated shift-handoff logic."
      icon={Users}
    />
  );
}
