const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String
});

const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  birthYear: Number,
  deathYear: Number
});

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: GenreSchema,
  director: DirectorSchema,
  imageURL: String,
  featured: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Movie', MovieSchema);
