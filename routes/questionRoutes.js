const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route for creating questions
router.post('/', questionController.createQuestions);

// Route for getting questions by survey ID
router.get('/:survey_id', questionController.getQuestionsBySurveyId);

module.exports = router;
