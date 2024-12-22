import React, { useState } from "react";
import { FiPlus, FiSearch, FiChevronDown } from "react-icons/fi";
import { FaBookmark, FaRegBookmark, FaRegSquare } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function SellersModal({ isOpen, onClose, sellers }) {
  const [bookmarked, setBookmarked] = useState({});
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const toggleBookmark = (index) => {
    setBookmarked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMenuOpen = (event, index) => {
    setActiveCard(index);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end md:hidden z-50">
      <div className="bg-white w-full rounded-t-lg p-4 max-h-[90%] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold text-gray-800">Sellers</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Search, Add, and Sort Section */}
        <div className="flex flex-wrap items-center gap-4 py-4">
          {/* Add Button */}
          <button className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-md">
            <FiPlus className="text-xl" />
          </button>

          {/* Search Input */}
          <div className="flex-1 flex items-center bg-gray-100 border border-gray-300 rounded-md px-3">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-10 border-none outline-none px-2 text-sm"
            />
          </div>

          {/* Sort Button */}
          <div className="relative">
            <button
              onClick={toggleSortDropdown}
              className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200"
            >
              Sort <FiChevronDown className="ml-2" />
            </button>
            {sortDropdownOpen && (
              <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <div className="py-2">
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Name
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Active
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* All Sellers Header */}
        <div className="flex items-center justify-between px-2 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-semibold text-gray-800">All Sellers</div>
            <div className="text-white bg-black rounded-full px-3 py-1 text-sm font-medium">
              {sellers.length}
            </div>
          </div>
          <div>
            <FaRegBookmark className="text-black text-lg" />
          </div>
        </div>

        {/* Sellers List */}
        <div className="mt-4 space-y-3">
          {sellers.map((seller, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-between py-3 px-4 bg-white border rounded-md hover:shadow-md ${
                activeCard === index ? "border-black" : "border-gray-300"
              }`}
            >
              {/* Dropdown Button */}
              <button
                onClick={(e) => handleMenuOpen(e, index)}
                className="absolute top-4 right-4 rounded-md px-1 py-1 border border-gray-200"
              >
                <CiMenuKebab />
              </button>

              {/* Material-UI Dropdown */}
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl) && activeCard === index}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                <MenuItem onClick={handleMenuClose}>About</MenuItem>
              </Menu>

              {/* Seller details */}
              <div>
                <div className="text-gray-800 font-semibold">{seller.name}</div>
                <div className="text-sm text-gray-500">{seller.id}</div>
                <div className="mt-1 flex items-center">
                  <span
                    className="cursor-pointer text-lg px-1 py-1 border border-gray-300 rounded-md"
                    onClick={() => toggleBookmark(index)}
                  >
                    {bookmarked[index] ? (
                      <FaBookmark className="text-black" />
                    ) : (
                      <FaRegBookmark className="text-gray-500" />
                    )}
                  </span>
                  <div className="shadow px-3 py-1 ml-3 flex justify-center items-center border border-gray-300 rounded-lg">
                    <span>

                      <FaRegSquare className="text-xs rounded-md bg-[rgb(247,254,231)]" />
                    </span>
                    <span className="text-sm text-gray-700 ml-2">Active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellersModal;
