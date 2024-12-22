import React, { useEffect } from "react";
import Header from "../Components/Header";
import { PiGreaterThanLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import ChangePassword from "./ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../Components/ToastMessages/ToastMessage";
import { loadCurrentUserAction } from "../Redux/Actions/loadCurrentUserAction";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        credentials: "include",
      });
      if (response.status === 200) {
        handleShowSuccessToast("Logged out successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      handleShowFailureToast("Error:", error.message);
    }
  };

  const dispatch = useDispatch();
  const { loading, user } = useSelector(
    (state) => state.loadCurrentUserReducer
  );

  useEffect(() => {
    dispatch(loadCurrentUserAction());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div>
        <Header />
      </div>

      {/* Breadcrumbs */}
      <div className="flex flex-row items-center gap-2 p-4 text-sm sm:text-base">
        <NavLink to="/dashboard/products-feed" className="opacity-60">
          Home
        </NavLink>
        <div>
          <PiGreaterThanLight />
        </div>
        <span className="opacity-60">Settings</span>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        {/* Profile Section */}
        <div className="w-full sm:w-10/12 lg:w-7/12">
          <div className="my-3 font-semibold text-gray-800 text-lg">
            PROFILE
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-between border border-gray-500 p-4 rounded-lg">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <CgProfile size={20} />
                <div className="text-base sm:text-xl font-medium text-gray-800">
                  {!loading && user?.firstName + " " + user?.lastName}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineMail size={20} />
                <div className="text-sm sm:text-lg font-medium text-gray-700">
                  {!loading && user?.email}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <EditProfileModal user={user} />
              <ChangePassword />
            </div>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="mt-5 w-full sm:w-10/12 lg:w-8/12 xl:w-7/12">
          <div className="my-3 font-semibold text-gray-800 text-lg">
            EMAIL NOTIFICATIONS
          </div>
          <div className="flex flex-col md:flex-row justify-between border border-gray-500 p-4 rounded-lg gap-4">
            <div>
              <div className="text-sm sm:text-xl font-bold text-gray-800">
                Email Notifications
              </div>
              <div className="mt-1 text-xs sm:text-md font-medium text-gray-700">
                Stay updated with important notifications sent directly to your
                email inbox.
              </div>
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultValue />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-gray-600"></div>
              </label>
            </div>
          </div>

          {/* Amazon Marketplace */}
          <div className="mt-5">
            <div className="my-3 font-semibold text-gray-800 text-lg">
              AMAZON MARKETPLACE
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4 border border-gray-500 p-4 rounded-lg">
              <div className="py-2 px-3 bg-gray-100 rounded-md border border-gray-200 text-sm">
                United States
              </div>
              <div className="py-2 px-3 bg-gray-100 rounded-md border border-gray-200 text-sm">
                Edit
              </div>
            </div>
          </div>

          {/* Billing and Subscription */}
          <div className="my-5">
            <div className="my-3 font-semibold text-gray-800 text-lg">
              Billing and Subscription
            </div>
            <div className="flex flex-col md:flex-row justify-between my-2 gap-2">
              <div className="flex gap-2">
                <div className="text-sm text-gray-700">Current plan</div>
                <div className="border bg-gray-100 flex items-center text-sm px-1 rounded-md">
                  Active
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-700">
                Next billing on November 09th, 2024
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between border border-gray-500 p-4 rounded-lg gap-4">
              <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto">
                <div className="text-sm text-center font-bold bg-gray-900 text-white px-3 py-2 rounded-md w-full md:w-auto">
                  ULTRA
                </div>
                <div className="text-sm text-center w-full md:w-auto">
                  200 sellers/month
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto">
                <div className="text-sm text-center font-bold w-full md:w-auto">
                  $230.00/m
                </div>
                <button className="py-2 px-3 bg-gray-100 border border-gray-200 rounded-md mb-2 md:mb-0 w-full md:w-auto">
                  Edit billing
                </button>
                <button className="py-2 px-3 bg-gray-900 text-white rounded-md w-full md:w-auto">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div
            className="flex items-center justify-center my-5 text-sm sm:text-md font-medium text-red-900 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;