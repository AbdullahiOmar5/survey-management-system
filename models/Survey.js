const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    isAnonymous: { type: Boolean, default: false },
    deadline: { type: Date },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Survey', surveySchema);
