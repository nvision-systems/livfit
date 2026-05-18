"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Switch, cn } from "@livfit/ui";
import { ChevronLeft, Save, Eye, Hash, AlertCircle, CheckCircle2 } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

interface AcademyEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialIsPublished?: boolean;
  initialTags?: string;
  onSave: (data: { title: string; content: string; isPublished: boolean; tags: string }) => Promise<void>;
  loading?: boolean;
  saved?: boolean;
  mode: 'new' | 'edit';
  onBack: () => void;
}

export function AcademyEditor({
  initialTitle = '',
  initialContent = '',
  initialIsPublished = false,
  initialTags = '',
  onSave,
  loading = false,
  saved = false,
  mode,
  onBack
}: AcademyEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPublished, setIsPublished] = useState(initialIsPublished);
  const [tags, setTags] = useState(initialTags);

  const [showRestoreDraft, setShowRestoreDraft] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);

  const draftKey = `livfit_draft_editor_${mode}_${mode === 'edit' ? initialTitle.slice(0, 30).replace(/\s+/g, '_') : 'new'}`;

  // Hook to check for unsaved local draft on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        // Only prompt restore if the draft content differs significantly from loaded props
        if (
          (parsed.content && parsed.content !== initialContent && parsed.content !== '<p><br></p>') || 
          (parsed.title && parsed.title !== initialTitle)
        ) {
          setDraftData(parsed);
          setShowRestoreDraft(true);
        }
      }
    } catch (e) {
      console.warn("Failed to retrieve draft from localStorage", e);
    }
  }, [draftKey, initialContent, initialTitle]);

  // Hook to auto-save typed content on change
  useEffect(() => {
    if (!title && (!content || content === '<p><br></p>') && !tags) {
      return;
    }
    
    // Do not overwrite initial clean mount state with draft until user starts editing
    if (title === initialTitle && content === initialContent && tags === initialTags && isPublished === initialIsPublished) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        const draft = { title, content, isPublished, tags, timestamp: Date.now() };
        localStorage.setItem(draftKey, JSON.stringify(draft));
      } catch (e) {
        console.warn("Failed to save draft to localStorage", e);
      }
    }, 1000); // Debounce saves by 1 second to maximize performance

    return () => clearTimeout(timer);
  }, [title, content, isPublished, tags, draftKey, initialTitle, initialContent, initialTags, initialIsPublished]);

  useEffect(() => {
    // Client-side execution to intercept video embed links and format them cleanly
    import('react-quill-new').then((QuillModule) => {
      const Quill = QuillModule.Quill;
      if (!Quill) return;
      const Video = Quill.import('formats/video') as any;
      
      if (Video && !Video.__customSanitized) {
        const originalSanitize = Video.sanitize;
        Video.sanitize = function(url: string) {
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          const match = url.match(regExp);
          const videoId = (match && match[2].length === 11) ? match[2] : null;
          
          if (videoId) {
            return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
          }
          return originalSanitize ? originalSanitize(url) : url;
        };
        Video.__customSanitized = true;
      }
    }).catch(err => console.error("Failed to register dynamic Quill embed filters", err));
  }, []);

  const handleSave = () => {
    if (!title || !content || content === '<p><br></p>') {
      alert('Please enter a title and content to save the module.');
      return;
    }
    // Success: clear local auto-save draft
    try {
      localStorage.removeItem(draftKey);
    } catch (e) {}
    onSave({ title, content, isPublished, tags });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Restore Draft Alert Banner */}
      {showRestoreDraft && draftData && (
        <div className="flex items-center justify-between p-5 bg-purple-950/20 border border-purple-500/20 rounded-3xl backdrop-blur-xl shadow-xl shadow-purple-950/5 text-purple-200 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400 shrink-0">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">Unsaved draft detected</p>
              <p className="text-xs text-slate-500 mt-0.5">We found an unsaved local copy from {new Date(draftData.timestamp).toLocaleTimeString()}. Do you want to restore your progress?</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button 
              size="sm" 
              onClick={() => {
                setTitle(draftData.title);
                setContent(draftData.content);
                setIsPublished(draftData.isPublished);
                setTags(draftData.tags);
                setShowRestoreDraft(false);
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-10 px-5 shadow-lg shadow-purple-600/20"
            >
              Restore Draft
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => {
                try {
                  localStorage.removeItem(draftKey);
                } catch (e) {}
                setShowRestoreDraft(false);
              }}
              className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-xl h-10 px-4 font-bold"
            >
              Discard
            </Button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="relative p-8 rounded-3xl bg-slate-900 overflow-hidden group shadow-2xl shadow-purple-900/10">
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/30 via-indigo-600/20 to-transparent opacity-80" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="h-10 w-10 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md border border-white/10 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Content Studio</span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                {mode === 'new' ? 'New Literacy Module' : 'Edit Literacy Module'}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 h-11 rounded-xl border-white/20 text-white hover:bg-white/10 font-bold backdrop-blur-md bg-white/5">
              <Eye className="h-4 w-4" /> Preview
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={loading || saved} 
              className={cn(
                "gap-2 h-11 px-6 rounded-xl font-black transition-all",
                saved ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 hover:scale-105"
              )}
            >
              {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? 'Saved!' : loading ? 'Saving...' : mode === 'new' ? 'Publish Module' : 'Update Module'}
            </Button>
          </div>
        </div>
      </header>

      {/* Editor Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-0">
              <div className="p-6 md:p-8 border-b border-slate-100">
                <Input 
                  id="title" 
                  placeholder="Module Title (e.g. Navigating Stage 2 Recovery)" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl md:text-3xl font-black h-auto p-0 border-none shadow-none focus-visible:ring-0 placeholder:text-slate-300 text-slate-900 bg-transparent"
                />
              </div>
              
              <div className="editor-container p-6 md:p-8 pt-4">
                <style jsx global>{`
                  .editor-container .ql-container {
                    border: none !important;
                    font-family: inherit;
                    font-size: 1.1rem;
                    min-height: 400px;
                  }
                  .editor-container .ql-toolbar {
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    background: #f8fafc;
                    padding: 8px;
                    margin-bottom: 16px;
                  }
                  .editor-container .ql-editor {
                    padding: 0;
                    color: #334155;
                    line-height: 1.8;
                  }
                  .editor-container .ql-editor.ql-blank::before {
                    left: 0;
                    font-style: normal;
                    color: #cbd5e1;
                  }
                  .editor-container .ql-editor h1, 
                  .editor-container .ql-editor h2, 
                  .editor-container .ql-editor h3 {
                    color: #0f172a;
                    font-weight: 900;
                    margin-bottom: 1rem;
                    margin-top: 2rem;
                  }
                `}</style>
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  modules={modules}
                  placeholder="Start crafting clinical education here..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-6">
          {/* Publishing Card */}
          <Card className="border-none shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Save className="h-4 w-4 text-purple-600" /> Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-200/60">
                <div>
                  <Label className="font-bold text-slate-900">Live Status</Label>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Publish immediately</p>
                </div>
                <Switch checked={isPublished} onCheckedChange={setIsPublished} className="data-[state=checked]:bg-purple-600" />
              </div>
              
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                  <Hash className="h-4 w-4" /> Discoverability Tags
                </Label>
                <Input 
                  placeholder="nutrition, prep, lifestyle..." 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-purple-500"
                />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Comma separated for patient search</p>
              </div>
            </CardContent>
          </Card>

          {/* Media Helper */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-linear-to-br from-indigo-50 to-purple-50">
            <CardContent className="p-6 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="space-y-3">
                <h4 className="font-black text-purple-900 text-sm">Media Best Practices</h4>
                <p className="text-xs text-purple-700 leading-relaxed font-semibold">
                  To embed patient videos with zero ads and minimized suggestions:
                </p>
                <ul className="text-xs text-purple-750/90 list-disc pl-4 space-y-2 font-medium">
                  <li>
                    <strong className="text-purple-900">Ad-Free Privacy Mode:</strong> Copy the embed URL using the <code className="bg-purple-100/60 px-1 py-0.5 rounded text-[10px] font-mono">youtube-nocookie.com</code> domain to block tracking cookie ads.
                  </li>
                  <li>
                    <strong className="text-purple-900">Block Competitor Suggestions:</strong> Append <code className="bg-purple-100/60 px-1 py-0.5 rounded text-[10px] font-mono">?rel=0</code> to the end of your embed link to restrict recommendations solely to your own channel's content.
                  </li>
                  <li>
                    <span className="italic">Example link:</span>
                    <div className="bg-white/60 p-2 rounded-lg mt-1 font-mono text-[9px] break-all border border-purple-200 text-purple-800 selection:bg-purple-200">
                      https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
