const express = require('express');
const app = express();
// import movies data
const movies = require('./data/movies.json');



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

app.use(express.static('public'));

module.exports = app;