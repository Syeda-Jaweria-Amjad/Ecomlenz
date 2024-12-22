import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/bgstyle.css";
import { Toaster } from "react-hot-toast";
import logo from "../../Components/Images/ecomlenslogo1.png";
import avatar1 from "../../Components/Images/manavatar.jpg";
import avatar2 from "../../Components/Images/girlavatar.jpg";
import avatar3 from "../../Components/Images/boyavatar.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../Components/ToastMessages/ToastMessage.js";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const response = await fetch(
        // "https://ecomlenz-erafh6dqcbhac9fz.canadacentral-01.azurewebsites.net/auth/login",
        "http://localhost:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      const data = await response.json();
      console.log(data?.message);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(data));

      if (response.ok) {
        // navigate("/dashboard/productfeed/feed");
        handleShowSuccessToast(data?.message);
        setTimeout(() => {
          window.location.href = "/dashboard/products-feed";
        }, 1000);
      } else {
        handleShowFailureToast(data?.message || "Login failed");
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      handleShowFailureToast(error?.message);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop the loader
    }
  };
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });
  return (
    <div className="flex">
      <Toaster />
      <div className="hidden lg:flex w-7/12 bg-gray-400 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="Logo" />
          <div className="text-3xl font-semibold text-black">
            Join us today!
          </div>
          <div className="flex">
            <div className="avatar mt-5">
              <div className="ring-primary ring-offset-base-100  rounded-full ring ring-offset-2">
                <img
                  className="rounded-full h-24 w-24 object-fill"
                  src={avatar1}
                  alt=""
                />
              </div>
            </div>
            <div className="avatar mt-5">
              <div className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
                <img
                  className="rounded-full h-24 w-24 object-fill"
                  src={avatar2}
                  alt=""
                />
              </div>
            </div>
            <div className="avatar mt-5">
              <div className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
                <img
                  className="rounded-full h-24 w-24 object-fill"
                  src={avatar3}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-img flex items-center justify-center h-screen w-full">
        <div className="block max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Login
          </h5>

          <form className="mt-10 md:w-96" onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-1">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  className="p-2 w-full border rounded-lg bg-gray-50 pr-10"
                  placeholder="Password"
                  onChange={formik.handleChange}
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5 text-gray-700 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.5C7.305 4.5 3.065 7.364 1.5 12c1.565 4.636 5.805 7.5 10.5 7.5s8.935-2.864 10.5-7.5C20.935 7.364 16.695 4.5 12 4.5z"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-700 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zM3 12h18"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
            </div>
            <div className="mb-6">
              <Link
                to="/forgetpassword"
                className="text-md text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}

            <button
              type="submit"
              className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white inline-block mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>

            <div className=" mt-4">
              <p className="text-md text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-800 text-primary-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default LoginPage;
