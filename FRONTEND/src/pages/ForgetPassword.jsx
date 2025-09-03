import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"
import { FaLock, FaEnvelope, FaKey } from "react-icons/fa";
import { serverURL } from "../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
    const [step, setstep] = useState(1)
    const [email, setemail] = useState("")
    const [otp, setotp] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [conpassword, setconpassword] = useState("")
    const [loading, setloading] = useState(false)
    const navigate=useNavigate();
    //step 1
     const sendotp=async()=>{
      setloading(true)
     try {
      const response=await axios.post(`${serverURL}/auth/sentotp`,{email},{
        withCredentials:true
      })
      if(response.status===201 || response.status ===200){
        toast.success(response.data.message)
        setloading(false)
        setstep(2)

      }
     } catch (error) {
      toast.error(response?.data?.message)
      setloading(false)
     }
     }
//step2
 const verifyotp=async()=>{
   setloading(true)
     try {
      const response=await axios.post(`${serverURL}/auth/otpverify`,{email,otp},{
        withCredentials:true
      })
      if(response.status===201 || response.status ===200){
        toast.success(response?.data?.message)
         setloading(false)
        setstep(3)
        
      }
     } catch (error) {
      toast.error(response.data.message)
       setloading(false)
     }
     }
     //step3
      const resetpassword=async()=>{
         setloading(true)
         if(newpassword !==conpassword){
          return toast.error("password not matched")
         }
     try {
      const response=await axios.post(`${serverURL}/auth/resetpassword`,{email,password:newpassword},{
        withCredentials:true
      })
      if(response.status===201 || response.status ===200){
        toast.success(response.data.message)
         setloading(false)
        navigate("/signin")
        
      }
     } catch (error) {
      toast.error(response.data.message)
       setloading(false)
     }
     }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-sm sm:max-w-md"
      >
        {/* Glowing Border */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4 }}
          className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-lg"
        />

        <div className="relative bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-xl px-6 py-6 text-white">
          {/* STEP 1 - Enter Email */}
          {step === 1 && (
            <>
              <div className="flex justify-center mb-2">
                <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-lg shadow-lg">
                  <FaEnvelope className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Forgot Password?
              </h2>
              <p className="mt-1 text-center text-gray-400 text-xs">
                Enter your registered email to receive OTP
              </p>
              <form onSubmit={(e)=>{
                e.preventDefault()
              }} className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Email
                  </label>
                  <input
                  onChange={(e)=>{
                  setemail(e.target.value)
                  }}
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-md bg-gray-800/60 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 outline-none text-base"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={()=>{
                    sendotp()
                  }}
                  type="submit"
                  className="w-full mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-md font-semibold text-base shadow-md hover:shadow-pink-500/30 transition-all duration-300 cursor-pointer"
                >

                  {loading===true?<ClipLoader size={30} color="white"/> : "Send OTP"}
                </motion.button>
              </form>
            </>
          )}

          {/* STEP 2 - Enter OTP */}
          {step === 2 && (
            <>
              <div className="flex justify-center mb-2">
                <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-lg shadow-lg">
                  <FaKey className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Verify OTP
              </h2>
              <p className="mt-1 text-center text-gray-400 text-xs">
                Enter the 6-digit OTP sent to your email
              </p>
              <form onSubmit={(e)=>{
                e.preventDefault()
              }} className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    OTP
                  </label>
                  <input
                  onChange={(e)=>{
                    setotp(e.target.value)
                  }}
                    type="text"
                    value={otp}
                    maxLength={6}
                    placeholder="Enter OTP"
                    className="w-full px-3 py-2 rounded-md tracking-[0.5em] text-center bg-gray-800/60 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-400 outline-none text-lg font-bold"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  onClick={()=>{
                    verifyotp()
                  }}
                  className="w-full mt-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 rounded-md font-semibold text-base shadow-md hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer"
                >
                  {loading===true?<ClipLoader size={30} color="white"/> : "VerifyOTP"}
                </motion.button>
              </form>
            </>
          )}

          {/* STEP 3 - Reset Password */}
          {step === 3 && (
            <>
              <div className="flex justify-center mb-2">
                <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-lg shadow-lg">
                  <FaLock className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Reset Password
              </h2>
              <p className="mt-1 text-center text-gray-400 text-xs">
                Enter your new password below
              </p>
              <form onSubmit={(e)=>{
                e.preventDefault()
              }} className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    New Password
                  </label>
                  <input
                  onChange={(e)=>{
                 setnewpassword( e.target.value)
                  }}
                    type="password"
                    value={newpassword}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 rounded-md bg-gray-800/60 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 outline-none text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Confirm Password
                  </label>
                  <input
                  onChange={(e)=>{
                 setconpassword( e.target.value)
                  }} 
                  value={conpassword}
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 rounded-md bg-gray-800/60 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-400 outline-none text-base"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  onClick={()=>{
                    resetpassword()
                  }}
                  className="w-full mt-3 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white py-2 rounded-md font-semibold text-base shadow-md hover:shadow-green-500/30 transition-all duration-300 cursor-pointer"
                >
                  {loading===true?<ClipLoader size={30} color="white"/> : "RESET PASSWORD"}
                </motion.button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
