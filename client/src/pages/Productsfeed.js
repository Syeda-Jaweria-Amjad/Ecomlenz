import React from "react";
import Sellers from "../Components/Seller";
import Feed from "../Components/Feed";

const Productsfeed = () => {
  return (
    <div className="flex flex-grow flex-col md:flex-row h-screen">
      {/* Sellers Section */}
      <div className="md:w-2/4  lg:w-1/4 border-r border-gray-200  overflow-hidden z-50">
        <Sellers />
      </div>

      {/* Feed Section */}
      <div className="md:w-3/4 h-full overflow-auto">
        <Feed />
      </div>
    </div>
  );
};

export default Productsfeed;
