const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/User'); // Assuming you have the User model
//////////////////

// Route to count users with the role "user"
router.get('/api/user-count', async (req, res) => {
  try {
      const userCount = await User.countDocuments({ role: 'user' });
      res.json({ count: userCount });
  } catch (error) {
      console.error("Error fetching user count:", error);
      res.status(500).json({ message: "Error fetching user count" });
  }
});
////////////
// User Routes
router.get('/', userController.signIn); // route for handling signin
router.get('/signin', userController.signIn); // route for handling signin
router.post('/signin', userController.login); // route for handling signin

router.get('/signup', userController.signup); // route for handling signin
router.post('/signup', userController.register_user);

// router.get('/users', userController.createUser);

module.exports = router;
