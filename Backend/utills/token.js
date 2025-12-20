// import jwt from 'jsonwebtoken';
// const genToken = async (userId)=>{
//     try {
//         const token= await jwt.sign({userId},process.env.SECRET_JWT,{expiresIn:"7d"});
//         return token;   
        
//     } catch (error) {
//         console.log(error)
        
//     }
// }
//  export default genToken;



 import jwt from "jsonwebtoken";

const genToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default genToken;
