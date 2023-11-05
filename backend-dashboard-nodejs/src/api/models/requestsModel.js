const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  email: {
    type: String,
    default: "",
  },
  note: {
    type: String,
  },
  requestedCareer: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("request", requestSchema);
