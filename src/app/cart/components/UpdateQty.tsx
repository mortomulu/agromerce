"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/index";
import { updateQuantity } from "@/redux/slices/cartSlice";
import { useEffect } from "react";

const UpdateQty = ({ item }: any) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.products);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  return (
    <div className="flex">
      <button onClick={handleDecrement} className="border py-1 px-3">
        <p className="text-gray-500 text-sm">-</p>
      </button>
      <div className="border py-1 px-3">
        <p className="text-gray-500 text-sm">{item.quantity}</p>
      </div>
      <button onClick={handleIncrement} className="border py-1 px-3">
        <p className="text-gray-500 text-sm">+</p>
      </button>
      <button className="btn-sm btn-red">Remove</button>
    </div>
  );
};

export default UpdateQty;
