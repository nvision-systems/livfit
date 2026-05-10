"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle, Button, YoutubePlayer } from "@livfit/ui";
import { Save, ArrowLeft, Youtube, Tag, Smartphone } from "lucide-react";
import Link from "next/link";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function NewBlogPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [isVertical, setIsVertical] = useState(false);
  const [tags, setTags] = useState("");

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  }), []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/content/blogs">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Button>
        </Link>
        <Button className="gap-2 bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4" />
          Save & Publish
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Editor Side */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Enter Post Title..."
                className="w-full text-2xl font-bold border-none focus:ring-0 placeholder:text-slate-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="h-[400px]">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  className="h-[340px]"
                  placeholder="Start writing clinical insights..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Media & Metadata Side */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Youtube className="h-4 w-4 text-red-600" />
                Video Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase">YouTube Video ID</label>
                <input
                  type="text"
                  placeholder="e.g. dQw4w9WgXcQ"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={youtubeId}
                  onChange={(e) => setYoutubeId(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Reels/Shorts Mode</span>
                </div>
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={isVertical}
                  onChange={(e) => setIsVertical(e.target.checked)}
                />
              </div>

              {youtubeId && (
                <div className="pt-2">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Live Preview</p>
                  <YoutubePlayer 
                    videoId={youtubeId} 
                    isVertical={isVertical}
                    className="max-h-[200px]"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Categorization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label className="text-xs font-medium text-muted-foreground uppercase">Tags (Comma separated)</label>
              <input
                type="text"
                placeholder="Nutrition, LiverHealth, Exercise"
                className="w-full px-3 py-2 border rounded-md text-sm mt-1"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
