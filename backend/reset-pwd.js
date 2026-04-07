import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const newPassword = await bcrypt.hash("12345678", 10);
        await User.updateOne({ email: "tabishm484@gmail.com" }, { password: newPassword });
        console.log("Password for tabishm484@gmail.com reset to: 12345678");
        process.exit(0);
    } catch (e) {
        console.error("DB Error:", e.message);
        process.exit(1);
    }
}

resetPassword();
