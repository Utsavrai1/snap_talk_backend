const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token == process.env.JWT_KEY);
      const authData = jwt.verify(token, process.env.JWT_KEY);
      console.log(authData);
      next();
    } catch (error) {
      res.status(401).send({ error: error });
    }
  }
  if (!token) {
    res.status(404).send({ error: "Not authorized as no token was passed" });
  }
});

module.exports = { protect };
