import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiPackage, FiBookmark, FiUsers, FiSettings } from "react-icons/fi";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-white shadow-md border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col md:relative ${
        !isCollapsed ? "absolute md:relative md:w-64 w-full z-50" : ""
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b border-gray-300 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        {!isCollapsed && (
          <div>
            <img
              src={require("../assets/ecomlenslogo1.png")}
              alt="logo"
              className="w-40"
            />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
            isCollapsed
              ? " text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isCollapsed ? (
            <GoSidebarCollapse className="text-xl" />
          ) : (
            <GoSidebarExpand className="text-xl" />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-grow mt-4">
        <NavLink
          to="products-feed"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 mx-2 text-gray-900 hover:bg-gray-200 rounded-md ${
              isCollapsed ? "justify-center" : ""
            } 
            ${
              isActive ? "bg-black text-white shadow-md" : "text-gray-600"
            } transition-all`
          }
        >
          <FiPackage className="text-xl ic" />
          {!isCollapsed && <span className="ml-4">Products Feed</span>}
        </NavLink>

        <NavLink
          to="saved-products"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 mx-2 text-gray-900 hover:bg-gray-200 rounded-md ${
              isCollapsed ? "justify-center" : ""
            } ${
              isActive ? "bg-black text-white shadow-md" : "text-gray-600"
            } transition-all`
          }
        >
          <FiBookmark className="text-xl" />
          {!isCollapsed && <span className="ml-4">Saved Products</span>}
        </NavLink>
        <div className="border-t border-gray-300 my-2 mx-2" />
        <NavLink
          to="sellers"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 mx-2 text-gray-900 hover:bg-gray-200 rounded-md ${
              isCollapsed ? "justify-center" : ""
            } ${
              isActive ? "bg-black text-white shadow-md" : "text-gray-600"
            } transition-all`
          }
        >
          <FiUsers className="text-xl" />
          {!isCollapsed && <span className="ml-4">Sellers</span>}
        </NavLink>
      </nav>

      {/* Settings at Bottom */}
      <div className="border-t border-gray-300">
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 mx-2 mt-4 text-gray-900 hover:bg-gray-200 rounded-md ${
              isCollapsed ? "justify-center" : ""
            } ${
              isActive ? "bg-black text-white shadow-md" : "text-gray-600"
            } transition-all`
          }
        >
          <FiSettings className="text-xl" />
          {!isCollapsed && <span className="ml-4">Settings</span>}
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
