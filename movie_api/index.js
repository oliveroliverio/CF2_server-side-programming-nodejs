const express = require('express');
const app = express();
// import movies data
const moviesData = require('./data/movies.json');
const movies = moviesData.movies;



// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my movie API!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(movies);
});

// Get movie by ID - using a specific path to avoid conflict with title search
app.get('/movies/id/:id', (req, res) => {
    const movie = movies.find(movie => movie.id === req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.json(movie);
});

// Get movie by title
app.get('/movies/title/:title', (req, res) => {
    // Decode the URL parameter to handle spaces properly
    const searchTitle = decodeURIComponent(req.params.title);
    
    // Case-insensitive search for better user experience
    const movie = movies.find(movie => 
        movie.title.toLowerCase() === searchTitle.toLowerCase());
        
    if (!movie) return res.status(404).send('The movie with the given title was not found.');
    res.json(movie);
})

app.use(express.static('public'));

module.exports = app;