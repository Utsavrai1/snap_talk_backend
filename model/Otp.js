const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    expires: 120,
    default: Date.now,
  },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

module.exports = mongoose.model("Otp", otpSchema);
