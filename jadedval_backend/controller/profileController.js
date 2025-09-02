import StudentProfile from '../model/profile.js';
import { generateAccessCode } from './accessCode.js';
import { hashPassword, autoPasswordCreation } from "../utils.js";


// Function to create a new student profile
export const createStudentProfile = async(req, res) => {
    try {
        // Destructuring the request body
        const { name, email, department } = req.body;

        // Check if the profile already exists
        const existingProfile = await StudentProfile.findOne({ email });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists' });
        }

        // hash password
        const password = autoPasswordCreation();
        console.log("password to login: ", password);
        const hashedPassword = await hashPassword(password)
        
        // Create a new student profile
        const profile = new StudentProfile({
            name,
            email,
            department,
            password: hashedPassword,
        });

        await profile.save();
        const profileData = profile.toObject();
        delete profileData.password;

        // Send a response back to the client
        res.status(201).json({ message: 'Profile created successfully', profileData });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to get all student profiles
export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await StudentProfile.find().sort({ createdAt: -1 }).populate('accessCode');

        const profileData = profiles.map(profile => {
            const profileObj = profile.toObject();
            delete profileObj.password;
            return profileObj;
        });

        res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to get a student profile by ID
export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await StudentProfile.findById(id).populate('accessCode');

        // Check if the student is registered with us
        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found!' });
        }
        const profileData = profile.toObject();
        delete profileData.password;

        return res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update profile by it Id
export const updateProfileById = async (req, res) => {
    try {
        const profileId = await StudentProfile.findById(req.params.id);
        if (!profileId) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        const updatedProfile = req.body;
        const profile = await StudentProfile.findByIdAndUpdate(req.params.id, updatedProfile, { new: true });
        res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete profile by Id
export const deleteProfileById = async (req, res) => {
    try {
        const profileId = await StudentProfile.findById(req.params.id);
        if (!profileId) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        await StudentProfile.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    createStudentProfile,
    getAllProfiles,
    getProfileById,
    updateProfileById,
    deleteProfileById
}