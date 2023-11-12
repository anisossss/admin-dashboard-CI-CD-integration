const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    googleAuth: {
      type: Boolean,
      default: false,
    },
    website: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
    customerId: {
      type: String,
    },

    customer_city: {
      type: String,
    },
    customer_country: {
      type: String,
    },
    customer_line1: {
      type: String,
    },
    customer_postal: {
      type: String,
    },
    customer_state: {
      type: String,
    },
    customer_email: {
      type: String,
    },
    customer_name: {
      type: String,
    },
    customer_phone: {
      type: String,
    },

    credits: {
      type: Number,
      default: 50,
    },
    purchasedCredits: {
      type: Number,
    },

    subscriptionStatus: {
      type: Boolean,
      default: false,
    },
    subscriptionId: {
      type: String,
    },

    currentPlan: {
      type: String,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    deleteAcount: {
      type: Boolean,
      default: false,
    },

    profilePhoto: {
      type: String,
    },
    online: {
      type: Boolean,
      default: false,
    },

    invoiceId: {
      type: String,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
