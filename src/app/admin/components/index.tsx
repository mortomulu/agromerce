import AdminLayout from "@/components/layout/layoutAdmin";
import CardAnalytics1 from "./analytics1";
import { getProducts } from "@/lib/crudProduct/dbData";

const countTotalStok = (items: any[]) => {
  let totalStok = 0;

  items.forEach((data: any) => {
    totalStok += data.stok;
  });

  return totalStok;
};

export const Dashboard = async () => {
  const data = await getProducts();
  const totalProduct = await data.length;
  const totalStok = countTotalStok(data)

  return (
    <div className="min-h-screen">
      <AdminLayout>
        <div className="h-auto flex">
          <CardAnalytics1 totalProducts={totalProduct} totalStok={totalStok}/>
        </div>
      </AdminLayout>
    </div>
  );
};
