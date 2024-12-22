const clearErrorsAction = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
const loadCurrentUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_CURRENT_USER_REQUEST",
    });
    const response = await fetch(
      "http://localhost:8000/auth/load-current-user",
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    dispatch({
      type: "LOAD_CURRENT_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CURRENT_USER_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};
const loadUserAllSellersAction = (pauseStatus) => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_ALL_SELLERS_REQUEST",
    });
    if (pauseStatus) {
      const response = await fetch(
        `http://localhost:8000/auth/load-user-all-sellers?pauseStatus=${pauseStatus}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      dispatch({
        type: "LOAD_USER_ALL_SELLERS_SUCCESS",
        payload: data.sellers,
      });
    } else {
      const response = await fetch(
        "http://localhost:8000/auth/load-user-all-sellers",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      dispatch({
        type: "LOAD_USER_ALL_SELLERS_SUCCESS",
        payload: data.sellers,
      });
    }
  } catch (error) {
    dispatch({
      type: "LOAD_USER_ALL_SELLERS_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};

const addSellerAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_SELLER_REQUEST",
    });
    const response = await fetch(
      `http://localhost:8000/auth/api/seller/${id}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log("Action try block: " + data?.message);
    dispatch({
      type: "ADD_SELLER_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    console.log("Action catch block: " + error?.message);
    dispatch({
      type: "ADD_SELLER_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};
const pauseSellerAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "PAUSE_SELLER_REQUEST",
    });
    const response = await fetch(
      `http://localhost:8000/auth/pause-seller/${id}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    dispatch({
      type: "PAUSE_SELLER_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "PAUSE_SELLER_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};
const loadUserSavedSellersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_SAVED_SELLERS_REQUEST",
    });
    const response = await fetch(
      "http://localhost:8000/auth/load-user-all-sellers",
      {
        credentials: "include",
      }
    );
    const data = await response.json();

    dispatch({
      type: "LOAD_USER_SAVED_SELLERS_SUCCESS",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_SAVED_SELLERS_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};

const changePasswordAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "CHANGE_PASSWORD_REQUEST",
    });
    let response = await fetch("http://localhost:8000/auth/change-password", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await response.json();
    dispatch({
      type: "CHANGE_PASSWORD_SUCCESS",
      payload: response.message,
    });
  } catch (error) {
    dispatch({
      type: "CHANGE_PASSWORD_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};

const editProfileAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "EDIT_PROFILE_REQUEST",
    });
    let response = await fetch("http://localhost:8000/auth/edit-user", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await response.json();
    dispatch({
      type: "EDIT_PROFILE_SUCCESS",
      payload: response.message,
    });
  } catch (error) {
    dispatch({
      type: "EDIT_PROFILE_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};
const markAsReadAllProductsAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "MARK_AS_READ_ALL_PRODUCTS_REQUEST",
    });
    let response = await fetch(
      `http://localhost:8000/auth/mark-as-read-new-products/${id}`,
      {
        credentials: "include",
      }
    );
    response = await response.json();
    dispatch({
      type: "MARK_AS_READ_ALL_PRODUCTS_SUCCESS",
      payload: response.message,
    });
  } catch (error) {
    dispatch({
      type: "MARK_AS_READ_ALL_PRODUCTS_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};
const saveSellerAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "SAVE_SELLER_REQUEST",
    });
    let response = await fetch(`http://localhost:8000/auth/save-seller/${id}`, {
      credentials: "include",
    });
    response = await response.json();
    dispatch({
      type: "SAVE_SELLER_SUCCESS",
      payload: response.message,
    });
  } catch (error) {
    dispatch({
      type: "SAVE_SELLER_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};

const editSellerAction = (sellerId, sellerName) => async (dispatch) => {
  try {
    dispatch({ type: "EDIT_SELLER_REQUEST" });
    const response = await fetch(
      `http://localhost:8000/auth/edit-seller-info/${sellerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sellerName }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "EDIT_SELLER_SUCCESS", payload: data.message });
      setTimeout(() => {
        dispatch(loadUserSavedSellersAction());
      }, 2000);
    } else {
      dispatch({ type: "EDIT_SELLER_ERROR", payload: data.message });
    }
  } catch (error) {
    dispatch({
      type: "EDIT_SELLER_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};

const deleteSellerAction = (sellerId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_SELLER_REQUEST" });
    const response = await fetch(
      `http://localhost:8000/auth/remove-seller/${sellerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_SELLER_SUCCESS", payload: data.message });
      dispatch(loadUserSavedSellersAction());
    } else {
      dispatch({ type: "DELETE_SELLER_ERROR", payload: data.message });
    }
  } catch (error) {
    dispatch({
      type: "DELETE_SELLER_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};

const SellerProductAction =
  (id, page = 1, limit = 25) =>
  async (dispatch) => {
    try {
      dispatch({ type: "SELLER_PRODUCT_REQUEST" });

      // Construct query parameters for pagination
      const queryParams = new URLSearchParams({ page, limit }).toString();
      const response = await fetch(
        `http://localhost:8000/auth/load-specific-seller-product/${id}?${queryParams}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch seller products");
      }

      dispatch({
        type: "SELLER_PRODUCT_SUCCESS",
        payload: data.sellerProducts, // Ensure the backend supports pagination
      });
    } catch (error) {
      dispatch({
        type: "SELLER_PRODUCT_ERROR",
        payload: error.message || "Server connection error",
      });
    }
  };

// Imran today work 25 Nov 2024
const loadSellerProductsAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_SELLER_PRODUCTS_REQUEST",
    });

    // Base URL for the API
    let url = `http://localhost:8000/auth/load-seller-products`;

    // Construct query parameters dynamically
    if (
      params &&
      typeof params === "object" &&
      Object.keys(params).length > 0
    ) {
      const queryParams = new URLSearchParams();

      Object.keys(params).forEach((key) => {
        const value = params[key];

        // Handle array parameters (e.g., category)
        if (Array.isArray(value)) {
          value.forEach((item) => {
            queryParams.append(key, item);
          });
        } else if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      url += `?${queryParams.toString()}`;
    }

    // Fetch data from the API
    let response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    // Parse the response JSON
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }

    // Dispatch success action
    dispatch({
      type: "LOAD_SELLER_PRODUCTS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    // Dispatch error action
    dispatch({
      type: "LOAD_SELLER_PRODUCTS_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};

const showSavedProduct =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "SHOW_SAVED_PRODUCT_REQUEST" });

      // Base URL for the API
      let url = `http://localhost:8000/auth/load-seller-saved-products`;

      // Append query parameters dynamically
      if (Object.keys(params).length > 0) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json(); // API response
      console.log("in save ", data);

      if (response.ok) {
        dispatch({ type: "SHOW_SAVED_PRODUCT_SUCCESS", payload: data });
      } else {
        dispatch({ type: "SHOW_SAVED_PRODUCT_ERROR", payload: data.message });
      }
    } catch (error) {
      dispatch({
        type: "SHOW_SAVED_PRODUCT_ERROR",
        payload: error.message || "Server connection error",
      });
    }
  };

const SaveSellerProductAction = (sellerId, productId) => async (dispatch) => {
  try {
    dispatch({ type: "SAVE_SELLER_PRODUCT_REQUEST" });
    const response = await fetch(
      `http://localhost:8000/auth/save-product/${sellerId}/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "SAVE_SELLER_PRODUCT_SUCCESS", payload: data.message });
    } else {
      dispatch({ type: "SAVE_SELLER_PRODUCT_ERROR", payload: data.message });
      dispatch(showSavedProduct());
    }
  } catch (error) {
    dispatch({
      type: "SAVE_SELLER_PRODUCT_ERROR",
      payload: error.message || "Server connection error",
    });
  }
};

export {
  loadCurrentUserAction,
  clearErrorsAction,
  loadUserAllSellersAction,
  addSellerAction,
  pauseSellerAction,
  loadUserSavedSellersAction,
  changePasswordAction,
  editProfileAction,
  markAsReadAllProductsAction,
  saveSellerAction,
  editSellerAction,
  deleteSellerAction,
  SellerProductAction,
  loadSellerProductsAction,
  SaveSellerProductAction,
  showSavedProduct,
};
