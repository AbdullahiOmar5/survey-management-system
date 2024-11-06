const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    survey_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submitted_at: { type: Date, default: Date.now },
    answers: [
        {
            question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            answer_text: { type: String }
        }
    ]
});

module.exports = mongoose.model('Response', responseSchema);
