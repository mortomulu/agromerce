import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { initializeCart } from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

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

const cart = loadCartFromLocalStorage();
if (cart.length > 0) {
  store.dispatch(initializeCart(cart));
}
