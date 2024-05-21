import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  return token;
};

export default generateToken;
