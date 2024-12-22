import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../Components/ToastMessages/ToastMessage";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordAction,
  clearErrorsAction,
} from "../Redux/Actions/loadCurrentUserAction";
import Loader from "../../src/Components/Loader.js";
const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});
const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const dispatch = useDispatch();
  const { changePasswordLoading, changePasswordMessage, changePasswordError } =
    useSelector((state) => state.changePasswordReducer);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      const data = {
        newPassword: values.newPassword,
        currentPassword: values.currentPassword,
      };
      dispatch(changePasswordAction(data));
    },
  });
  useEffect(() => {
    if (!changePasswordLoading && changePasswordMessage) {
      handleShowSuccessToast(changePasswordMessage);
      dispatch(clearErrorsAction());
      toggleModal();
    } else if (!changePasswordLoading && changePasswordError) {
      handleShowFailureToast(changePasswordError);
      dispatch(clearErrorsAction());
    }
  }, [
    changePasswordLoading,
    changePasswordError,
    changePasswordMessage,
    dispatch,
    toggleModal,
  ]);
  return (
    <div>
      <Toaster />
      <div
        className="text-md font-semibold text-gray-700 hover:underline cursor-pointer"
        onClick={toggleModal}
      >
        Change Password
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="authentication-modal"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen bg-gray-900 bg-opacity-50"
        >
          <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change Password
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4">
              <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter current password"
                  />
                </div>
                {formik.touched.currentPassword &&
                  formik.errors.currentPassword && (
                    <p className="text-red-500">
                      {formik.errors.currentPassword}
                    </p>
                  )}
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter new password"
                  />
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-red-500">{formik.errors.newPassword}</p>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter confirm password"
                  />
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                <div className="flex justify-end">
                  {changePasswordLoading ? (
                    <div className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg px-5 py-2.5 w-30 ml-auto flex justify-center items-center">
                      <Loader />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg px-5 py-2.5 w-30 ml-auto"
                    >
                      Change Password
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
