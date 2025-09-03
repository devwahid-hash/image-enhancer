import express from "express"
import authrouter from "./authRoute.js";
import upload from "../middlewares/multer.js";
import isAuth from "../middlewares/authMiddleware.js";
import { enhancedImage, getEnhancedImage } from "../controllers/enhnacedImageContr.js";
const router=express.Router();


router.post("/enhanceimage",isAuth,upload.single("image_url"),enhancedImage)
router.get("/enhance-result/:taskId", getEnhancedImage);

export default router

