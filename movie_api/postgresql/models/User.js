const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Movie } = require('./Movie');
const bcrypt = require('bcrypt');

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 50]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  birthDate: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance method to validate password
User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Define FavoriteMovie join table for many-to-many relationship
const FavoriteMovie = sequelize.define('FavoriteMovie', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
}, {
  timestamps: true
});

// Define many-to-many relationship between User and Movie
User.belongsToMany(Movie, { through: FavoriteMovie, as: 'favoriteMovies' });
Movie.belongsToMany(User, { through: FavoriteMovie, as: 'favoritedBy' });

module.exports = { User, FavoriteMovie };
