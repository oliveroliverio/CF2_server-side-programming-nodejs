const { Movie, Genre, Director } = require('../models/Movie');
const { Op } = require('sequelize');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        { model: Genre, attributes: ['name', 'description'] },
        { model: Director, attributes: ['name', 'bio', 'birthYear', 'deathYear'] }
      ]
    });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [
        { model: Genre, attributes: ['name', 'description'] },
        { model: Director, attributes: ['name', 'bio', 'birthYear', 'deathYear'] }
      ]
    });
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get movie by title
exports.getMovieByTitle = async (req, res) => {
  try {
    const title = decodeURIComponent(req.params.title);
    const movie = await Movie.findOne({
      where: {
        title: {
          [Op.iLike]: title // Case-insensitive search
        }
      },
      include: [
        { model: Genre, attributes: ['name', 'description'] },
        { model: Director, attributes: ['name', 'bio', 'birthYear', 'deathYear'] }
      ]
    });
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get movies by director name
exports.getMoviesByDirector = async (req, res) => {
  try {
    const directorName = decodeURIComponent(req.params.director);
    
    const director = await Director.findOne({
      where: {
        name: {
          [Op.iLike]: directorName
        }
      }
    });
    
    if (!director) {
      return res.status(404).json({ error: 'Director not found' });
    }
    
    const movies = await Movie.findAll({
      where: {
        DirectorId: director.id
      },
      include: [
        { model: Genre, attributes: ['name', 'description'] },
        { model: Director, attributes: ['name', 'bio', 'birthYear', 'deathYear'] }
      ]
    });
    
    if (movies.length === 0) {
      return res.status(404).json({ error: 'No movies found for this director' });
    }
    
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get movies by genre name
exports.getMoviesByGenre = async (req, res) => {
  try {
    const genreName = decodeURIComponent(req.params.genre);
    
    const genre = await Genre.findOne({
      where: {
        name: {
          [Op.iLike]: genreName
        }
      }
    });
    
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    
    const movies = await Movie.findAll({
      where: {
        GenreId: genre.id
      },
      include: [
        { model: Genre, attributes: ['name', 'description'] },
        { model: Director, attributes: ['name', 'bio', 'birthYear', 'deathYear'] }
      ]
    });
    
    if (movies.length === 0) {
      return res.status(404).json({ error: 'No movies found for this genre' });
    }
    
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const { title, description, genreName, genreDescription, directorName, directorBio, directorBirthYear, directorDeathYear, imageURL, featured } = req.body;
    
    if (!title || !description || !genreName || !directorName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Find or create genre
    const [genre] = await Genre.findOrCreate({
      where: { name: genreName },
      defaults: {
        description: genreDescription || `Description for ${genreName}`
      }
    });
    
    // Find or create director
    const [director] = await Director.findOrCreate({
      where: { name: directorName },
      defaults: {
        bio: directorBio || `Bio for ${directorName}`,
        birthYear: directorBirthYear || null,
        deathYear: directorDeathYear || null
      }
    });
    
    // Create movie
    const movie = await Movie.create({
      title,
      description,
      imageURL: imageURL || null,
      featured: featured || false,
      GenreId: genre.id,
      DirectorId: director.id
    });
    
    // Return the created movie with genre and director
    const createdMovie = await Movie.findByPk(movie.id, {
      include: [
        { model: Genre, attributes: ['name', 'description'] },
        { model: Director, attributes: ['name', 'bio', 'birthYear', 'deathYear'] }
      ]
    });
    
    res.status(201).json(createdMovie);
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Movie with this title already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const { title, description, genreName, genreDescription, directorName, directorBio, directorBirthYear, directorDeathYear, imageURL, featured } = req.body;
    
    // Find movie by ID
    const movie = await Movie.findByPk(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    // Update genre if provided
    if (genreName) {
      const [genre] = await Genre.findOrCreate({
        where: { name: genreName },
        defaults: {
          description: genreDescription || `Description for ${genreName}`
        }
      });
      movie.GenreId = genre.id;
    }
    
    // Update director if provided
    if (directorName) {
      const [director] = await Director.findOrCreate({
        where: { name: directorName },
        defaults: {
          bio: directorBio || `Bio for ${directorName}`,
          birthYear: directorBirthYear || null,
          deathYear: directorDeathYear || null
        }
      });
      movie.DirectorId = director.id;
    }
    
    // Update movie fields
    if (title) movie.title = title;
    if (description) movie.description = description;
    if (imageURL !== undefined) movie.imageURL = imageURL;
    if (featured !== undefined) movie.featured = featured;
    
    // Save changes
    await movie.save();
    
    // Return updated movie with genre and director
    const updatedMovie = await Movie.findByPk(movie.id, {
      include: [
        { model: Genre, attributes: ['name', 'description'] },
        { model: Director, attributes: ['name', 'bio', 'birthYear', 'deathYear'] }
      ]
    });
    
    res.json(updatedMovie);
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Movie with this title already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    await movie.destroy();
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
