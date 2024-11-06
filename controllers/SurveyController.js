const Survey = require('../models/Survey');
const Question = require('../models/Question');

// Create a new survey
exports.createSurvey = async (req, res) => {
    console.log(req);

    try {
        const survey = new Survey(req.body);
        survey.status = false;
        const savedSurvey = await survey.save();
        // res.redirect('/survey_management')
        res.status(201).json(savedSurvey);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addQuestoSurvey = async (req, res) => {
    console.log('req  new question::>> ', req.body);
    
    req.body.questions.forEach(async element => {
        console.log(element);
        try {
    //         survey_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    // question_text: { type: String, required: true },
    // type: { type: String, required: true },
    // options: { type: [String] }
            const questionData = {
                survey_id: req.body.surveyId,
                type: element.response_type,
                question_text: element.text,
                options: element.option
            };
            const question = new Question(questionData);
            const savedQuestion = await question.save();
            console.log('savedQuestion :>> ', savedQuestion);
            
        } catch (error) {
            console.log('error :>> ', error);
            // res.status(400).json(error)
        }
    });
    
}

// Get all surveys
exports.getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.status(200).json(surveys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a survey by ID
exports.getSurveyById = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) return res.status(404).json({ message: "Survey not found" });
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a survey
exports.updateSurvey = async (req, res) => {
    try {
        const updatedSurvey = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSurvey) return res.status(404).json({ message: "Survey not found" });
        res.status(200).json(updatedSurvey);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a survey
exports.deleteSurvey = async (req, res) => {
    try {
        const deletedSurvey = await Survey.findByIdAndDelete(req.params.id);
        if (!deletedSurvey) return res.status(404).json({ message: "Survey not found" });
        res.status(200).json({ message: "Survey deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
