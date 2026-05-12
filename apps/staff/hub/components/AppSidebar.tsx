"use client";

import { Sidebar, SidebarSection } from "@livfit/ui";
import { UserPlus, Activity, Database, BookOpen, Video, ShieldCheck } from "lucide-react";

const sidebarSections: SidebarSection[] = [
  {
    title: "Administration",
    links: [
      { href: "/admin/assignments", label: "Assignments", icon: UserPlus },
      { href: "/admin/monitoring", label: "Monitoring", icon: Activity },
      { href: "/admin/food-db", label: "Food DB", icon: Database },
    ]
  },
  {
    title: "Content Management",
    links: [
      { href: "/content/blogs", label: "Blog Posts", icon: BookOpen },
      { href: "/content/videos", label: "Exercise Videos", icon: Video },
    ]
  },
  {
    title: "System",
    links: [
      { href: "/super-admin/roles", label: "Roles & Permissions", icon: ShieldCheck },
    ]
  }
];

export function AppSidebar() {
  return (
    <Sidebar 
      sections={sidebarSections} 
      onLogout={() => console.log("Logout triggered")} 
    />
  );
}
