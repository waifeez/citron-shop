import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  toast: { message: string; key: number } | null;
}

const initialState: UiState = {
  toast: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<string>) {
      state.toast = { message: action.payload, key: Date.now() };
    },
    clearToast(state) {
      state.toast = null;
    }
  }
});

export const { showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;