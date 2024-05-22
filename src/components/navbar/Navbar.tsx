"use client";

import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { Button, Tooltip } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

// sidebar
import { Sidebar } from "flowbite-react";
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
import { signIn, signOut, useSession } from "next-auth/react";
import SideNavbar from "../Sidebar/SideNavbar";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (
    pathname == "/" ||
    pathname == "/consultation" ||
    pathname == "/compare"
  ) {
    return (
      <div className="navbar bg-white mb-8 fixed top-0 z-10">
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
              <a href="/consultation">Consultation</a>
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
        <div className="navbar-end flex gap-8">
          <FaBalanceScale className="w-8 h-8" />
          <FaShoppingCart className="w-7 h-7" />
          <FaHeart className="w-7 h-7" />
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
