import { apiClient } from './client';
import type { User } from '../types';

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: User;
}

export const authApi = {
  register: (fullName: string, email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/register', { fullName, email, password }).then((r) => r.data),
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }).then((r) => r.data)
};