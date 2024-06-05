import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompareProduct {
  id: number;
  product: object;
}

interface CompareState {
  products: CompareProduct[];
}

const initialState: CompareState = {
  products: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<CompareProduct>) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      // If the product is not already in the compare list and the list is not full
      if (existingProductIndex === -1 && state.products.length < 2) {
        state.products.push(action.payload);
      } else if (existingProductIndex !== -1) {
        // If the product is already in the compare list, replace it
        state.products[existingProductIndex] = action.payload;
      } // If the list is full and the product is not already in the compare list, do nothing
    },
    removeFromCompare: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    initializeCompare: (state, action: PayloadAction<CompareProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addToCompare, removeFromCompare, initializeCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
