const Response = require('../models/Response');


exports.Addresponse = async (req, res) => {
    // console.log("Here is ID", user)
    try {
        // console.log('req.body :>> ', req.body);
        console.log('req.session :>> ', req.session);
        const { survey_id, answers } = req.body;

        // Make sure req.session.user exists and has an id
        if (!req.session.user || !req.session.user.id) {
            return res.status(400).json({ message: "User not logged in" });
        }
        

        const formattedAnswers = Object.values(answers).map(answer => ({
            question_id: answer.question_id,
            answer_text: answer.answer_text
        }));
        
        const newResponse = new Response({
            survey_id,
            user_id: req.session.user.id || null,
            answers: formattedAnswers
        });

        await newResponse.save();
        res.redirect('/thankyou'); // Redirect to a thank-you page or display a success message
    } catch (error) {
        console.error("Error saving response:", error);
        res.status(500).send("Error saving response");
    }
};

exports.allresponse = async (req, res) => {
    const result = await Response.find();
    res.status(200).json(result);
}