"use client";

import { useState, useRef } from "react";
import { postProduct } from "@/lib/crudProduct/dbData";
import { revalidatePath } from "next/cache";
import { Button, Spinner } from "flowbite-react";

const FormAddProduct = () => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const refImg: any = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !price || !category || !desc || !img) {
      console.error("Please fill in all fields");
      return;
    }

    const formData = {
      product_name: name,
      stok: stock,
      price: price,
      product_category: category,
      desc: desc,
    };

    const fileImage = img;

    try {
      await postProduct(formData, fileImage);
      console.log("Product added successfully");

      // await fetch('/api/revalidate', {
      //   method: 'POST',
      // });

      // Tweet the product details
      // await fetch('/api/tweet', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name, price, category, desc }),
      // });

      // console.log("Tweet posted successfully");
      setIsLoading(false);
      setName("");
      setStock("");
      setPrice("");
      setCategory("");
      setDesc("");
      setImg(null);
      refImg.current.value = null;
      revalidatePath("/admin/all-product");
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding product or posting tweet:", error);
    }
  };

  return (
    <div className="flex h-auto">
      <div className=" w-screen ml-56 p-10 rounded-sm border border-stroke bg-inherit shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-5 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Add Product
          </h4>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5.5 p-6.5 border-gray-500"
          >
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                placeholder="Pupuk, Pestisida, dll"
                onChange={(e) => setName(e.target.value)}
                className="w-full border-gray-300 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Stock Product
              </label>
              <input
                type="number"
                value={stock}
                placeholder="123"
                onChange={(e) => setStock(e.target.valueAsNumber)}
                className="w-full border-gray-300 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Price
              </label>
              <input
                type="number"
                value={price}
                placeholder="123"
                onChange={(e) => setPrice(e.target.valueAsNumber)}
                className="w-full border-gray-300 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Select Category
              </label>
              <div className="relative z-20 bg-white dark:bg-form-input">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative text-gray-500 border-gray-300 z-20 w-full appearance-none rounded-lg border-[1.5px] border-stroke bg-transparent px-6 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? "text-gray-300 dark:text-white" : ""
                  }`}
                >
                  <option
                    value=""
                    className="text-body text-gray-200 dark:text-bodydark"
                  >
                    Select Category
                  </option>
                  <option value="pra" className="text-body dark:text-bodydark">
                    Pra
                  </option>
                  <option
                    value="pasca"
                    className="text-body dark:text-bodydark"
                  >
                    Pasca
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Description Product
              </label>
              <textarea
                rows={6}
                value={desc}
                placeholder="Description your product..."
                onChange={(e) => setDesc(e.target.value)}
                className="w-full border-gray-300 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            <div>
              <input
                type="file"
                ref={refImg}
                onChange={(e: any) => setImg(e.target.files[0])}
                className="w-full pl-8 rounded-md border border-gray-400 border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
              />
            </div>
            <Button
              type="submit"
              className="px-6 bg-green-500"
              color="blue"
              pill
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner aria-label="Spinner button example" size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
