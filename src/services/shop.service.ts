import api from '../lib/axios';

export const shopService = {
  async getProducts(params?: any) {
    const response = await api.get('shop/products/', { params });
    return response.data;
  },

  async getProductBySlug(slug: string) {
    const response = await api.get(`shop/products/${slug}/`);
    return response.data;
  },

  async getCategories() {
    const response = await api.get('shop/categories/');
    return response.data;
  },

  async getProductReviews(slug: string) {
    const response = await api.get(`shop/products/${slug}/reviews/`);
    return response.data;
  },

  async submitProductReview(slug: string, review: { rating: number; comment: string }) {
    const response = await api.post(`shop/products/${slug}/reviews/`, review);
    return response.data;
  }
};
