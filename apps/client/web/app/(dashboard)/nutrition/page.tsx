"use client";

import { ModulePlaceholder } from "@livfit/ui";
import { Utensils } from "lucide-react";

export default function NutritionPlaceholder() {
  return (
    <ModulePlaceholder 
      title="Precision Clinical Nutrition"
      description="Track every gram of protein and sodium with our FDA-aligned food database. Includes smart meal suggestions tailored for liver regeneration."
      icon={Utensils}
    />
  );
}
