import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
     },
     image:{
        type:String,
        default:null
     },
      generateOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default User;