import express from "express";
import { login, signup, verifyOtp, updateProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.put("/profile", updateProfile);

export default router;
