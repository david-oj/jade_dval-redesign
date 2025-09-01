import express from 'express';
const router = express.Router();
import { createStudent, getAllStudents } from '../controller/studentController.js';
import { loginUser } from '../controller/authController.js'


router.post('/enroll', createStudent);
router.get('/students', getAllStudents);

// login route
router.post('/login', loginUser);


// Export the router
export default router;
