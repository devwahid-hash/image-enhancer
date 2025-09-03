import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../main';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setuserData } from '../redux/userSlice';
import { FcGoogle } from "react-icons/fc"; 
import { signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, provider } from "../utils/GoogleAuth";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newUser = { email, password };

  // Normal login
  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverURL}/auth/login`, newUser, {
        withCredentials: true,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully Logged In");
        console.log(response.data);
        dispatch(setuserData(response.data));
        navigate("/");
        setemail("");
        setpassword("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  // Google Login
  const googleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let userName = user.displayName;
      let email = user.email;

      const result = await axios.post(
        `${serverURL}/auth/googleAuth`,
        { email, userName },
        { withCredentials: true }
      );

      if (result.status === 200 || result.status === 201) {
        toast.success(result.data.message || "Google Login Successful");
        dispatch(setuserData(result.data));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Google Sign-In Failed");
      console.log(error);
    }
  };

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8"
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wide">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to continue enhancing your images</p>
        </div>

        {/* Form */}
        <form onSubmit={formHandler} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email Address</label>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              value={email}
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              value={password}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mt-2">
                <Link
                  to="/forgetpassword"
                  className="text-sm mt-2 text-pink-400 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Forget password?
                </Link>
              </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            Sign In
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={googleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-gray-800 font-medium shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <FcGoogle size={22} />
          Continue with Google
        </motion.button>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
