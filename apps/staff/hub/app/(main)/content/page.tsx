"use client";

import { ModulePlaceholder } from "@livfit/ui";
import { BookOpen } from "lucide-react";

export default function ContentEnginePlaceholder() {
  return (
    <ModulePlaceholder 
      title="Medical Content Engine"
      description="Create, review, and publish evidence-based education for your patients. Supports rich text, clinical diagrams, and verified video integration."
      icon={BookOpen}
    />
  );
}
