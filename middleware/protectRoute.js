import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No Token Provided " });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token);
    const id = decoded._id;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default protectRoute;
