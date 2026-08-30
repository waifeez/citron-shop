import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

interface CartLine {
  product: Product;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
}

const initialState: CartState = {
  lines: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.lines.find((l) => l.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.lines.push({ product: action.payload, quantity: 1 });
      }
    },
    increment(state, action: PayloadAction<string>) {
      const line = state.lines.find((l) => l.product.id === action.payload);
      if (line) line.quantity += 1;
    },
    decrement(state, action: PayloadAction<string>) {
      const line = state.lines.find((l) => l.product.id === action.payload);
      if (line) {
        line.quantity -= 1;
        if (line.quantity <= 0) {
          state.lines = state.lines.filter((l) => l.product.id !== action.payload);
        }
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((l) => l.product.id !== action.payload);
    },
    clearCart(state) {
      state.lines = [];
    }
  }
});

export const { addToCart, increment, decrement, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;