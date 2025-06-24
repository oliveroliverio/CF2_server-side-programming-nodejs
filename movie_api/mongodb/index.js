const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');


// Import route modules
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URI || 'mongodb://localhost:27017/movieAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Middleware
app.use(cors())
app.use(morgan('common'));
app.use(express.json());
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie API!');
});

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, '../shared/public/documentation.html'));
});

// Use route modules
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;