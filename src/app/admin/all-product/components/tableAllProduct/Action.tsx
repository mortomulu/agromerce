"use client";

import { Button, Label, Modal } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteProduct, editProduct } from "@/lib/crudProduct/dbData";
import Link from "next/link";

const Action = ({ product }: any, { id }: { id: number }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [name, setName] = useState("");
  const [stok, setStok] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [urlImage, seturlImage] = useState("");
  const [image, setImage]: any = useState(null);
  const [productId, setProductId] = useState(0);
  const refImg: any = useRef(null);

  const productData = {
    id: productId,
    product_name: name,
    stok: stok,
    price: price,
    product_category: category,
    desc: desc,
    url_image: urlImage,
  };

  useEffect(() => {
    const getData = async () => {
      const data = await product;
      setName(data.product_name);
      setStok(data.stok);
      setPrice(data.price);
      setCategory(data.product_category);
      setDesc(data.desc);
      seturlImage(data.url_image);
      setProductId(data.id);
    };
    getData();
  }, [product]);

  const handleDeleteModal = async () => {
    await deleteProduct(productId);
    setOpenModalDelete(false);
  };

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    await editProduct(productData, image, productId);
    setName("");
    setStok(0);
    setPrice(0);
    setCategory("");
    setDesc("");
    seturlImage("");
    setImage(null);
    if (refImg.current) refImg.current.value = null;
    setOpenModalEdit(false);
  };

  const onCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  return (
    <>
      {/* Modal Delete */}
      <Modal
        show={openModalDelete}
        size="md"
        onClose={() => setOpenModalDelete(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeleteModal()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal Edit */}
      <Modal show={openModalEdit} onClose={onCloseModalEdit} size="3xl" popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmitEdit} className="space-y-6 px-5">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit your Product Data
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productName" value="Product Name" />
              </div>
              <input
                id="productName"
                placeholder="your product name..."
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md bg-inherit focus:border-black"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="stok" value="Stok" />
              </div>
              <input
                id="stok"
                placeholder="123"
                type="number"
                value={stok}
                onChange={(event: any) => setStok(event.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Price" />
              </div>
              <input
                id="price"
                placeholder="20000"
                type="number"
                value={price}
                onChange={(event: any) => setPrice(event.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Category" />
              </div>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select a category</option>
                <option value="pra">Pra</option>
                <option value="pasca">Pasca</option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="desc" value="Description" />
              </div>
              <textarea
                id="desc"
                placeholder="Product description..."
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
                required
                className="w-full px-3 py-2 h-72 border rounded-md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="image" value="Update Image" />
              </div>
              <div className="flex items-center gap-10">
                <div>
                  <img src={urlImage} alt="" className="h-20 w-20" />
                </div>
                <input
                  ref={refImg}
                  id="image"
                  type="file"
                  onChange={(event: any) => setImage(event.target.files[0])}
                  className="w-full px-3 py-2 "
                />
              </div>
            </div>
            <div className="w-full">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal Detail */}
      <Modal
        show={openModalDetail}
        onClose={() => setOpenModalDetail(false)}
        size="3xl"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-5">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Product Details
            </h3>
            <div>
              <strong>Product Name:</strong>
              <p>{name}</p>
            </div>
            <div>
              <strong>Stok:</strong>
              <p>{stok}</p>
            </div>
            <div>
              <strong>Price:</strong>
              <p>{price}</p>
            </div>
            <div>
              <strong>Category:</strong>
              <p>{category}</p>
            </div>
            <div>
              <strong>Description:</strong>
              <p>{desc}</p>
            </div>
            <div>
              <strong>Image:</strong>
              <img src={urlImage} alt={name} className="h-20 w-20" />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="flex items-center ml-20 space-x-3.5">
        <button
          className="hover:text-primary"
          onClick={() => setOpenModalDetail(true)}
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.17874 8.99981 3.17874C14.5686 3.17874 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM2.0623 9C2.79355 10.1966 5.4073 13.4287 9 13.4287C12.5926 13.4287 15.2061 10.1966 15.9373 9C15.2061 7.80336 12.5926 4.57124 9 4.57124C5.4073 4.57124 2.79355 7.80336 2.0623 9ZM9 11.625C7.65481 11.625 6.5623 10.5325 6.5623 9.18749C6.5623 7.84124 7.65481 6.74999 9 6.74999C10.3451 6.74999 11.4373 7.84124 11.4373 9.18749C11.4373 10.5325 10.3451 11.625 9 11.625ZM9 8.24999C8.48106 8.24999 8.0623 8.66874 8.0623 9.18749C8.0623 9.70624 8.48106 10.125 9 10.125C9.51855 10.125 9.9373 9.70624 9.9373 9.18749C9.9373 8.66874 9.51855 8.24999 9 8.24999Z"
              fill=""
            />
          </svg>
        </button>
        <button
          className="hover:text-primary"
          onClick={() => setOpenModalEdit(true)}
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="hover:text-primary"
          onClick={() => setOpenModalDelete(true)}
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
              fill=""
            />
            <path
              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
              fill=""
            />
            <path
              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
              fill=""
            />
            <path
              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
              fill=""
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Action;
