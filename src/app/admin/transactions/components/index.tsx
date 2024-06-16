"use client";
import AdminLayout from "@/components/layout/layoutAdmin";
import { useEffect, useState } from "react";
import { formatToRupiah } from "@/lib/formatPrice";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(storedTransactions);
  }, []);

  const renderTransaction = (transaction: any) => (
    <div
      key={transaction.id}
      className=" py-4 border-b border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <div className="flex flex-col  gap-2 space-y-2">
          {transaction.product.map((data: any, i: number) => (
            <div key={i} className="flex items-center space-x-4">
              <img
                src={data.product.url_image}
                alt={data.product.product_name}
                className="w-10 h-10 object-cover"
              />
              <div>
                <h3 className="">
                  {data.product.product_name}
                </h3>
                <p className="text-gray-600 text-sm">{data.quantity}x</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-right space-y-2">
        <p className="text-gray-500 text-sm">{transaction.date}</p>
        <p className="text-gray-700 font-medium">Buyer: {transaction.buyer}</p>
        <p className="text-gray-700 font-medium">Address: {transaction.address}</p>
        <p className="text-gray-800 text-lg font-semibold">
          {formatToRupiah(transaction.price)}
        </p>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="pl-60 pt-10 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">History Transactions</h1>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 font-medium">
              No transactions found.
            </p>
          ) : (
            <div className="bg-white rounded-md shadow-md p-6">
              {transactions.map(renderTransaction)}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Transactions;
