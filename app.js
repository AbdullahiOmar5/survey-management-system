const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const surveyRoutes = require('./Routes/SurveyRoutes');
const responseRoutes = require('./routes/resRoutes'); // Hubi inaad ku darto
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const Survey = require('./models/Survey');
const Question = require('./models/Question'); // Ensure the Survey model is imported
const Response = require('./models/Response'); // Your Response model
const app = express();





// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// middleware
app.use(cookieParser());

app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 15 * 60 * 1000    // Session expires after 15 minutes of inactivity
    }
  })
);



// View engine setup
app.set('view engine', 'ejs');           // Set view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Set views folder

//////////////////////////////////////////////////////////////////
// Authentication middleware for protected routes
exports.checkAuth = (requiredRole) => {
  return (req, res, next) => {
      // Check if user is logged in
      if (!req.session.user) {
          // If not logged in, delete the session and redirect to login
          req.session.destroy(err => {
              if (err) {
                  console.error("Session deletion error:", err);
                  return res.status(500).send("Server error");
              }
              return res.redirect(`/signin`);
          });
      } else if (requiredRole && req.session.user.role !== requiredRole) {
          // If user doesn't have the required role, delete session and redirect
          req.session.destroy(err => {
              if (err) {
                  console.error("Session deletion error:", err);
                  return res.status(500).send("Server error");
              }
              return res.redirect(`/signin`);
          });
      } else {
          // Log the user ID for tracking purposes (optional)
          console.log("User ID accessing route:", req.session.user.id);
          

          
          // User is authenticated and authorized, proceed to the next middleware or route handler
          next();
      }
  };
};
//////////////////////////////////////////////////////////////////

// Route for dashboard
app.get('/dashboard', this.checkAuth("admin"), async (req, res) => {
    try {
        const surveys = await Survey.find(); // Fetch all surveys from the database
        res.render('dashboard', { surveys }); // Pass surveys to the dashboard view
    } catch (error) {
        console.error("Error fetching surveys:", error);
        res.status(500).send("Error fetching surveys");
    }
});

app.get('/thankyou', async (req, res) => {
  res.render('thankyou')
})

// Route for user page
app.get('/user', this.checkAuth("user"), (req, res) => {
  res.render('user');
});

// Route for survey management
app.get('/survey_management', this.checkAuth("admin"), (req, res) => {
  res.render('survey_management');
});

// Route for response analysis
app.get('/response_analysis', this.checkAuth("admin"), (req, res) => {
  res.render('response_analysis');
});

// Route for forget password
app.get('/forgetpassword', (req, res) => {
  res.render('forgetpassword');
});

// Route to display a specific survey by ID
app.get('/survey/:id', async (req, res) => {
  try {
      const surveyId = req.params.id;

      // Get the Survey and it Question
      const survey = await Survey.findOne({_id:surveyId});
      const question = await Question.find({survey_id: survey._id});
      
      console.log('survey :>> ', survey);
      console.log('question :>> ', question);
      if (survey) {
          // Render the survey.ejs file, passing the survey data
          res.render('surveydetail', { survey , question});
      } else {
          res.status(404).send("Survey not found");
      }
  } catch (error) {
      console.error("Error fetching survey:", error);
      res.status(500).send("Error fetching survey");
  }
});

/////////////////////////////////////////////////////////////////////////////////
 // Your Survey model


app.get('/api/survey-stats', async (req, res) => {
    try {
        // Count the total surveys in the Survey collection
        const totalSurveys = await Survey.countDocuments();
        
        // Count the total responses in the Response collection
        const totalResponses = await Response.countDocuments();
        
        // Send both counts in the response
        res.json({
            totalSurveys: totalSurveys,
            totalResponses: totalResponses,
             // Avoid division by zero
        });
    } catch (error) {
        console.error('Error fetching survey stats:', error);
        res.status(500).json({ message: 'Error fetching survey stats' });
    }
});
/////////////////////////////////////////////////////////////////////////////////
// Route to display a specific survey's title and description by ID
app.get('/survey-description/:id', async (req, res) => {
  const surveyId = req.params.id;
  try {
      // Fetch the survey by ID
      const survey = await Survey.findById(surveyId);
      if (!survey) {
          return res.status(404).send("Survey not found");
      }

      // Fetch questions related to the survey
      const questions = await Question.find({ survey_id: surveyId }).lean();

      // Fetch responses related to the survey
      const responses = await Response.find({ survey_id: surveyId })
          .populate({
              path: 'user_id',
              model: 'User',
              select: 'name username' // Select only the name and username fields
          })
          .lean();

      // Map each question's _id to its question_text for easy access
      const questionMap = questions.reduce((map, question) => {
          map[question._id.toString()] = question.question_text;
          return map;
      }, {});

      // Add question_text to each answer in responses
      responses.forEach(response => {
          response.answers.forEach(answer => {
              answer.question_text = questionMap[answer.question_id.toString()];
          });
      });

      // Render the surveydetail view with survey, questions, and user responses
      res.render('surveyReport', { survey, questions, responses });
  } catch (error) {
      console.error("Error fetching survey details:", error);
      res.status(500).send("Server error");
  }
});

// delete survey
// DELETE route to delete a survey by ID








// User routes
app.use('/', userRoutes);

app.use('/ress', responseRoutes); // Ensure the '/ress' path is used, as specified in your form action

// Survey Routes
app.use('/api', surveyRoutes); // Here we use `surveyRoutes` to handle API routes





// Password reset route
app.post('/reset-password', async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Server listen
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

