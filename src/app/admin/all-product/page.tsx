import { AllProduct } from "./components";
import { getProducts } from "@/lib/crudProduct/dbData";

const AllProductPage = async () => {
  const products = await getProducts();
  return (
    <div>
      <AllProduct products={products} />
    </div>
  );
};

export default AllProductPage;
