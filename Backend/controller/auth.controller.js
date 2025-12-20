import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utills/token.js";
import { sendOtpmail } from "../utills/mail.js";


 export const signup = async(req,res)=>{
    
    try{
     const {fullname,email,password,mobile,role}=req.body;
     let user = await User.findOne({email});
     if(user){
        return res.status(400).json({message:"user already exists"});

     }
     if(password.length<6){
        return res.status(400).json({message:"password  must be 6 character long"});
     }
     if(mobile.length<10){
        return res.status(400).json({message:"mobile number must be 10 digit long"});

     }

     const hashedPassword= await bcrypt.hash(password,10);
     user= await User.create({
        fullname,
        email,
        password:hashedPassword,
        mobile,
        role,
     })
      const token= await genToken(user._id);
      res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        
        sameSite:"lax",
        maxAge:7*24*60*60*1000,
    })
        res.status(201).json({ message:"user created succsessfully",user});

    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: `user created succsessfully ${error}`,});
    }
}
//  
export const signIn = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    if (!role) {
      return res.status(400).json({ message: "role is required" });
    }

    if (
      role.toString().toLowerCase() !==
      (user.role || "").toString().toLowerCase()
    ) {
      return res.status(400).json({ message: "invalid role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = await genToken(user._id);

    // ✅ FIXED COOKIE SETTINGS
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,      // true only in HTTPS
      sameSite: "lax",    // ✅ IMPORTANT FIX
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(200).json({
      message: "user signin successful",
      user: safeUser,
    });
  } catch (error) {
    console.error("signIn error:", error);
    return res.status(500).json({ message: "signIn error" });
  }
};



export const signOut = async(req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"signout successfully"});
    } catch (error) {
        res.status(500).json({ message: `signout error ${error}`,});
        
    }
}
export const sendotp= async(req,res)=>{
    try{
        const {email}=req.body;
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user does not exists"})
        }
        const otp=Math.floor(1000+Math.random()*9000).toString();
        user.resetotp=otp;
        user.isotpverified=false;
        user.otpExpiry= Date.now()+5*60*1000;
        await user.save();

        await sendOtpmail(email,otp);
        return res.status(200).json({message:"otp sent to your email address successfully"});
      }
catch(error){
    return res.status(500).json({ message: `send otp error ${error}`,});
    }
}
 export const verifyotp = async(req,res)=>{
    try {
        const {email,otp}=req.body;
        const user=await User.findOne({email});
        if(!user || user.resetotp!=otp || user.otpExpiry<Date.now() ){
            return res.status(400).json({message:"invalid otp or expireed otp "})
        }
        user.isotpverified=true;
        user.resetotp=undefined;
        user.otpExpiry=undefined;
        user.save();
        return res.status(200).json({message:"otp verified successfully"});
    } catch (error) {
        res.status(500).json({message:`verify otp errror ${error}`})
        
    }
}
export const resetpassword= async (req,res)=>{
   
    try {
        const {email,newpassword}=req.body;
        const user = await User.findOne({email});

        if(!user || !user.isotpverified ){
            res.status(400).json({message:"user not found"});
        }
        const hashedPassword=await bcrypt.hash(newpassword,10);
        user.password=hashedPassword;
        
        await user.save();
        res.status(200).json({message:"your password is reset successsfully"});
         isotpverified=false;
       } catch (error) {
        console.log(error)
        res.status(500).json({message:`your password reset ${error}`});

    }
}
export const googleAuth= async(req,res)=>{
    try {
        const {fullname,email,mobile}=req.body
        console.log(req.body)
        const user= User.findOne({email})
        if(!user){
            user= await User.create({
                fullname,email,mobile
            })
        }
        const token= await genToken(user._id);
      res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        
        sameSite:"Strict",
        maxAge:7*24*60*60*1000,
    })
        res.status(200).json({ message:"user already exist",user});
    } catch (error) {
         res.status(200).json({ message:"googleAuth ee already exist",error});
    }

}
