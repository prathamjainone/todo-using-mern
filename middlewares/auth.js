import { User } from "../models/UserSchema.js"; // Ensure you import User
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("Cookies:", req.cookies); // Log cookies for debugging
  console.log("Received token:", token); // Log the token received

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log the error for debugging
    return res.status(500).json({ success: false, message: "Invalid token" });
  }
};
