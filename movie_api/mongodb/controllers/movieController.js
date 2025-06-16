const Movie = require('../models/Movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get movie by title
exports.getMovieByTitle = async (req, res) => {
  try {
    const title = decodeURIComponent(req.params.title);
    const movie = await Movie.findOne({ 
      title: new RegExp(`^${title}$`, 'i') 
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
    const movies = await Movie.find({ 'director.name': directorName });
    
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
    const movies = await Movie.find({ 
      'genre.name': new RegExp(`^${genreName}$`, 'i') 
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
    // Validate required fields
    if (!req.body.title || !req.body.description || !req.body.genre || !req.body.director) {
      return res.status(400).json({ error: 'Missing required movie information' });
    }

    // Check if movie with same title already exists
    const existingMovie = await Movie.findOne({ 
      title: new RegExp(`^${req.body.title}$`, 'i') 
    });

    if (existingMovie) {
      return res.status(400).json({ error: 'Movie with this title already exists' });
    }

    // Create new movie
    const movie = new Movie({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      director: req.body.director,
      imageURL: req.body.imageURL || `https://example.com/images/${req.body.title.toLowerCase().replace(/ /g, '_')}.jpg`,
      featured: req.body.featured || false
    });

    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(updatedMovie);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
    
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(deletedMovie);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
