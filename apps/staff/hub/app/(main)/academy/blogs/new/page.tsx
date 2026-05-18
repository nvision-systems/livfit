"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogRepository } from "@livfit/lib";
import { AcademyEditor } from "../../../../../components/AcademyEditor";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (data: { title: string; content: string; isPublished: boolean; tags: string }) => {
    setLoading(true);
    try {
      await blogRepository.create({
        title: data.title,
        content: data.content,
        is_published: data.isPublished,
        author_id: 'admin-1', // Placeholder
        created_at: new Date().toISOString()
      });
      setSaved(true);
      setTimeout(() => {
        router.push('/academy/blogs');
      }, 1500);
    } catch (error) {
      console.error(error);
      alert('Failed to create post');
      setLoading(false);
    }
  };

  return (
    <AcademyEditor 
      mode="new"
      loading={loading}
      saved={saved}
      onSave={handleSave}
      onBack={() => router.back()}
    />
  );
}
