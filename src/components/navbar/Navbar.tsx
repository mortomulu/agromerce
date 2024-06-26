"use client";

import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
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
import { ClipLoader } from "react-spinners";
import { Button, Spinner } from "flowbite-react";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const cart: any[] = useSelector((state: RootState) => state.cart.products);
  const compare: any[] = useSelector(
    (state: RootState) => state.compare.products
  );
  const [isClient, setIsClient] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const API_KEY = process.env.NEXT_SECRET_OPENAI_API_KEY;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const exOutput = {
    "Produk Pertama": {
      "Kelebihan": [
        "Efektif dalam membasmi wibu dan kecoak yang sering menjadi hama dalam rumah.",
        "Bisa digunakan dalam berbagai lingkungan, terutama di rumah dan gedung.",
        "Membantu mencegah penyakit yang bisa ditularkan oleh kecoak."
      ],
      "Kekurangan": [
        "Menggunakan bahan kimia yang mungkin berbahaya jika terpapar pada manusia atau hewan peliharaan.",
        "Memerlukan waktu untuk melihat efeknya.",
        "Bisa mencemari lingkungan jika tidak digunakan dengan tepat."
      ]
    },
    "Produk Kedua": {
      "Kelebihan": [
        "Memperbaiki kesuburan tanah dengan menambah bahan organik dan nutrisi esensial yang dibutuhkan oleh tanaman.",
        "Ramah lingkungan dan tidak mencemari lahan pertanian.",
        "Bisa dihasilkan sendiri dengan mengolah sisa-sisa tanaman dan pupuk kandang."
      ],
      "Kekurangan": [
        "Proses pembuatan membutuhkan waktu yang cukup lama.",
        "Konsistensi dan kualitas pupuk dapat bervariasi tergantung pada bahan yang digunakan.",
        "Mungkin tidak mengandung semua nutrisi yang dibutuhkan oleh tanaman."
      ]
    }
  }

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
      setIsLoading(true);
      const systemBehaviour =
      `Kamu akan melakukan komparasi produk dengan membandingan kedua produk berdasarkan data yang dikirim dengan output json kelebihan dan kekurangan masing masing produk dengan contoh teks output seperti ini ${exOutput} dan pada produk pertama harus memiliki key Produk Pertama dan produk kedua harus memiliki key Produk Kedua untuk key yang dideteksi untuk dimasukkan dalam tabel`;
      console.log(systemBehaviour);

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

        setIsLoading(false);

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
              <h2 className="text-lg font-bold mb-4">Komparasi Produk</h2>
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
                  <p className="text-gray-700">Tidak ada produk yang di komparasi</p>
                )}
              </div>
              {compare.length >= 2 ? (
                <button
                  onClick={(e) => handleCompare(e)}
                  className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner aria-label="Spinner button example" size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Komparasi sekarang!"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleToggle}
                  disabled
                  className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none"
                >
                  Komparasi sekarang!
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    signOut();
  };

  if (
    pathname == "/" ||
    /^\/detail-product\/\d+$/.test(pathname) ||
    pathname == "/consultation" ||
    pathname == "/compare" ||
    pathname == "/cart" ||
    pathname == "/favorite" ||
    pathname == "/thanks" ||
    pathname == "/gross-history" ||
    pathname == "/profile"
  ) {
    return (
      <>
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75">
            <ClipLoader size={50} color={"#3cb371"} loading={isLoading} />
          </div>
        )}
        <div className="navbar bg-white mb-8 fixed top-0 z-50">
          <div className="navbar-start w-1/5">
            <Link href={"/"} className="btn btn-ghost gap-1 text-xl">
              <span className="text-green-500 ">Agro</span>Merce
            </Link>
          </div>
          <div className="navbar-start hidden lg:flex">
            <div className="menu menu-horizontal gap-10 px-1">
              <div
                className={
                  pathname === "/"
                    ? "border-b-2 border-green-500  pb-2 px-4 text-black"
                    : "text-black"
                }
              >
                <Link href="/">Beranda</Link>
              </div>
              <div
                className={
                  pathname === "/consultation"
                    ? "border-b-2 border-green-500 text-black pb-2 px-4"
                    : "text-black"
                }
              >
                <Link href="/consultation">Konsultasi</Link>
              </div>
              <div
                className={
                  pathname === "/compare"
                    ? "border-b-2 border-green-500  text-black pb-2 px-4"
                    : "text-black"
                }
              >
                <Link href="/compare">Komparasi Produk</Link>
              </div>
            </div>
          </div>
          {isClient && (
            <div className="navbar-end flex items-center mr-4 gap-8">
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
              {status === "unauthenticated" ? (
                <div className="btn text-white" onClick={() => signIn()}>
                  {" "}
                  Log In
                </div>
              ) : (
                <div className="relative">
                  <button onClick={handleProfileClick}>
                    <CgProfile className="bg-white text-black h-8 w-8" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Profile
                        </Link>
                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Dashboard
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }

  if (
    pathname == "/admin" ||
    pathname == "/admin/users" ||
    pathname == "/admin/all-product" ||
    pathname == "/admin/pra-planting" ||
    pathname == "/admin/post-planting" ||
    pathname == "/admin/add-product" ||
    pathname == "/admin/transactions" ||
    pathname == "/^/admin/all-product/detail/d+$/"
  ) {
    return <SideNavbar />;
  }

  return null;
};

export default Navbar;
