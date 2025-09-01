import express from 'express';
const router = express.Router();
import { 
    createModule,
    getAllModules,
    getModuleById,
    updateModuleById,
    deleteModuleById,
    validateAccessCode
} from '../controller/moduleController.js';



// Student profile routes
router.get('/module', getAllModules);
router.get('/module/:id', getModuleById);
router.post('/module', createModule);
router.put('/module/:id', updateModuleById);
router.delete('/module/:id', deleteModuleById);

// Access code validation route
router.post('/module/validate-access-code', validateAccessCode);

export default router;
