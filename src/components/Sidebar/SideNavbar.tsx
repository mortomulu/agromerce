"use client";

import { Sidebar } from "flowbite-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { BiBuoy, BiLogOutCircle, BiSolidCartAdd } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SideNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await signOut(); // Perlu menunggu proses signOut selesai sebelum mengarahkan pengguna
    router.push("/"); // Mengarahkan pengguna ke halaman utama setelah logout
  };

  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="fixed w-56 h-screen top-0"
    >
      <h1 className="text-2xl font-semibold mb-10 ml-4">
        {" "}
        <span className="text-green-500">Agro</span>Merce
      </h1>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <div
            className={pathname == "/admin" ? "bg-green-200 rounded-lg" : ""}
          >
            <Sidebar.Item href="/admin" icon={HiChartPie}>
              <p className="">Dashboard</p>
            </Sidebar.Item>
          </div>
          <div
            className={
              pathname == "/admin/users" ? "bg-green-200 rounded-lg" : ""
            }
          >
            <Sidebar.Item href="/admin/users" icon={HiUser}>
              Users
            </Sidebar.Item>
          </div>

          <Sidebar.Collapse
            className={
              pathname === "/admin/all-product" ||
              pathname === "/admin/pra-planting" ||
              pathname === "/admin/post-planting"
                ? "bg-green-200 rounded-lg"
                : ""
            }
            icon={HiShoppingBag}
            label="Products"
          >
            <Sidebar.Item href="/admin/all-product">All Product</Sidebar.Item>
            <Sidebar.Item href="/admin/pra-planting">Pra-Planting</Sidebar.Item>
            <Sidebar.Item href="/admin/post-planting">
              Post-Planting
            </Sidebar.Item>
          </Sidebar.Collapse>
          <div
            className={
              pathname == "/admin/add-product" ? "bg-green-200 rounded-lg" : ""
            }
          >
            <Sidebar.Item href="/admin/add-product" icon={BiSolidCartAdd}>
              Add product
            </Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="flex items-center ">
          <div className="ml-1">
            <Sidebar.Item icon={BiLogOutCircle}></Sidebar.Item>
          </div>
          <button onClick={handleLogout} className="-ml-5 -pt-5!">
          Sign Out
        </button>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
