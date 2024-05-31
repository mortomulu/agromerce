// "use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminLayout from "@/components/layout/layoutAdmin";
import TableAllProductContainer from "./tableAllProduct";

export const AllProduct = ({ products }: any) => {
//   console.log(products);
//   const router = useRouter();

//   const { data: session, status }: { data: any; status: string } = useSession();

//   useEffect(() => {
//     if (status === "unauthenticated" && session?.user.role !== "admin") {
//       router.push("/");
//     }
//   }, [router, status]);
  return (
    <AdminLayout>
      <TableAllProductContainer products={products} />
    </AdminLayout>
  );
};
