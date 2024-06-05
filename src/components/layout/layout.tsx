import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import Navbar from "@/components/navbar/Navbar";

interface TypeLayout {
  children?: ReactNode;
}

const Layout: NextPage<TypeLayout> = (props): ReactElement => {
  return (
    <>
      <Navbar />
      <>{props?.children}</>
    </>
  );
};

export default Layout;
