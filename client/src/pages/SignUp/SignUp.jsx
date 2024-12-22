import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
} from "../../Components/ToastMessages/ToastMessage";

const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "First name should only contain letters")
    .required("First name is required")
    .max(30, "First name should not exceed 30 characters"),
  lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name should only contain letters")
    .required("Last name is required")
    .max(30, "Last name should not exceed 30 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});
const SignUp = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // Checkbox state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const registerUser = async (values) => {
    setLoading(true); // Show loader

    // Regular expression for validating email
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if passwords match
    if (values.password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false); // Stop loader
      return;
    }


    // Check if terms are accepted
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      setLoading(false); // Stop loader
      return;
    }

    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    try {
      const result = await fetch(
        "http://localhost:8000/auth/signup",
        // "http://localhost:8000/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      const data = await result.json();
      console.log(data);
      if (result.status === 201) {
        console.log("Registration successful");
        handleShowSuccessToast("Registration successful");
        setTimeout(() => {
          navigate("/send-email");
        }, 1000);
        setError("");
      } else {
        handleShowFailureToast(
          data.message || "Registration failed, please try again."
        );
        setError(data.message || "Registration failed, please try again.");
      }
    } catch (error) {
      setError("Registration failed, please try again.");
      handleShowFailureToast(error?.message);
      console.log(error.message || "Registration not successful");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
    validationSchema: signUpSchema,
    onSubmit: registerUser,
  });
  return (
    <div className="flex">
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
        <div className="flex justify-center">
          <div className="block max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Register
            </h5>

            <form className="mt-10" onSubmit={formik.handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500">{formik.errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                    <p className="text-red-500">{formik.errors.password}</p>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmpassword"
                      className="p-2 w-full border rounded-lg bg-gray-50 pr-10"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3"
                    >
                      {showConfirmPassword ? (
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
                </div>
              </div>

              {error && <div className="mb-4 text-red-500">{error}</div>}

              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    href="/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Loading..." : "Create an account"}
              </button>

              <div className="flex justify-between mt-4">
                <p className="text-md text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-800 text-primary-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;