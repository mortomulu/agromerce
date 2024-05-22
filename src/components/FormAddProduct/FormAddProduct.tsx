"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import { postProduct } from "@/lib/crudProduct/dbData";
import { useRef } from "react";

const FormAddProduct = () => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const refImg: any = useRef();

  console.log(refImg);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name, price, category, desc, img);

    if (!name || !price || !category || !desc || !img) {
      console.error("Please fill in all fields");
      return;
    }

    const formData = {
      product_name: name,
      price: price,
      product_category: category,
      desc: desc,
    };

    const fileImage = img;

    console.log(formData);

    try {
      console.log(img);
      await postProduct(formData, fileImage);
      console.log("Product added successfully");
      setName("");
      setPrice("");
      setCategory("");
      setDesc("");
      setImg(null);
      refImg.current.value = null;
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
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
              onChange={(e) => setName(e.target.value)}
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
                <option value="pasca" className="text-body dark:text-bodydark">
                  Pasca
                </option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Default textarea
            </label>
            <textarea
              rows={6}
              value={desc}
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
          <Button type="submit" className="px-6 bg-green-500" color="blue" pill>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormAddProduct;
