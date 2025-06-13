const express = require('express');
const router = express.Router();
// import users data
const usersData = require('../data/users.json');
const users = usersData.users;

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

module.exports = router;