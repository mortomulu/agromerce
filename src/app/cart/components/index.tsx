"use client";
import Layout from "@/components/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/index";
import { useEffect, useState } from "react";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  console.log(products)

  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      // Parse JSON string into JavaScript object
      const parsedCart = JSON.parse(storedCart);
      // Update cart state with loaded data
      //   dispatch({ type: "SET_CART", payload: parsedCart });
      setProducts(parsedCart);
    }
  };

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [])

  return (
    <div>
      <Layout>
        <section className="container mx-auto px-4 py-28">
          <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

          {products.length === 0 ? (
            ""
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products?.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center">
                    <img
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                      src={item.product.url_image}
                      alt={item.product.name}
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {item.product.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-green-500 font-medium">
                      ${item.product.price * item.quantity}
                    </p>
                    {/* Add button for removing items from cart (assuming appropriate action/reducer in Redux) */}
                    <button className="btn-sm btn-red">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Display cart total and checkout button if cart is not empty */}
          {cart.length > 0 && (
            <div className="flex justify-end mt-8">
              {/* <p className="text-gray-500 text-right">Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p> */}
              <button className="btn btn-primary ml-4">Checkout</button>
            </div>
          )}
        </section>
      </Layout>
    </div>
  );
};

export default Cart;
