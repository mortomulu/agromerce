import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompareProduct {
  id: number;
  product: object;
}

interface CompareState {
  products: CompareProduct[];
  comparisonResult: string; 
}



const initialState: CompareState = {
  products: [],
  comparisonResult: '', 

};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<CompareProduct>) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex === -1 && state.products.length < 2) {
        state.products.push(action.payload);
      } else if (existingProductIndex !== -1) {
        state.products[existingProductIndex] = action.payload;
      } 
    },
    removeFromCompare: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    resetCompare: (state) => {
        state.products = [];
      },
    initializeCompare: (state, action: PayloadAction<CompareProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addToCompare, removeFromCompare,resetCompare, initializeCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
