const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  career: {
    type: String,
    default: "",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("waitlist", waitlistSchema);
