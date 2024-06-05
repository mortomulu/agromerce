import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { initializeCart } from './slices/cartSlice';
import compareReducer, { initializeCompare } from './slices/compareSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    compare: compareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load cart from localStorage', e);
    return [];
  }
};

// Load compare products from localStorage
const loadCompareFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('compare');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load compare products from localStorage', e);
    return [];
  }
};

// Initialize cart state
const cart = loadCartFromLocalStorage();
if (cart.length > 0) {
  store.dispatch(initializeCart(cart));
}

// Initialize compare state
const compare = loadCompareFromLocalStorage();
if (compare.length > 0) {
  store.dispatch(initializeCompare(compare));
};
