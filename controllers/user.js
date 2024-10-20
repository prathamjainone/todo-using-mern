import { User } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import { setcookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User Already exists", 400));
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedpassword });

    setcookie(user, res, "registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return next(new ErrorHandler("Invalid credentials", 404));
    }

    setcookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const myDetails = (req, res,next) => {
  
    res.status(200).json({
      success: true,
      user: req.user,
    });
  
};

export const logout = (req, res,next) => {
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
