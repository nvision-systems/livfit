import { mockBlogPosts } from '../data';

export class BlogRepository {
  async getAll() {
    return mockBlogPosts;
  }

  async getById(id: number) {
    return mockBlogPosts.find(p => p.id === id);
  }

  async create(postData: any) {
    const newPost = { id: mockBlogPosts.length + 1, date: new Date().toISOString().split('T')[0], ...postData };
    mockBlogPosts.push(newPost);
    return newPost;
  }

  async update(id: number, postData: any) {
    const index = mockBlogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockBlogPosts[index] = { ...mockBlogPosts[index], ...postData };
      return mockBlogPosts[index];
    }
    return null;
  }

  async delete(id: number) {
    const index = mockBlogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockBlogPosts.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const blogRepository = new BlogRepository();
