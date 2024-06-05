// redux/index.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { initializeCart } from './slices/cartSlice';
import compareReducer, { initializeCompare } from './slices/compareSlice';
import messagesReducer, { initializeMessage } from './slices/messagesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    compare: compareReducer,
    messages: messagesReducer,
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

const loadMessagesFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('messages');
    if (serializedState === null) {
      return '';
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load messages from localStorage', e);
    return '';
  }
};

const cart = loadCartFromLocalStorage();
if (cart.length > 0) {
  store.dispatch(initializeCart(cart));
}

const compare = loadCompareFromLocalStorage();
if (compare.length > 0) {
  store.dispatch(initializeCompare(compare));
}

const messages = loadMessagesFromLocalStorage();
if (messages) {
  store.dispatch(initializeMessage(messages));
}
