"use client";
import Layout from "@/components/layout/layout";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/index";
import { useEffect, useState } from "react";
import PreloadCart from "@/components/Preload/PreloadCart";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";

const Cart = ({cart} : any) => {
  const cartRedux = useSelector((state: RootState) => state.cart.products);
  const [isClient, setIsClient] = useState(false);
  const [cartDB, setCartDB] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
    setCartDB(cart.cart)
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cart", JSON.stringify(cartRedux));
    }
  }, [cartRedux, isClient]);

  const handleIncrement = (item: any) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item: any) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  if (!isClient) {
    return <PreloadCart />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-28">
        <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

        {cartRedux.length === 0 ? (
          <p>Your cartRedux is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartRedux.map((item: any, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
              >
                <div className="flex items-center">
                  <img
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                    src={item?.product?.url_image}
                    alt={item?.product?.name}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium mb-1">
                      {item?.product?.product_name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {item?.product?.desc}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-green-500 font-medium">
                    ${item?.product?.price * item?.quantity}
                  </p>
                  <div className="flex">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="border py-1 px-3"
                    >
                      <p className="text-gray-500 text-sm">-</p>
                    </button>
                    <div className="border py-1 px-3">
                      <p className="text-gray-500 text-sm">{item.quantity}</p>
                    </div>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="border py-1 px-3"
                    >
                      <p className="text-gray-500 text-sm">+</p>
                    </button>
                    <button
                      onClick={() => handleRemove(item?.product?.id)}
                      className="btn-sm btn-red"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartRedux.length > 0 && (
          <div className="flex justify-end mt-8">
            <button className="btn btn-primary ml-4">Checkout</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
