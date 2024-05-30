import { getProduct } from "@/lib/crudProduct/dbData";
import DetalProductModule from "@/modules/detailProduct/module";

interface Product {
    product: {
      id: string;
      created_at: string,
      product_name: string, 
      price: number,
      product_category: string,
      url_image: string,
      desc: string
    };
  }

const detailProductPage = async ({ params }: any) => {
  const product: Product[] = await getProduct(params.id);
  return <DetalProductModule product={product} />;
};

export default detailProductPage;
