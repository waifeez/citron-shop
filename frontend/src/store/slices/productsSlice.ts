import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { productsApi, type CreateProductPayload, type UpdateProductPayload } from '../../api/productsApi';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'error';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle'
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const result = await productsApi.list({ pageSize: 100 });
  return result.items;
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (payload: CreateProductPayload) => productsApi.create(payload)
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, payload }: { id: string; payload: UpdateProductPayload }) => productsApi.update(id, payload)
);

export const deleteProduct = createAsyncThunk('products/delete', async (id: string) => {
  await productsApi.remove(id);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;