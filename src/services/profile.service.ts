import api from '../lib/axios';

export const profileService = {
  // Profile
  async getProfile() {
    const response = await api.get('profiles/me/');
    return response.data;
  },

  async updateProfile(data: any) {
    const isFormData = data instanceof FormData;
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const response = await api.patch('profiles/me/', data, config);
    return response.data;
  },

  async getProfileStats() {
    const response = await api.get('profiles/me/stats/');
    return response.data;
  },

  // Addresses
  async getAddresses() {
    const response = await api.get('profiles/addresses/');
    return response.data;
  },

  async addAddress(data: any) {
    const response = await api.post('profiles/addresses/', data);
    return response.data;
  },

  async deleteAddress(id: number) {
    const response = await api.delete(`profiles/addresses/${id}/`);
    return response.data;
  },

  async setDefaultAddress(id: number) {
    const response = await api.patch(`profiles/addresses/${id}/`, { is_default: true });
    return response.data;
  },

  // Wishlist
  async getWishlist() {
    const response = await api.get('profiles/wishlist/');
    return response.data;
  },

  async addToWishlist(productId: number) {
    const response = await api.post('profiles/wishlist/', { product_id: productId });
    return response.data;
  },

  async removeFromWishlist(productId: number) {
    const response = await api.delete(`profiles/wishlist/${productId}/`);
    return response.data;
  },

  // Cart
  async getCart() {
    const response = await api.get('profiles/cart/');
    return response.data;
  },

  async addToCart(data: { product_id: number; size?: string; color?: string; quantity: number }) {
    const response = await api.post('profiles/cart/items/', data);
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('cartUpdated'));
    return response.data;
  },

  async updateCartItem(itemId: number, quantity: number) {
    const response = await api.patch(`profiles/cart/items/${itemId}/`, { quantity });
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('cartUpdated'));
    return response.data;
  },

  async removeCartItem(itemId: number) {
    const response = await api.delete(`profiles/cart/items/${itemId}/`);
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('cartUpdated'));
    return response.data;
  }
};
