import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
