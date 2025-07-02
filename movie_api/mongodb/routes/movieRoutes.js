const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const passport = require('passport');

// Public route - Get all movies (no authentication required)
router.get('/', movieController.getAllMovies);

// Public route - Get movie by title (no authentication required)
router.get('/title/:title', movieController.getMovieByTitle);

// All routes below this require authentication
const auth = passport.authenticate('jwt', { session: false });

// Get movie by ID
router.get('/id/:id', auth, movieController.getMovieById);

// Get movies by director
router.get('/director/:director', auth, movieController.getMoviesByDirector);

// Get movies by genre
router.get('/genre/:genre', auth, movieController.getMoviesByGenre);

// Create a new movie
router.post('/', auth, movieController.createMovie);

// Update a movie
router.put('/id/:id', auth, movieController.updateMovie);

// Delete a movie
router.delete('/id/:id', auth, movieController.deleteMovie);

module.exports = router;