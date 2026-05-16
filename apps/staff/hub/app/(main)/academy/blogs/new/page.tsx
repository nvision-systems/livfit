'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Textarea, Switch } from "@livfit/ui";
import { ChevronLeft, Save, Eye, Hash } from "lucide-react";
import { blogRepository } from "@livfit/lib";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !content) return alert('Please enter title and content');
    
    setLoading(true);
    try {
      await blogRepository.create({
        title,
        content,
        is_published: isPublished,
        author_id: 'admin-1', // Placeholder
        created_at: new Date().toISOString()
      });
      alert('Blog post created!');
      router.push('/content/blogs');
    } catch (error) {
      console.error(error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">New Educational Content</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={loading} className="gap-2">
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Understanding Liver Enzymes" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-bold h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Write your article here..." 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Publishing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Published Status</Label>
                <Switch checked={isPublished} onCheckedChange={setIsPublished} />
              </div>
              <div className="pt-4 border-t space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Tags
                  </Label>
                  <Input placeholder="liver, nutrition, recovery" />
                  <p className="text-xs text-muted-foreground">Comma separated tags for search.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-50">
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">
                <strong>Tip:</strong> Keep titles under 60 characters for best visibility on mobile devices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
