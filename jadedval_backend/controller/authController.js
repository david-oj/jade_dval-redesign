import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import StudentProfile from "../model/profile.js";
import { comparePassword } from "../utils.js";


// Generate JWT token
export const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department
    }
    return jwt.sign(payload, JWT_SECRET);
}

// Verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return { message: "invalid token" }; // invalid token
    }
}

// login user
export const loginUser = async (req, res)=> {
    try {
        const { email, password } = req.body;

        // Check if the student exists
        const student = await StudentProfile.findOne({ email });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Check password is a match
        const isMatch = await comparePassword(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials"});
        }

        return res.status(200).json({
            success: true,
            data: {
                _id: student._id,
                name: student.name,
                email: student.email,
                department: student.department
            }
        })
    } catch (error) {
        console.error('Error login in:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default {
    generateToken,
    verifyToken,
    loginUser
};