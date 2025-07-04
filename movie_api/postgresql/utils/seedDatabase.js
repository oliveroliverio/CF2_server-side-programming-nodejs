const fs = require('fs');
const path = require('path');

// Set environment variable for database name to ensure lowercase
process.env.DB_NAME = 'movieapi';

const { sequelize } = require('../config/database');
const { Movie, Genre, Director } = require('../models/Movie');
const { User } = require('../models/User');

// Read JSON data files
const readJsonFile = (filename) => {
  try {
    const filePath = path.join(__dirname, '../../shared/data', filename);
    console.log(`Attempting to read file: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File does not exist: ${filePath}`);
      return [];
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(`Successfully read ${filename}, found ${Array.isArray(parsedData) ? parsedData.length : 'non-array'} items`);
    return parsedData;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Seed the database
async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Sync database models with { force: true } to drop existing tables
    await sequelize.sync({ force: true });
    console.log('Database synchronized - existing tables dropped');
    
    // Read data from JSON files
    let rawMoviesData = readJsonFile('movies.json');
    let rawUsersData = readJsonFile('users.json');
    
    // Extract arrays from nested structure if needed
    const moviesData = rawMoviesData.movies || rawMoviesData;
    const usersData = rawUsersData.users || rawUsersData;
    
    // Verify data was loaded correctly
    if (!moviesData || !Array.isArray(moviesData) || moviesData.length === 0) {
      console.error('No movies data found or data is not an array');
      console.log('Movies data structure:', typeof rawMoviesData);
      return;
    }
    
    if (!usersData || !Array.isArray(usersData) || usersData.length === 0) {
      console.error('No users data found or data is not an array');
      console.log('Users data structure:', typeof rawUsersData);
      // Continue with movies only if users data is missing
    }
    
    console.log(`Loaded ${moviesData.length} movies and ${usersData ? usersData.length : 0} users`);
    console.log('First movie:', JSON.stringify(moviesData[0], null, 2));
    
    // Create genres and directors first
    const genreMap = new Map();
    const directorMap = new Map();
    
    console.log('Creating genres and directors...');
    for (const movieData of moviesData) {
      // Create genre if it doesn't exist
      if (movieData.genre && !genreMap.has(movieData.genre.name)) {
        const genre = await Genre.create({
          name: movieData.genre.name,
          description: movieData.genre.description || `Description for ${movieData.genre.name}`
        });
        genreMap.set(movieData.genre.name, genre);
      }
      
      // Create director if it doesn't exist
      if (movieData.director && !directorMap.has(movieData.director.name)) {
        const director = await Director.create({
          name: movieData.director.name,
          bio: movieData.director.bio || `Bio for ${movieData.director.name}`,
          birthYear: movieData.director.birth || null,
          deathYear: movieData.director.death || null
        });
        directorMap.set(movieData.director.name, director);
      }
    }
    
    console.log('Creating movies...');
    const movieMap = new Map();
    for (const movieData of moviesData) {
      const genre = genreMap.get(movieData.genre.name);
      const director = directorMap.get(movieData.director.name);
      
      const movie = await Movie.create({
        title: movieData.title,
        description: movieData.description,
        imageURL: movieData.imageURL || null,
        featured: movieData.featured || false,
        GenreId: genre.id,
        DirectorId: director.id
      });
      
      movieMap.set(movieData.title, movie);
    }
    
    console.log('Creating users...');
    for (const userData of usersData) {
      const user = await User.create({
        username: userData.username,
        password: userData.password, // Will be hashed by the model hooks
        email: userData.email,
        birthDate: userData.birthDate || null
      });
      
      // Add favorite movies
      if (userData.favoriteMovies && userData.favoriteMovies.length > 0) {
        for (const movieTitle of userData.favoriteMovies) {
          const movie = movieMap.get(movieTitle);
          if (movie) {
            await user.addFavoriteMovie(movie);
          }
        }
      }
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    // await sequelize.close();
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase().then(() => {
    console.log('Seed script execution completed');
    process.exit(0);
  }).catch(error => {
    console.error('Seed script failed:', error);
    process.exit(1);
  });
}

module.exports = { seedDatabase };
