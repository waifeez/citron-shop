import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Order } from '../../types';
import { ordersApi, type CheckoutPayload } from '../../api/ordersApi';

interface OrdersState {
  history: Order[];
  status: 'idle' | 'loading' | 'error';
}

const initialState: OrdersState = {
  history: [],
  status: 'idle'
};

export const fetchMyOrders = createAsyncThunk('orders/fetchMine', () => ordersApi.mine());

export const checkout = createAsyncThunk('orders/checkout', (payload: CheckoutPayload) => ordersApi.checkout(payload));

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        state.history = action.payload;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.history.unshift(action.payload);
      });
  }
});

export default ordersSlice.reducer;