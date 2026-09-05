import { apiClient } from './client';
import type { Category } from '../types';

export const categoriesApi = {
  list: () => apiClient.get<Category[]>('/categories').then((r) => r.data),
  create: (payload: { name: string; description?: string; imageUrl?: string }) =>
    apiClient.post<Category>('/categories', payload).then((r) => r.data),
  update: (id: string, payload: { name: string; description?: string; imageUrl?: string }) =>
    apiClient.put<Category>(`/categories/${id}`, payload).then((r) => r.data),
  remove: (id: string) => apiClient.delete(`/categories/${id}`)
};