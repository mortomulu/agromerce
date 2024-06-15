"use client"
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/layoutAdmin";
import Image from "next/image";

const DetailProduct = ({ product }: any) => {
  const [data, setData] : any = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await product;
      setData(result);
    };

    fetchData();
  }, [product]);

  console.log(data)

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Image
                src={data[0].url_image}
                alt={data[0].product_name}
                width={400}
                height={400}
                className="rounded-md w-auto h-auto object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{data[0].product_name}</h2>
              <p className="text-gray-700">
                <strong>Category:</strong> {data[0].product_category}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ${data[0].price}
              </p>
              <p className="text-gray-700">
                <strong>Stock:</strong> {data[0].stok}
              </p>
              <p className="text-gray-700">
                <strong>Description:</strong> {data[0].desc}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default DetailProduct;
