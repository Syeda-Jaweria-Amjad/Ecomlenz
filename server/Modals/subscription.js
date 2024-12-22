const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
  amount: { type: String, required: true },
  cancelledAt: { type: Date, default: null },
  createdAt: { type: Date, required: true },
  currency: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerId: { type: String },
  id: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  planType: { type: String, required: true },
  status: { type: String, required: true },
  subscriptionId: { type: String },
  subscriptionItemId: { type: String, default: null },
  tier: { type: String, required: true },
  trialEndsAt: { type: Date, required: true }, // Free trial expiration date
  planEndsAt: { type: Date, required: true }, // Plan expiration date
  updatedAt: { type: Date, required: true },
  userId: { type: String, required: true },
  sellers: {
    type: Number,
    default: 0,
  },
});

const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

module.exports = subscriptionModel;
