const UserModel = require("../Modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");
const { Seller, Product } = require("../Modals/Sellers");
const SellerData = require("../Modals/Sellers");
const cron = require("node-cron");
const UserProductIds = require("../Modals/userProductSchema");
const mongoose = require("mongoose");
const PauseSellerids = require("../Modals/pauseSellerids");
const SellerSaveids = require("../Modals/sellersaveids");
const UserModal = require("../Modals/user");
const productModel = require("../Modals/ProductSchema");
const Tag = require("../Modals/tags");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { OAuth2Client } = require("google-auth-library");
const Stripe = require("stripe");
const subscriptionModel = require("../Modals/subscription");
const { v4: uuidv4 } = require("uuid");
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error hashing the password");
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.payload;
    const email = payload.email;
    const firstName = payload.given_name;
    const lastName = payload.family_name;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        firstName,
        lastName,
        email,
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const options = {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    };
    res.cookie("token", jwtToken, options);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email: user.email,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Google login failed:", error);
    return res
      .status(400)
      .json({ success: false, message: "Google login failed" });
  }
};

// Signup functionality
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please log in",
        success: false,
      });
    }

    // Hash the user's password
    const hashedPassword = await hashPassword(password);

    // Create a new user model with the hashed password
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: process.env.MY_EMAIL,
      to: newUser.email,
      subject: "Email Verification",
      text: `Click on this link to verify your email: ${process.env.LOCALHOST_RESET_URL}/verify-email/${token}`,
    };

    await transporter.sendMail(receiver);
    const jwtToken = jwt.sign(
      {
        email: newUser.email,
        _id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    // setting token into cookie
    const options = {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    res.cookie("token", jwtToken, options);
    // Send a successful response
    res.status(201).json({
      message:
        "Please verify your email address from the url sent to your email",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
const confirmEmail = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(404).json({
        message: "Token is missing",
        success: false,
      });
    }
    const user = await UserModel.findOneAndUpdate(
      { email: jwt.verify(token, process.env.JWT_SECRET).email },
      { isEmailVerified: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//login functionality

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");

    const errorMsg = "Please enter the correct login credentials";
    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Please verify your email address",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    // setting token into cookie
    const options = {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    res.cookie("token", jwtToken, options);
    res.status(200).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
const loadCurrentUser = async (req, res) => {
  try {
    const user = await UserModal.findOne({ _id: req?.user?._id }).populate(
      "subscription"
    );
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
const pauseSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    if (!sellerId) {
      return res.status(404).json({
        message: "Seller ID is required",
        success: false,
      });
    }
    const seller = await SellerData.findOne({ sellerId });
    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
        success: false,
      });
    }
    if (seller.pauseStatus.status) {
      seller.pauseStatus.status = false;
      seller.pauseStatus.time = new Date();
      await seller.save();
      return res.status(200).json({
        message: "Seller is resumed successfully",
      });
    } else {
      seller.pauseStatus.status = true;
      await seller.save();
      return res.status(200).json({
        message: "Seller is paused successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Please provide email" });
    }
    const checkUser = await UserModel.findOne({ email });

    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "User not found please register" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: process.env.MY_EMAIL, // Sender's webmail address
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to reset your password: ${process.env.URL_ResetPass}/reset-password/${token}`,
    };

    await transporter.sendMail(receiver);

    return res.status(200).send({
      message: "Password reset link send successfully on your gmail account",
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Check if password is provided
    if (!password) {
      return res.status(400).send({ message: "Please provide password" });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).send({ message: "Invalid or expired token" });
    }

    // Find the user by email from the decoded token
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Hash the new password
    const newHashedPassword = await hashPassword(password);

    // Update the user's password
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

// Change password functionality
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }

    const user = await UserModel.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User not found, please register" });
    }

    const isMatchPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isMatchPassword) {
      return res
        .status(400)
        .send({ message: "Current password does not match" });
    }

    const newHashedPassword = await hashPassword(newPassword);

    user.password = newHashedPassword;
    await user.save();

    return res.status(200).send({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ _id: req.user?._id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update fields if they are provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    // Save the updated user data
    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const keepaProductfetch = async (req, res) => {
  const { asin } = req.params;

  try {
    const response = await axios.get("https://api.keepa.com/product", {
      params: {
        key: process.env.KEEPA_API_KEY,
        domain: "1", // 1 for Amazon.com
        asin: asin,
      },
    });

    // Send Keepa API data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Keepa data:", error);
    res.status(500).json({ message: "Error fetching Keepa data" });
  }
};

const loadUserAllSellers = async (req, res) => {
  try {
    const { pauseStatus } = req.query; // Extract pauseStatus from query

    // Create the filter based on pauseStatus
    const filter = { userId: req.user._id };
    if (pauseStatus !== undefined) {
      filter["pauseStatus.status"] = pauseStatus === "true"; // Return/Get Pause Seller.
    } else if (pauseStatus === "active") {
      filter["pauseStatus.status"] = false; // Only active sellers
    }

    const sellers = await SellerData.find(filter);

    return res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loadAllProductsUser = async (req, res) => {
  try {
    const products = await productModel.find({
      userId: req.user._id,
    });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

const loadSpecificSellerProduct = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const sellerProducts = await productModel.find({
      sellerId,
      userId: req.user._id,
    });
    return res.status(200).json({
      success: true,
      sellerProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const saveSeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const seller = await SellerData.findOne({
      _id: sellerId,
      userId: req.user._id,
    });
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }
    if (seller.isSaved) {
      seller.isSaved = false;
      await seller.save();
      return res.status(409).json({
        success: false,
        message: "Seller is unsaved",
      });
    } else {
      seller.isSaved = true;
      await seller.save();
      return res.status(200).json({
        success: true,
        message: "Seller saved successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const saveProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const sellerId = req.params.sellerId;
    const product = await productModel.findOne({
      _id: productId,
      userId: req.user._id,
      sellerId: sellerId,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (product.isSaved) {
      product.isSaved = false;
      await product.save();
      return res.status(409).json({
        success: false,
        message: "Product is unsaved",
      });
    } else {
      product.isSaved = true;
      await product.save();
      return res.status(200).json({
        success: true,
        message: "Product saved successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const sellerInfo = async (req, res) => {
  const { sellerId } = req.params;

  try {
    // Fetch seller info, including the storefront (ASINs list)
    const sellerResponse = await axios.get("https://api.keepa.com/seller", {
      params: {
        key: process.env.KEEPA_API_KEY,
        domain: "1",
        seller: sellerId,
        storefront: 1,
      },
    });

    const sellerData = sellerResponse.data.sellers;

    console.log("sellerData", sellerData);

    if (sellerData && sellerData[sellerId]) {
      const sellerInfo = sellerData[sellerId];
      const { sellerName } = sellerInfo;

      let existingSeller = await SellerData.findOne({
        sellerId,
        userId: req.user._id,
      });

      // If seller exists, update only if user is not associated
      if (existingSeller) {
        res.status(403).json({
          success: false,
          message: "Seller Already exist",
        });
      } else {
        // subscription limit logic
        const user = await UserModal.findOne({ _id: req.user._id }).populate(
          "subscription"
        );
        const sellers = await sellerData.find({ userId: req.user._id });
        if (user?.subscription?.sellers === sellers?.length) {
          return res.status(403).json({
            success: false,
            message:
              "You have reached the limit of adding maximum sellers, Please upgrade your package!",
          });
        }
        const newSeller = new SellerData({
          sellerId,
          sellerName: sellerName,
          date: new Date(),
          userId: req.user._id,
        });
        await newSeller.save();
        res.status(200).json({
          success: true,
          message: "Seller Added Successfully",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Error from keepa",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching seller or product data from Keepa:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: error.message });
  }
};
const markAsReadNewProducts = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required",
      });
    }
    const seller = await SellerData.findOne({
      _id: sellerId,
      userId: req.user._id,
    });
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }
    seller.newProductCount = 0;
    await seller.save();
    return res.status(200).json({
      success: true,
      message: "New product marked as read successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateSellerInfo = async (sellerId, userId) => {
  try {
    const req = { params: { sellerId }, user: { _id: userId } };
    const res = {
      json: (data) => console.log("Update Response:", data),
      status: (code) => {
        console.log("Response Status:", code);
        return res;
      },
    };

    // Re-fetch seller and product data from Keepa
    const sellerResponse = await axios.get("https://api.keepa.com/seller", {
      params: {
        key: process.env.KEEPA_API_KEY,
        domain: "1",
        seller: sellerId,
        storefront: 1,
      },
    });

    const sellerData = sellerResponse.data.sellers;
    const sellerInfo = sellerData && sellerData[sellerId];

    if (sellerInfo && sellerInfo.asinList && sellerInfo.asinList.length > 0) {
      const asinList = sellerInfo.asinList;

      // Fetch product details using the ASIN list
      const productResponse = await axios.get("https://api.keepa.com/product", {
        params: {
          key: process.env.KEEPA_API_KEY,
          domain: "1",
          asin: asinList.join(","),
          stats: "90",
          history: "1",
          offers: "20",
          stock: "1",
          rating: "1",
        },
      });

      const productData = productResponse.data.products;

      // Retrieve the seller from database to check the added date
      let existingSeller = await SellerData.findOne({ sellerId });

      let sellerAddDate = existingSeller ? existingSeller.date : new Date();

      // Filter products added after the seller's addition date
      const productDetails = productData
        // ?.filter((product) => {
        //   const offers = Array.isArray(product.offers)
        //     ? product.offers.filter((offer) => offer.sellerId === sellerId)
        //     : [];

        //   // If offers array is empty, skip this product
        //   if (offers.length === 0) return false;

        //   // Extract the date from offerCSVArray for comparison
        //   const dateFromOfferCSV = offers[0].offerCSV[0];
        //   const offerCSVTimestamp = (dateFromOfferCSV + 21564000) * 60000;
        //   const offerCSVDate = new Date(offerCSVTimestamp);

        //   // Only include products that have been updated after the seller's added date
        //   return (
        //     offerCSVDate > sellerAddDate &&
        //     existingSeller.pauseStatus.time < offerCSVDate
        //   );
        // })
        ?.map((product) => {
          const images = product.imagesCSV ? product.imagesCSV.split(",") : [];

          // Ensure that each product has an offers array
          const offers = Array.isArray(product.offers)
            ? product.offers.filter((offer) => offer.sellerId === sellerId)
            : [];

          const offerCSVArray = offers.map((offer) => offer.offerCSV).flat();

          // Extract prices (even indexed elements)
          const prices = offerCSVArray[offerCSVArray.length - 2];

          //extract date

          const date = offerCSVArray[0];
          const timestamp = (date + 21564000) * 60000;

          const date1 = new Date(timestamp);
          const formattedDate1 = date1.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });

          // Post-process to replace '24' with '00'
          const formattedDate = formattedDate1.replace(/24:/, "00:");

          // Salesrank code
          const rootCategory = product.rootCategory;
          const salesRanks = product.salesRanks;
          const matchingSalesRank = salesRanks && salesRanks[rootCategory];
          const salesrank = Array.isArray(matchingSalesRank)
            ? matchingSalesRank[matchingSalesRank.length - 1]
            : null;

          // Average price code
          const liveOffersOrder = product.liveOffersOrder;
          const allOffers = product.offers || [];
          const liveOffersData = [];

          if (Array.isArray(liveOffersOrder)) {
            liveOffersOrder.forEach((offerIndex) => {
              const liveOffer = allOffers[offerIndex];
              if (liveOffer) {
                liveOffersData.push(liveOffer);
              }
            });
          }

          const offerCSVArrayaverageprice = liveOffersData
            .map((offer) => offer.offerCSV)
            .filter((csv) => csv !== undefined);

          const lastPrices = [];
          offerCSVArrayaverageprice.forEach((offers) => {
            if (offers.length > 0) {
              const lastPrice = offers[offers.length - 2];
              lastPrices.push(lastPrice);
            }
          });

          const totalPrices = lastPrices.reduce((sum, price) => sum + price, 0);
          const averagePrice =
            lastPrices.length > 0 ? totalPrices / lastPrices.length : 0;

          const fbaSellersCount = liveOffersData.filter(
            (offer) => offer.isFBA
          ).length;
          const fbmSellersCount = liveOffersData.filter(
            (offer) => !offer.isFBA
          ).length;

          // Stock count code
          const filteredLiveOffersData = liveOffersData.filter(
            (offer) => offer.sellerId === sellerId
          );
          const lastCounts = [];
          filteredLiveOffersData.forEach((offer) => {
            const stockCSV = offer.stockCSV;
            if (Array.isArray(stockCSV) && stockCSV.length > 0) {
              const lastCount = stockCSV[stockCSV.length - 1];
              lastCounts.push(lastCount);
            }
          });

          const FBA =
            filteredLiveOffersData.length > 0
              ? filteredLiveOffersData[0].isFBA
              : false;

          const category =
            Array.isArray(product.categoryTree) &&
            product.categoryTree.length > 0
              ? product.categoryTree[0].name
              : null;

          const matchingOffer = filteredLiveOffersData.find(
            (offer) => offer.sellerId === sellerId
          );
          const isAmazonValue = matchingOffer ? matchingOffer.isAmazon : false;

          const lastRating = product.csv[16];
          const finalRating = lastRating
            ? lastRating[lastRating.length - 1]
            : 0;

          const graphImageUrl = `https://graph.keepa.com/pricehistory.png?asin=${product.asin}&domain=com&width=800&height=250&amazon=1&new=1&used=1&range=31&salesrank=1&cBackground=ffffff&cFont=0c0c0c&cAmazon=ffba63&cNew=8888dd&cUsed=ffffff&bb=1`;
          const totaloffercount = liveOffersData.length;
          return {
            asin: product.asin,
            img: images[0] || null,
            title: product.title,
            buyBoxPrice: product.stats.buyBoxPrice / 100,
            fba: fbaSellersCount,
            fbm: fbmSellersCount,
            monthlySold: product.monthlySold ? product.monthlySold : 0,
            price: prices / 100,
            salesrank: salesrank,
            averagePrice: averagePrice / 100,
            stockcounts: lastCounts,
            isamazon: isAmazonValue,
            category: category,
            isFBA: FBA,
            rating: finalRating / 10,
            graphImageUrl: graphImageUrl,
            date: formattedDate,
            sellerId: existingSeller?._id,
            userId: req.user._id,
            totaloffercount: totaloffercount,
          };
        });

      if (!existingSeller.pauseStatus.status) {
        if (!Array.isArray(productDetails)) return;

        for (const product of productDetails) {
          try {
            const pasin = product.asin;
            // Check if the product already exists in the database
            const existingProduct = await productModel.findOne({
              asin: pasin,
            });

            if (existingProduct) {
              // Update the existing product
              await productModel.updateOne(
                { asin: product.asin },
                { $set: product }
              );
              console.log(`Updated product with ASIN: ${product.asin}`);
            } else {
              console.log("this is the new console ");
              await new productModel(product).save();
              existingSeller.newProductCount =
                existingProduct.newProductCount + 1;
              await existingSeller.save();
              console.log(`Added new product with ASIN: ${product.asin}`);
            }
          } catch (error) {
            console.error(
              `Error processing product with ASIN ${product.asin}:`,
              error.message
            );
          }
        }
      }
    } else {
      console.log("No new products for seller:", sellerId);
    }
  } catch (error) {
    console.error(
      `Error updating seller info for seller ID ${sellerId} and user ID ${userId}:`,
      error.message
    );
  }
};

// Cron job to update seller data every minute
cron.schedule("*/5 * * * *", async () => {
  console.log("Running scheduled seller data update...");

  try {
    const sellers = await SellerData.find({});
    const updatePromises = sellers.map((seller) =>
      updateSellerInfo(seller.sellerId, seller.userId)
    );

    await Promise.all(updatePromises);
    console.log("All seller data updates completed successfully.");
  } catch (error){
    console.error(
      "Error fetching sellers for scheduled update:",
      error.message
    );
  }
});

const loadSellerAllProducts = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const products = await productModel.find({
      sellerId: sellerId,
      userId: req.user._id,
    });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const fetchGraphImage = async (req, res) => {
  // Get the ASIN from the request parameters
  const { asin } = req.params; // Expecting the ASIN to be sent as a URL parameter

  const graphImageUrl = "https://graph.keepa.com/pricehistory.png";

  const params = {
    asin: asin, // Use the ASIN from the URL parameters
    domain: "com",
    width: 800, // Width of the image
    height: 250, // Height of the image
    amazon: "1", // Show Amazon price
    new: "1",
    used: "1", // Include used prices
    bb: "1", // Include new prices
    range: "31", // Data range (in days)
    salesrank: "1", // Include sales rank
    cBackground: "000000", // Background color
    cFont: "cdcdcd", // Font color
    cAmazon: "ffba63", // Amazon price color
    cNew: "8888dd", // New price color
    cUsed: "ffffff", // Used price color
  };

  // Construct the complete URL
  const url = `${graphImageUrl}?asin=${params.asin}&domain=${params.domain}&width=${params.width}&height=${params.height}&amazon=${params.amazon}&new=${params.new}&used=${params.used}&range=${params.range}&salesrank=${params.salesrank}&cBackground=${params.cBackground}&cFont=${params.cFont}&cAmazon=${params.cAmazon}&cNew=${params.cNew}&cUsed=${params.cUsed}&bb=${params.bb}`;

  // Log the constructed URL
  console.log("Constructed Keepa Graph URL:", url);

  try {
    // Fetch the graph image
    const response = await axios.get(url);

    // Send the image directly in the response
    res.set("Content-Type", "image/png");
    return res.send(response.data);
  } catch (error) {
    console.error("Error fetching graph image:", error.message);
    res.status(500).json({ message: "Error fetching graph image." });
  }
};

// todays imran work 25 Nov 2024
function formatDate(date) {
  // Create a Date object from the provided date string
  const dateObj = new Date(date);

  // Format the date to "MM/DD/YYYY, HH:mm:ss"
  const formattedDate = dateObj.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour time format
  });

  return formattedDate;
}
const loadSellerProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;

    const {
      category,
      minBuyBox,
      maxBuyBox,
      buyBoxFilterType,
      offersFilterType,
      minOffers,
      maxOffers,
      minSalesRank,
      maxSalesRank,
      salesRankFilterType,
      minMonthlySold,
      maxMonthlySold,
      monthlySoldFilterType,
      timePostedStart,
      timePostedEnd,
      newlyPostedDays,
      amazonOnListing,
      fulfillmentMethod,
      sellerId,
      searchQuery,
    } = req.query;

    let filter = {};

    filter.userId = req.user._id;

    if (sellerId && mongoose.Types.ObjectId.isValid(sellerId)) {
      filter.sellerId = sellerId;
    }

    if (category) {
      const categories = Array.isArray(category) ? category : [category];
      filter.category = { $in: categories };
    }

    if (buyBoxFilterType === "greaterThan" && minBuyBox) {
      filter.buyBoxPrice = { $gte: parseFloat(minBuyBox) };
    } else if (buyBoxFilterType === "lessThan" && maxBuyBox) {
      filter.buyBoxPrice = { $lte: parseFloat(maxBuyBox) };
    } else if (buyBoxFilterType === "between" && minBuyBox && maxBuyBox) {
      filter.buyBoxPrice = {
        $gte: parseFloat(minBuyBox),
        $lte: parseFloat(maxBuyBox),
      };
    }

    if (offersFilterType === "greaterThan" && minOffers) {
      filter.$expr = {
        $gte: [{ $add: ["$fba", "$fbm"] }, parseInt(minOffers)],
      };
    } else if (offersFilterType === "lessThan" && maxOffers) {
      filter.$expr = {
        $lte: [{ $add: ["$fba", "$fbm"] }, parseInt(maxOffers)],
      };
    } else if (offersFilterType === "between" && minOffers && maxOffers) {
      filter.$expr = {
        $and: [
          { $gte: [{ $add: ["$fba", "$fbm"] }, parseInt(minOffers)] },
          { $lte: [{ $add: ["$fba", "$fbm"] }, parseInt(maxOffers)] },
        ],
      };
    }

    if (salesRankFilterType === "greaterThan" && minSalesRank) {
      filter.salesrank = { $gte: parseInt(minSalesRank) };
    } else if (salesRankFilterType === "lessThan" && maxSalesRank) {
      filter.salesrank = { $lte: parseInt(maxSalesRank) };
    } else if (
      salesRankFilterType === "between" &&
      minSalesRank &&
      maxSalesRank
    ) {
      filter.salesrank = {
        $gte: parseInt(minSalesRank),
        $lte: parseInt(maxSalesRank),
      };
    }

    if (monthlySoldFilterType && minMonthlySold && maxMonthlySold) {
      if (monthlySoldFilterType === "greaterThan") {
        filter.monthlySold = { $gte: parseInt(minMonthlySold) };
      } else if (monthlySoldFilterType === "lessThan") {
        filter.monthlySold = { $lte: parseInt(maxMonthlySold) };
      } else if (monthlySoldFilterType === "between") {
        filter.monthlySold = {
          $gte: parseInt(minMonthlySold),
          $lte: parseInt(maxMonthlySold),
        };
      }
    }

    if (timePostedStart && timePostedEnd) {
      filter.$expr = {
        $and: [
          {
            $gte: [
              {
                $dateFromString: {
                  dateString: "$date",
                  format: "%m/%d/%Y, %H:%M:%S",
                },
              },
              new Date(formatDate(timePostedStart)),
            ],
          },
          {
            $lte: [
              {
                $dateFromString: {
                  dateString: "$date",
                  format: "%m/%d/%Y, %H:%M:%S",
                },
              },
              new Date(formatDate(timePostedEnd)),
            ],
          },
        ],
      };
    }

    if (newlyPostedDays === "true") {
      const days = 9;

      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - days);

      filter.$expr = {
        $gte: [
          {
            $dateFromString: {
              dateString: "$date",
              format: "%m/%d/%Y, %H:%M:%S",
            },
          },
          dateThreshold,
        ],
      };
    }
    if (amazonOnListing !== undefined) {
      filter.isamazon = amazonOnListing === "true";
    }

    if (fulfillmentMethod === "FBA" || fulfillmentMethod === "FBM") {
      filter.isFBA = fulfillmentMethod === "FBA";
    }

    if (searchQuery && searchQuery.trim() !== "") {
      filter.title = { $regex: searchQuery, $options: "i" };
    }

    const totalProducts = await productModel.countDocuments(filter);

    const products = await productModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      // .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      limit,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

const loadSellerSavedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;

    const {
      category,
      minBuyBox,
      maxBuyBox,
      buyBoxFilterType,
      offersFilterType,
      minOffers,
      maxOffers,
      minSalesRank,
      maxSalesRank,
      salesRankFilterType,
      minMonthlySold,
      maxMonthlySold,
      monthlySoldFilterType,
      amazonOnListing,
      fulfillmentMethod,
      sellerId,
      searchQuery,
      timePostedStart,
      timePostedEnd,
      newlyPostedDays,
    } = req.query;

    let filter = {};

    // Ensure products are tied to the authenticated user
    filter.userId = req.user._id;
    filter.isSaved = true;
    // Validate sellerId
    if (sellerId && mongoose.Types.ObjectId.isValid(sellerId)) {
      filter.sellerId = mongoose.Types.ObjectId(sellerId);
    }

    // Filter by category (one or many)
    if (category) {
      const categories = Array.isArray(category) ? category : [category];
      filter.category = { $in: categories };
    }

    // Filter by BuyBox price
    if (buyBoxFilterType === "greaterThan" && minBuyBox) {
      filter.buyBoxPrice = { $gte: parseFloat(minBuyBox) };
    } else if (buyBoxFilterType === "lessThan" && maxBuyBox) {
      filter.buyBoxPrice = { $lte: parseFloat(maxBuyBox) };
    } else if (buyBoxFilterType === "between" && minBuyBox && maxBuyBox) {
      filter.buyBoxPrice = {
        $gte: parseFloat(minBuyBox),
        $lte: parseFloat(maxBuyBox),
      };
    }
    // Filter by offers
    if (offersFilterType === "greaterThan" && minOffers) {
      filter.$expr = {
        $gte: [{ $add: ["$fba", "$fbm"] }, parseInt(minOffers)],
      };
    } else if (offersFilterType === "lessThan" && maxOffers) {
      filter.$expr = {
        $lte: [{ $add: ["$fba", "$fbm"] }, parseInt(maxOffers)],
      };
    } else if (offersFilterType === "between" && minOffers && maxOffers) {
      filter.$expr = {
        $and: [
          { $gte: [{ $add: ["$fba", "$fbm"] }, parseInt(minOffers)] },
          { $lte: [{ $add: ["$fba", "$fbm"] }, parseInt(maxOffers)] },
        ],
      };
    }

    // Filter by sales rank
    if (salesRankFilterType === "greaterThan" && minSalesRank) {
      filter.salesrank = { $gte: parseInt(minSalesRank) };
    } else if (salesRankFilterType === "lessThan" && maxSalesRank) {
      filter.salesrank = { $lte: parseInt(maxSalesRank) };
    } else if (
      salesRankFilterType === "between" &&
      minSalesRank &&
      maxSalesRank
    ) {
      filter.salesrank = {
        $gte: parseInt(minSalesRank),
        $lte: parseInt(maxSalesRank),
      };
    }

    // Filter by monthly sold
    if (monthlySoldFilterType === "greaterThan" && minMonthlySold) {
      filter.monthlySold = { $gte: parseInt(minMonthlySold) };
    } else if (monthlySoldFilterType === "lessThan" && maxMonthlySold) {
      filter.monthlySold = { $lte: parseInt(maxMonthlySold) };
    } else if (
      monthlySoldFilterType === "between" &&
      minMonthlySold &&
      maxMonthlySold
    ) {
      filter.monthlySold = {
        $gte: parseInt(minMonthlySold),
        $lte: parseInt(maxMonthlySold),
      };
    }

    if (timePostedStart && timePostedEnd) {
      filter.$expr = {
        $and: [
          {
            $gte: [
              {
                $dateFromString: {
                  dateString: "$date",
                  format: "%m/%d/%Y, %H:%M:%S",
                },
              },
              new Date(formatDate(timePostedStart)),
            ],
          },
          {
            $lte: [
              {
                $dateFromString: {
                  dateString: "$date",
                  format: "%m/%d/%Y, %H:%M:%S",
                },
              },
              new Date(formatDate(timePostedEnd)),
            ],
          },
        ],
      };
    }

    if (newlyPostedDays === "true") {
      const days = 9;

      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - days);

      filter.$expr = {
        $gte: [
          {
            $dateFromString: {
              dateString: "$date",
              format: "%m/%d/%Y, %H:%M:%S",
            },
          },
          dateThreshold,
        ],
      };
    }
    // Filter by Amazon on Listing
    if (amazonOnListing !== undefined) {
      filter.isamazon = amazonOnListing === "true";
    }

    // Filter by fulfillment method (FBA or FBM)
    if (fulfillmentMethod === "FBA" || fulfillmentMethod === "FBM") {
      filter.isFBA = fulfillmentMethod === "FBA";
    }

    // Add search functionality for product title
    if (searchQuery && searchQuery.trim() !== "") {
      filter.title = { $regex: searchQuery, $options: "i" }; // Case-insensitive regex
    }

    // Fetch total products for pagination
    const totalProducts = await productModel.countDocuments(filter);

    // Fetch filtered products with pagination
    const products = await productModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      // .sort({ createdAt: -1 }); // Sorting by newest first

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    // Send response
    res.status(200).json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      limit,
    });
  } catch (error) {
    console.error("Error fetching saved products:", error);
    res.status(500).json({ message: "Failed to fetch saved products", error });
  }
};

