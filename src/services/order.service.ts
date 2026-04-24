import api from '../lib/axios';

export const orderService = {
  async getOrderHistory() {
    const response = await api.get('orders/');
    return response.data;
  },

  async getOrderDetails(orderId: string) {
    const response = await api.get(`orders/${orderId}/`);
    return response.data;
  },

  async trackOrder(trackingNumber: string) {
    const response = await api.get('orders/track/', { params: { tracking_number: trackingNumber } });
    return response.data;
  },

  async createCheckoutSession(checkoutData: any) {
    const response = await api.post('orders/checkout/create-session/', checkoutData);
    return response.data;
  }
};
