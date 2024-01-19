const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  emailId: {
    type: String,
    require: true,
  },
  fcmToken: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profileImage: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
  },
});

UserSchema.methods.generateToken = async function generateToken() {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY,
      {
        expiresIn: "1y",
      }
    );
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = mongoose.model("User", UserSchema);
