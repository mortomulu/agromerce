"use client";
import Layout from "@/components/layout/layout";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/index";
import { useEffect, useState } from "react";
import PreloadCart from "@/components/Preload/PreloadCart";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import router from "next/router";
import { useSession } from "next-auth/react";
import { FaTrashAlt } from "react-icons/fa";
import { formatToRupiah } from "@/lib/formatPrice";
import Link from "next/link";

const Cart = () => {
  const cartRedux = useSelector((state: RootState) => state.cart.products);
  const [isClient, setIsClient] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // To track if Midtrans is initialized
  const [transactionInProgress, setTransactionInProgress] = useState(false); // To track if a transaction is in progress
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const checkoutItems = cartRedux.filter((item) =>
    checkedItems.includes(item.id)
  );

  console.log(session?.user);

  useEffect(() => {
    setIsClient(true);

    // Check if script is already present
    if (
      !document.querySelector(
        `script[src="https://app.sandbox.midtrans.com/snap/snap.js"]`
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // rubah ketika mode production
      script.setAttribute("data-client-key", "SB-Mid-client-HEgMVPL74xO84DTX");
      script.async = true;

      script.onload = () => {
        const storedTransaction = localStorage.getItem("midtransTransaction");
        if (storedTransaction && !isInitialized) {
          const transaction = JSON.parse(storedTransaction);
          initializeMidtrans(transaction);
        }
      };

      document.body.appendChild(script);
    } else {
      const storedTransaction = localStorage.getItem("midtransTransaction");
      if (storedTransaction && !isInitialized) {
        const transaction = JSON.parse(storedTransaction);
        initializeMidtrans(transaction);
      }
    }

    return () => {
      // Cleanup if necessary
    };
  }, [isInitialized]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cart", JSON.stringify(cartRedux));
    }
  }, [cartRedux, isClient]);

  const initializeMidtrans = (transaction: any) => {
    if (window.snap) {
      const storedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
      const address = storedProfile.address;
      setIsInitialized(true);
      setTransactionInProgress(true);
      window.snap.embed(transaction.token, {
        embedId: "midtrans-payment-container",
        onSuccess: function (result: any) {
          console.log(result);
          const detailTransaction = {
            id: result.transaction_id,
            buyer: session?.user?.email,
            address: address,
            product: checkoutItems,
            price: result.gross_amount,
            date: result.transaction_time,
          };
          console.log(detailTransaction);

          // Mendapatkan nilai yang sudah ada dari localStorage
          const existingTransactions = JSON.parse(
            localStorage.getItem("transactions") || "[]"
          );

          // Menambahkan detailTransaction ke dalam array existingTransactions
          const updatedTransactions = [
            ...existingTransactions,
            detailTransaction,
          ];
          console.log(updatedTransactions);

          // Menyimpan array yang diperbarui kembali ke localStorage
          localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions)
          );

          // Menghapus item "midtransTransaction" dari localStorage
          localStorage.removeItem("midtransTransaction");

          setTransactionInProgress(false);
        },
        onPending: function (result: any) {
          console.log(result);
        },
        onError: function (result: any) {
          console.log(result);
        },
        onClose: function () {
          console.log(
            "customer closed the popup without finishing the payment"
          );
          setTransactionInProgress(false);
        },
      });
    } else {
      console.error("Midtrans snap is not defined");
    }
  };

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

  const handleCheckboxChange = (itemId: number) => {
    setCheckedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCheckout = async () => {
    const checkoutItems = cartRedux.filter((item) =>
      checkedItems.includes(item.id)
    );

    const userDetails = {
      email: session?.user?.email,
      name: session?.user?.name,
    };

    console.log(userDetails.email);

    if (status === "unauthenticated") {
      alert("harus login terlebih dahulu");
      return;
    }

    const storedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
    const address = storedProfile.address;

    if (!address) {
      alert("isi alamat di halaman profile terlebih dahulu!");
    }

    if (checkoutItems.length === 0) {
      alert("harap pilih barang terlebih dahulu");
      return;
    }

    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: checkoutItems, userDetails }),
      });

      const { transaction } = await response.json();
      console.log(transaction);

      initializeMidtrans(transaction);
      // Store the transaction in local storage
      localStorage.setItem("midtransTransaction", JSON.stringify(transaction));
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  const handleCancelTransaction = () => {
    setTransactionInProgress(false);
    localStorage.removeItem("midtransTransaction");

    const element = document.getElementById(
      "midtrans-payment-container"
    ) as HTMLElement;
    if (element) {
      element.innerHTML = "";
    }

    // Reload the page after a short delay to ensure innerHTML is updated
    setTimeout(() => {
      window.location.reload();
    }, 100); // 100 milliseconds delay
  };

  if (!isClient) {
    return <PreloadCart />;
  }

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-4 py-28">
        <div className="flex mb-4 border w-fit border-black  overflow-hidden">
          <Link
            href={"/cart"}
            className="px-4 py-3 border-r border-black bg-white hover:bg-blue-100 transition-colors duration-200 ease-in-out"
          >
            <h1 className="text-lg font-bold text-blue-600">
              Keranjang Belanja
            </h1>
          </Link>
          <Link
            href={"/gross-history"}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ease-in-out"
          >
            <h1 className="text-lg text-gray-400 font-bold">
              Riwayat Pembelian
            </h1>
          </Link>
        </div>
        <div className="flex justify-between">
          {cartRedux.length === 0 ? (
            <p>Keranjang Belanja Kamu Kosong.</p>
          ) : (
            <div className="flex flex-col w-[550px]">
              {cartRedux.map((item: any, i) => (
                <div
                  key={i}
                  className="bg-white border shadow-md p-4 flex flex-col justify-between"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center w-">
                      <img
                        className="w-20 h-20 object-cover mr-4"
                        src={item?.product?.url_image}
                        alt={item?.product?.name}
                      />
                      <div className="flex flex-col">
                        <h3 className="text-lg font-medium mb-1">
                          {item?.product?.product_name}
                        </h3>
                        <p className="text-green-500 font-medium">
                          {formatToRupiah(
                            item?.product?.price * item?.quantity
                          )}
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="mr-4 mt-2"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </div>
                  <div className="flex justify-end items-center mt-4">
                    <div className="flex gap-4">
                      <div className="flex">
                        <button
                          onClick={() => handleDecrement(item)}
                          className="border py-1 px-3"
                        >
                          <p className="text-gray-500 text-sm">-</p>
                        </button>
                        <div className="border py-1 px-3">
                          <p className="text-gray-500 text-sm">
                            {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => handleIncrement(item)}
                          className="border py-1 px-3"
                        >
                          <p className="text-gray-500 text-sm">+</p>
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item?.product?.id)}
                        className="btn-sm btn-red mr-2"
                      >
                        <FaTrashAlt className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {cartRedux.length > 0 && (
                <div className="flex justify-end mt-8 gap-4">
                  <button
                    onClick={handleCheckout}
                    className={
                      transactionInProgress
                        ? "py-3 px-5 font-bold bg-gray-500 btn-primary text-white  ml-4"
                        : "py-3 px-5 font-bold bg-green-500 btn-primary text-white hover:bg-green-700 ml-4"
                    }
                    disabled={transactionInProgress}
                  >
                    Checkout
                  </button>
                  {transactionInProgress && (
                    <button
                      onClick={handleCancelTransaction}
                      className="py-3 px-5 font-bold bg-red-500 btn-primary text-white hover:bg-red-700"
                    >
                      Batalkan Pembelian
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div id="midtrans-payment-container"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
