import express from 'express';
const router = express.Router();
import { createStudent, getAllStudents, getAllStudentEmailPhone } from '../controller/studentController.js';
import { loginUser } from '../controller/authController.js'


router.post('/enroll', createStudent);
router.get('/students', getAllStudents);
router.get('/email-phone', getAllStudentEmailPhone);

// login route
router.post('/login', loginUser);


// Export the router
export default router;
