/**
 * Documentation Auto-Generator Watcher
 *
 * This script watches for changes in controllers, models, and routes files
 * and automatically regenerates the API documentation when changes are detected.
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { generateDocumentation } = require('./generateDocs');

// Paths to watch for changes
const watchPaths = [
  // MongoDB paths
  path.join(__dirname, '../../mongodb/controllers/**/*.js'),
  path.join(__dirname, '../../mongodb/routes/**/*.js'),
  path.join(__dirname, '../../mongodb/models/**/*.js'),

  // PostgreSQL paths
  path.join(__dirname, '../../postgresql/controllers/**/*.js'),
  path.join(__dirname, '../../postgresql/routes/**/*.js'),
  path.join(__dirname, '../../postgresql/models/**/*.js')
];

// Initialize watcher
console.log('Starting documentation auto-generator watcher...');
console.log('Watching for changes in controllers, models, and routes...');

// Create watcher
const watcher = chokidar.watch(watchPaths, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

// Add event listeners
watcher
  .on('add', handleChange)
  .on('change', handleChange)
  .on('unlink', handleChange);

// Debounce function to prevent multiple rapid regenerations
let timeout = null;
function handleChange(path) {
  console.log(`File ${path} has been changed`);

  // Clear previous timeout
  if (timeout) {
    clearTimeout(timeout);
  }

  // Set new timeout to regenerate docs after 1 second of inactivity
  timeout = setTimeout(() => {
    console.log('Regenerating documentation...');
    generateDocumentation()
      .then(() => {
        console.log('Documentation regenerated successfully');
      })
      .catch(err => {
        console.error('Error regenerating documentation:', err);
      });
  }, 1000);
}

// Generate documentation on startup
generateDocumentation()
  .then(() => {
    console.log('Initial documentation generated successfully');
  })
  .catch(err => {
    console.error('Error generating initial documentation:', err);
  });

console.log('Watcher started. Documentation will be automatically updated when API code changes.');
