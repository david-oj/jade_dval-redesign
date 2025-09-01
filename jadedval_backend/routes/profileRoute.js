import express from 'express';
const router = express.Router();
import { 
  createStudentProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById 
} from '../controller/profileController.js';
import { regenerateAccessCode } from '../controller/accessCode.js';


// Student profile routes
router.get('/student', getAllProfiles);
router.get('/student/:id', getProfileById);
router.post('/student', createStudentProfile);
router.put('/student/:id', updateProfileById);
router.delete('/student/:id', deleteProfileById);

// Access code routes
router.post('/student/:id/access-code/regenerate', regenerateAccessCode);

export default router;
