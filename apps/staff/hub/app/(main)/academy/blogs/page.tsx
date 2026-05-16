"use client";

import { Card, CardContent, CardHeader, CardTitle, Button, Badge, cn } from "@livfit/ui";
import { 
  Plus, BookOpen, PencilLine, 
  Trash2, Eye, MessageSquare, 
  Share2, ArrowUpRight, TrendingUp,
  FileText, Globe, Info
} from "lucide-react";

const blogPosts = [
  { id: 1, title: "Managing Sodium Intake with NAFLD", author: "Jane Miller", status: "Published", views: "1.2k", date: "Oct 25, 2023", category: "Nutrition" },
  { id: 2, title: "Prehab: Why Strength Training Matters", author: "Jane Miller", status: "Published", views: "850", date: "Oct 20, 2023", category: "Exercise" },
  { id: 3, title: "Understanding Your MELD Score", author: "Jane Miller", status: "Draft", views: "0", date: "Nov 01, 2023", category: "Medical" },
];

export default function BlogManagementPage() {
  return (
    <div className="space-y-10 py-8 px-4 max-w-7xl mx-auto">
      {/* Literacy Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content Engine: Active</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Patient <span className="text-purple-600">Literacy Hub</span></h1>
          <p className="text-slate-500 font-medium mt-1">Empowering candidates through evidence-based educational design.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold gap-2">
            <Globe className="h-4 w-4" /> Preview Live
          </Button>
          <Button className="rounded-xl bg-purple-600 hover:bg-purple-700 font-bold gap-2 px-6">
            <Plus className="h-4 w-4" /> Create Literacy Module
          </Button>
        </div>
      </div>

      {/* Role Context Card */}
      <Card className="border-none bg-purple-50/50 shadow-sm ring-1 ring-purple-100 rounded-2xl">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-black text-purple-900 text-sm uppercase tracking-wider">Education Node Intelligence</h4>
            <p className="text-sm text-purple-700/80 mt-1 leading-relaxed">
              This dashboard is accessed by <span className="font-bold">Health Educators and Content Creators</span> to publish evidence-based blogs and educational modules that drive patient preparedness.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Content Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Published Modules", value: "24", icon: FileText, color: "purple" },
          { label: "Total Engagement", value: "8.4k", icon: Eye, color: "blue" },
          { label: "Avg. Literacy Score", value: "92%", icon: TrendingUp, color: "emerald" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm ring-1 ring-slate-200 rounded-2xl">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center", `bg-${stat.color}-500/10`)}>
                <stat.icon className={cn("h-8 w-8", `text-${stat.color}-600`)} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-0.5">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Management */}
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="border-none shadow-sm ring-1 ring-slate-200 rounded-2xl overflow-hidden hover:ring-purple-400/50 transition-all group">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="h-32 w-full md:w-48 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 border-none text-[8px] font-black uppercase tracking-widest">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1.5"><PencilLine className="h-3 w-3" /> {post.author}</span>
                      <span className="flex items-center gap-1.5"><Eye className="h-3 w-3" /> {post.views} Views</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={cn(
                      "rounded-lg border-none px-3 py-1 text-[10px] font-black tracking-widest uppercase",
                      post.status === 'Published' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    )}>
                      {post.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 h-10 w-10">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 h-10 w-10">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-red-50 text-red-500 h-10 w-10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
