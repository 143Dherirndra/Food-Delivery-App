// // import jwt from 'jsonwebtoken';

// // const isAuth= (req,res,next)=>{
// //    try {
// //      const token=req.cookie.token;
// //     if(!token){
// //         return res.status(500).json({message:"token is not found"})
// //     }
// //     const decodetoken= jwt.verify(token,process.env.SECRET_JWT)
// //     if(!decodetoken){
// //         return res.status(500).json({message:"verify is unComplete"})
// //     }
// //     console.log(decodetoken);
// //     req.userId=decodetoken.userId;
// //     next();
// //    } catch (error) {
// //      return res.status(500).json({message:"isAuth hi Error hai"})
    
// //    }

    
// // }
// // export default isAuth
// import jwt from "jsonwebtoken";
// import User from "../model/user.model.js";

// const isAuth = async (req, res, next) => {
//   try {
//     // ✅ correct cookies access
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: "Token not found" });
//     }

//     // ✅ same secret everywhere
//     const decoded = jwt.verify(token, process.env.SECRET_JWT);

//     if (!decoded) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     // ✅ get full user
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // ✅ attach to request
//     req.user = user;
//     req.userId = user._id;

//     next();
//   } catch (error) {
//     console.error("isAuth error:", error);
//     return res.status(401).json({ message: "Authentication failed" });
//   }
// };

// export default isAuth;



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
