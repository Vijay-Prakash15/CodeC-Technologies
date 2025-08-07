import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../Models/userModel.js';

// REGISTER
export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();

    // Generate JWT Token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET || "mysecretkey", // Make sure to use env vars in production
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json("User not found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json("Invalid credentials");

    // Generate JWT Token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
