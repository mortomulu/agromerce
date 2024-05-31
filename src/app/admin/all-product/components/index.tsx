import AdminLayout from "@/components/layout/layoutAdmin";
import TableAllProductContainer from "./tableAllProduct";

export const AllProduct = ({ products }: any) => {
  return (
    <AdminLayout>
      <TableAllProductContainer products={products} />
    </AdminLayout>
  );
};
