import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsAction,
  editProfileAction,
  loadCurrentUserAction,
} from "../Redux/Actions/loadCurrentUserAction";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../Components/ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import Loader from "../Components/Loader";

const editProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name should be at least 2 characters long")
    .max(50, "First name should not exceed 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name should be at least 2 characters long")
    .max(50, "Last name should not exceed 50 characters")
    .required("Last name is required"),
});
const EditProfileModal = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { editProfileLoading, editProfileMessage, editProfileError } =
    useSelector((state) => state.editProfileReducer);
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
    enableReinitialize: true,
    validationSchema: editProfileValidationSchema,
    onSubmit: (values) => {
      dispatch(editProfileAction(values));
    },
  });
  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    if (!editProfileLoading && editProfileMessage) {
      handleShowSuccessToast(editProfileMessage);
      dispatch(clearErrorsAction());
      dispatch(loadCurrentUserAction());
      setIsModalOpen(false);
    } else if (editProfileLoading && editProfileError) {
      handleShowFailureToast(editProfileError);
      dispatch(clearErrorsAction());
    }
  }, [editProfileLoading, editProfileError, editProfileMessage, dispatch]);
  return (
    <div>
      <Toaster />
      {/* Edit Profile button */}
      <div
        className="text-md font-semibold text-gray-700 hover:underline cursor-pointer"
        onClick={toggleModal}
      >
        Edit Profile
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
                Edit Profile
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
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="input"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="First Name"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500">{formik.errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="input"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Last Name"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500">{formik.errors.lastName}</p>
                  )}
                </div>
                {/* <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Your Email"
                  />
                </div> */}
                <div className="flex justify-end">
                  {editProfileLoading ? (
                    <div className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg px-5 py-2.5 w-30 ml-auto flex justify-center items-center">
                      <Loader />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg px-5 py-2.5 w-30 ml-auto"
                    >
                      Save Changes
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

export default EditProfileModal;
