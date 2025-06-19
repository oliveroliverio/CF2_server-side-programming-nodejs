const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database connection configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'movieapi', 
  process.env.DB_USER || 'postgres', 
  process.env.DB_PASSWORD || 'postgres', 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
    return false;
  }
}

module.exports = { sequelize, testConnection };
