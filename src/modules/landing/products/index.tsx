import { getProducts } from "@/lib/crudProduct/dbData";
import { Product } from "@/types/product";
import ProductCard from "@/components/productCard/ProductCard";

const Products = async () => {
    const todos = await getProducts();

    return (
        <div className="grid grid-cols-4 gap-4 mx-8 pb-8">
          {todos?.map((todo: Product, i: number) => (
            <ProductCard key={i} todo={todo} />
          ))}
        </div>
    )
}

export default Products