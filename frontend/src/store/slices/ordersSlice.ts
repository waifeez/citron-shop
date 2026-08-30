import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OrderRecord } from '../../types';

interface OrdersState {
  history: OrderRecord[];
}

const loadInitial = (): OrderRecord[] => {
  const stored = localStorage.getItem('citron_orders');
  return stored ? (JSON.parse(stored) as OrderRecord[]) : [];
};

const initialState: OrdersState = {
  history: loadInitial()
};

const persist = (history: OrderRecord[]) => {
  localStorage.setItem('citron_orders', JSON.stringify(history));
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<OrderRecord>) {
      state.history.unshift(action.payload);
      persist(state.history);
    }
  }
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;