'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, Badge, Button } from "@livfit/ui";
import { Calendar, User, ChevronLeft, ShieldCheck, BookOpen } from "lucide-react";
import { blogRepository, BlogPost } from "@livfit/lib";
import Link from 'next/link';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = params?.id as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idStr) return;
    async function loadData() {
      try {
        const idNum = parseInt(idStr, 10);
        const data = await blogRepository.getById(idNum);
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [idStr]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground font-semibold">Structuring clinical resource...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Article Not Found</h2>
        <p className="text-muted-foreground text-lg">The medical education resource you are looking for has been draft-retired or does not exist.</p>
        <Link href="/blog">
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Back to Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back navigation */}
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 mb-8 text-muted-foreground hover:text-slate-900 transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back to Articles
          </Button>
        </Link>

        <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
          {/* Header Image placeholder matched to Mobile catalog theme */}
          <div className="h-64 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative overflow-hidden border-b border-slate-100">
             <BookOpen className="h-24 w-24 text-primary/10" />
             <div className="absolute top-6 left-6">
               <Badge className="bg-primary/90 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                 Clinical
               </Badge>
             </div>
          </div>

          <div className="p-8 sm:p-12 space-y-6">
            {/* Verification Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-extrabold shadow-sm border border-emerald-100">
              <ShieldCheck className="h-4 w-4 text-emerald-600 animate-pulse" />
              LIVFIT Clinically Verified Resource
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
              {post.title}
            </h1>

            {/* Physician Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-b border-slate-100 pb-8 mb-4">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100/50">
                <User className="h-4 w-4 text-slate-400" />
                <span className="font-semibold text-slate-700">{(post as any).author || "Dr. Sarah Smith"}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100/50">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="font-semibold text-slate-600">
                  {new Date(post.created_at || (post as any).date || new Date()).toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            {/* Structured HTML Rich-Text Render */}
            <div className="rich-text-wrapper text-slate-800 leading-relaxed text-base sm:text-lg font-medium space-y-6">
              <div 
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <style jsx global>{`
                .rich-text-content p {
                  margin-bottom: 1.5rem;
                  line-height: 1.8;
                  color: #334155;
                }
                .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 {
                  font-weight: 800;
                  color: #0f172a;
                  margin-top: 2.25rem;
                  margin-bottom: 1rem;
                  letter-spacing: -0.025em;
                }
                .rich-text-content h1 { font-size: 1.875rem; }
                .rich-text-content h2 { font-size: 1.5rem; }
                .rich-text-content h3 { font-size: 1.25rem; }
                .rich-text-content ul, .rich-text-content ol {
                  margin-left: 1.75rem;
                  margin-bottom: 1.5rem;
                  list-style-type: disc;
                }
                .rich-text-content li {
                  margin-bottom: 0.5rem;
                  color: #334155;
                  line-height: 1.7;
                }
                .rich-text-content strong {
                  font-weight: 700;
                  color: #0f172a;
                }
              `}</style>
            </div>

            {/* Back Button Footer */}
            <div className="pt-8 border-t border-slate-100 mt-12 flex justify-center">
              <Link href="/blog">
                <Button size="lg" className="rounded-2xl px-8 shadow-md hover:shadow-lg transition-all font-bold">
                  Back to Patient Education
                </Button>
              </Link>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}
