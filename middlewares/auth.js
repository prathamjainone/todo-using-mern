import { User } from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import { dbConnect } from "../database/db.js";

export const isAuthenticated = async (req, res, next) => {
  let conn=await dbConnect();
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
};