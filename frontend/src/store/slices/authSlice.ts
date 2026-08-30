import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
}

const storedUser = localStorage.getItem('citron_user');
const storedToken = localStorage.getItem('citron_token');

const initialState: AuthState = {
  user: storedUser ? (JSON.parse(storedUser) as User) : null,
  token: storedToken
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('citron_user', JSON.stringify(action.payload.user));
      localStorage.setItem('citron_token', action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('citron_user');
      localStorage.removeItem('citron_token');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;