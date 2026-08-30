export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discountPrice?: number;
  effectivePrice: number;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  categoryName: string;
  imageUrls: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
  availableStock: number;
  lineTotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: { productName: string; unitPrice: number; quantity: number }[];
  total: number;
  shippingFullName: string;
  shippingAddress: string;
  shippingCity: string;
}