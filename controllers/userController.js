const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if user is already registered
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });
    // create a new user
    const newUser = await new User({ name, email, password });
    await newUser.save();
    return res
      .status(201)
      .json({
        user: newUser,
        token: null,
        message: "user created successfully",
      });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

module.exports = {
  registerUser,
};
