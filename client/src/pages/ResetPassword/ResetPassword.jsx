import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../pages/bgstyle.css";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../Components/ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const [password, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  //   const location = useLocation();

  const { token } = useParams();
  // Extract token from URL parameters
  //   const queryParams = new URLSearchParams(location.search);
  //   const token = queryParams.get('token');

  //   console.log(token)

  useEffect(() => {
    if (token) {
      // Store the token in local storage
      localStorage.setItem("resetToken", token);
    } else {
      setErrorMessage("No reset token provided.");
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage("Reset token not found.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password reset successfully.");
        handleShowSuccessToast("Password reset successfully.");
        setTimeout(() => {
          navigate("/login"); // Redirect to login or any other page
        }, 1000);
      } else {
        setErrorMessage(data.message || "Password reset failed");
        handleShowFailureToast(data.message || "Password reset failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-img">
      <Toaster />
      <div className="flex items-center justify-center h-screen w-full">
        <div className="">
          <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
            <div className="w-1/2 p-10 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Reset Password
              </h5>
              <h6 className="my-5 text-gray-600">
                Enter your new password below.
              </h6>

              <form className="mt-5" onSubmit={handleResetPassword}>
                <div className="mb-6">
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="password"
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}

                <div className="flex gap-2 flex-col">
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