// const getUserSellers = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     const sellers = await SellerData.find({ userIds: userId });
//     const sellerSaveData = await SellerSaveids.findOne({ userId });
//     const favoriteSellerIds = sellerSaveData ? sellerSaveData.sids : [];

//     const userProducts = await UserProductIds.findOne({ userId });
//     const savedProductIds = userProducts ? userProducts.productIds : [];

//     const sellersWithFavoriteTags = sellers.map((seller) => {
//       const isFavorite = favoriteSellerIds.includes(seller.sellerId)
//         ? "favourite"
//         : "";

//       const productsWithSavedStatus = seller.products.map((product) => ({
//         ...product.toObject(),
//         isSaved: savedProductIds.includes(product._id.toString())
//           ? "saved"
//           : "",
//       }));

//       return {
//         ...seller.toObject(),
//         favourite: isFavorite,
//         products: productsWithSavedStatus,
//       };
//     });

//     res.json(sellersWithFavoriteTags);
//   } catch (error) {
//     console.error("Error fetching user sellers:", error);
//     res.status(500).json({ message: "Error fetching sellers." });
//   }
// };

const searchProducts = async (req, res) => {
  try {
    const { title, sellerId } = req.query;
    let query = {};

    if (sellerId) {
      query.sellerId = sellerId;
    }
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    const products = await productModel.find(query).exec();

    if (products.length === 0) {
      return res
        .status(403)
        .json({ message: "No products found matching the criteria" });
    }
    res.json({
      products,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const searchSavedProducts = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "The 'title' query parameter is required and cannot be empty.",
      });
    }

    const products = await productModel.find({
      isSaved: true,
      title: { $regex: title, $options: "i" },
      userId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sortSellers = async (req, res) => {
  try {
    const { isSaved, pauseStatus, sortByNewProductCount } = req.query;

    if (!isSaved && !pauseStatus && !sortByNewProductCount) {
      return res.status(400).json({
        success: false,
        message:
          "No valid sorting parameters provided. Please provide 'isSaved' or 'pauseStatus'.",
      });
    }

    const sortCriteria = {};
    if (isSaved === "true") {
      sortCriteria.isSaved = -1;
    }
    if (pauseStatus === "true") {
      sortCriteria["pauseStatus.status"] = -1;
    } else if (pauseStatus === "false") {
      sortCriteria["pauseStatus.status"] = 1;
    }
    if (sortByNewProductCount === "true") {
      sortCriteria.newProductCount = -1;
    }
    const sellers = await SellerData.find({ userId: req.user._id })
      .sort(sortCriteria)
      .exec();

    return res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addTags = async (req, res) => {
  const { tagName } = req.body;
  const userId = req.user._id;

  if (!tagName) {
    return res.status(400).json({ error: "Tag name is required" });
  }

  try {
    const newTag = new Tag({ tagName, userId });
    const savedTag = await newTag.save();

    res.status(201).json({
      message: "Tag added successfully",
      tag: savedTag,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Tag name must be unique" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

const loadAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({ userId: req.user._id });

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeTags = async (req, res) => {
  const { _id } = req.params;
  const userId = req.user._id;

  try {
    const removeTag = await Tag.findOneAndDelete({ _id, userId });

    if (!removeTag) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Tag deleted successfully",
      tag: removeTag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const loadUserSavedSellers = async (req, res) => {
  try {
    const sellers = await SellerData.find({
      userId: req.user._id,
      isSaved: true,
    });

    return res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const SearchBySellerApi = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const userId = req.userId;
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required." });
    }

    const searchRegex = new RegExp(searchTerm, "i");

    const sellers = await SellerData.find({
      userId: userId,
      $or: [{ sellerId: searchRegex }, { sellerName: searchRegex }],
    });

    if (sellers.length > 0) {
      const result = sellers.map((seller) => ({
        sellerId: seller.sellerId,
        sellerName: seller.sellerName,
        length: seller.products.length,
      }));

      res.json(result);
    } else {
      res
        .status(404)
        .json({ message: "No sellers found with the given search term." });
    }
  } catch (error) {
    console.error("Error searching sellers:", error);
    res.status(500).json({ message: "Error searching sellers." });
  }
};

const productsBySellerID = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const seller = await SellerData.findOne({ sellerId });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found." });
    }

    res.json(seller);
  } catch (error) {
    console.error("Error fetching single sellers:", error);
    res.status(500).json({ message: "Error fetching single sellers." });
  }
};

const allSellerData = async (req, res) => {
  try {
    const sellers = await SellerData.find();
    res.json(sellers);
  } catch (error) {
    console.error("Error fetching All sellers:", error);
    res.status(500).json({ message: "Error fetching all sellers ." });
  }
};

const fetchAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find(); // Fetch all seller records from MongoDB
    res.json(sellers); // Send the seller data back to the client
  } catch (error) {
    console.error("Error fetching   sellers:", error);
    res.status(500).json({ message: "Error fetching sellers." });
  }
};

const editSellerInfo = async (req, res) => {
  const { sellerId } = req.params;
  const { sellerName, pauseStatus, isSaved } = req.body;

  try {
    const updatedSeller = await SellerData.findOneAndUpdate(
      { _id: sellerId, userId: req.user._id },
      {
        sellerName,
        "pauseStatus.status": pauseStatus,
        isSaved,
      },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(403).json({
        success: false,
        message: "Seller not updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Seller info updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const deletedSeller = await SellerData.findOneAndDelete({ _id: sellerId });

    if (!deletedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const products = await productModel.find({ sellerId: sellerId });
    const result = await productModel.deleteMany({
      _id: { $in: products },
    });
    return res.status(200).json({
      message: `Seller and ${result.deletedCount} associated products deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting seller:", error);
    res.status(500).json({ message: "Error deleting seller" });
  }
};

const paginatedProducts = async (req, res) => {
  try {
    const { page = 1, limit = 25, sellerId } = req.query;
    // Pagination options
    const skip = (page - 1) * limit;
    let query = {};
    if (sellerId) {
      query.sellerId = sellerId;
    }
    // Query the database with pagination
    const products = await productModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    // Get total product count for pagination info
    const totalProducts = await productModel.countDocuments(query).exec();
    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const saveUserProductId = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  if (!productId) {
    return res
      .status(400)
      .json({ message: "Product ID is required in the URL." });
  }
  if (productId === "undefined") {
    return res.status(400).json({ message: "Product is not undefined." });
  }

  try {
    let userProducts = await UserProductIds.findOne({ userId });

    if (userProducts) {
      if (!userProducts.productIds.includes(productId)) {
        userProducts.productIds.push(productId);
        await userProducts.save();
      } else {
        return res.status(400).json({ message: "Product ID already saved." });
      }
    } else {
      userProducts = new UserProductIds({
        userId,
        productIds: [productId],
      });
      await userProducts.save();
    }

    res.status(200).json({ message: "Product ID saved successfully." });
  } catch (error) {
    console.error("Error saving product ID:", error);
    res.status(500).json({ message: "Error saving product ID." });
  }
};

const pauseSellerids = async (req, res) => {
  const userId = req.user._id;
  const { sellerId } = req.params;

  if (!sellerId) {
    return res
      .status(400)
      .json({ message: "Seller ID is required in the URL." });
  }
  if (sellerId === "undefined") {
    return res.status(400).json({ message: "Seller ID cannot be undefined." });
  }

  try {
    const seller = await SellerData.findOne({ sellerId });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found." });
    }
    const sellerObjectId = seller._id;
    let sellerids = await PauseSellerids.findOne({ userId });

    if (sellerids) {
      if (!sellerids.pauseSellerIds.includes(sellerObjectId.toString())) {
        sellerids.pauseSellerIds.push(sellerObjectId);
        await sellerids.save();
      } else {
        return res.status(400).json({ message: "Seller already saved." });
      }
    } else {
      sellerids = new PauseSellerids({
        userId,
        pauseSellerIds: [sellerObjectId],
      });
      await sellerids.save();
    }

    res.status(200).json({ message: "Seller ID saved successfully." });
  } catch (error) {
    console.error("Error saving Seller ID:", error);
    res.status(500).json({ message: "Error saving Seller ID." });
  }
};

const getUserProductIds = async (req, res) => {
  const userId = req.user._id;

  try {
    const userProducts = await UserProductIds.findOne({ userId });

    if (!userProducts || userProducts.productIds.length === 0) {
      return res
        .status(404)
        .json({ message: "No product IDs found for this user." });
    }

    // Filter out invalid ObjectId strings
    const validProductIds = userProducts.productIds
      .filter((id) => mongoose.Types.ObjectId.isValid(id))
      .map((id) => new mongoose.Types.ObjectId(id));

    if (validProductIds.length === 0) {
      return res
        .status(404)
        .json({ message: "No valid product IDs found for this user." });
    }

    const productsData = await SellerData.aggregate([
      { $unwind: "$products" },
      { $match: { "products._id": { $in: validProductIds } } },
      { $project: { products: 1, _id: 0 } },
    ]);

    if (!productsData || productsData.length === 0) {
      return res
        .status(404)
        .json({ message: "No product data found for the given product IDs." });
    }

    const productDetails = productsData.map((item) => item.products);

    res.status(200).json({ productDetails });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Error fetching product data." });
  }
};

const deleteUserProductId = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  if (!productId) {
    return res
      .status(400)
      .json({ message: "Product ID is required in the URL." });
  }

  try {
    const userProducts = await UserProductIds.findOne({ userId });

    if (!userProducts) {
      return res
        .status(404)
        .json({ message: "No product IDs found for this user." });
    }

    const productIndex = userProducts.productIds.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product ID not found." });
    }
    userProducts.productIds.splice(productIndex, 1);
    await userProducts.save();

    res.status(200).json({ message: "Product ID deleted successfully." });
  } catch (error) {
    console.error("Error deleting product ID:", error);
    res.status(500).json({ message: "Error deleting product ID." });
  }
};

const sellersaveid = async (req, res) => {
  const userId = req.user._id;
  const { sellerid } = req.params;

  if (!sellerid) {
    return res
      .status(400)
      .json({ message: "Seller ID is required in the URL." });
  }
  if (sellerid === "undefined") {
    return res.status(400).json({ message: "Seller id is not undefined." });
  }

  try {
    let sellerids = await SellerSaveids.findOne({ userId });

    if (sellerids) {
      if (!sellerids.sids.includes(sellerid)) {
        sellerids.sids.push(sellerid);
        await sellerids.save();
      } else {
        return res.status(400).json({ message: "Seller ID already saved." });
      }
    } else {
      sellerids = new SellerSaveids({
        userId,
        sids: [sellerid],
      });
      await sellerids.save();
    }

    res.status(200).json({ message: "Seller ID saved successfully." });
  } catch (error) {
    console.error("Error saving Seller ID:", error);
    res.status(500).json({ message: "Error saving Seller ID." });
  }
};

const deletesellersaveid = async (req, res) => {
  const userId = req.user._id;
  const { sellerid } = req.params;

  if (!sellerid) {
    return res
      .status(400)
      .json({ message: "Seller ID is required in the URL." });
  }
  if (sellerid === "undefined") {
    return res
      .status(400)
      .json({ message: "Seller ID cannot be 'undefined'." });
  }

  try {
    const sellerids = await SellerSaveids.findOne({ userId });

    if (!sellerids || !sellerids.sids.includes(sellerid)) {
      return res.status(404).json({ message: "Seller ID not found." });
    }
    sellerids.sids = sellerids.sids.filter((id) => id !== sellerid);
    await sellerids.save();

    res.status(200).json({ message: "Seller ID deleted successfully." });
  } catch (error) {
    console.error("Error deleting Seller ID:", error);
    res.status(500).json({ message: "Error deleting Seller ID." });
  }
};

const getsellersaveid = async (req, res) => {
  const userId = req.user._id;

  try {
    const sellerids = await SellerSaveids.findOne({ userId });

    if (!sellerids) {
      return res
        .status(200)
        .json({ message: "No seller IDs saved.", sids: [] });
    }
    res.status(200).json({ sids: sellerids.sids });
  } catch (error) {
    console.error("Error retrieving saved seller IDs:", error);
    res.status(500).json({ message: "Error retrieving saved seller IDs." });
  }
};

// payment controller
const checkOutSession = async (req, res) => {
  const { amount, tier, planType, sellers } = req.body;

  if (!amount || !tier || !planType || !sellers) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const planEndsAt = new Date(trialEndsAt);
    planEndsAt.setDate(planEndsAt.getDate() + 30);

    const user = await UserModal.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create a new subscription document with a temporary status.
    const subscription = await subscriptionModel.create({
      amount,
      cancelledAt: null,
      checkoutSessionId: null,
      createdAt: new Date(),
      currency: "usd",
      customerEmail: user?.email,
      customerId: null,
      planType: planType,
      status: "pending",
      subscriptionId: null,
      subscriptionItemId: null,
      id: uuidv4(),
      tier: tier,
      trialEndsAt,
      planEndsAt,
      updatedAt: new Date(),
      userId: user?._id,
      sellers,
      isActive: true,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planType,
              description: `${tier} plan`,
            },
            unit_amount: amount * 100,
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        email: user?.email,
        userId: user?._id.toString(),
        subscriptionId: subscription._id.toString(), // Pass the subscription document ID
        tier,
        planType,
      },
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/payment-cancel`,
    });

    // Update the subscription with the session ID
    subscription.checkoutSessionId = session.id;
    subscription.status = "trialing"; // Update to a meaningful status if needed
    await subscription.save();

    // Associate the subscription with the user
    user.subscription = subscription._id;
    await user.save();

    res.status(200).json({ session });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
};

// Run this job every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();

    // Deactivate users whose trial or plan has ended
    await subscriptionModel.updateMany(
      {
        $or: [
          { trialEndsAt: { $lt: now }, status: "trialing", isActive: true },
          { planEndsAt: { $lt: now }, status: "active", isActive: true },
        ],
      },
      { $set: { isActive: false, status: "expired" } }
    );

    console.log("Checked and updated expired subscriptions.");
  } catch (error) {
    console.error("Error in subscription cleanup job:", error);
  }
});

module.exports = {
  signup,
  confirmEmail,
  login,
  logout,
  loadCurrentUser,
  pauseSeller,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
  keepaProductfetch,
  sellerInfo,
  fetchAllSellers,
  productsBySellerID,
  allSellerData,
  // getUserSellers,
  loadUserSavedSellers,
  SearchBySellerApi,
  fetchGraphImage,
  editSellerInfo,
  removeSeller,
  saveUserProductId,
  getUserProductIds,
  deleteUserProductId,
  pauseSellerids,
  sellersaveid,
  deletesellersaveid,
  loadUserAllSellers,
  loadSellerAllProducts,
  saveSeller,
  saveProduct,
  loadSpecificSellerProduct,
  loadAllProductsUser,
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
};
