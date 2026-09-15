import { apiClient } from './client';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ProductReviewsSummary {
  reviews: Review[];
  averageRating: number;
  totalCount: number;
}

export const reviewsApi = {
  get: (productId: string) =>
    apiClient.get<ProductReviewsSummary>(`/products/${productId}/reviews`).then((r) => r.data),
  add: (productId: string, rating: number, comment: string) =>
    apiClient.post<ProductReviewsSummary>(`/products/${productId}/reviews`, { rating, comment }).then((r) => r.data)
};