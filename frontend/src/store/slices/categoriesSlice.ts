import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Category } from '../../types';
import { categoriesApi } from '../../api/categoriesApi';

interface CategoriesState {
  items: Category[];
  status: 'idle' | 'loading' | 'error';
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle'
};

export const fetchCategories = createAsyncThunk('categories/fetchAll', () => categoriesApi.list());

export const createCategory = createAsyncThunk(
  'categories/create',
  (payload: { name: string; description?: string; imageUrl?: string }) => categoriesApi.create(payload)
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default categoriesSlice.reducer;