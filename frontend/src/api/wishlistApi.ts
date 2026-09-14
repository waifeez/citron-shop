import { apiClient } from './client';

export interface WishlistItem {
  productId: string;
  productName: string;
  effectivePrice: number;
  imageUrl?: string;
  inStock: boolean;
}

export const wishlistApi = {
  get: () => apiClient.get<WishlistItem[]>('/wishlist').then((r) => r.data),
  add: (productId: string) => apiClient.post<WishlistItem[]>(`/wishlist/${productId}`).then((r) => r.data),
  remove: (productId: string) => apiClient.delete<WishlistItem[]>(`/wishlist/${productId}`).then((r) => r.data)
};