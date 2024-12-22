import React, { useState, useRef, useEffect } from "react";
import dots from "../Images/dots.png";
import SellerDetailsModal from "../SellerDetailsModal/SellerDetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditSellerModal from "../EditModel/EditSellerModal";

const ActionBtn = ({
  SellerName,
  SellerID,
  asin,
  SellerStatus,
  pauseseller,
  date,
}) => {
  const [show, setShow] = useState(false);
  const [isSellerDetailModelOpen, setIsSellerDetailModelOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [showHoverMenu, setShowHoverMenu] = useState(false);

  const dropdownRef = useRef(null);

  const handleMenu = () => setShow((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle hover menu visibility
  const handleHoverMenuEnter = () => setShowHoverMenu(true);
  const handleHoverMenuLeave = () => setShowHoverMenu(false);

  function handlePause() {
    pauseseller(asin);
    handleMenu();
  }

  // Functions for modals
  const openSellerDetailModel = () => setIsSellerDetailModelOpen(true);
  const closeSellerDetailModel = () => {
    setIsSellerDetailModelOpen(false);
    setShow(false);
  };

  const openDeleteModel = () => setIsDeleteModelOpen(true);
  const closeDeleteModel = () => {
    setIsDeleteModelOpen(false);
    setShow(false);
  };

  const openEditModel = () => setIsEditModelOpen(true);
  const closeEditModel = () => {
    setIsEditModelOpen(false);
    setShow(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Action Button */}
      <div>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          id="user-menu-button"
          aria-expanded={show}
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <img className="w-4 h-4" src={dots} alt="Menu" />
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 z-20 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${
          show ? "block" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
      >
        <div className="py-1">
          <div
            className="text-sm px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={openSellerDetailModel}
          >
            View Details
          </div>
          <div
            className="text-sm px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={openEditModel}
          >
            Edit Info
          </div>
          <div
            className="text-sm px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={handlePause}
          >
            {SellerStatus ? "Resume Seller" : "Pause Seller"}
          </div>

          {/* <div
            className="text-sm px-4 py-2 text-red-500 hover:bg-gray-100 rounded cursor-pointer"
            onMouseEnter={handleHoverMenuEnter}
            onMouseLeave={handleHoverMenuLeave}
          >
            In Another Tab
          </div>
 
          {showHoverMenu && (
            <div
              className="absolute left-full top-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div
                className="text-sm px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://www.amazon.com/sp?ie=UTF8&seller=${SellerID}`,
                    "_blank"
                  )
                }
              >
                Amazon
              </div>
              <div
                className="text-sm px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://keepa.com/#!seller/1-${SellerID}`,
                    "_blank"
                  )
                }
              >
                Keepa
              </div>
              <div
                className="text-sm px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://sas.selleramp.com/sas/lookup?search_term=https%253A%252F%252Fwww.amazon.com%252Fs%253Fi%253Dmerchant-items%2526me%${SellerID}`,
                    "_blank"
                  )
                }
              >
                AMP
              </div>
            </div>
          )} */}

          <div
            className="text-sm px-4 py-2 text-red-500 hover:bg-gray-100 rounded cursor-pointer"
            onClick={openDeleteModel}
          >
            Remove
          </div>
        </div>
      </div>

      {/* Modals */}
      {isSellerDetailModelOpen && (
        <SellerDetailsModal
          isOpen={isSellerDetailModelOpen}
          onClose={closeSellerDetailModel}
          asin={asin}
          SellerName={SellerName}
          SellerID={SellerID}
          SellerStatus={SellerStatus}
          date={date}
        />
      )}
      {isDeleteModelOpen && (
        <DeleteModal
          isOpen={isDeleteModelOpen}
          onClose={closeDeleteModel}
          asin={asin}
          SellerName={SellerName}
          SellerID={SellerID}
        />
      )}
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
  );
};

export default ActionBtn;
