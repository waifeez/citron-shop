import { apiClient } from './client';
import type { Cart } from '../types';

export const cartApi = {
  get: () => apiClient.get<Cart>('/cart').then((r) => r.data),
  addItem: (productId: string, quantity: number) =>
    apiClient.post<Cart>('/cart/items', { productId, quantity }).then((r) => r.data),
  updateItem: (productId: string, quantity: number) =>
    apiClient.put<Cart>(`/cart/items/${productId}`, { quantity }).then((r) => r.data),
  removeItem: (productId: string) => apiClient.delete<Cart>(`/cart/items/${productId}`).then((r) => r.data)
};