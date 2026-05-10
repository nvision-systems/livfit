import { NextResponse } from 'next/server';
import { blogRepository } from '../repositories/blog.repository';

export const blogController = {
  async getAll() {
    try {
      const posts = await blogRepository.getAll();
      return NextResponse.json(posts);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
  },

  async getById(id: string) {
    try {
      const post = await blogRepository.getById(parseInt(id));
      if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(post);
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
    }
  },

  async create(request: Request) {
    try {
      const data = await request.json();
      const post = await blogRepository.create(data);
      return NextResponse.json(post);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
  }
};
