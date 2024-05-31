const CategoryBar = () => {
  return (
    <ul className="sticky top-24 menu menu-md text-gray-600 bg-white w-56 h-52 rounded-box border border-green-500">
      <li className="font-bold text-black">
        <a>All Product</a>
      </li>
      <li>
        <a>Pra-Planting</a>
      </li>
      <li>
        <a>Post-Planting</a>
      </li>
    </ul>
  );
};

export default CategoryBar;
