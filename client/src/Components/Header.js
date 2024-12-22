import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Map paths to page titles
  const pageTitles = {
    "/dashboard/products-feed": "Products Feed",
    "/dashboard/saved-products": "Saved Products",
    "/Dashboard/saved-products": "Saved Products",
    "/dashboard/sellers": "Sellers",
    "/Dashboard/sellers": "Sellers",
    "/dashboard/settings": "Settings",
    "/Dashboard/settings": "Settings",
  };

  const currentPage = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="w-full bg-gray-100 px-6 py-[18px] border-b border-gray-300 shadow-md">
      <h1 className="text-xl font-bold text-gray-800">{currentPage}</h1>
    </div>
  );
};

export default Header;
