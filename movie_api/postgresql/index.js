const express = require('express');
const morgan = require('morgan');
const { sequelize, testConnection } = require('./config/database');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use(express.static('public'));

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API (PostgreSQL version)');
});

// Documentation route
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Import routes
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Database connection and synchronization
async function initializeApp() {
  try {
    const connected = await testConnection();
    if (connected) {
      // Sync database models (in development, you might want to use { force: true } to recreate tables)
      await sequelize.sync();
      console.log('Database synchronized successfully');
    }
  } catch (error) {
    console.error('Failed to initialize the database:', error);
  }
}

// Initialize the application
initializeApp();

// Export the app for server.js
module.exports = app;
