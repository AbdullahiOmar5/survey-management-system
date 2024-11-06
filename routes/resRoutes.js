const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

// routes/resRoutes.js

const Response = require('../models/Response'); // Adjust the path if necessary

// router.post('/new_response', async (req, res) => {
//   try {
//       const { survey_id, answers, user_id } = req.body;

//       // Format answers as an array of objects matching the schema
//       const formattedAnswers = Object.keys(answers).map(key => ({
//           question_id: answers[key].question_id,
//           answer_text: answers[key].answer_text
//       }));

//       // Create a new response document
//       const response = new Response({
//           survey_id,
//           user_id:  user_id, // Optional user ID
//           answers: formattedAnswers
//       });

//       // Save the response to the database
//       await response.save();

//       res.redirect('/thankyou'); // Redirect to a thank you page after submission
//   } catch (error) {
//       console.error('Error saving response:', error);
//       res.status(500).send('Failed to submit response.');
//   }
// });


// User Routes
console.log('hello :>> ');
router.get('/all', responseController.allresponse);
router.post('/new_response', responseController.Addresponse );

// router.get('/users', userController.createUser);

module.exports = router;
