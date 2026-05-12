import { supabase, isSupabaseConfigured } from '../supabase/client';
import { BlogPost } from '../types';
import { mockBlogPosts } from '../data';

export class BlogRepository {
  async getAll(publishedOnly: boolean = true): Promise<BlogPost[]> {
    if (!isSupabaseConfigured) return mockBlogPosts as any;

    let query = supabase.from('blog_posts').select('*');
    
    if (publishedOnly) {
      query = query.eq('is_published', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(id: number): Promise<BlogPost | null> {
    if (!isSupabaseConfigured) return (mockBlogPosts.find(p => p.id === id) as any) || null;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  async create(post: Partial<BlogPost>): Promise<BlogPost> {
    if (!isSupabaseConfigured) {
      return { ...post, id: Math.random(), created_at: new Date().toISOString() } as any;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: number, updates: Partial<BlogPost>): Promise<BlogPost> {
    if (!isSupabaseConfigured) return { ...updates, id } as any;

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: number): Promise<void> {
    if (!isSupabaseConfigured) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const blogRepository = new BlogRepository();
