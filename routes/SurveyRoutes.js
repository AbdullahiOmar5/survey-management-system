const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey'); // Hubi inaad meesha saxda ah ku tilmaanto Survey model-kaaga
const SurveyController = require('../controllers/SurveyController');

// API si loo helo tirada sahannada iyo jawaabaha
router.get('/survey-stats', async (req, res) => {
    try {
        const totalSurveys = await Survey.countDocuments();
        const totalResponses = await Survey.aggregate([
            { $group: { _id: null, total: { $sum: "$responses" } } }
        ]);
        const completionRate = totalSurveys > 0 ? (totalResponses[0].total / totalSurveys) * 100 : 0;

        res.json({
            totalSurveys,
            totalResponses: totalResponses[0] ? totalResponses[0].total : 0,
            completionRate: completionRate.toFixed(2)
        });
    } catch (error) {
        console.error("Khalad ayaa dhacay helista xogta:", error);
        res.status(500).json({ message: "Khalad ayaa dhacay helista xogta." });
    }
});

// DELETE route to delete a survey by ID
router.delete('/survey/:id', async (req, res) => {
    try {
        const surveyId = req.params.id;
        
        // Find and delete the survey by ID
        const result = await Survey.findByIdAndDelete(surveyId);

        if (result) {
            res.status(200).json({ message: 'Survey deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Survey not found.' });
        }
    } catch (error) {
        console.error("Error deleting survey:", error);
        res.status(500).json({ message: 'An error occurred while deleting the survey.' });
    }
});

// Create a new survey
router.post('/survey/newsurvey', SurveyController.createSurvey);

// Add question to survey
router.post('/survey/addsurveyques', SurveyController.addQuestoSurvey);

// Get all surveys with sorting and search functionality
router.get('/surveys', async (req, res) => {
    try {
        const sortBy = req.query.sort === 'created-date' ? { created_at: -1 } : { title: 1 }; // Kala saar taariikhda ama magaca
        const searchTerm = req.query.search || ""; // Raadinta magaca sahanka
        const surveys = await Survey.find({
            title: { $regex: searchTerm, $options: "i" } // Raadinta iyadoo aan case-sensitive ahayn
        }).sort(sortBy);
        res.json(surveys); // Sahannada u dir sidii JSON
    } catch (error) {
        console.error("Khalad ayaa ka dhacay helista sahannada:", error);
        res.status(500).json({ message: 'Khalad ayaa ka dhacay helista sahannada' });
    }
});

// Get all surveys using SurveyController
router.get('/survey', SurveyController.getSurveys);

// Get a survey by ID
router.get('/survey/:id', SurveyController.getSurveyById);

// Update a survey
router.put('/survey/:id', SurveyController.updateSurvey);

// Delete a survey
router.delete('/survey/:id', SurveyController.deleteSurvey);

module.exports = router;
