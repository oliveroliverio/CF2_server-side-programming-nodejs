const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Read movies data
const moviesPath = path.join(__dirname, '../data/movies.json');
let moviesData = require('../data/movies.json');
let movies = moviesData.movies;

// Helper function to save movies data to file
const saveMovies = () => {
    fs.writeFileSync(moviesPath, JSON.stringify(moviesData, null, 2));
};

// Get all movies
router.get('/', (req, res) => {
    res.json(movies);
});

// Get movie by ID
router.get('/id/:id', (req, res) => {
    const movie = movies.find(movie => movie.id === req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.json(movie);
});

// Get movie by title
router.get('/title/:title', (req, res) => {
    const searchTitle = decodeURIComponent(req.params.title);
    console.log(`Searching for movie title: "${searchTitle}"`);

    const movie = movies.find(movie =>
        movie.title.toLowerCase() === searchTitle.toLowerCase());

    if (movie) {
        console.log(`Movie found: ${movie.title}`);
        res.json(movie);
    } else {
        console.log(`Movie not found`);
        return res.status(404).send('The movie with the given title was not found.');
    }
});

// Get movies by director
router.get('/director/:director', (req, res) => {
    const directorName = decodeURIComponent(req.params.director);
    const moviesByDirector = movies.filter(movie =>
        movie.director.name === directorName);

    if (moviesByDirector.length === 0) {
        return res.status(404).send('No movies found for the given director.');
    }

    res.json(moviesByDirector);
});

// Get movies by genre
router.get('/genre/:genre', (req, res) => {
    const genreName = decodeURIComponent(req.params.genre);
    const moviesByGenre = movies.filter(movie =>
        movie.genre.name.toLowerCase() === genreName.toLowerCase());

    if (moviesByGenre.length === 0) {
        return res.status(404).send('No movies found for the given genre.');
    }

    res.json(moviesByGenre);
});

// POST a new movie
router.post('/', (req, res) => {
    const newMovie = req.body;

    // Validate required fields
    if (!newMovie.title || !newMovie.description || !newMovie.genre || !newMovie.director) {
        return res.status(400).json({ error: 'Missing required movie information' });
    }

    // Check if movie with same title already exists
    const existingMovie = movies.find(movie =>
        movie.title.toLowerCase() === newMovie.title.toLowerCase());

    if (existingMovie) {
        return res.status(400).json({ error: 'Movie with this title already exists' });
    }

    // Generate a new ID (simple approach: max ID + 1)
    const maxId = Math.max(...movies.map(movie => parseInt(movie.id)));
    newMovie.id = (maxId + 1).toString();

    // Add default values if not provided
    newMovie.featured = newMovie.featured || false;
    newMovie.imageURL = newMovie.imageURL || `https://example.com/images/${newMovie.title.toLowerCase().replace(/ /g, '_')}.jpg`;

    // Add to movies array
    movies.push(newMovie);

    // Write updated data back to file
    saveMovies();

    res.status(201).json(newMovie);
});

// PUT (update) a movie by ID
router.put('/id/:id', (req, res) => {
    const movieId = req.params.id;
    const updatedMovie = req.body;

    // Find the movie index
    const movieIndex = movies.findIndex(movie => movie.id === movieId);

    // Check if movie exists
    if (movieIndex === -1) {
        return res.status(404).send('The movie with the given ID was not found.');
    }

    // Preserve the ID (don't allow changing it)
    updatedMovie.id = movieId;

    // Update the movie
    movies[movieIndex] = updatedMovie;

    // Write updated data back to file
    saveMovies();

    res.json(updatedMovie);
});

// DELETE a movie by ID
router.delete('/id/:id', (req, res) => {
    const movieId = req.params.id;

    // Find the movie index
    const movieIndex = movies.findIndex(movie => movie.id === movieId);

    // Check if movie exists
    if (movieIndex === -1) {
        return res.status(404).send('The movie with the given ID was not found.');
    }

    // Remove the movie
    const deletedMovie = movies[movieIndex];
    movies.splice(movieIndex, 1);

    // Write updated data back to file
    saveMovies();

    res.json(deletedMovie);
});

module.exports = router;