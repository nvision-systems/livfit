"use client";

import { ModulePlaceholder } from "@livfit/ui";
import { MessageSquare } from "lucide-react";

export default function MessagesPlaceholder() {
  return (
    <ModulePlaceholder 
      title="Secure Clinical Chat"
      description="Connect directly with your transplant coordinator and dietician in a HIPAA-compliant environment. Includes real-time file sharing for lab results."
      icon={MessageSquare}
    />
  );
}
