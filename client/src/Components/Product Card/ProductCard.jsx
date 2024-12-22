import React, { useState } from "react";
import square from "../Images/square.png";
import Eicon from "../Images/erroricon.png";
import amazonIcon from "../Images/amazonIcon.png";
import googleIcon from "../Images/googleBlackIcon.png";
import googleSearchIcon from "../Images/gotoGoogle.png";
import save from "../Images/save.png";
import saved from "../Images/saved.png";
import { useDispatch, useSelector } from "react-redux";
import { SaveSellerProductAction } from "../../Redux/Actions/loadCurrentUserAction"; 
import CircularProgress from '@mui/material/CircularProgress';
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../ToastMessages/ToastMessage";

const ProductCard = ({
  asin,
  averagePrice,
  buyBoxPrice,
  category,
  date,
  fba,
  fbm,
  graphImageUrl,
  img,
  isFBA,
  isSaved,
  isamazon,
  monthlySold,
  price,
  rating,
  salesrank,
  sellerId,
  title,
  stockcounts,
  productId
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [fbaTooltipVisible, setFbaTooltipVisible] = useState(false);
  const [fbmTooltipVisible, setFbmTooltipVisible] = useState(false);
  const [bsrTooltipVisible, setbsrTooltipVisible] = useState(false);
  const [countTooltipVisible, setCountTooltipVisible] = useState(false);
  const [asinTooltipVisible, setAsinTooltipVisible] = useState(false);

  const handleSaveProduct = async () => {
    if (loading) return;  // Prevent multiple clicks
    setLoading(true);

    try {
      // Dispatch save or unsave action
       await dispatch(SaveSellerProductAction(sellerId, productId));
      
      // Optimistically toggle saved state based on current state
      setLocalIsSaved(!localIsSaved);

      // Show success message based on action
      if (localIsSaved) {
        handleShowFailureToast("Product unsaved successfully");
      } else {
        handleShowSuccessToast("Product saved successfully");
      }
    } catch (error) {
      handleShowFailureToast("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  
  const formattedProductName = encodeURIComponent(title);

  const productDateString = date;
  const formatTimeDifference = (productDateString) => {
    const productDate = new Date(productDateString);
    const currentDate = new Date();
    const timeDifference = currentDate - productDate; // Difference in milliseconds
  
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44)); // Approximate month length
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25)); // Approximate year length
  
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days < 30) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (months < 12) {
      return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
      return `${years} year${years === 1 ? '' : 's'} ago`;
    }
  };

  function copyToClipboard(text)
  {
    const result = navigator.clipboard.writeText(text);
    if(result)
    {
      handleShowSuccessToast("Asin Copied")
    }
    else{
      handleShowFailureToast("Failed to copy asin")
    }
  }

  return (
    <div className="relative block group ">
      <div className="flex flex-col gap-5 w-full border border-gray-400 rounded-md p-3 bg-white">
      <div className="border border-gray-400 bg-gray-100 flex justify-center items-center text-white py-1 px-1 rounded-md w-max hover:cursor-pointer"  onClick={handleSaveProduct}>
      {loading ? (
        <span className="animate-pulse"> <CircularProgress size="25px" /> </span>
      ) : localIsSaved ? (
        <img className="w-4" src={saved} alt="Saved" />
      ) : (
        <img className="w-4" src={save} alt="Save" />
      )}
        </div>
        <div className="flex gap-3 justify-between">
          <div className="flex gap-6 w-5/12">
            <div className="flex justify-center w-3/12">
              <img
                className="w-32 h-36 object-contain pt-4"
                src={`https://m.media-amazon.com/images/I/${img}`}
                alt="product"
              />
            </div>
            <div className="w-9/12 flex flex-col gap-2">
              <div className="text-md font-medium hover:underline">
                <a
                  href={`https://www.amazon.com/dp/${asin}?psc=1`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {title}
                </a>
              </div>
              <div className="flex gap-2">
                <p
                  className="text-sm
                 font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg"
                >
                  {category}
                </p>
                <div className="flex gap-1 justify-center items-center">
                ★
                  <p className="text-md text-gray-600">{rating}</p>
                </div>
              </div>
              <div className="flex mt-1">
                <p
                  className="text-sm
                 font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg relative"
                 onMouseEnter={() => setAsinTooltipVisible(true)}
                  onMouseLeave={() => setAsinTooltipVisible(false)}
                  onClick={() => copyToClipboard(asin)}
                >
                  {asin}
                  {asinTooltipVisible && (
                    <div
                      role="tooltip"
                      className="absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip w-24"
                      style={{
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Click to Copy ASIN
                      <div className="tooltip-arrow" />
                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-7/12 ">
            <div className="flex justify-end">
              <img className="object-fit" src={graphImageUrl} alt="" />
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap ">
          <div className="flex justify-start gap-1 flex-wrap">
            <div className="flex flex-col justify-center items-center ">
              <p className="text-sm">Storefront</p>
              <div className="flex gap-1 h-8">
                <p className="flex gap-1 justify-center  items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <img className="w-4 h-4 bg-[#F7FEE7]" src={square}  alt="" />
                  <p className="">{isFBA ? "FBA" : "FBM"}</p>
                </p>
                <div
                  className="relative flex justify-center items-center"
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                >
                  <p className="flex gap-1 justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                    <span>${price}</span>
                  </p>
                  {tooltipVisible && (
                    <div
                      role="tooltip"
                      className=" w-28  absolute z-10 inline-block px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip"
                      style={{
                        bottom: "100%", // Position above the price
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Storefront Price
                      <div className="tooltip-arrow" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">BuyBox</p>
              <div className="flex gap-1">
                <p className="flex gap-1  justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <img className="w-4 h-4 bg-[#fdf2f8]" src={square} alt="" />
                  <p className="">{buyBoxPrice <0?'NBB':'$'+ buyBoxPrice}</p>
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Offers</p>
              <div className="flex gap-1 h-8">
                <p className="flex gap-1  justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <div
                  className="relative flex justify-center items-center"
                  onMouseEnter={() => setFbaTooltipVisible(true)}
                  onMouseLeave={() => setFbaTooltipVisible(false)}
                >
                  <p className="flex gap-1 justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <img className="w-4 h-4 bg-[#e6f6d7]" src={square} alt="" />
                  <p className="">{fba}</p>
                  </p>
                  {fbaTooltipVisible && (
                    <div
                      role="tooltip"
                      className=" w-28  absolute z-10 inline-block px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip"
                      style={{
                        bottom: "100%", 
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "0.5rem",
                      }}
                    >
                     FBA Counts
                      <div className="tooltip-arrow" />
                    </div>
                  )}
                </div>
                </p>

                <p className="flex gap-1  justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">

                <div
                  className="relative flex justify-center items-center"
                  onMouseEnter={() => setFbmTooltipVisible(true)}
                  onMouseLeave={() => setFbmTooltipVisible(false)}
                >
                  <p className="flex gap-1 justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <img className="w-4 h-4 bg-[#fefae9]" src={square} alt="" />
                  <p className="">{fbm}</p>
                  </p>
                  {fbmTooltipVisible && (
                    <div
                      role="tooltip"
                      className=" w-28  absolute z-10 inline-block px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip"
                      style={{
                        bottom: "100%", 
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "0.5rem",
                      }}
                    >
                     FBM Counts
                      <div className="tooltip-arrow" />
                    </div>
                  )}
                </div>
                 
                </p>
              </div>
            </div>

            {isamazon ? (
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-1">
                  <p className="flex gap-1 text-green-600 justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                    <img className="w-4 h-4" src={square} alt="" />
                    <p className="">AMZ</p>
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Sales Rank Section */}
            <div className="flex flex-col justify-center items-center">
              <p className="text-xs">Sales Rank</p>
              <div className="flex gap-1 h-8">
                <p className="flex gap-1  justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                

                  <div
                  className="relative flex justify-center items-center"
                  onMouseEnter={() => setbsrTooltipVisible(true)}
                  onMouseLeave={() => setbsrTooltipVisible(false)}
                >
                  <p className="flex gap-1 justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <img className="w-4 h-4 bg-[#d9edf7]" src={square} alt="" />
                  <p className="">{salesrank}</p>
                  </p>
                  {bsrTooltipVisible && (
                    <div
                      role="tooltip"
                      className=" w-28  absolute z-10 inline-block px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip"
                      style={{
                        bottom: "100%", 
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "0.5rem",
                      }}
                    >
                     BSR
                      <div className="tooltip-arrow" />
                    </div>
                  )}
                </div>
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Monthly Sold</p>
              <div className="flex gap-1">
                <p className="flex gap-1  justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <img className="w-4 h-4 bg-[#fefae9]" src={square} alt="" />
                  <p className="">{monthlySold}</p>
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Avg Price</p>
              <div className="flex gap-1">
                <p className="flex gap-1  justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <img className="w-4 h-4" src={square} alt="" />
                  <p className="">${(averagePrice)?.toFixed(2)}</p>
                </p>
              </div>
            </div>


            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Stock Count</p>
              <div className="flex gap-1 h-8">
                <p className="flex gap-1  justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">

                <div
                  className="relative flex justify-center items-center"
                  onMouseEnter={() => setCountTooltipVisible(true)}
                  onMouseLeave={() => setCountTooltipVisible(false)}
                >
                  <p className="flex gap-1 justify-center items-center text-sm font-semibold border bg-[#F8FAFC] p-1 text-center rounded-lg ">
                  <img className="w-4 h-4" src={square} alt="" />
                  {stockcounts ? (
                    <p className="">{stockcounts}</p>
                  ) : (
                    <p className="">-1</p>
                  )}
                  </p>
                  {countTooltipVisible && (
                    <div
                      role="tooltip"
                      className=" w-28 absolute z-10 inline-block px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip"
                      style={{
                        bottom: "100%", 
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "0.5rem",
                      }}
                    >
                    Storefront's Stock
                      <div className="tooltip-arrow" />
                    </div>
                  )}
                </div>
                 
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="flex gap-2 justify-end items-center text-sm font-semibold border bg-[#F8FAFC] py-1 px-2 mt-3 text-center rounded-lg ">
              <p className="">{formatTimeDifference(productDateString)}</p>
              <img className="w-5 h-5" src={Eicon} alt="" />
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-3">
          <a
            href={`https://www.amazon.com/dp/${asin}?psc=1`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="w-9 h-9 flex justify-center items-center bg-gray-100 border border-blue-gray-100 shadow-lg rounded-lg">
              <img className="h-5 w-5" src={amazonIcon} alt="" />
            </div>
          </a>
          <a
            href={`https://www.google.com/search?q=${formattedProductName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-9 h-9 flex justify-center items-center bg-gray-100 border border-blue-gray-100 shadow-lg rounded-lg">
              <img className="h-5 w-5" src={googleIcon} alt="" />
            </div>
          </a>
          <a
            href={`https://www.google.com/search?q=${formattedProductName}&tbm=shop`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-9 h-9 flex justify-center items-center bg-gray-100 border border-blue-gray-100 shadow-lg rounded-lg">
              <img className="h-5 w-5" src={googleSearchIcon} alt="" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );

}

export default ProductCard;