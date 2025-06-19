/**
 * Script to update director birth and death years in the PostgreSQL database
 */
const fs = require('fs');
const path = require('path');

// Set environment variable for database name to ensure lowercase
process.env.DB_NAME = 'movieapi';

const { sequelize } = require('../config/database');
const { Director } = require('../models/Movie');

// Director data with birth and death years
const directorData = [
  { name: "Wes Anderson", birthYear: 1969, deathYear: null, bio: "American filmmaker known for his distinctive visual and narrative style" },
  { name: "Bong Joon-ho", birthYear: 1969, deathYear: null, bio: "South Korean filmmaker known for genre-blending and social commentary" },
  { name: "Damien Chazelle", birthYear: 1985, deathYear: null, bio: "American filmmaker known for music-focused films" },
  { name: "Hayao Miyazaki", birthYear: 1941, deathYear: null, bio: "Japanese animator, filmmaker, and manga artist" },
  { name: "Jordan Peele", birthYear: 1979, deathYear: null, bio: "American filmmaker and actor known for horror films with social commentary" },
  { name: "Christopher Nolan", birthYear: 1970, deathYear: null, bio: "British-American filmmaker known for nonlinear storytelling and practical effects" },
  { name: "Jean-Pierre Jeunet", birthYear: 1953, deathYear: null, bio: "French filmmaker known for whimsical and surreal films" },
  { name: "Rian Johnson", birthYear: 1973, deathYear: null, bio: "American filmmaker known for subverting genre expectations" },
  { name: "Doug Liman", birthYear: 1965, deathYear: null, bio: "American filmmaker known for action films with character-driven narratives" },
  { name: "Barry Jenkins", birthYear: 1979, deathYear: null, bio: "American filmmaker known for intimate character studies" },
  { name: "Denis Villeneuve", birthYear: 1967, deathYear: null, bio: "Canadian filmmaker known for visually striking and cerebral films" }
];

/**
 * Update director information in the database
 */
async function updateDirectors() {
  try {
    console.log('Starting director updates...');

    // Make sure we have a connection to the database
    await sequelize.authenticate();
    console.log('Database connection established');

    let updatedCount = 0;
    let errorCount = 0;

    // Update each director
    for (const director of directorData) {
      try {
        // Find the director by name
        const [rowsUpdated] = await Director.update(
          {
            birthYear: director.birthYear,
            deathYear: director.deathYear,
            bio: director.bio
          },
          { where: { name: director.name } }
        );

        if (rowsUpdated > 0) {
          console.log(`Updated director: ${director.name}`);
          updatedCount++;
        } else {
          console.log(`Director not found: ${director.name}`);
        }
      } catch (error) {
        console.error(`Error updating director ${director.name}:`, error);
        errorCount++;
      }
    }

    console.log(`\nUpdate summary:`);
    console.log(`- Total directors processed: ${directorData.length}`);
    console.log(`- Successfully updated: ${updatedCount}`);
    console.log(`- Errors: ${errorCount}`);

  } catch (error) {
    console.error('Error updating directors:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log('Database connection closed');
  }
}

// Run the update function if this file is executed directly
if (require.main === module) {
  updateDirectors().then(() => {
    console.log('Director update script completed');
    process.exit(0);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { updateDirectors };
