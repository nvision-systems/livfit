"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { 
  Users, 
  ClipboardList, 
  MessageSquare, 
  LayoutDashboard, 
  LogOut
} from "lucide-react";

const links = [
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/plans", label: "Diet Plans", icon: ClipboardList },
  { href: "/chat", label: "Chat", icon: MessageSquare },
];

export function DieticianSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary">LivFit Dietician</h1>
        <p className="text-xs text-muted-foreground mt-1">Clinical Portal</p>
      </div>

      <nav className="space-y-1 flex-1">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 border-t">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
