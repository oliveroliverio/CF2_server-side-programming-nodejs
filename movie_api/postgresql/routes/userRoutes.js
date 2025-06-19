const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Get user by username
router.get('/:username', userController.getUserByUsername);

// Get user's favorite movies
router.get('/:username/favorites', userController.getFavoriteMovies);

// Create a new user
router.post('/', userController.createUser);

// Update a user
router.put('/:username', userController.updateUser);

// Delete a user
router.delete('/:username', userController.deleteUser);

// Add a movie to user's favorites
router.post('/:username/favorites/:movieId', userController.addFavoriteMovie);

// Remove a movie from user's favorites
router.delete('/:username/favorites/:movieId', userController.removeFavoriteMovie);

module.exports = router;
