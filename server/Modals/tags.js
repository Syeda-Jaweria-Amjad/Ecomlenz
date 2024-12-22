const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  tagName: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
