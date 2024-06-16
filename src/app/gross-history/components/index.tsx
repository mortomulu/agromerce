"use client";
import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatToRupiah } from "@/lib/formatPrice";

const GrossHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(storedTransactions);
  }, []);

  console.log(transactions);

  const renderTransaction = (transaction: any) => (
    <div
      key={transaction.id}
      className=" py-4 border-b border-gray-200"
    >
      <div className="flex items-center">
        <div className="flex flex-col space-y-4">
          {transaction.product.map((data: any, i: number) => (
            <div key={i} className="flex items-center space-x-4">
              <img
                src={data.product.url_image}
                alt={data.product.product_name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{data.product.product_name}</h3>
                <p className="text-gray-600 text-sm">{data.quantity}x</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-right font-semibold">
        <p className="text-gray-600 text-sm">{transaction.date}</p>
        <p className="text-gray-800 text-lg">Total : {formatToRupiah(transaction.price)}</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-4 py-28">
        <div className="flex mb-4 border w-fit border-black rounded-lg overflow-hidden">
          <Link
            href={"/cart"}
            className="px-4 py-3 hover:bg-gray-200 transition-colors duration-200 ease-in-out"
          >
            <h1 className="text-lg text-gray-400 font-bold">Keranjang Belanja</h1>
          </Link>
          <Link
            href={"/gross-history"}
            className="px-4 py-3 bg-gray-100 border-l border-black hover:bg-blue-100 transition-colors duration-200 ease-in-out"
          >
            <h1 className="text-lg font-bold text-blue-600">Riwayat Pembelian</h1>
          </Link>
        </div>

        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 font-medium">
            Riwayat pembelian Anda masih kosong.
          </p>
        ) : (
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Riwayat Pembelian</h2>
            {transactions.map(renderTransaction)}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GrossHistory;
