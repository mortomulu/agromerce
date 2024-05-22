import Layout from "../layout/layout";
import BannerLanding from "./banner";
import CategoryBar from "./categoryBar";
import Products from "./products";

export const LandingPage = () => {
  return (
    <div>
      <Layout>
        <BannerLanding />
        <div className="flex mx-8 pb-8">
          <CategoryBar />
          <Products />
        </div>
      </Layout>
    </div>
  );
};
