import TableAllProduct from "./tableAllProduct";

const TableAllProductContainer = async () => {
  return (
    <div className="h-auto flex">
      <div className="w-screen ml-56 p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Product
          </h4>
        </div>
        <TableAllProduct />
      </div>
    </div>
  );
};

export default TableAllProductContainer;
