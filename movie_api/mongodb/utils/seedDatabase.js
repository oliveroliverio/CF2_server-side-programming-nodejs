const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Movie = require('../models/Movie');
const User = require('../models/User');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URI || 'mongodb://localhost:27017/movieAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    seedDatabase();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Read JSON files
    const moviesPath = path.join(__dirname, '../../shared/data/movies.json');
    const usersPath = path.join(__dirname, '../../shared/data/users.json');

    const moviesData = JSON.parse(fs.readFileSync(moviesPath, 'utf8')).movies;
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8')).users;

    // Clear existing data
    await Movie.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Insert movies
    const insertedMovies = await Movie.insertMany(moviesData.map(movie => {
      // Remove the id field as MongoDB will create its own _id
      const { id, ...movieWithoutId } = movie;
      return movieWithoutId;
    }));

    console.log(`Inserted ${insertedMovies.length} movies`);

    // Create a map of movie titles to MongoDB ObjectIds
    const movieTitleToId = {};
    insertedMovies.forEach(movie => {
      movieTitleToId[movie.title] = movie._id;
    });

    // Insert users with references to movies
    const usersToInsert = usersData.map(user => {
      // Convert favorite movie titles to ObjectIds
      const favoriteMovieIds = user.favoriteMovies
        .map(title => movieTitleToId[title])
        .filter(id => id); // Filter out any undefined IDs

      return {
        ...user,
        favoriteMovies: favoriteMovieIds
      };
    });

    const insertedUsers = await User.insertMany(usersToInsert);
    console.log(`Inserted ${insertedUsers.length} users`);

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}
