// redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from "@/lib/crudProduct/dbData";
import { Product } from '@/types/product';

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  status: 'idle',
  error: null,
};

// Thunk untuk fetch produk
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await getProducts();
  return response;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm)
      );
    },
    filterProductsByPrice: (state, action) => {
      const [minPrice, maxPrice] = action.payload;
      state.filteredProducts = state.products.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    },
    resetFilter: (state) => {
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { searchProducts, filterProductsByPrice, resetFilter } = productSlice.actions;
export default productSlice.reducer;
