"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { 
  Users, 
  ClipboardList, 
  MessageSquare, 
  LayoutDashboard, 
  UserPlus, 
  Activity, 
  Database, 
  ShieldCheck,
  LogOut,
  BookOpen,
  Video
} from "lucide-react";

const adminLinks = [
  { href: "/admin/assignments", label: "Assignments", icon: UserPlus },
  { href: "/admin/monitoring", label: "Monitoring", icon: Activity },
  { href: "/admin/food-db", label: "Food DB", icon: Database },
];

const contentLinks = [
  { href: "/content/blogs", label: "Blog Posts", icon: BookOpen },
  { href: "/content/videos", label: "Exercise Videos", icon: Video },
];

const superAdminLinks = [
  { href: "/super-admin/roles", label: "Roles & Permissions", icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();

  const NavLink = ({ href, label, icon: Icon }: any) => {
    const isActive = pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    );
  };

  return (
    <aside className="w-64 border-r bg-white p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary">LivFit Admin</h1>
        <p className="text-xs text-muted-foreground mt-1">Healthcare Console</p>
      </div>

      <nav className="space-y-8">
        <div>
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Administration
          </h2>
          <div className="space-y-1">
            {adminLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Content Management
          </h2>
          <div className="space-y-1">
            {contentLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            System
          </h2>
          <div className="space-y-1">
            {superAdminLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-8">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
