const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

// Import route modules
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(morgan('common'));
app.use(express.json());
app.use(express.json()); // Added this line
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my movie API!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

// Use route modules
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

module.exports = app;