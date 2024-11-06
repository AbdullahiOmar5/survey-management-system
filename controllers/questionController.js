const Question = require('../models/Question'); // Hubi dariiqa saxan ee Question model

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const { survey_id, question_text, type, options } = req.body;
        const question = new Question({ survey_id, question_text, type, options });
        await question.save();
        res.status(201).json({ message: 'Question created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all questions for a specific survey
exports.getQuestionsBySurveyId = async (req, res) => {
    try {
        const questions = await Question.find({ survey_id: req.params.survey_id });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
