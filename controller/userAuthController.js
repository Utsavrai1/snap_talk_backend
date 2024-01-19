const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const Otp = require("../model/Otp");
const nodemailer = require("nodemailer");

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ emailId: email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const userData = new User({
      name: name,
      emailId: email,
      password: hashPassword,
    });

    const token = await userData.generateToken();

    console.log("User Access Token : ", token);

    await userData.save().then(() => {
      res.status(200).json({
        message: "User registered successfully",
        userid: userData._id,
        name: name,
        email: email,
        token: token,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ emailId: email });

    if (existingUser) {
      const token = await existingUser.generateToken();

      const hashPassword = existingUser.password;

      const checkPassword = bcrypt.compareSync(password, hashPassword);
      if (checkPassword) {
        res.status(200).json({
          message: "User Logined successfully",
          userid: existingUser._id,
          email: email,
          token: token,
        });
      } else {
        return res.status(400).json({
          error: "Incorrect password",
        });
      }
    } else {
      return res.status(402).json({
        error: "User dosen't exists",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const sendEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const generatedOtp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email",
      html: "<p>Hii,</br> Your otp to verify your account is " + generatedOtp,
    };

    const otp = new Otp({
      email: email,
      otp: generatedOtp,
    });

    await otp.save();

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Something went wrong" });
      } else {
        console.log("Mail has been send:-", info.response);
        res
          .status(200)
          .send({ message: "Otp has been sent to your email account" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const isOtpVerified = await Otp.findOne({
    email: email,
    otp: otp,
  });

  if (isOtpVerified) {
    res.status(200).send({ message: "Account Verified Successfully" });
  } else {
    res.status(404).send({ error: "Invalid Otp" });
  }
});

module.exports = { signUp, logIn, sendEmail, verifyEmail };
