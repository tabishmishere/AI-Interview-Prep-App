import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/interview-prep";
        await mongoose.connect(mongoUri, {});
        console.log("MongoDB connected");

    } catch (error) {
        console.error("Error connecting to MongoDB", error.message);
        console.log("Server will continue running without database connection");
        // Don't exit the process, allow server to start without DB
    }
}

export default connectDB;