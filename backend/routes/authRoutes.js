import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { get } from "mongoose";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/profile", getUserProfile)

export default router;