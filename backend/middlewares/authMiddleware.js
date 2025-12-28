import jwt from "jsonwebtoken";
import User from "../models/User.js"

// Middelware to protect routes

export const protect = async (req, res, next) => {
    try {
        let token = req.header.authorization;
        if (!token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]     // Extract Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.User = await User.findById(decoded.id).select("-password");
            next();
        } else {
            res.status(401).json({ message: "Not authorized user." })
        }
    } catch (error) {
        res.status(401).json({ message: "Token failed", error: error.message })
    }
}

