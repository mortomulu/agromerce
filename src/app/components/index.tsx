import Layout from "@/components/layout/layout";
import BannerLanding from "./banner";
import CategoryBar from "./categoryBar";
import Products from "./products";
import { getProducts } from "@/lib/crudProduct/dbData";

export const LandingPage = async () => {
  const products = await getProducts();

  return (
    <div>
      <Layout>
        <BannerLanding />
        <div >
          {/* <CategoryBar /> */}
          <Products products={products} />
        </div>
      </Layout>
    </div>
  );
};
