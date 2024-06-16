"use client";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { useState, useEffect, FormEvent } from "react";

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 8; 

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    let filtered = products?.filter((product: Product) => {
      return product.product_name?.toLowerCase().includes(search.toLowerCase());
    });

    if (sort === "min") {
      filtered = filtered?.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sort === "max") {
      filtered = filtered?.sort((a: Product, b: Product) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-2 bg-white ml-4 pt-10 rounded-2xl border border-green-500">
      <form onSubmit={handleSearch} className="flex justify-between mb-10 mx-8">
        <div className="mb-4 w-1/2 pr-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Dropdown Filter */}
        <div className="w-1/4 pl-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Sorting</option>
            <option value="min">Minimum Price</option>
            <option value="max">Maximum Price</option>
          </select>
        </div>

        <div className="w-1/4 pl-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-4 gap-4 mx-8 pb-8">
        {currentProducts?.map((product: Product) => (
          <ProductCard key={product.id} todo={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 rounded-lg ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Products;
