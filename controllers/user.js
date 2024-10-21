import { User } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import { setcookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// Register a new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log("Registering user:", { name, email }); // Log registration attempt

    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    setcookie(user, res, "Registered successfully", 201);
  } catch (error) {
    console.error("Registration error:", error); // Log error
    next(error);
  }
};

// Login a user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Logging in user:", { email }); // Log login attempt

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }

    setcookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    console.error("Login error:", error); // Log error
    next(error);
  }
};

// Get user details
export const myDetails = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// Logout a user
export const logout = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
