const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Read users data
const usersPath = path.join(__dirname, '../data/users.json');
let usersData = require('../data/users.json');
let users = usersData.users;

// Helper function to save users data to file
const saveUsers = () => {
    fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2));
};

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

// Get user by username
router.get('/:username', (req, res) => {
    const user = users.find(user => user.username === req.params.username);
    if (!user) return res.status(404).send('The user with the given username was not found.');
    res.json(user);
});

// Get user's favorite movies
router.get('/:username/favorites', (req, res) => {
    const user = users.find(user => user.username === req.params.username);
    if (!user) return res.status(404).send('The user with the given username was not found.');
    res.json(user.favoriteMovies);
});

// POST a new user
router.post('/', (req, res) => {
    const newUser = req.body;

    // Validate required fields
    if (!newUser.username || !newUser.password || !newUser.email) {
        return res.status(400).json({ error: 'Missing required user information' });
    }

    // Check if username already exists
    if (users.find(user => user.username === newUser.username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    // Initialize favorite movies if not provided
    newUser.favoriteMovies = newUser.favoriteMovies || [];

    // Add to users array
    users.push(newUser);

    // Write updated data back to file
    saveUsers();

    // Return the new user without the password for security
    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
});

// PUT (update) a user by username
router.put('/:username', (req, res) => {
    const username = req.params.username;
    const updatedUser = req.body;

    // Find the user index
    const userIndex = users.findIndex(user => user.username === username);

    // Check if user exists
    if (userIndex === -1) {
        return res.status(404).send('The user with the given username was not found.');
    }

    // Preserve the username (don't allow changing it)
    updatedUser.username = username;

    // Update the user
    users[userIndex] = updatedUser;

    // Write updated data back to file
    saveUsers();

    // Return the updated user without the password
    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
});

// DELETE a user by username
router.delete('/:username', (req, res) => {
    const username = req.params.username;

    // Find the user index
    const userIndex = users.findIndex(user => user.username === username);

    // Check if user exists
    if (userIndex === -1) {
        return res.status(404).send('The user with the given username was not found.');
    }

    // Remove the user
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);

    // Write updated data back to file
    saveUsers();

    // Return the deleted user without the password
    const { password, ...userWithoutPassword } = deletedUser;
    res.json(userWithoutPassword);
});

// POST endpoint to add a movie to a user's favorites
router.post('/:username/favorites/:movieId', (req, res) => {
    const username = req.params.username;
    const movieId = req.params.movieId;

    // Find the user
    const userIndex = users.findIndex(user => user.username === username);

    // Check if user exists
    if (userIndex === -1) {
        return res.status(404).send('The user with the given username was not found.');
    }

    // Check if movie exists
    const moviesPath = path.join(__dirname, '../data/movies.json');
    const movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8')).movies;
    const movie = movies.find(movie => movie.id === movieId);

    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found.');
    }

    // Check if movie is already in favorites
    if (users[userIndex].favoriteMovies.includes(movie.title)) {
        return res.status(400).send('Movie is already in favorites.');
    }

    // Add movie to favorites
    users[userIndex].favoriteMovies.push(movie.title);

    // Write updated data back to file
    saveUsers();

    res.json(users[userIndex].favoriteMovies);
});

// DELETE endpoint to remove a movie from a user's favorites
router.delete('/:username/favorites/:movieTitle', (req, res) => {
    const username = req.params.username;
    const movieTitle = decodeURIComponent(req.params.movieTitle);

    // Find the user
    const userIndex = users.findIndex(user => user.username === username);

    // Check if user exists
    if (userIndex === -1) {
        return res.status(404).send('The user with the given username was not found.');
    }

    // Check if movie is in favorites
    const movieIndex = users[userIndex].favoriteMovies.indexOf(movieTitle);
    if (movieIndex === -1) {
        return res.status(400).send('Movie is not in favorites.');
    }

    // Remove movie from favorites
    users[userIndex].favoriteMovies.splice(movieIndex, 1);

    // Write updated data back to file
    saveUsers();

    res.json(users[userIndex].favoriteMovies);
});

module.exports = router;