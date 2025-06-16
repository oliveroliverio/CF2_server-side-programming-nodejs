const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Get all movies
router.get('/', movieController.getAllMovies);

// Get movie by ID
router.get('/id/:id', movieController.getMovieById);

// Get movie by title
router.get('/title/:title', movieController.getMovieByTitle);

// Get movies by director
router.get('/director/:director', movieController.getMoviesByDirector);

// Get movies by genre
router.get('/genre/:genre', movieController.getMoviesByGenre);

// Create a new movie
router.post('/', movieController.createMovie);

// Update a movie
router.put('/id/:id', movieController.updateMovie);

// Delete a movie
router.delete('/id/:id', movieController.deleteMovie);

module.exports = router;