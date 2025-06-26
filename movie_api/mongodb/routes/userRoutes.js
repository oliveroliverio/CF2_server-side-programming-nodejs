const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

// Public routes (no authentication required)
router.post('/', userController.validateUser, userController.createUser); // Registration endpoint
router.post('/login', userController.login);  // Login endpoint

// Protected routes (authentication required)
// Get all users
router.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers);

// Get user by username
router.get('/:username', passport.authenticate('jwt', { session: false }), userController.getUserByUsername);

// Get user's favorite movies
router.get('/:username/favorites', passport.authenticate('jwt', { session: false }), userController.getFavoriteMovies);

// Update a user
router.put('/:username', passport.authenticate('jwt', { session: false }), userController.updateUser);

// Delete a user
router.delete('/:username', passport.authenticate('jwt', { session: false }), userController.deleteUser);

// Add a movie to user's favorites
router.post('/:username/favorites/:movieId', passport.authenticate('jwt', { session: false }), userController.addFavoriteMovie);

// Remove a movie from user's favorites
router.delete('/:username/favorites/:movieId', passport.authenticate('jwt', { session: false }), userController.removeFavoriteMovie);

module.exports = router;