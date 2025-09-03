import express from "express"
import { googleAuth, login, logout, register, resetPassword, sentOtp, verifyOtp } from "../controllers/authContr.js";
import { getCurrentUser } from "../controllers/getCurrentUser.js";
import isAuth from "../middlewares/authMiddleware.js";
const authrouter=express.Router();


authrouter.post("/register",register)
authrouter.post("/login",login)
authrouter.post("/logout",logout)
authrouter.get("/currentuser",isAuth,getCurrentUser)

authrouter.post("/sentotp",sentOtp)
authrouter.post("/otpverify",verifyOtp)
authrouter.post("/resetpassword",resetPassword)

authrouter.post("/googleAuth",googleAuth)


export default authrouter;