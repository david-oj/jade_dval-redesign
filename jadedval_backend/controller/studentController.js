const { Student } = require('../model/students.js');
const { sendEmail, htmlHelper } = require('../utils.js');
const { isValidPhoneNumber } = require('libphonenumber-js');
const validator = require('validator')


// Function to create a new student
const createStudent = async (req, res) => {
    try{
        const { fullName, email, phone, interest } = req.body;

        // Validate the phone number
        if (!isValidPhoneNumber(phone, 'NG')){
            return res.status(400).json({ message: 'Invalid phone number' });
        }

        // validate email
        if (!validator.isEmail(email)) {
            return res.status(404).json({ message: 'Invalid email address' });
        }
        
        // Check if the student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        // Create a new student
        const student = new Student({
            fullName,
            email,
            phone,
            interest
        });
        await student.save();
        // Send a welcome email
        const html = htmlHelper(fullName, interest);

        await sendEmail({
            email,
            subject: 'Welcome to jadedval',
            html
        })
        
        // Send a response back to the client
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createStudent,
    getAllStudents
}