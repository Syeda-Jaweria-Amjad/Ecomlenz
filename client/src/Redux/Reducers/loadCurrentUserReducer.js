import { createReducer } from "@reduxjs/toolkit";

const loadCurrentUserReducer = createReducer(
  { loading: false, user: null, error: "" },
  (builder) => {
    builder
      .addCase("LOAD_CURRENT_USER_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("LOAD_CURRENT_USER_SUCCESS", (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase("LOAD_CURRENT_USER_ERROR", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRROS", (state) => {
        state.error = "";
        state.loading = false;
      });
  }
);

const loadUserAllSellersReducer = createReducer(
  { loading: false, sellers: [], error: "" },
  (builder) => {
    builder
      .addCase("LOAD_USER_ALL_SELLERS_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("LOAD_USER_ALL_SELLERS_SUCCESS", (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase("LOAD_USER_ALL_SELLERS_ERROR", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRROS", (state) => {
        state.error = "";
        state.loading = false;
      });
  }
);
const addSellerReducer = createReducer(
  {
    addSellerLoading: false,
    addSellerMessage: null,
    addSellerError: "",
  },
  (builder) => {
    builder
      .addCase("ADD_SELLER_REQUEST", (state) => {
        state.addSellerLoading = true;
      })
      .addCase("ADD_SELLER_SUCCESS", (state, action) => {
        state.addSellerLoading = false;
        state.addSellerMessage = action.payload;
      })
      .addCase("ADD_SELLER_ERROR", (state, action) => {
        state.addSellerLoading = false;
        state.addSellerError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.addSellerError = "";
        state.addSellerMessage = "";
        state.addSellerLoading = false;
      });
  }
);
const pauseSellerReducer = createReducer(
  {
    pauseSellerLoading: false,
    pauseSellerError: null,
    pauseSellerMessage: null,
  },
  (builder) => {
    builder
      .addCase("PAUSE_SELLER_REQUEST", (state) => {
        state.pauseSellerLoading = true;
      })
      .addCase("PAUSE_SELLER_SUCCESS", (state, action) => {
        state.pauseSellerLoading = false;
        state.pauseSellerMessage = action.payload;
      })
      .addCase("PAUSE_SELLER_ERROR", (state, action) => {
        state.pauseSellerLoading = false;
        state.pauseSellerError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.pauseSellerError = "";
        state.pauseSellerMessage = "";
        state.pauseSellerLoading = false;
      });
  }
);

const loadUserSavedSellersReducer = createReducer(
  {
    userSavedSellerLoading: false,
    userSavedSellers: null,
    userSavedSellersError: null,
  },
  (builder) => {
    builder
      .addCase("LOAD_USER_SAVED_SELLERS_REQUEST", (state) => {
        state.userSavedSellerLoading = true;
      })
      .addCase("LOAD_USER_SAVED_SELLERS_SUCCESS", (state, action) => {
        state.userSavedSellerLoading = false;
        state.userSavedSellers = action.payload;
      })
      .addCase("LOAD_USER_SAVED_SELLERS_ERROR", (state, action) => {
        state.userSavedSellerLoading = false;
        state.userSavedSellersError = action.payload;
      })
      .addCase("CLEAR_ERRROS", (state) => {
        state.userSavedSellersError = null;
        state.userSavedSellerLoading = false;
      });
  }
);

