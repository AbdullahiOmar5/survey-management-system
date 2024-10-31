const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    survey_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    question_text: { type: String, required: true },
    type: { type: String, required: true },
    options: { type: [String] }
});

module.exports = mongoose.model('Question', questionSchema);
