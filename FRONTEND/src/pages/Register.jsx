import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../main";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setuserData } from "../redux/userSlice";
import { FcGoogle } from "react-icons/fc"; 
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/GoogleAuth";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const newUser = { userName, email, password };

    try {
      const response = await axios.post(`${serverURL}/auth/register`, newUser, {
        withCredentials: true,
      });
      if (response.status === 201 || response.status === 200)
        toast.success("Registered successfully");
      console.log(response.data);
      dispatch(setuserData(response.data));
      navigate("/");
      setuserName("");
      setemail("");
      setpassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "registration failed");
    }
  };

 const googleSignIn=async()=>{
  try {
    const response=await signInWithPopup(auth,provider)
    let user=response.user
    let userName=user.displayName
    let email=user.email
    const result=await axios.post(`${serverURL}/auth/googleAuth`,{email,userName},
      {withCredentials:true})
      if(result.status===201 || result.status===200){
        toast.success(result.data.message || "Success")
        dispatch(setuserData(result.data))
      }
      console.log(result)
  } catch (error) {
     toast.error(error.response?.data?.message ||"error in LogIn")
    console.log(error)
  }
    }

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
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Join us to enhance your images with AI
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleForm}>
          <div>
            <label className="block text-sm text-gray-300 mb-2">User Name</label>
            <input
              onChange={(e) => setuserName(e.target.value)}
              type="text"
              value={userName}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              value={email}
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              value={password}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            Register
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
          Already have an account?{" "}
          <Link to={"/signin"} className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
