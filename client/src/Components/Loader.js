import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full absolute top-0 left-0 bg-white bg-opacity-70 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
    </div>
  );
};

export default Loader;
