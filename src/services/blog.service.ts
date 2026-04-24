import api from '../lib/axios';

export const blogService = {
  async getCategories() {
    const response = await api.get('blog/categories/');
    return response.data;
  },

  async getPosts(params?: any) {
    const response = await api.get('blog/posts/', { params });
    return response.data;
  },

  async getPostBySlug(slug: string) {
    const response = await api.get(`blog/posts/${slug}/`);
    return response.data;
  }
};
