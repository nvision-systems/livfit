"use client";

import { cn } from "../../lib/utils";
import { Button } from "../button";
import { 
  LayoutDashboard, Dumbbell, Utensils, MessageSquare, 
  BookOpen, Users, Settings, LogOut, ChevronLeft, ChevronRight,
  ShieldCheck, Activity
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarItem {
  title: string;
  href: string;
  icon: any;
  roles?: string[];
}

const patientNav: SidebarItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Workouts", href: "/workouts", icon: Dumbbell },
  { title: "Nutrition", href: "/nutrition", icon: Utensils },
  { title: "Messages", href: "/messages", icon: MessageSquare },
  { title: "Learning", href: "/learning", icon: BookOpen },
];

const staffNav: SidebarItem[] = [
  { title: "Hub Home", href: "/", icon: LayoutDashboard },
  { title: "Assignments", href: "/admin/assignments", icon: ShieldCheck, roles: ["ADMIN"] },
  { title: "User Management", href: "/admin/users", icon: Users, roles: ["ADMIN"] },
  { title: "Clinical Plans", href: "/dietician", icon: Activity, roles: ["DIETICIAN", "ADMIN"] },
  { title: "Content Engine", href: "/content", icon: BookOpen, roles: ["ADMIN", "HEALTH_EDUCATOR"] },
];

export interface SidebarProps {
  role?: string;
  onLogout?: () => void;
  className?: string;
}

export function Sidebar({ role = "patient", onLogout, className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const items = role === "patient" ? patientNav : staffNav;

  return (
    <div className={cn(
      "h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out",
      collapsed ? "w-[80px]" : "w-[280px]",
      className
    )}>
      {/* Brand Logo */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white h-5 w-5" />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900">LIVFIT</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <Activity className="text-white h-5 w-5" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110",
                isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              {!collapsed && (
                <span className="font-bold text-sm">{item.title}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
        >
          {collapsed ? <ChevronRight className="h-5 w-5 mx-auto" /> : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-bold">Collapse Sidebar</span>
            </>
          )}
        </button>
        
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-bold">Settings</span>}
          </div>
        </Link>
        
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-bold">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
