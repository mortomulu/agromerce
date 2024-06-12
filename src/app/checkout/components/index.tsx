"use client";
import Layout from "@/components/layout/layout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/index";
import { useState, useEffect } from "react";

const Checkout = () => {
  const cartRedux = useSelector((state: RootState) => state.cart.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const calculateTotalPrice = () => {
        const total = cartRedux.reduce((acc, item: any) => acc + item.product.price * item.quantity, 0);
        setTotalPrice(total);
      };

      calculateTotalPrice();
    }
  }, [cartRedux, isMounted]);

  if (!isMounted) {
    return null; // or you can return a loading spinner
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>

        {cartRedux.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="divide-y divide-gray-200">
                {cartRedux.map((item: any, i) => (
                  <div key={i} className="py-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                        src={item.product.url_image}
                        alt={item.product.name}
                      />
                      <div>
                        <h3 className="text-lg font-medium">{item.product.product_name}</h3>
                        <p className="text-gray-500 text-sm">{item.product.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500 font-medium">${item.product.price * item.quantity}</p>
                      <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total Price: ${totalPrice}</h2>
              <button className="btn btn-primary px-6 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600">
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
