const express = require('express');
const app = express();

// Import route modules
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

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

app.use(express.static('public'));

module.exports = app;