const express = require("express");
const {
  signUp,
  logIn,
  sendEmail,
  verifyEmail,
} = require("../controller/userAuthController");

const router = express.Router();

//TODO: Swagger Docs For LogIn
router.post("/logIn", logIn);

//TODO: Swagger Docs For SignUp
router.post("/signUp", signUp);

//TODO: Swagger Docs For SendEmail
router.post("/sendEmail", sendEmail);

//TODO: Swagger Docs For VerifyEmail
router.post("/verifyEmail", verifyEmail);

module.exports = router;
