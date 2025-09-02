import express from 'express';
const router = express.Router();
import { 
    createModule,
    getAllModules,
    getModuleById,
    updateModuleById,
    deleteModuleById,
    validateAccessCode,
    uploadFilesToModule,
    deleteUploadedFile
} from '../controller/moduleController.js';
import { upload } from '../config/cloudinary.js';



// Student profile routes
router.get('/module', getAllModules);
router.get('/module/:id', getModuleById);
router.post('/module', createModule);
router.put('/module/:id', updateModuleById);
router.delete('/module/:id', deleteModuleById);

// Access code validation route
router.post('/module/validate-access-code', validateAccessCode);

// File upload routes
router.post('/module/:id/upload', upload.single('file'), uploadFilesToModule);
router.delete('/module/file/:fileId', deleteUploadedFile);

export default router;
