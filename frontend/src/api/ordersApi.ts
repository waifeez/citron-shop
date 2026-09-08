import { apiClient } from './client';
import type { Order, PagedResult } from '../types';

export interface CheckoutPayload {
  shippingFullName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export const ordersApi = {
  checkout: (payload: CheckoutPayload) => apiClient.post<Order>('/orders/checkout', payload).then((r) => r.data),
  mine: () => apiClient.get<Order[]>('/orders/mine').then((r) => r.data),
  all: (page: number, pageSize: number) =>
    apiClient.get<PagedResult<Order>>('/orders', { params: { page, pageSize } }).then((r) => r.data)
};