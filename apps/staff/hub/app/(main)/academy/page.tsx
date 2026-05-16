"use client";

import { Card, CardContent, CardHeader, CardTitle, Button, Badge, cn } from "@livfit/ui";
import { 
  BookOpen, PencilLine, Video, Share2, 
  Eye, MessageCircle, BarChart3, Plus,
  Search, Filter, ArrowRight, TrendingUp,
  FileText, Globe, Zap
} from "lucide-react";
import Link from "next/link";

const recentPosts = [
  { id: 1, title: "Managing Sodium with NAFLD", category: "Nutrition", views: "1.2k", engagement: "84%", status: "Published" },
  { id: 2, title: "Gentle Yoga for Liver Health", category: "Exercise", views: "850", engagement: "92%", status: "Draft" },
  { id: 3, title: "Understanding MELD Scores", category: "Clinical", views: "2.4k", engagement: "76%", status: "Published" },
];

export default function EducatorDashboard() {
  return (
    <div className="space-y-10 py-8 px-4 max-w-7xl mx-auto">
      {/* Educator Hero Header */}
      <div className="relative p-12 rounded-[2.5rem] bg-slate-900 overflow-hidden group shadow-2xl shadow-purple-900/10">
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Content Engine Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Patient <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">Education</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-xl text-lg">
              Empower patients with high-quality clinical content, instructional videos, and dietary guides for <span className="text-white font-bold">surgical readiness</span>.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link href="/content/blogs/new">
              <Button className="w-full h-12 px-8 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black gap-2 transition-all hover:scale-105 shadow-lg shadow-purple-600/20">
                <Plus className="h-4 w-4" /> Create New Content
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-12 rounded-2xl border-white/10 text-white hover:bg-white/5 font-bold gap-2">
                <Video className="h-4 w-4" /> Video
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-2xl border-white/10 text-white hover:bg-white/5 font-bold gap-2">
                <Share2 className="h-4 w-4" /> Distribute
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Reach", value: "42.8k", icon: Globe, color: "purple" },
          { label: "Articles Published", value: "128", icon: FileText, color: "blue" },
          { label: "Video Lessons", value: "42", icon: Video, color: "pink" },
          { label: "Avg. Engagement", value: "86%", icon: Zap, color: "amber" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm ring-1 ring-slate-200 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center", `bg-${stat.color}-500/10`)}>
                <stat.icon className={cn("h-7 w-7", `text-${stat.color}-600`)} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Content Management Table */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 rounded-3xl overflow-hidden">
          <CardHeader className="bg-white p-8 border-b border-slate-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black text-slate-900">Recent Publications</CardTitle>
              <p className="text-xs text-slate-500 font-medium tracking-tight mt-1">Monitor performance and engagement across channels.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9 rounded-xl border-slate-200 gap-2 font-bold text-[10px] uppercase tracking-widest">
                <Filter className="h-3.5 w-3.5" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Title & Category</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Performance</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-purple-50/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900">{post.title}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{post.category}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5 text-slate-300" />
                            <span className="text-sm font-black text-slate-700">{post.views}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-sm font-black text-slate-700">{post.engagement}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <Badge className={cn(
                          "rounded-lg border-none px-3 py-1 text-[10px] font-black tracking-widest uppercase",
                          post.status === 'Published' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                        )}>
                          {post.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl hover:bg-purple-600 hover:text-white transition-all text-purple-600">
                          <PencilLine className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Insights */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 rounded-3xl overflow-hidden bg-linear-to-br from-purple-600 to-indigo-700 text-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg">Weekly Highlight</h3>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-black leading-tight">Patient Literacy is up by 14%</h4>
                <p className="text-purple-100 text-sm font-medium leading-relaxed">
                  The new "MELD Explained" video series has seen exceptional completion rates in the first 72 hours.
                </p>
              </div>
              <Button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-black rounded-xl text-xs uppercase tracking-widest py-6">
                View Engagement Heatmap
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest">Global Feedback</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100" />
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Patient #4281</span>
                </div>
                <p className="text-xs text-slate-500 font-medium italic">"The sodium guide really helped me organize my pantry. Very practical advice!"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-100" />
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Dietician Review</span>
                </div>
                <p className="text-xs text-slate-500 font-medium italic">"Excellent visuals on the yoga sequence. Approved for Stage 2 patients."</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
