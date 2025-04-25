const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const { check } = require('express-validator');

// 👤 Signup route with validation
router.post('/signup', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty()
], authController.signup);

// 🔐 Login
router.post('/login', authController.login);

// 🌐 Google OAuth Entry Point
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// ✅ Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  authController.googleCallback
);

// 🧑‍🎓 Get current user details using JWT
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  authController.getMe
);

module.exports = router;
