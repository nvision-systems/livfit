"use client";

import React from "react";
import { cn } from "../lib/utils";

interface FooterProps {
  className?: string;
  variant?: "light" | "dark" | "transparent";
}

export function Footer({ className, variant = "light" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "py-8 px-6 text-center border-t",
        variant === "light" && "bg-white border-slate-200 text-slate-500",
        variant === "dark" && "bg-slate-950 border-white/5 text-slate-400",
        variant === "transparent" && "bg-transparent border-transparent text-slate-500",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.2em]">
          Developed by &copy; 2026 thestratup.com. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
