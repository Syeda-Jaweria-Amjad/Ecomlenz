import React, { useState } from "react";
import "../../pages/bgstyle.css";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../Components/Images/ecomlenslogo1.png";
import avatar1 from "../../Components/Images/manavatar.jpg";
import avatar2 from "../../Components/Images/girlavatar.jpg";
import avatar3 from "../../Components/Images/boyavatar.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
const ForgetPassword = () => {
  // const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleForgetPassword = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({ email: values.email }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        // Store the token in local storage
        // if (data.token) {
        //   localStorage.setItem('resetToken', data.token);
        // } else {
        //   setErrorMessage('No token received from the API.');
        //   return;
        // }
        toast.success(
          "Password reset link has been successfully sent to your Gmail."
        );
        setSuccessMessage(
          "Password reset link has been successfully sent to your Gmail."
        );
        // Redirect to reset password page
        // navigate('/reset-password/:');
      } else {
        toast.error("Sending email failed");
        setErrorMessage(data.message || "Sending email failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: handleForgetPassword,
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
        <div className="">
          <div className="block max-w-2xl p-6 bg-stale-50 border border-gray-200 rounded-lg shadow hover:shadow-white hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Forget Password
            </h5>
            <h6 className="my-5 text-gray-600">
              Please provide your registered email below, and we'll send you a
              link to reset your password.
            </h6>

            <form className="mt-5" onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                )}
              </div>

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}

              <div className="flex gap-2 flex-col">
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Continue
                </button>
              </div>
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
