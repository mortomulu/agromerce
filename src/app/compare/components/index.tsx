"use client";
import Layout from "@/components/layout/layout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/index";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  advantages: string[];
  disadvantages: string[];
}

interface Comparison {
  product1: Product;
  product2: Product;
}

const Compare = () => {
  const [loading, setLoading] = useState(true);
  const messages: string = useSelector(
    (state: RootState) => state.messages.content
  );

  console.log(messages);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [messages]);

  const parseMessages = (messages: string): Comparison => {
    const lines = messages
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    console.log("Lines:", lines);

    const product1: Product = { name: "", advantages: [], disadvantages: [] };
    const product2: Product = { name: "", advantages: [], disadvantages: [] };

    let currentProduct: Product | null = null;
    let currentSection: "advantages" | "disadvantages" | null = null;

    lines.forEach((line) => {
      if (
        line.startsWith(
          "Produk Pertama" || "Produk 1" || "Produk Pertama (Pupuk Alami):"
        )
      ) {
        product1.name = line.replace("Produk 1:", "").trim();
        currentProduct = product1;
        currentSection = null;
      } else if (line.startsWith("Produk Kedua" || "Produk 2")) {
        product2.name = line.replace("Produk 2:", "").trim();
        currentProduct = product2;
        currentSection = null;
      } else if (line.startsWith("Kelebihan:")) {
        currentSection = "advantages";
      } else if (line.startsWith("Kekurangan:")) {
        currentSection = "disadvantages";
      } else if (currentProduct && currentSection) {
        currentProduct[currentSection].push(line.replace("-", "").trim());
      }
    });

    console.log("Product 1:", product1);
    console.log("Product 2:", product2);

    return {
      product1,
      product2,
    };
  };

  const comparison: Comparison = parseMessages(messages);

  console.log("Comparison:", comparison);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-20 flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-4 pb-8">
          <h1 className="text-2xl font-semibold mb-4">Compare Page</h1>
          {comparison && (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Messages:</h2>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Product</th>
                    <th className="border px-4 py-2">Advantages</th>
                    <th className="border px-4 py-2">Disadvantages</th>
                  </tr>
                </thead>
                <tbody>
                  {[comparison.product1, comparison.product2].map(
                    (product, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{product.name}</td>
                        <td className="border px-4 py-2">
                          <ul>
                            {product.advantages.map((advantage, idx) => (
                              <li key={idx}>{advantage}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="border px-4 py-2">
                          <ul>
                            {product.disadvantages.map((disadvantage, idx) => (
                              <li key={idx}>{disadvantage}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
