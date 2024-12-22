import { configureStore } from "@reduxjs/toolkit";
import {
  addSellerReducer,
  changePasswordReducer,
  editProfileReducer,
  loadCurrentUserReducer,
  loadUserAllSellersReducer,
  loadUserSavedSellersReducer,
  markAsReadAllProductsReducer,
  pauseSellerReducer,
  saveSellerReducer,
  editSellerReducer,
  deleteSellerReducer,
  SellerProductReducer,
  loadSellerProductsReducer,
  showSavedProductReducer, SaveSallerProductReducer
} from "./Reducers/loadCurrentUserReducer";
import { clearErrorsAction } from "./Actions/loadCurrentUserAction";

const store = configureStore({
  reducer: {
    loadCurrentUserReducer,
    clearErrorsAction,
    loadUserAllSellersReducer,
    addSellerReducer,
    pauseSellerReducer,
    loadUserSavedSellersReducer,
    changePasswordReducer,
    editProfileReducer,
    markAsReadAllProductsReducer,
    saveSellerReducer,
    editSeller: editSellerReducer,
    deleteSellerReducer,
    sellerProducts: SellerProductReducer,
    loadSellerProductsReducer,
    showSavedProductReducer, SaveSallerProductReducer
  },
});

export default store;
