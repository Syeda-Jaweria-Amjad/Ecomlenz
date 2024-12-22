const express = require("express");
const app = express();
const AuthRouter = require("./Routes/AuthRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const subscriptionModel = require("./Modals/subscription");
require("dotenv").config();
require("./Modals/db");
const path = require("path");

const PORT = process.env.PORT || 8000;

// Payment method
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_KEY; // Stripe Webhook Signing Secret
    let event;

    try {
      const sig = req.headers["stripe-signature"];
      // Construct event using the raw body and signature
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle specific events
    try {
      if (event.type === "customer.subscription.created") {
        const subscription = event.data.object;

        // Update the corresponding subscription in the database
        const malik = await subscriptionModel.findOne({
          subscriptionId: subscription.metadata.subscriptionId,
        });
        const updateResult = await subscriptionModel.updateOne(
          { subscriptionId: subscription.metadata.subscriptionId },
          {
            $set: {
              subscriptionId: subscription.id,
              customerId: subscription.customer,
              status: "completed",
              isActive: true,
              updatedAt: new Date(),
            },
          }
        );
        if (updateResult.matchedCount === 0) {
          console.error(
            "No matching subscription found for checkoutSessionId:",
            subscription.metadata.checkoutSessionId
          );
        } else {
          console.log(
            "Subscription updated successfully in the database:",
            subscription.id
          );
        }
      }

      // Respond to Stripe to acknowledge receipt of the event
      res.status(200).send("Webhook received");
    } catch (error) {
      console.error("Error handling webhook event:", error.message);
      res.status(500).send("Error handling webhook event.");
    }
  }
);

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Frontend URL
    credentials: true, // Allows cookies to be sent
  })
);
app.use(cookieParser());
app.use("/auth", AuthRouter);

//connect frontend
const _dirname = path.dirname("")
const buildpath = path.join(_dirname,"../client/build")
app.use(express.static(buildpath))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildpath, 'index.html')); // Use path.resolve for absolute path
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

