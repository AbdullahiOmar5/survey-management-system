const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    survey_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    response_summary: { type: Array }, // Array or JSON as needed
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    summary_id: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Report', reportSchema);
