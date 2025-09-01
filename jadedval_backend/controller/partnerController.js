import { Partner } from '../model/students.js';
import { isValidPhoneNumber } from 'libphonenumber-js';
import validator from 'validator';


export const createPartner = async (req, res) => {
    try {
        const { name, email, phone, howWouldYouLikeToPartner } = req.body;

        // Validate the phone number
        if (!isValidPhoneNumber(phone, 'NG')) {
            return res.status(404).json({ message: 'Invalid phone number'});
        }

        if (!validator.isEmail(email)) {
            return res.status(404).json({ message: 'Invalid email address' });
        }

        // Check if the partner already exists
        const existinPartner = await Partner.findOne({ email });
        if (existinPartner) {
            return res.status(400).json({ message: 'Partner already exists' });
        }

        // Create a new partner
        const partner = new Partner({
            name,
            email,
            phone,
            howWouldYouLikeToPartner
        })

        await partner.save();

        // Send a response back to the client
        res.status(201).json({ message: 'Partner created successfully', partner });
    } catch (error) {
        console.error('Error creating partner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.status(200).json(partners);
    } catch (error) {
        console.error('Error fetching partners:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    createPartner,
    getAllPartners
};