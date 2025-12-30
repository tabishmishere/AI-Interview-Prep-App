import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"
import questionRoutes from "./routes/quesionRoutes.js"
import { fileURLToPath } from "url";
import { protect } from "./middlewares/authMiddleware.js";
import { generateConceptExplanation, generateInterviewQuestions } from "./controllers/aiController.js"
const app = express();
dotenv.config();

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// middleware to handle CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


connectDB()
// middlware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions)
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation)
// Uploads Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT; 
app.listen(PORT, () => {
    console.log(`Server is running of ${PORT}`);
})
console.log("PORT value:", process.env.PORT, typeof process.env.PORT);