const changePasswordReducer = createReducer(
  {
    changePasswordLoading: false,
    changePasswordMessage: "",
    changePasswordError: "",
  },
  (builder) => {
    builder
      .addCase("CHANGE_PASSWORD_REQUEST", (state) => {
        state.changePasswordLoading = true;
      })
      .addCase("CHANGE_PASSWORD_SUCCESS", (state, action) => {
        state.changePasswordLoading = false;
        state.changePasswordMessage = action.payload;
      })
      .addCase("CHANGE_PASSWORD_ERROR", (state, action) => {
        state.changePasswordLoading = false;
        state.changePasswordError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.changePasswordError = "";
        state.changePasswordMessage = "";
        state.changePasswordLoading = false;
      });
  }
);
const editProfileReducer = createReducer(
  { editProfileLoading: false, editProfileMessage: "", editProfileError: "" },
  (builder) => {
    builder
      .addCase("EDIT_PROFILE_REQUEST", (state) => {
        state.editProfileLoading = true;
      })
      .addCase("EDIT_PROFILE_SUCCESS", (state, action) => {
        state.editProfileLoading = false;
        state.editProfileMessage = action.payload;
      })
      .addCase("EDIT_PROFILE_ERROR", (state, action) => {
        state.editProfileLoading = false;
        state.editProfileError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.editProfileError = "";
        state.editProfileMessage = "";
        state.editProfileLoading = false;
      });
  }
);
const markAsReadAllProductsReducer = createReducer(
  {
    readAllProductsLoading: false,
    readAllProductsMessage: "",
    readAllProductsError: "",
  },
  (builder) => {
    builder
      .addCase("MARK_AS_READ_ALL_PRODUCTS_REQUEST", (state) => {
        state.readAllProductsLoading = true;
      })
      .addCase("MARK_AS_READ_ALL_PRODUCTS_SUCCESS", (state, action) => {
        state.readAllProductsLoading = false;
        state.readAllProductsMessage = action.payload;
      })
      .addCase("MARK_AS_READ_ALL_PRODUCTS_ERROR", (state, action) => {
        state.readAllProductsLoading = false;
        state.readAllProductsError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.readAllProductsError = "";
        state.readAllProductsMessage = "";
        state.readAllProductsLoading = false;
      });
  }
);
const saveSellerReducer = createReducer(
  { saveSellerLoading: false, saveSellerMessage: "", saveSellerError: "" },
  (builder) => {
    builder
      .addCase("SAVE_SELLER_REQUEST", (state) => {
        state.saveSellerLoading = true;
      })
      .addCase("SAVE_SELLER_SUCCESS", (state, action) => {
        state.saveSellerLoading = false;
        state.saveSellerMessage = action.payload;
      })
      .addCase("SAVE_SELLER_ERROR", (state, action) => {
        state.saveSellerLoading = false;
        state.saveSellerError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.saveSellerError = "";
        state.saveSellerMessage = "";
        state.saveSellerLoading = false;
      });
  }
);

const editSellerReducer = createReducer(
  {
    editSellerLoading: false,
    editSellerMessage: null,
    editSellerError: null,
  },
  (builder) => {
    builder
      .addCase("EDIT_SELLER_REQUEST", (state) => {
        state.editSellerLoading = true;
        state.editSellerMessage = null;
        state.editSellerError = null;
      })
      .addCase("EDIT_SELLER_SUCCESS", (state, action) => {
        state.editSellerLoading = false;
        state.editSellerMessage = action.payload;
      })
      .addCase("EDIT_SELLER_ERROR", (state, action) => {
        state.editSellerLoading = false;
        state.editSellerError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.editSellerMessage = null;
        state.editSellerError = null;
      });
  }
);

const deleteSellerReducer = createReducer(
  {
    deleteSellerLoading: false,
    deleteSellerMessage: null,
    deleteSellerError: null,
  },
  (builder) => {
    builder
      .addCase("DELETE_SELLER_REQUEST", (state) => {
        state.deleteSellerLoading = true;
        state.deleteSellerMessage = null;
        state.deleteSellerError = null;
      })
      .addCase("DELETE_SELLER_SUCCESS", (state, action) => {
        state.deleteSellerLoading = false;
        state.deleteSellerMessage = action.payload;
      })
      .addCase("DELETE_SELLER_ERROR", (state, action) => {
        state.deleteSellerLoading = false;
        state.deleteSellerError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.deleteSellerMessage = null;
        state.deleteSellerError = null;
      });
  }
);

