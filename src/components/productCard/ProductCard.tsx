"use client";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Product } from "@/types/product";
import { useState } from "react";
import Image from "next/image";

interface CardDataProps {
  todo: Product;
}

const ProductCard: React.FC<CardDataProps> = ({ todo }) => {
  const badge = todo.product_category == "pra" ? "bg-green-500" : "bg-blue-500";

  const [fav, setFav] = useState(false);

  return (
    <div className="card bg-white shadow-xl p-0">
      <Image
        className="rounded-t-[15px] h-40 object-cover max-w-full"
        src={todo.url_image}
        alt="Shoes"
        width={400}
        height={100}
      />

      <div className="card-body">
        <div className="card-title flex justify-between truncate">
          <h2 className="text-xl w-40 truncate">{todo.product_name}</h2>
          <div onClick={() => setFav(!fav)}>
            {fav ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
        <p className="text-sm">$ {todo.price}</p>
        <div className="card-actions justify-end">
          <div
            className={`${badge} badge badge-outline border-none pt-4 pb-4 px-5`}
          >
            {todo.product_category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
