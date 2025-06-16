const { User } = require('../models/User');
const { Movie } = require('../models/Movie');
const { Op } = require('sequelize');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      },
      attributes: { exclude: ['password'] }
    });
    
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
    const user = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [{
        model: Movie,
        as: 'favoriteMovies',
        through: { attributes: [] } // Don't include join table data
      }],
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user.favoriteMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, birthDate } = req.body;
    
    // Validate required fields
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create user
    const user = await User.create({
      username,
      password, // Will be hashed by the model hooks
      email,
      birthDate: birthDate || null
    });
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      if (err.errors[0].path === 'username') {
        return res.status(400).json({ error: 'Username already exists' });
      } else if (err.errors[0].path === 'email') {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { username, password, email, birthDate } = req.body;
    
    // Find user by username
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update user fields
    if (username) user.username = username;
    if (password) user.password = password; // Will be hashed by the model hooks
    if (email) user.email = email;
    if (birthDate !== undefined) user.birthDate = birthDate;
    
    // Save changes
    await user.save();
    
    // Return updated user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      if (err.errors[0].path === 'username') {
        return res.status(400).json({ error: 'Username already exists' });
      } else if (err.errors[0].path === 'email') {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await user.destroy();
    res.status(200).json({ message: `User ${user.email} has been removed` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a movie to user's favorites
exports.addFavoriteMovie = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const movie = await Movie.findByPk(req.params.movieId);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    // Check if movie is already in favorites
    const favorites = await user.getFavoriteMovies({
      where: {
        id: movie.id
      }
    });
    
    if (favorites.length > 0) {
      return res.status(400).json({ error: 'Movie already in favorites' });
    }
    
    // Add movie to favorites
    await user.addFavoriteMovie(movie);
    
    res.status(200).json({ message: `Movie ${movie.title} has been added to favorites` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a movie from user's favorites
exports.removeFavoriteMovie = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const movie = await Movie.findByPk(req.params.movieId);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    // Check if movie is in favorites
    const favorites = await user.getFavoriteMovies({
      where: {
        id: movie.id
      }
    });
    
    if (favorites.length === 0) {
      return res.status(400).json({ error: 'Movie not in favorites' });
    }
    
    // Remove movie from favorites
    await user.removeFavoriteMovie(movie);
    
    res.status(200).json({ message: `Movie ${movie.title} has been removed from favorites` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
