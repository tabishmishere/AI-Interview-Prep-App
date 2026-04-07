import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const checkDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI.substring(0, 40) + "...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const users = await User.find({}).select("email name");
        console.log("Users in DB:", users);

        process.exit(0);
    } catch (e) {
        console.error("DB Error:", e.message);
        process.exit(1);
    }
}

checkDB();
