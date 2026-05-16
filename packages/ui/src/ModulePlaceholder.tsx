"use client";

import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Activity, Layout, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: any;
  className?: string;
}

export function ModulePlaceholder({ title, description, icon: Icon, className }: ModulePlaceholderProps) {
  return (
    <div className={cn("p-12 flex flex-col items-center justify-center min-h-[70vh] text-center max-w-2xl mx-auto space-y-8", className)}>
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 flex items-center justify-center animate-pulse">
          <Icon className="h-10 w-10 text-blue-600 opacity-20" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white shadow-xl flex items-center justify-center ring-1 ring-slate-100">
          <Activity className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-center">
          <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-none font-black uppercase tracking-widest text-[10px] px-3 py-1">
            Production Pipeline: Active
          </Badge>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">{title}</h1>
        <p className="text-slate-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      <Card className="border-none shadow-xl shadow-blue-50 ring-1 ring-slate-100 bg-white w-full">
        <CardContent className="p-8 text-left space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Next Feature Milestone</p>
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <Layout className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Enhanced Analytics Integration</p>
                <p className="text-xs text-slate-500 font-medium italic">Scheduled for Q3 2026</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" className="rounded-xl border-slate-200 font-bold px-8">
          Request Early Access
        </Button>
        <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold px-8 shadow-lg shadow-blue-100">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
