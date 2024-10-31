const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Routes
router.get('/', userController.signIn); // route for handling signin
router.get('/signin', userController.signIn); // route for handling signin
router.post('/signin', userController.login); // route for handling signin

router.get('/signup', userController.signup); // route for handling signin
router.post('/signup', userController.register_user);

// router.get('/users', userController.createUser);

module.exports = router;
