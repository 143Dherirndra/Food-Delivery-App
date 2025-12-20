import e from "express";
import mongoose from "mongoose";

const userSchima= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,  
      },
      email:{
        type:String,
        required:true,
        unique:true, 
      },
      password:{
        type:String,
        required:true, 
      },
      mobile:{
        type:String,
        required:true,
        // unique:true,
      },
      role:{
        type:String,
        enum:["user","owner","deleviryboy"],
        required:true,
      },
      resetotp:{
        type:String,

      },
      isotpverified:{
        type:Boolean,
        default:false,
      },
      otpExpiry:{
        type:Date,
      }


},{timestamps:true})

const User=mongoose.model("User",userSchima)
export default User;