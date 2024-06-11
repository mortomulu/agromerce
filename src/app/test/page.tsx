"use client";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl : any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey : any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const { data, error } : any = await supabase
        .from('cart')
        .select('*')
        .eq('email', 'fajrihidayat09@gmail.com');

      if (error) {
        setError(error);
      } else if (data && data.length > 0) {
        setCart(data[0].cart); // Assuming 'cart' column is an array of objects in the first record
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Cart Items</h1>
      <ul>
        {cart && cart.map((item : any, index) => (
          <li key={index}>
            <h2>{item.product.product_name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
