import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { wishlistApi, type WishlistItem } from '../../api/wishlistApi';

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = { items: [] };

export const fetchWishlist = createAsyncThunk('wishlist/fetch', () => wishlistApi.get());
export const addToWishlist = createAsyncThunk('wishlist/add', (productId: string) => wishlistApi.add(productId));
export const removeFromWishlist = createAsyncThunk('wishlist/remove', (productId: string) => wishlistApi.remove(productId));

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is { type: string; payload: WishlistItem[] } =>
        action.type.startsWith('wishlist/') && action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.items = action.payload;
      }
    );
  }
});

export default wishlistSlice.reducer;