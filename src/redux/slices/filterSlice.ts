// redux/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchTerm: string;
  minPrice: number;
  maxPrice: number;
}

const initialState: FilterState = {
  searchTerm: '',
  minPrice: 0,
  maxPrice: Infinity,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
  },
});

export const { setSearchTerm, setMinPrice, setMaxPrice } = filterSlice.actions;
export default filterSlice.reducer;
