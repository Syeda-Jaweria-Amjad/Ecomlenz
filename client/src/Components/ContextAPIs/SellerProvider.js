import React, { createContext, useState, useContext } from "react";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [selectedSellerName, setSelectedSellerName] = useState("");
  return (
    <SellerContext.Provider value={{ selectedSellerId, setSelectedSellerId, selectedSellerName, setSelectedSellerName}}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => useContext(SellerContext);
