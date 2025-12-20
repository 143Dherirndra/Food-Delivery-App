



import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;        // ✅ IMPORTANT
    req.userId = user._id;  // optional

    next();
  } catch (error) {
    console.log("isAuth error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default isAuth;
