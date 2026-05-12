"use client";

import { ModulePlaceholder } from "@livfit/ui";
import { BookOpen } from "lucide-react";

export default function LearningPlaceholder() {
  return (
    <ModulePlaceholder 
      title="Transplant Literacy Center"
      description="Knowledge is your best prehab tool. Dive into our curriculum on liver health, surgical procedures, and post-op self-care strategies."
      icon={BookOpen}
    />
  );
}
