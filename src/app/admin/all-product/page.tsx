import TableAllProduct from "@/components/Table/TableAllProduct";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AllProduct } from "@/modules/allProduct/module";

const AllProductPage = () => {
  // const router = useRouter();

  // const { data: session, status }: { data: any; status: string } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated" && session?.user.role !== "admin") {
  //     router.push("/");
  //   }
  // }, [router, status]);

  return (
    <div >
      {/* <TableAllProduct /> */}
      <AllProduct/>
    </div>
  );
};

export default AllProductPage;
