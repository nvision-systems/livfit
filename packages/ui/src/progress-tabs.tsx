"use client";

import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Progress Component
 */
export const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-slate-100",
      className
    )}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-blue-600 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));
Progress.displayName = "Progress";

/**
 * Tabs Components (Simplified for Demo)
 */
export const Tabs = ({ children, className, defaultValue }: any) => {
  return <div className={cn("w-full", className)}>{children}</div>;
};

export const TabsList = ({ children, className }: any) => {
  return <div className={cn("inline-flex items-center justify-center rounded-lg bg-slate-100 p-1", className)}>{children}</div>;
};

export const TabsTrigger = ({ children, className, value }: any) => {
  return (
    <button className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", className)}>
      {children}
    </button>
  );
};

export const TabsContent = ({ children, className, value }: any) => {
  return <div className={cn("mt-2", className)}>{children}</div>;
};
