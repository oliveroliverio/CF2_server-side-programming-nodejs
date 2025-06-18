const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport');

// Load environment variables
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable in production

/**
 * Generates a JWT token for a user
 * @param {Object} user - The user object to encode in the JWT
 * @returns {string} The JWT token
 */
const generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
}

module.exports = {
    generateJWTToken,
    jwtSecret
};
