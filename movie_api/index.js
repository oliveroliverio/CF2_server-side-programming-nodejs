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


app.use(express.static('public'));

module.exports = app;