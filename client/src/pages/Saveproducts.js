import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSavedProduct } from "../Redux/Actions/loadCurrentUserAction";
import { FiSearch, FiFilter, FiCheck } from "react-icons/fi";
import ProductCard from "../Components/Product Card/ProductCard";

import CircularProgress from "@mui/material/CircularProgress";
import ErrorPage from "../Components/ErrorPage";
import { useSeller } from "../Components/ContextAPIs/SellerProvider";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SaveProducts = () => {
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input

  // Access Redux state
  const {
    showSavedProductLoading,
    showSavedProductMessage,
    showSavedProductError,
  } = useSelector((state) => state.showSavedProductReducer);

  // Fetch products whenever currentPage, rowsPerPage, or searchQuery changes
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: rowsPerPage,
      searchQuery,
    };
    dispatch(showSavedProduct(params));
  }, [dispatch, currentPage, rowsPerPage, searchQuery]);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on rows change
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (showSavedProductMessage.products?.length === rowsPerPage)
      setCurrentPage((prev) => prev + 1);
  };

  // Filter products based on search query (if local filtering is needed)
  const filteredProducts = showSavedProductMessage?.products?.filter(
    (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Filters

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); //filters
  const [selectedItems, setSelectedItems] = useState([]); //filters
  const [activeFilter, setActiveFilter] = useState(null); //filter
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState([]);

  // for time posted filter
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const [selectedOptionMonthSold, setSelectedOptionMonthSold] = useState("");

  const dropdownItems = [
    "Categories",
    "Buy Box",
    "Offers",
    "Sales Rank",
    "Monthly Sold",
    "Time Posted",
    "Newly Posted",
    "Amazon on Listing",
    "Fulfilment Method",
  ];
  const { selectedSellerId, selectedSellerName } = useSeller();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dialogBoxtoggle = (filter) => {
    setIsOpen(!isOpen);
    setActiveFilter(filter);
  };

  const toggleSelection = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((selectedItem) => selectedItem !== item)
        : [...prev, item]
    );
  };
  const [buyBoxFilterType, setBuyBoxFilterType] = useState("");
  const [minBuyBox, setMinBuyBox] = useState("");
  const [maxBuyBox, setMaxBuyBox] = useState("");

  const [offersFilterType, setOffersFilterType] = useState("");
  const [minOffers, setMinOffers] = useState("");
  const [maxOffers, setMaxOffers] = useState("");
  const [salesRankFilterType, setSalesRankFilterType] = useState("");
  const [minSalesRank, setMinSalesRank] = useState("");
  const [maxSalesRank, setMaxSalesRank] = useState("");
  const [monthlySoldFilterType, setMonthlySoldFilterType] = useState("");
  const [minMonthlySold, setMinMonthlySold] = useState("");
  const [maxMonthlySold, setMaxMonthlySold] = useState("");
  const [newlyPostedDays, setNewlyPostedDays] = useState("");
  const [amazonOnListing, setAmazonOnListing] = useState("");
  const [fulfillmentMethod, setFulfillmentMethod] = useState("");
  const renderDialogContent = () => {
    // console.log("category", selectedCategories)
    const categories = [
      "Alexa Skills",
      "Appliances",
      "Apps & Games",
      "Arts, Crafts & Sewing",
      "Audible Books & Originals",
      "Automotive",
      "Baby Products",
      "Books",
      "Home & Kitchen",
      "Health & Household",
      "Beauty & Personal Care",
      "Grocery & Gourmet Food",
      "Sports & Outdoors",
      "Clothing, Shoes & Jewelry",
      // Add more categories here
    ];

    const toggleCategory = (category) => {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(
          selectedCategories.filter((item) => item !== category)
        );
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    };
    switch (activeFilter) {
      case "Categories":
        return (
          <div className="w-72 p-2   max-w-md mx-auto rounded-md ">
            <h3 className="text-md font-semibold ps-2 pt-2 mb-1">
              All Categories
            </h3>
            <div className="max-h-52 overflow-y-auto rounded-md">
              <ul>
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className="text-sm py-1 flex items-center cursor-pointer"
                  >
                    {selectedCategories.includes(category) ? (
                      <span className="mr-2 text-green-500">✓</span>
                    ) : (
                      <span className="mr-2"></span>
                    )}
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="flex justify-between gap-2 mt-2 text-sm">
              <button
                onClick={() => setSelectedCategories([])}
                className="bg-gray-400 w-full text-white px-10 py-2 rounded-md hover:bg-gray-700"
              >
                Clear
              </button>
            </div> */}
          </div>
        );

      case "Buy Box":
        return (
          <div className="p-2">
            <h3 className=" text-md font-semibold">Buy Box</h3>
            <div className="flex justify-between gap-1 items-center">
              <select
                className=" w-7/12 border border-gray-400 rounded-md px-1 py-2 text-sm"
                defaultValue=""
                onChange={(e) => setBuyBoxFilterType(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="greaterThan">Greater than</option>
                <option value="lessThan">Less than</option>
                <option value="between">Between</option>
              </select>

              {buyBoxFilterType === "between" ? (
                <>
                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      setMinBuyBox(e.target.value);
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />

                  <p>to</p>

                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      setMaxBuyBox(e.target.value);
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      (buyBoxFilterType === "greaterThan" &&
                        setMinBuyBox(e.target.value)) ||
                        (buyBoxFilterType === "lessThan" &&
                          setMaxBuyBox(e.target.value));
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />
                </>
              )}
            </div>

            {/* <div className="flex justify-between gap-2 mt-2 text-sm">
              <button
                className="bg-gray-400 w-full text-white px-10 py-2 rounded-md hover:bg-gray-700"
                onClick={() => {
                  setBuyBoxFilterType("");
                  setMaxBuyBox(null);
                  setMinBuyBox(null);
                }}
              >
                Clear
              </button>
            </div> */}
          </div>
        );

      case "Offers":
        return (
          <div className="p-2">
            <h3 className=" text-md font-semibold">Offers</h3>
            <div className="flex justify-between gap-1 items-center">
              <select
                className=" w-7/12 border border-gray-400 rounded-md px-1 py-2 text-sm"
                defaultValue=""
                onChange={(e) => setOffersFilterType(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="greaterThan">Greater than</option>
                <option value="lessThan">Less than</option>
                <option value="between">Between</option>
              </select>

              {offersFilterType === "between" ? (
                <>
                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      setMinOffers(e.target.value);
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />

                  <p>to</p>

                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      setMaxOffers(e.target.value);
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      (offersFilterType === "greaterThan" &&
                        setMinOffers(e.target.value)) ||
                        (offersFilterType === "lessThan" &&
                          setMaxOffers(e.target.value));
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />
                </>
              )}
            </div>

            {/* <div className="flex justify-between gap-2 mt-2 text-sm">
              <button
                className="bg-gray-400 w-full text-white px-10 py-2 rounded-md hover:bg-gray-700"
                onClick={() => {
                  setOffersFilterType("");
                  setMaxOffers(null);
                  setMinOffers(null);
                }}
              >
                Clear
              </button>
            </div> */}
          </div>
        );

      case "Sales Rank":
        return (
          <div className="p-2">
            <h3 className=" text-md font-semibold">Sales Rank</h3>
            <div className="flex justify-between gap-1 items-center">
              <select
                className=" w-7/12 border border-gray-400 rounded-md px-1 py-2 text-sm"
                defaultValue=""
                onChange={(e) => setSalesRankFilterType(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="greaterThan">Greater than</option>
                <option value="lessThan">Less than</option>
                <option value="between">Between</option>
              </select>

              {salesRankFilterType === "between" ? (
                <>
                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      setMinSalesRank(e.target.value);
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />

                  <p>to</p>

                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      setMaxSalesRank(e.target.value);
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      (salesRankFilterType === "greaterThan" &&
                        setMinSalesRank(e.target.value)) ||
                        (salesRankFilterType === "lessThan" &&
                          setMaxSalesRank(e.target.value));
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />
                </>
              )}
            </div>

            {/* <div className="flex justify-between gap-2 mt-2 text-sm">
              <button className="bg-gray-400 w-6/12 text-white px-10 py-2 rounded-md hover:bg-gray-700">
                Clear
              </button>
              <button className="bg-blue-300 w-6/12 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Apply
              </button>
            </div> */}
          </div>
        );

      case "Monthly Sold":
        return (
          <div className="p-2">
            <h3 className=" text-md font-semibold">Monthly Sold</h3>
            <div className="flex justify-between gap-1 items-center">
              <select
                className=" w-7/12 border border-gray-400 rounded-md px-1 py-2 text-sm"
                defaultValue=""
                onChange={(e) => setMonthlySoldFilterType(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="greaterThan">Greater than</option>
                <option value="lessThan">Less than</option>
                <option value="between">Between</option>
              </select>

              {monthlySoldFilterType === "between" ? (
                <>
                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      setMinMonthlySold(e.target.value);
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />

                  <p>to</p>

                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      setMaxMonthlySold(e.target.value);
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder=""
                    onChange={(e) => {
                      (monthlySoldFilterType === "greaterThan" &&
                        setMinMonthlySold(e.target.value)) ||
                        (monthlySoldFilterType === "lessThan" &&
                          setMaxMonthlySold(e.target.value));
                    }}
                    className="w-5/12 px-1 py-1 border border-gray-400 rounded-md"
                  />
                </>
              )}
            </div>

            {/* <div className="flex justify-between gap-2 mt-2 text-sm">
              <button className="bg-gray-400 w-6/12 text-white px-10 py-2 rounded-md hover:bg-gray-700">
                Clear
              </button>
              <button className="bg-blue-300 w-6/12 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Apply
              </button>
            </div> */}
          </div>
        );

      case "Time Posted":
        return (
          <div className="p-3">
            <div className="flex gap-4 items-center">
              <div>
                <label className="block mb-1 font-medium">Start Date</label>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="w-full border border-gray-400 rounded-md px-3 py-2"
                  inline
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">End Date</label>
                <ReactDatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="w-full border border-gray-400 rounded-md px-3 py-2"
                  inline
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
            </div>
            {/* <div className="flex justify-between gap-2 mt-4">
              <button className="bg-gray-400 w-6/12 text-white px-4 py-2 rounded-md hover:bg-gray-800">
                Clear
              </button>
              <button className="bg-blue-400 w-6/12 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Apply
              </button>
            </div> */}
          </div>
        );

      case "Newly Posted":
        return (
          <div className="p-2 w-60">
            <div className="flex flex-col justify-start items-start gap-1">
              <button
                className=" text-white bg-gray-600 hover:bg-gray-700 w-full ps-5 text-start py-1 mr-2 border rounded-md"
                onClick={() => setNewlyPostedDays(true)}
              >
                True
              </button>
              <button
                className="text-white bg-gray-600 hover:bg-gray-700 w-full ps-5 text-start py-1 mr-2 border rounded-md"
                onClick={() => setNewlyPostedDays(false)}
              >
                False
              </button>
            </div>
            {/* <div className="flex justify-between gap-2 mt-2 text-sm">
              <button className="bg-gray-400 w-6/12 text-white px-10 py-2 rounded-md hover:bg-gray-700">
                Clear
              </button>
              <button className="bg-blue-300 w-6/12 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Apply
              </button>
            </div> */}
          </div>
        );
      case "Amazon on Listing":
        return (
          <div className="p-2 w-60">
            <div className="flex flex-col justify-start items-start gap-1">
              <button
                className=" text-white bg-gray-600 hover:bg-gray-700 w-full ps-5 text-start py-1 mr-2 border rounded-md"
                onClick={() => setAmazonOnListing(true)}
              >
                True
              </button>
              <button
                className="text-white bg-gray-600 hover:bg-gray-700 w-full ps-5 text-start py-1 mr-2 border rounded-md"
                onClick={() => setAmazonOnListing("")}
              >
                False
              </button>
            </div>
            {/* <div className="flex justify-between gap-2 mt-2 text-sm">
              <button className="bg-gray-400 w-6/12 text-white px-10 py-2 rounded-md hover:bg-gray-700">
                Clear
              </button>
              <button className="bg-blue-300 w-6/12 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Apply
              </button>
            </div> */}
          </div>
        );

      case "Fulfilment Method":
        return (
          <div className="p-2 w-60">
            <div className="flex flex-col justify-start items-start gap-1">
              <button
                className=" text-white bg-gray-600 hover:bg-gray-700 w-full ps-5 text-start py-1 mr-2 border rounded-md"
                onClick={() => setFulfillmentMethod("FBA")}
              >
                FBA
              </button>
              <button
                className="text-white bg-gray-600 hover:bg-gray-700 w-full ps-5 text-start py-1 mr-2 border rounded-md"
                onClick={() => setFulfillmentMethod("FBM")}
              >
                FBM
              </button>
            </div>
            {/* <div className="flex justify-between gap-2 mt-2 text-sm">
              <button className="bg-gray-400 w-6/12 text-white px-10 py-2 rounded-md hover:bg-gray-700">
                Clear
              </button>
              <button className="bg-blue-300 w-6/12 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Apply
              </button>
            </div> */}
          </div>
        );

      default:
        return <p>No content available for this filter.</p>;
    }
  };

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: rowsPerPage,
      searchQuery,
      category: selectedCategories,
      buyBoxFilterType,
      minBuyBox,
      maxBuyBox,
      offersFilterType,
      minOffers,
      maxOffers,
      salesRankFilterType,
      minSalesRank,
      maxSalesRank,
      monthlySoldFilterType,
      minMonthlySold,
      maxMonthlySold,
      timePostedStart: startDate,
      timePostedEnd: endDate,
      newlyPostedDays,
      amazonOnListing,
      fulfillmentMethod,
    };
    dispatch(showSavedProduct(params));
  }, [
    dispatch,
    currentPage,
    rowsPerPage,
    searchQuery,
    selectedCategories,
    buyBoxFilterType,
    minBuyBox,
    maxBuyBox,
    offersFilterType,
    minOffers,
    maxOffers,
    salesRankFilterType,
    minSalesRank,
    maxSalesRank,
    monthlySoldFilterType,
    minMonthlySold,
    maxMonthlySold,
    startDate,
    endDate,
    newlyPostedDays,
    amazonOnListing,
    fulfillmentMethod,
  ]);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Container */}
      <div className="container mx-auto p-4 flex-grow">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          {/* Search Bar */}
          <div className="flex items-center w-full md:w-1/3 bg-gray-100 rounded-md px-4 py-2">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-gray-100 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm mt-2 md:mt-0"
            >
              <FiFilter />
              <span>Filters</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 md:right-5  bg-white border border-gray-200 shadow-md rounded-md w-56 z-10">
                <div className="px-3 py-1 font-semibold">Product Filters</div>
                <hr />
                <ul>
                  {dropdownItems.map((item) => (
                    <li
                      key={item}
                      className="flex text-sm items-center justify-between px-4 py-1 hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleSelection(item)}
                    >
                      <span>{item}</span>
                      {selectedItems.includes(item) && (
                        <FiCheck className="text-green-500" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Separate boxes of Filters */}
        <div className="relative m-2">
          {selectedItems.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-1 items-center">
                {selectedItems.map((filter) => (
                  <div
                    key={filter}
                    className="flex border border-blue-gray-100 rounded-lg p-1 gap-1 justify-center items-center relative"
                  >
                    {/* Filter label with click action */}
                    <div
                      className="px-2 py-1 text-xs bg-white rounded-lg flex items-center gap-2 cursor-pointer"
                      onClick={() => dialogBoxtoggle(filter)}
                    >
                      {filter}
                    </div>

                    {/* Dynamic text for filter */}
                    <div className="px-3 py-1 text-xs border-l-2 border-gray-400 bg-gray-50 flex items-center gap-2 cursor-pointer">
                      {filter === "Categories" ? (
                        <p>{filter} Selected</p>
                      ) : filter === "Buy Box" ? (
                        <p>All prices</p>
                      ) : filter === "Offers" ? (
                        <p>Total Offers</p>
                      ) : filter === "Sales Rank" ? (
                        <p>All {filter}</p>
                      ) : filter === "Monthly Sold" ? (
                        <p>All {filter}</p>
                      ) : filter === "Time Posted" ? (
                        <p>All {filter}</p>
                      ) : filter === "Newly Posted" ? (
                        <p>All {filter}</p>
                      ) : filter === "Amazon on Listing" ? (
                        <p>{filter}</p>
                      ) : filter === "Fulfillment Method" ? (
                        <p>{filter}</p>
                      ) : (
                        <>{filter}</>
                      )}
                    </div>
                    {/* Conditional Dialog next to the clicked filter */}
                    {isOpen && activeFilter === filter && (
                      <div className="absolute w-fit top-full left-0 mt-2  text-black border border-blue-gray-50 bg-white rounded-lg shadow-2xl z-10">
                        {/* Render content based on the active filter */}
                        {renderDialogContent()}
                      </div>
                    )}
                  </div>
                ))}

                {/* Clear all filters */}
                <div
                  onClick={() => {
                    setSelectedCategories("");
                    setAmazonOnListing("");
                    setFulfillmentMethod("");
                    setOffersFilterType("");
                    setBuyBoxFilterType("");
                    setSalesRankFilterType("");
                    setMonthlySoldFilterType("");
                    setSelectedItems([])
                  }}
                  className="text-xs text-red-700 flex items-center justify-center cursor-pointer"
                >
                  Clear All
                  <span className="text-red-600 font-bold px-2 cursor-pointer">
                    ✖
                  </span>
                </div>
              </div>
            </div>
          )}

          <div>{/* Other components or content */}</div>
        </div>

        {/* Loading State */}
        {showSavedProductLoading && (
          <div className="text-center my-4">
            <CircularProgress size="3rem" />
          </div>
        )}

        {/* Error State */}
        {showSavedProductError && (
          <div className="text-center my-4 text-red-500">
            {showSavedProductError}
          </div>
        )}

        {/* Products List */}
        {!showSavedProductLoading && !showSavedProductError && (
          <div className="space-y-4">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  asin={product?.asin}
                  averagePrice={product?.averagePrice}
                  buyBoxPrice={product?.buyBoxPrice}
                  category={product?.category}
                  date={product?.date}
                  fba={product?.fba}
                  fbm={product?.fbm}
                  graphImageUrl={product?.graphImageUrl}
                  img={product?.img}
                  isFBA={product?.isFBA}
                  isSaved={product?.isSaved}
                  isamazon={product?.isamazon}
                  monthlySold={product?.monthlySold}
                  price={product?.price}
                  rating={product?.rating}
                  salesrank={product?.salesrank}
                  sellerId={product?.sellerId}
                  title={product?.title}
                  stockcounts={product?.stockcounts}
                  productId={product?._id}
                />
              ))
            ) : (
              <p className="flex justify-center items-center text-center">
                {" "}
                <ErrorPage />{" "}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Pagination - Sticks to Bottom */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sticky bottom-0"
        style={{ zIndex: 10 }}
      >
        {/* Pagination Info */}
        {!showSavedProductLoading ? (
          <span className="text-sm text-gray-600 mb-2 sm:mb-0">
            {rowsPerPage * (currentPage - 1) + 1} -{" "}
            {Math.min(
              rowsPerPage * currentPage,
              showSavedProductMessage?.products?.length || 0
            )}{" "}
            of {showSavedProductMessage?.totalProducts || 0} results shown
          </span>
        ) : (
          "..."
        )}

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
          {/* Rows per page */}
          <div className="flex items-center mb-2 sm:mb-0">
            <label htmlFor="rowsPerPage" className="text-sm text-gray-600">
              Rows per page:
            </label>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Page Navigation */}
          <div className="flex space-x-2">
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
              disabled={filteredProducts?.length < rowsPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveProducts;
