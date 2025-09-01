import express from 'express';
const router = express.Router();
import { createPartner, getAllPartners } from '../controller/partnerController.js';

router.post('/partner', createPartner);
router.get('/partners', getAllPartners);

export default router;