const SellerProductReducer = createReducer(
  {
    SellerProductLoading: false,
    SellerProductMessage: null,
    SellerProductError: null,
  },
  (builder) => {
    builder
      .addCase("SELLER_PRODUCT_REQUEST", (state) => {
        state.SellerProductLoading = true;
        state.SellerProductMessage = null;
        state.SellerProductError = null;
      })
      .addCase("SELLER_PRODUCT_SUCCESS", (state, action) => {
        state.SellerProductLoading = false;
        state.SellerProductMessage = action.payload;
      })
      .addCase("SELLER_PRODUCT_ERROR", (state, action) => {
        state.SellerProductLoading = false;
        state.SellerProductError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.SellerProductMessage = null;
        state.SellerProductError = null;
      });
  }
);

// Today's Imran Work 25 Nov 2024
const loadSellerProductsReducer = createReducer(
  {
    loadSellerProductsLoading: false,
    loadSellerProducts: null,
    loadSellerProductsError: "",
  },
  (builder) => {
    builder
      .addCase("LOAD_SELLER_PRODUCTS_REQUEST", (state) => {
        state.loadSellerProductsLoading = true;
        state.loadSellerProducts = null;
        state.loadSellerProductsError = "";
      })
      .addCase("LOAD_SELLER_PRODUCTS_SUCCESS", (state, action) => {
        state.loadSellerProductsLoading = false;
        state.loadSellerProducts = action.payload;
      })
      .addCase("LOAD_SELLER_PRODUCTS_ERROR", (state, action) => {
        state.loadSellerProductsLoading = false;
        state.loadSellerProductsError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.loadSellerProductsError = "";
        state.loadSellerProductsLoading = false;
      });
  }
);

const showSavedProductReducer = createReducer(
  {
    showSavedProductLoading: false,
    showSavedProductMessage: null,
    showSavedProductError: null,
  },
  (builder) => {
    builder
      .addCase("SHOW_SAVED_PRODUCT_REQUEST", (state) => {
        state.showSavedProductLoading = true;
        state.showSavedProductMessage = null;
        state.showSavedProductError = null;
      })
      .addCase("SHOW_SAVED_PRODUCT_SUCCESS", (state, action) => {
        state.showSavedProductLoading = false;
        state.showSavedProductMessage = action.payload;
        
      })
      .addCase("SHOW_SAVED_PRODUCT_ERROR", (state, action) => {
        state.showSavedProductLoading = false;
        state.showSavedProductError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.showSavedProductMessage = null;
        state.showSavedProductError = null;
      });
  }
);

const SaveSallerProductReducer = createReducer(
  {
    saveSellerProductLoading: false,
    saveSellerProductMessage: null,
    saveSellerProductError: null,
  },
  (builder) => {
    builder
      .addCase("SAVE_SELLER_PRODUCT_REQUEST", (state) => {
        state.saveSellerProductLoading = true;
        state.saveSellerProductMessage = null;
        state.saveSellerProductError = null;
      })
      .addCase("SAVE_SELLER_PRODUCT_SUCCESS", (state, action) => {
        state.saveSellerProductLoading = false;
        state.saveSellerProductMessage = action.payload;
        
      })
      .addCase("SAVE_SELLER_PRODUCT_ERROR", (state, action) => {
        state.saveSellerProductLoading = false;
        state.saveSellerProductError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.saveSellerProductMessage = null;
        state.saveSellerProductError = null;
      });
  }
);

export {
  loadCurrentUserReducer,
  loadUserAllSellersReducer,
  addSellerReducer,
  pauseSellerReducer,
  loadUserSavedSellersReducer,
  changePasswordReducer,
  editProfileReducer,
  markAsReadAllProductsReducer,
  saveSellerReducer,
  editSellerReducer,
  deleteSellerReducer,
  SellerProductReducer,
  loadSellerProductsReducer,
  showSavedProductReducer, SaveSallerProductReducer
};
