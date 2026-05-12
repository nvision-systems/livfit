"use client";

import { ModulePlaceholder } from "@livfit/ui";
import { Dumbbell } from "lucide-react";

export default function WorkoutsPlaceholder() {
  return (
    <ModulePlaceholder 
      title="Advanced Prehab Training"
      description="Access your personalized surgical-ready workout plan. Our upcoming engine uses AI to adjust your intensity based on daily MELD score fluctuations."
      icon={Dumbbell}
    />
  );
}
