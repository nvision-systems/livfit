"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { blogRepository } from "@livfit/lib";
import { AcademyEditor } from "../../../../../components/AcademyEditor";

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const numericId = parseInt(id, 10);

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const fetched = await blogRepository.getById(numericId);
        if (!fetched) {
          alert('Post not found');
          router.push('/academy/blogs');
          return;
        }
        setPost(fetched);
      } catch (error) {
        console.error(error);
        alert('Error loading post');
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [numericId, router]);

  const handleUpdate = async (data: { title: string; content: string; isPublished: boolean; tags: string }) => {
    setSaving(true);
    try {
      await blogRepository.update(numericId, {
        title: data.title,
        content: data.content,
        is_published: data.isPublished
      });
      setSaved(true);
      setTimeout(() => {
        router.push('/academy/blogs');
      }, 1500);
    } catch (error) {
      console.error(error);
      alert('Failed to update post');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <AcademyEditor
      mode="edit"
      initialTitle={post.title}
      initialContent={post.content}
      initialIsPublished={post.is_published}
      initialTags=""
      loading={saving}
      saved={saved}
      onSave={handleUpdate}
      onBack={() => router.back()}
    />
  );
}
