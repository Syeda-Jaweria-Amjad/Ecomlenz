import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SellerProductAction,
  clearErrorsAction,
} from "../../Redux/Actions/loadCurrentUserAction";
import ProductCard from "../Product Card/ProductCard";
import EditSellerModal from "../EditModel/EditSellerModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorPage from "../ErrorPage";
import { FiSearch, FiFilter } from "react-icons/fi";

const SellerDetailsModal = ({
  SellerName,
  SellerID,
  isOpen,
  onClose,
  SellerStatus,
  asin,
  date
}) => {
  const dispatch = useDispatch();

  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  function openEditModel() {
    setIsEditModelOpen(true);
  }

  function closeEditModel() {
    setIsEditModelOpen(false);
  }

  const openDeleteModel = () => setIsDeleteModelOpen(true);
  const closeDeleteModel = () => {
    setIsDeleteModelOpen(false);
  };

  // Redux state selectors
  const { SellerProductLoading, SellerProductMessage, SellerProductError } =
    useSelector((state) => state.sellerProducts);

  // Fetch products on modal open
  useEffect(() => {
    if (isOpen) {
      dispatch(
        SellerProductAction(
          SellerID,
          currentPage,
          rowsPerPage,
          currentPage,
          rowsPerPage
        )
      );
    }
  }, [isOpen, SellerID, dispatch, SellerName]);

  // Clear errors when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      dispatch(clearErrorsAction());
    }
  }, [isOpen, dispatch]);

  // Filter products based on search query
  const filteredProducts = SellerProductMessage?.filter(
    (product) =>
      product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
  );


  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when rows change
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(SellerProductMessage?.length / rowsPerPage);
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Compute pagination details
  const totalProducts = SellerProductMessage?.length || 0;
  const startIndex = rowsPerPage * (currentPage - 1) + 1;
  const endIndex = Math.min(rowsPerPage * currentPage, totalProducts);
  const totalPages = Math.ceil(totalProducts / rowsPerPage);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 bg-white shadow-lg rounded-lg max-w-6xl w-full sm:w-11/12 md:w-3/4
          lg:w-9/12 cursor-default">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-black">Seller Details</h1>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-600 text-2xl"
              >
                &times;
              </button>
            </div>
  
            {/* Seller Info */}
            <div className="border rounded-md border-black p-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-semibold text-black">{SellerName}</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {SellerStatus ? "Paused" : "Active"}
                  </span>
                </div>
  
                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300">
                    Bookmark
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                    onClick={openDeleteModel}
                  >
                    Delete
                  </button>
                  {isDeleteModelOpen && (
                    <DeleteModal
                      isOpen={isDeleteModelOpen}
                      onClose={closeDeleteModel}
                      asin={asin}
                      SellerName={SellerName}
                      SellerID={SellerID}
                      inseller={true}
                    />
                  )}
                  <button
                    className="px-4 py-2 bg-black text-white rounded-md"
                    onClick={openEditModel}
                  >
                    Edit
                  </button>
                  {isEditModelOpen && (
                    <EditSellerModal
                      isOpen={isEditModelOpen}
                      onClose={closeEditModel}
                      asin={asin}
                      SellerName={SellerName}
                      SellerID={SellerID}
                    />
                  )}
                </div>
              </div>
  
              {/* Seller ID & Date Info */}
              <div className="text-sm text-gray-500 space-y-2 mt-4 sm:flex sm:justify-between sm:items-center">
                <span className="p-2 bg-blue-100 text-black font-medium rounded-md">{asin}</span>
                <div className="flex flex-col sm:flex-row sm:space-x-6 mt-2 sm:mt-0">
                  <p>Last Posted:  {new Date(date).toLocaleString()}</p>
                  <p>Added On: {new Date(date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
  
            {/* Products Section */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">
                Products <span className="text-gray-600">({SellerProductMessage?.length})</span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
              <div className="flex items-center w-full md:w-1/3 bg-gray-100 rounded-md px-4 py-2">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-transparent focus:outline-none text-sm"
              />
              </div>
              <div className="relative">
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm mt-2 md:mt-0">
            <FiFilter />
            <span>Filters</span>
          </button>
        </div>
            </div>
  
            {SellerProductLoading ? (
              <div className="text-center mt-6"><CircularProgress size="3rem" /></div>
            ) : SellerProductError ? (
              <div className="text-center mt-6 text-red-500">Error: {SellerProductError}</div>
            ) : (
              <div className="w-full h-52 mt-6 overflow-y-auto">
                {filteredProducts?.length > 0 ? (
                  filteredProducts
                    .slice(startIndex - 1, endIndex)
                    .map((product, index) => (
                      <ProductCard key={index} {...product} />
                    ))
                ) : (
                  <div className="flex justify-center items-center text-center"> <ErrorPage/> </div>
                )}
              </div>
            )}
  
            {/* Pagination */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200 mt-4">
              <span className="text-sm text-gray-600">
                {startIndex} - {endIndex} of {totalProducts} result(s)
              </span>
  
              <div className="flex items-center space-x-4">
                <label htmlFor="rowsPerPage" className="text-sm">
                  Rows per page:
                </label>
                <select
                  id="rowsPerPage"
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
  
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
  
                <button
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );  
};

export default SellerDetailsModal;