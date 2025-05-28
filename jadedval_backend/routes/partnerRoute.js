const express = require('express');
const router = express.Router();
const { createPartner, getAllPartners } = require('../controller/partnerController.js');

router.post('/partner', createPartner);
router.get('/partners', getAllPartners);

module.exports = router;