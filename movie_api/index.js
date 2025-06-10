const express = require('express');
const app = express();

let topMovies = [
    {
        id: 1,
        title: "Inception",
        director: "Christopher Nolan"
    },
    {
        id: 2,
        title: "The Shawshank Redemption",
        director: "Frank Darabont"
    }
];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my movie API!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});


module.exports = app;