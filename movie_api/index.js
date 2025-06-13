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

// Get all movies
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
    console.log(`Searching for movie title: "${searchTitle}"`); // Debug log
    
    // Case-insensitive search for better user experience
    const movie = movies.find(movie => 
        movie.title.toLowerCase() === searchTitle.toLowerCase());
    
    if (movie) {
        console.log('Movie found:', movie.title); // Debug log
        res.json(movie);
    } else {
        console.log('Movie not found'); // Debug log
        return res.status(404).send('The movie with the given title was not found.');
    }
});

// Get movie director
app.get('/movies/director/:director', (req, res) => {
    const director = req.params.director;
    const moviesByDirector = movies.filter(movie => movie.director.name === director);
    if (moviesByDirector.length === 0) return res.status(404).send('No movies found for the given director.');
    res.json(moviesByDirector);
})

app.use(express.static('public'));

module.exports = app;