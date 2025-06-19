const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define Movie model
const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageURL: {
    type: DataTypes.STRING
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// Define Genre model
const Genre = sequelize.define('Genre', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
});

// Define Director model
const Director = sequelize.define('Director', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  bio: {
    type: DataTypes.TEXT
  },
  birthYear: {
    type: DataTypes.INTEGER
  },
  deathYear: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: true
});

// Define relationships
Movie.belongsTo(Genre);
Genre.hasMany(Movie);

Movie.belongsTo(Director);
Director.hasMany(Movie);

module.exports = { Movie, Genre, Director };
