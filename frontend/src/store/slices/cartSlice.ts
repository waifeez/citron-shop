import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Cart } from '../../types';
import { cartApi } from '../../api/cartApi';

interface CartState {
  data: Cart;
  status: 'idle' | 'loading' | 'error';
}

const initialState: CartState = {
  data: { items: [], total: 0, itemCount: 0 },
  status: 'idle'
};

export const fetchCart = createAsyncThunk('cart/fetch', () => cartApi.get());

export const addToCart = createAsyncThunk(
  'cart/add',
  ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => cartApi.addItem(productId, quantity)
);

export const updateCartItem = createAsyncThunk(
  'cart/update',
  ({ productId, quantity }: { productId: string; quantity: number }) => cartApi.updateItem(productId, quantity)
);

export const removeCartItem = createAsyncThunk('cart/remove', (productId: string) => cartApi.removeItem(productId));

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart(state) {
      state.data = { items: [], total: 0, itemCount: 0 };
    }
  },
    extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is { type: string; payload: Cart } =>
        action.type.startsWith('cart/') && action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      }
    );
    builder.addMatcher(
      (action) => action.type.startsWith('cart/') && action.type.endsWith('/pending'),
      (state) => {
        state.status = 'loading';
      }
    );
  }
  }
);

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;