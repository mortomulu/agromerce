"use client";

import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import SideNavbar from "../Sidebar/SideNavbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/index";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { removeFromCompare, resetCompare } from "@/redux/slices/compareSlice";
import { setMessage } from "@/redux/slices/messagesSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const cart: any[] = useSelector((state: RootState) => state.cart.products);
  const compare: any[] = useSelector(
    (state: RootState) => state.compare.products
  );
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const API_KEY = process.env.NEXT_SECRET_OPENAI_API_KEY; // Replace with your actual API key
  const router = useRouter()

  useEffect(() => {
    setIsClient(true);
  }, []);

  const CompareModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleRemoveFromCompare = (productId: number) => {
      dispatch(removeFromCompare(productId));
    };

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleCompare = async (e: any) => {
      e.preventDefault();
      const systemBehaviour =
        "Kamu akan melakukan komparasi produk dengan membandingan kedua produk berdasarkan data yang dikirim dengan output tabel kelebihan dan kekurangan masing masing produk";

      const APIBody = {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemBehaviour,
          },
          {
            role: "user",
            content: `Komparasi produk tersebut: Produk Pertama: ${compare[0].product.desc} Produk Kedua:${compare[1].product.desc}`,
          },
        ],
      };

      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${API_KEY}`);

        const raw = JSON.stringify(APIBody);

        const requestOptions: any = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        console.log(requestOptions.body);

        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const messageContent = data.choices[0].message.content;

        dispatch(setMessage(messageContent));
        dispatch(resetCompare());
        router.push("/compare"); 
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <div className="relative inline-block text-left">
        <button onClick={handleToggle} className="focus:outline-none">
          <FaBalanceScale className="w-8 h-8 text-black hover:text-gray-900" />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 right-0 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <button onClick={handleToggle} className="absolute right-2 top-2">
              <IoClose className="text-lg" />
            </button>
            <div className="py-4 px-6">
              <h2 className="text-lg font-bold mb-4">Compare Products</h2>
              <div className="bg-gray-100 p-4 rounded-md">
                {compare.length > 0 ? (
                  <>
                    {compare.slice(0, 2).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 border-b py-2 last:border-0"
                      >
                        <Image
                          src={item.product.url_image}
                          alt={item.product.product_name}
                          width={50}
                          height={50}
                          className="w-auto h-auto"
                        />
                        <p className="text-gray-700">
                          {item.product.product_name}
                        </p>
                        <button
                          onClick={() =>
                            handleRemoveFromCompare(item.product.id)
                          }
                          className="ml-auto"
                        >
                          <FaTrashCan />
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-700">No products to compare.</p>
                )}
              </div>
              {compare.length >= 2 ? (
                <button
                  onClick={(e) => handleCompare(e)}
                  className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Ready to Compare!
                </button>
              ) : (
                <button
                  onClick={handleToggle}
                  disabled
                  className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none"
                >
                  Ready to Compare!
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (
    pathname == "/" ||
    /^\/detail-product\/\d+$/.test(pathname) ||
    pathname == "/consultation" ||
    pathname == "/compare" ||
    pathname == "/cart" ||
    pathname == "/favorite"
  ) {
    return (
      <div className="navbar bg-white mb-8 fixed top-0 z-50">
        <div className="navbar-start w-1/5">
          <Link href={"/"} className="btn btn-ghost text-xl">
            <span className="text-green-500 -mr-1">Agro</span>Merce
          </Link>
        </div>
        <div className="navbar-start hidden lg:flex">
          <div className="menu menu-horizontal gap-10 px-1">
            <div
              className={
                pathname === "/"
                  ? "border-b-2 border-green-500 text-black"
                  : "text-black"
              }
            >
              <Link href="/">Home</Link>
            </div>
            <div
              className={
                pathname === "/consultation"
                  ? "border-b-2 border-green-500 text-black"
                  : "text-black"
              }
            >
              <Link href="/consultation">Consultation</Link>
            </div>
            <div
              className={
                pathname === "/compare"
                  ? "border-b-2 border-green-500 text-black"
                  : "text-black"
              }
            >
              <Link href="/compare">Compare</Link>
            </div>
          </div>
        </div>
        {isClient && (
          <div className="navbar-end flex gap-8">
            <CompareModal />
            <div className="relative">
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
              <Link href={"/cart"}>
                <button>
                  <FaShoppingCart className="w-7 h-7" />
                </button>
              </Link>
            </div>
            <Link href={"/favorite"}>
              <button>
                <FaHeart className="w-7 h-7" />
              </button>
            </Link>
            {status === "unauthenticated" ? (
              <div className="btn text-white" onClick={() => signIn()}>
                {" "}
                Sign In
              </div>
            ) : (
              <Link href={"/admin"} className="btn text-white">
                {" "}
                Dashboard
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  if (
    pathname == "/admin" ||
    pathname == "/admin/users" ||
    pathname == "/admin/all-product" ||
    pathname == "/admin/pra-planting" ||
    pathname == "/admin/post-planting" ||
    pathname == "/admin/add-product"
  ) {
    return <SideNavbar />;
  }

  return null;
};

export default Navbar;
