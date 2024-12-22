import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSellerAction,
  clearErrorsAction,
  loadUserAllSellersAction,
} from "../../Redux/Actions/loadCurrentUserAction";
import Loader from "../Loader";

const DeleteModal = ({
  SellerName,
  SellerID,
  asin,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();

  // Access delete state from the Redux store
  const { deleteSellerLoading, deleteSellerMessage, deleteSellerError } =
    useSelector((state) => state.deleteSellerReducer);

  const handleDelete = () => {
    dispatch(deleteSellerAction(SellerID)); // Dispatch delete action
  };

  useEffect(() => {
    if (deleteSellerMessage) {
      // Refresh seller list or update UI
      dispatch(loadUserAllSellersAction());
      onClose(); // Close modal
    }

    if (deleteSellerError) {
      alert(`Error: ${deleteSellerError}`);
      dispatch(clearErrorsAction()); // Clear errors from the Redux state
    }
  }, [deleteSellerMessage, deleteSellerError, dispatch, onClose]);

  return (
    <div>
      {/* Modal logic */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
            >
              &times;
            </button>

            {/* Modal content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Delete Seller
              </h2>
              <p className="text-gray-600 text-center mb-6 break-words">
                Are you sure you want to permanently delete this seller?
              </p>

              {/* Seller Info */}
              <div className="mt-4 flex flex-wrap items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 text-sm text-gray-800">
                  <span className="material-icons-outlined mr-2 text-gray-500">
                    {SellerName}
                  </span>
                </div>
                <div className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded-md">
                  {asin}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
                >
                  Go back
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  disabled={deleteSellerLoading}
                >
                  {deleteSellerLoading ? <Loader /> : "Yes, remove"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
