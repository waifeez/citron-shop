import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { mockProducts } from '../../mockData';

interface ProductsState {
  items: Product[];
}

const loadInitial = (): Product[] => {
  const stored = localStorage.getItem('citron_products');
  return stored ? (JSON.parse(stored) as Product[]) : mockProducts;
};

const initialState: ProductsState = {
  items: loadInitial()
};

const persist = (items: Product[]) => {
  localStorage.setItem('citron_products', JSON.stringify(items));
};

const slugify = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).slice(2, 8);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Omit<Product, 'id' | 'slug' | 'effectivePrice'>>) {
      const price = action.payload.price;
      const discountPrice = action.payload.discountPrice;
      const newProduct: Product = {
        ...action.payload,
        id: crypto.randomUUID(),
        slug: slugify(action.payload.name),
        effectivePrice: discountPrice && discountPrice < price ? discountPrice : price
      };
      state.items.push(newProduct);
      persist(state.items);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        const price = action.payload.price;
        const discountPrice = action.payload.discountPrice;
        state.items[index] = {
          ...action.payload,
          effectivePrice: discountPrice && discountPrice < price ? discountPrice : price
        };
        persist(state.items);
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
      persist(state.items);
    }
  }
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;