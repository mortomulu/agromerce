"use client";
import { SessionProvider } from "next-auth/react";
import {  useDispatch } from "react-redux";
import { useEffect } from 'react';
import { initializeCart } from '@/redux/slices/cartSlice';


export const SessionProviderClient = ({ children }: any) => {
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
  
  return (
    <div>
      <SessionProvider>
            {children}
      </SessionProvider>
    </div>
  );
};
