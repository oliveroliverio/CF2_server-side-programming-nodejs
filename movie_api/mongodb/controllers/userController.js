const User = require('../models/User');
const Movie = require('../models/Movie');
const passport = require('passport');
const { generateJWTToken } = require('../auth');
const { body, validationResult } = require('express-validator');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user's favorite movies
exports.getFavoriteMovies = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate('favoriteMovies')
      .select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.favoriteMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Validation middleware
exports.validateUser = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must contain a special character'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({ error: 'Missing required user information' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user
    const user = new User({
      username: req.body.username,
      password: req.body.password, // Will be hashed by pre-save hook
      email: req.body.email,
      birthDate: req.body.birthDate,
      favoriteMovies: []
    });

    const newUser = await user.save();

    // Return user without password
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      birthDate: newUser.birthDate,
      favoriteMovies: newUser.favoriteMovies
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    // Don't allow username changes
    if (req.body.username && req.body.username !== req.params.username) {
      return res.status(400).json({ error: 'Username cannot be changed' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndRemove({ username: req.params.username })
      .select('-password');

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a movie to user's favorites
exports.addFavoriteMovie = async (req, res) => {
  try {
    // Find the movie
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Find the user and check if movie is already in favorites
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if movie is already in favorites
    if (user.favoriteMovies.includes(movie._id)) {
      return res.status(400).json({ error: 'Movie is already in favorites' });
    }

    // Add movie to favorites
    user.favoriteMovies.push(movie._id);
    await user.save();

    // Return updated favorites list
    const updatedUser = await User.findOne({ username: req.params.username })
      .populate('favoriteMovies')
      .select('-password');

    res.json(updatedUser.favoriteMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a movie from user's favorites
exports.removeFavoriteMovie = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if movie is in favorites
    const movieIndex = user.favoriteMovies.indexOf(req.params.movieId);
    if (movieIndex === -1) {
      return res.status(400).json({ error: 'Movie is not in favorites' });
    }

    // Remove movie from favorites
    user.favoriteMovies.splice(movieIndex, 1);
    await user.save();

    // Return updated favorites list
    const updatedUser = await User.findOne({ username: req.params.username })
      .populate('favoriteMovies')
      .select('-password');

    res.json(updatedUser.favoriteMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login user
exports.login = (req, res) => {
  console.log('Login attempt with:', req.body);
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        message: 'Error during authentication',
        error: error.message
      });
    }

    if (!user) {
      console.log('Authentication failed:', info?.message);
      return res.status(401).json({
        message: info?.message || 'Authentication failed'
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        console.error('Login session error:', error);
        return res.status(500).json({
          message: 'Error logging in',
          error: error.message
        });
      }
      const token = generateJWTToken(user.toJSON());
      return res.json({
        user: {
          username: user.username,
          email: user.email,
          _id: user._id
        },
        token
      });
    });
  })(req, res);
};
