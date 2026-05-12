'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@livfit/ui";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { blogRepository, BlogPost } from "@livfit/lib";
import Link from 'next/link';

export default function BlogFeedPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await blogRepository.getAll(true);
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading education feed...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Patient Education</h1>
        <p className="text-xl text-muted-foreground">Expert clinical advice and lifestyle tips for your recovery journey.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? posts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full hover:shadow-xl transition-shadow border-none shadow-md">
            <div className="h-48 bg-slate-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
               <BookOpen className="h-16 w-16 text-slate-300" />
               <div className="absolute top-4 left-4">
                 <Badge className="bg-primary/90">Clinical</Badge>
               </div>
            </div>
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Dr. Sarah Smith
                </span>
              </div>
              <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Link href={`/blog/${post.id}`}>
                <Button variant="ghost" className="w-full justify-between group">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Card>
        )) : (
          <div className="col-span-full py-12 text-center text-muted-foreground italic">
            No articles published yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}
