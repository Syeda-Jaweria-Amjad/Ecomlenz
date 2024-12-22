import React, { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiTag, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserSavedSellersAction,
  clearErrorsAction,
  pauseSellerAction,
  loadUserAllSellersAction,
  addSellerAction,
} from "../Redux/Actions/loadCurrentUserAction";
import Loader from "../Components/Loader";
import ActionBtn from "../Components/ActionBtn/ActionBtn";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../Components/ToastMessages/ToastMessage";
import ManageTagsModal from "./TagsModal";
import { Toaster } from "react-hot-toast";
import ErrorPage from "../Components/ErrorPage";

const SellerTable = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, sellers } = useSelector(
    (state) => state.loadUserAllSellersReducer
  );
  const [addSellerDropdownOpen, setAddSellerDropdownOpen] = useState(false);
  const { pauseSellerLoading, pauseSellerError, pauseSellerMessage } =
    useSelector((state) => state.pauseSellerReducer);

  useEffect(() => {
    dispatch(loadUserSavedSellersAction());
  }, [dispatch]);

  const dateConverter = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {}, [searchValue]);
  const filteredSellers = searchValue
    ? sellers.filter(
        (seller) =>
          seller.sellerName.toLowerCase().includes(searchValue.toLowerCase()) ||
          seller.sellerId.toLowerCase().includes(searchValue.toLowerCase())
      )
    : sellers;

  useEffect(() => {
    if (!pauseSellerLoading && pauseSellerMessage) {
      handleShowSuccessToast(pauseSellerMessage);
      dispatch(clearErrorsAction());
      dispatch(loadUserSavedSellersAction());
    } else if (!pauseSellerLoading && pauseSellerError) {
      handleShowFailureToast(pauseSellerError);
      dispatch(clearErrorsAction());
    }
  }, [pauseSellerMessage, pauseSellerLoading, pauseSellerError, dispatch]);

  const handlePauseSeller = (id) => {
    dispatch(clearErrorsAction());
    dispatch(pauseSellerAction(id));
  };

  const { addSellerLoading, addSellerMessage, addSellerError } = useSelector(
    (state) => state.addSellerReducer
  );
  useEffect(() => {
    dispatch(clearErrorsAction());
    dispatch(loadUserAllSellersAction());
  }, [dispatch]);
  const [id, setId] = useState(null);
  const handleAddSeller = () => {
    if (!id) {
      alert("Please enter a seller ID");
      return;
    }
    dispatch(addSellerAction(id));
  };

  useEffect(() => {
    if (!addSellerLoading && addSellerMessage) {
      handleShowSuccessToast(addSellerMessage);
      setId("");
      dispatch(clearErrorsAction());
      dispatch(loadUserSavedSellersAction());
    } else if (!addSellerLoading && addSellerError) {
      setId("");
      handleShowFailureToast(addSellerError);
      dispatch(clearErrorsAction());
    }
  }, [addSellerMessage, addSellerLoading, addSellerError, dispatch]);

  const [showSellerFilter, setSellerFilter] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showStatusValues, setStatusValues] = useState(false);
  const [statusValue, setStatusValue] = useState(false);

  useEffect(() => {
    dispatch(loadUserAllSellersAction(statusValue));
  }, [statusValue, dispatch]);
  return (
    <div className="container mx-auto p-0 md:p-4 ">
      <Toaster />
      {/* Upper Control Section */}

      <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-4 md:space-y-0 relative">
        {/* Search Bar */}
        <div className="flex items-center w-full md:w-1/3 bg-gray-100 rounded-md px-4 py-2">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent focus:outline-none text-sm"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {showStatus && (
          <h1
            className="absolute top-1 left-[35%] bg-[#dadada] text-black px-3 py-1 rounded cursor-pointer"
            onClick={() => {
              setStatusValues(!showStatusValues);
            }}
          >
            Status
          </h1>
        )}
        {showStatusValues && (
          <div className="absolute top-10 left-[35%] bg-[#dadada] w-40 h-28 rounded-lg">
            <h1
              className="m-2 cursor-pointer"
              onClick={() => setStatusValue(false)}
            >
              Active
            </h1>
            <h1
              className="m-2 cursor-pointer"
              onClick={() => setStatusValue(true)}
            >
              Paused
            </h1>
            <hr />
            <h1
              className="text-center mt-2 cursor-pointer"
              onClick={() => {
                setShowStatus(false);
                setStatusValues(false);
              }}
            >
              Clear Filter
            </h1>
          </div>
        )}
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-gray-100 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm w-full md:w-auto"
          >
            <FiTag />
            <span>Manage Tags</span>
          </button>

          {isModalOpen && (
            <ManageTagsModal onClose={() => setIsModalOpen(false)} />
          )}
          <div className="relative">
            <button
              className="flex items-center justify-center md:justify-start space-x-2 bg-gray-100 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm w-full md:w-auto"
              onClick={() => setSellerFilter(!showSellerFilter)}
            >
              <FiFilter />
              <span>Filters</span>
            </button>
            {showSellerFilter && (
              <div className="w-[200px] h-[150px] bg-[#dadada] absolute top-10 right-0 rounded-lg ">
                <h1 className="text-black m-3">Seller Filters</h1>
                <hr className="text-black" />
                <h1
                  className="text-black my-3 ml-12 cursor-pointer"
                  onClick={() => setShowStatus(!showStatus)}
                >
                  Status
                </h1>
                <hr className="text-black" />
                <h1
                  className="text-black my-3 ml-20 cursor-pointer"
                  onClick={() => {
                    setShowStatus(false);
                    setSellerFilter(false);
                    setStatusValues(false);
                  }}
                >
                  Clear Filter
                </h1>
              </div>
            )}
          </div>
          <button
            className="flex items-center justify-center md:justify-start space-x-2 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm w-full md:w-auto"
            onClick={() => setAddSellerDropdownOpen(!addSellerDropdownOpen)}
          >
            <FiPlus />
            <span>Add Seller</span>
          </button>
          <div
            className={`absolute top-12 right-0 z-20 mt-3 origin-top-right rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5 focus:outline-none shadow-xl ${
              !addSellerDropdownOpen ? "hidden" : ""
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <div className="py-1 px-2 flex gap-2 justify-between">
              <div>
                <div className="text-md">Seller ID*</div>
                <div>
                  <input
                    type="text"
                    className="mt-2 w-40 h-8 px-2 text-sm rounded-md border border-gray-500"
                    placeholder="Enter Seller ID"
                    onChange={(e) => setId(e.target.value)}
                    value={id} // Bind to state
                    // Update state
                  />
                </div>
              </div>
              <div className="flex flex-col justify-end items-end gap-2">
                <div>
                  <button className="bg-gray-200 text-black text-sm px-2 rounded">
                    2/200
                  </button>
                </div>
                <div className="flex flex-col justify-end items-end gap-2">
                  {addSellerLoading ? (
                    <div className="text-sm w-20 text-white h-8 px-2 rounded-md bg-black hover:bg-gray-800 flex justify-center items-center">
                      <Loader />
                    </div>
                  ) : (
                    <button
                      className="text-[0.65rem] w-20 text-white h-8 px-2 rounded-md bg-black hover:bg-gray-800"
                      onClick={handleAddSeller}
                    >
                      Add Seller
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section with Horizontal Scrolling */}
      <div className="max-sm:w-72 h-screen lg:overflow-x-hidden overflow-x-auto">
        <table className="min-w-full h-auto bg-white border border-gray-200 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Store ID</th>
              <th className="text-left px-4 py-2 border-b">Added on</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
              <th className="text-left px-4 py-2 border-b">Tags</th>
              <th className="text-center px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : filteredSellers && filteredSellers?.length > 0 ? (
              filteredSellers?.map((seller, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{seller?.sellerName}</td>
                  <td className="px-4 py-2 border-b">{seller?.sellerId}</td>
                  <td className="px-4 py-2 border-b">
                    {dateConverter(seller?.date)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
                      {seller?.pauseStatus?.status ? "Paused" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seller?.isSaved && (
                      <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-sm">
                        {seller?.isSaved ? "Favourite" : ""}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button className="text-gray-600 hover:text-gray-900">
                      <ActionBtn
                        SellerName={seller?.sellerName}
                        SellerID={seller?._id}
                        asin={seller?.sellerId}
                        SellerStatus={seller.pauseStatus.status}
                        pauseseller={handlePauseSeller}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div className="flex justify-center items-center text-center">
                {" "}
                <ErrorPage />{" "}
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerTable;
