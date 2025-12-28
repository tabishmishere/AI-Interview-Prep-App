import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// Generate Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        // check if user already exist
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new User 
        const user = await User.create({ name, email, password: hashedPassword, profileImageUrl });

        // Return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }

};

export const loginUser = (req, res) => {

};

export const getUserProfile = (req, res) => {

}

