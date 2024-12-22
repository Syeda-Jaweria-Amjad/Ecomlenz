const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const {
  signupValidation,
  loginValidation,
  authenticateUser,
} = require("../Middlewares/AuthValidation");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
  keepaProductfetch,
  sellerInfo,
  fetchAllSellers,
  allSellerData,
  productsBySellerID,
  // getUserSellers,
  fetchGraphImage,
  SearchBySellerApi,
  SearchProductapi,
  editSellerInfo,
  removeSeller,
  saveUserProductId,
  getUserProductIds,
  deleteUserProductId,
  pauseSellerids,
  sellersaveid,
  deletesellersaveid,
  logout,
  loadCurrentUser,
  confirmEmail,
  pauseSeller,
  loadUserAllSellers,
  loadSellerAllProducts,
  saveSeller,
  saveProduct,
  loadSpecificSellerProduct,
  loadAllProductsUser,
  loadUserSavedSellers,
  markAsReadNewProducts,
  paginatedProducts,
  searchProducts,
  searchSavedProducts,
  sortSellers,
  loadSellerProducts,
  loadSellerSavedProducts,
  addTags,
  loadAllTags,
  removeTags,
  googleLogin,
  checkOutSession,
} = require("../Controllers/AuthController");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.post("/google-login", googleLogin);
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/confirm-email/:token", authenticateUser, confirmEmail);
router.get("/logout", authenticateUser, logout);
router.get("/load-current-user", authenticateUser, loadCurrentUser);
router.get("/pause-seller/:sellerId", pauseSeller);

router.get("/load-user-all-sellers", authenticateUser, loadUserAllSellers);
router.get(
  "/load-user-all-products/:sellerId",
  authenticateUser,
  loadSellerAllProducts
);
//token generate
router.post("/forget-password", forgotPassword);
//password reset
router.post("/reset-password/:token", resetPassword);

router.post("/change-password", authenticateUser, changePassword);

router.put("/edit-user", authenticateUser, updateUser);

router.get("/api/product/:asin", keepaProductfetch);

router.get("/api/seller/:sellerId", authenticateUser, sellerInfo);

router.get("/save-seller/:sellerId", authenticateUser, saveSeller);
router.get("/save-product/:sellerId/:productId", authenticateUser, saveProduct);
router.put("/edit-seller-info/:sellerId", authenticateUser, editSellerInfo);
router.get(
  "/load-specific-seller-product/:sellerId",
  authenticateUser,
  loadSpecificSellerProduct
);

router.get("/load-all-products-user", authenticateUser, loadAllProductsUser);

router.post("/add-tags", authenticateUser, addTags);

router.get("/load-all-tags", authenticateUser, loadAllTags);

router.delete("/remove-tags/:_id", authenticateUser, removeTags);

router.delete("/remove-seller/:sellerId", authenticateUser, removeSeller);

router.get("/paginated-products", authenticateUser, paginatedProducts);

router.get("/search-products", authenticateUser, searchProducts);

router.get("/search-saved-products", authenticateUser, searchSavedProducts);

router.get("/sort-sellers", authenticateUser, sortSellers);

router.get("/api/search-seller", authenticateUser, SearchBySellerApi);

// router.get("/api/getUserSellers", authenticateUser, getUserSellers);
router.get("/load-user-saved-sellers", authenticateUser, loadUserSavedSellers);
router.post(
  "/api/saveUserProductId/:productId",
  authenticateUser,
  saveUserProductId
);
router.get(
  "/mark-as-read-new-products/:sellerId",
  authenticateUser,
  markAsReadNewProducts
);
router.get("/api/getUserProductIds", authenticateUser, getUserProductIds);

router.get("/api/PauseSellerids/:sellerId", authenticateUser, pauseSellerids);

router.post("/api/SaveSellerid/:sellerid", authenticateUser, sellersaveid);
// today's work from Imran 25 Nov 2024
router.get("/load-seller-products", authenticateUser, loadSellerProducts);
router.get(
  "/load-seller-saved-products",
  authenticateUser,
  loadSellerSavedProducts
);

router.delete(
  "/api/deletesellersaveid/:sellerid",
  authenticateUser,
  deletesellersaveid
);

router.delete(
  "/api/deleteUserProductId/:productId",
  authenticateUser,
  deleteUserProductId
);

router.get("/api/productsBySellerID/:sellerId", productsBySellerID);

router.get("/api/allSellerData", allSellerData);

router.get("/api/sellers", fetchAllSellers);

router.get("/api/images/:asin", fetchGraphImage);

router.post("/create-check-out-session", authenticateUser, checkOutSession);
module.exports = router;
