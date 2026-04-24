import api from '../lib/axios';
import Cookies from 'js-cookie';

export const authService = {
  async login(credentials: any) {
    const response = await api.post('users/login/', credentials);
    const { access, refresh } = response.data;
    
    // Store tokens in cookies
    Cookies.set('access_token', access, { expires: 1 }); // 1 day
    Cookies.set('refresh_token', refresh, { expires: 7 }); // 7 days
    
    return response.data;
  },

  async register(userData: any) {
    const response = await api.post('users/register/', userData);
    return response.data;
  },

  async logout() {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  isAuthenticated() {
    return !!Cookies.get('access_token');
  },

  async forgotPassword(email: string) {
    const response = await api.post('users/forgot-password/', { email });
    return response.data;
  },

  async verifyOtp(email: string, code: string) {
    const response = await api.post('users/verify-otp/', { email, code });
    return response.data;
  },

  async resetPassword(data: any) {
    const response = await api.post('users/reset-password/', data);
    return response.data;
  }
};
