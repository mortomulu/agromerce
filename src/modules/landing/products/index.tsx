import { getProducts } from "@/lib/crudProduct/dbData";
import { Product } from "@/types/product";
import ProductCard from "@/components/productCard/ProductCard";
import Link from "next/link";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-4 gap-4 mx-8 pb-8">
      {products?.map((product: Product) => (
        
          <ProductCard key={product.id} todo={product} />
      ))}
    </div>
  );
};

export default Products;
