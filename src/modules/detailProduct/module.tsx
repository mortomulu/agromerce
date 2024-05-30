import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Layout from "../layout/layout";

interface Product {
    id: string;
    created_at: string;
    product_name: string;
    price: number;
    product_category: string;
    url_image: string;
    desc: string;
  }

interface DetalProductModuleProps {
  product: any;
  params: Product
}

export default function DetalProductModule(product: any) {
  return (
    <>
      <Layout>
        <section className="lg:py-24  bg-white md:py-16  dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img
                  className="w-full dark:hidden"
                  src={product?.product[0].url_image}
                  alt={product?.product[0].url_image}
                />
                <img
                  className="w-full hidden dark:block"
                  src={product?.product[0].url_image}
                  alt={product?.product[0].url_image}
                />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {product?.product[0].product_name}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    ${product?.product[0].price}
                  </p>
                </div>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <a
                    href="#"
                    title=""
                    className="flex items-center justify-center gap-4 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    role="button"
                  >
                    <FaHeart />
                    Add to favorites
                  </a>
                  <a
                    href="#"
                    title=""
                    className="flex items-center justify-center gap-4 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    role="button"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </a>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  {product?.product[0].desc}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
