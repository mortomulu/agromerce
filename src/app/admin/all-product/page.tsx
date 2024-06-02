import { AllProduct } from "./components";
import { getProducts } from "@/lib/crudProduct/dbData";

const AllProductPage = async () => {
  let products = [];
  
  try {
    products = await getProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div>
      <AllProduct products={products} />
    </div>
  );
};

export default AllProductPage;
