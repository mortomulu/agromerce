import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeCart } from '@/redux/slices/cartSlice';

export const useInitializeCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
      dispatch(initializeCart(cart));
    }
  }, [dispatch]);
};
