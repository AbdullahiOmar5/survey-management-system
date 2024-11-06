const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Report Routes
router.post('/reports', reportController.createReport);
router.get('/reports', reportController.getReports);

module.exports = router;
