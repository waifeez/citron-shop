import { apiClient } from './client';
import type { PagedResult, Product } from '../types';

export interface ProductQueryParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  pageSize?: number;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  isFeatured: boolean;
  categoryId: string;
  imageUrls: string[];
}

export interface UpdateProductPayload extends CreateProductPayload {
  isActive: boolean;
}

export const productsApi = {
  list: (params: ProductQueryParams) =>
    apiClient.get<PagedResult<Product>>('/products', { params }).then((r) => r.data),
  getBySlug: (slug: string) => apiClient.get<Product>(`/products/slug/${slug}`).then((r) => r.data),
  create: (payload: CreateProductPayload) => apiClient.post<Product>('/products', payload).then((r) => r.data),
  update: (id: string, payload: UpdateProductPayload) =>
    apiClient.put<Product>(`/products/${id}`, payload).then((r) => r.data),
  remove: (id: string) => apiClient.delete(`/products/${id}`)
};