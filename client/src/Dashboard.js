import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Loader from "./Components/Loader";
import Productsfeed from "./pages/Productsfeed";
import SellerTable from "./pages/Seller";
import Saveproducts from "./pages/Saveproducts";
import Settings from "./pages/Settings";
import { useDispatch } from "react-redux";
import {
  clearErrorsAction,
  loadCurrentUserAction,
} from "./Redux/Actions/loadCurrentUserAction";
function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Trigger loading state on route change
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate load time
    return () => clearTimeout(timer); // Cleanup timeout
  }, [location]);

  useEffect(() => {
    dispatch(clearErrorsAction());
    dispatch(loadCurrentUserAction());
  }, [dispatch]);
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col relative">
        {/* Static Header */}
        {/* <Header /> */}

        {/* Content Area */}
        <div className="flex-grow overflow-auto px-1">
          {isLoading && <Loader />}
          <Routes>
            <Route path="/" element={<Productsfeed />} />
            <Route path="products-feed" element={<Productsfeed />} />
            <Route path="saved-products" element={<Saveproducts />} />
            <Route path="sellers" element={<SellerTable />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
