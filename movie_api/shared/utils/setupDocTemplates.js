/**
 * Setup Documentation Templates
 *
 * This script ensures that the templates directory exists for the documentation generator.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);

// Paths
const templatesDir = path.join(__dirname, '../templates');
const templateFile = path.join(templatesDir, 'documentation.template.html');

// Basic template content
const templateContent = `<!-- @format -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Movie API Documentation</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      h1, h2, h3, h4 {
        color: #0066cc;
      }
      .endpoints {
        list-style: none;
        padding: 0;
      }
      .endpoint {
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
      }
      .method {
        display: inline-block;
        padding: 6px 10px;
        color: white;
        font-weight: bold;
        width: 60px;
        text-align: center;
      }
      .get { background-color: #61affe; }
      .post { background-color: #49cc90; }
      .put { background-color: #fca130; }
      .delete { background-color: #f93e3e; }
      .path {
        display: inline-block;
        padding: 6px 10px;
        font-family: monospace;
        font-weight: bold;
      }
      .description {
        padding: 10px;
        background-color: #f8f8f8;
        border-top: 1px solid #ddd;
      }
      .details {
        padding: 10px;
        border-top: 1px solid #ddd;
      }
      code {
        background-color: #f1f1f1;
        padding: 2px 5px;
        border-radius: 3px;
        font-family: monospace;
      }
      .timestamp {
        color: #666;
        font-size: 0.8em;
        margin-top: 30px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Movie API Documentation</h1>
    <p>
      This API provides access to information about movies, directors,
      and genres. Users can sign up, update their personal information,
      and create lists of their favorite movies.
    </p>

    <h2>Endpoints</h2>
    <!-- ENDPOINTS_PLACEHOLDER -->

    <div class="timestamp">
      Documentation automatically generated on <!-- TIMESTAMP_PLACEHOLDER -->
    </div>
  </body>
</html>`;

async function setup() {
  try {
    // Create templates directory if it doesn't exist
    if (!fs.existsSync(templatesDir)) {
      console.log(`Creating templates directory: ${templatesDir}`);
      await mkdirAsync(templatesDir, { recursive: true });
    }

    // Create template file if it doesn't exist
    if (!fs.existsSync(templateFile)) {
      console.log(`Creating template file: ${templateFile}`);
      await writeFileAsync(templateFile, templateContent);
    }

    console.log('Setup completed successfully');
  } catch (err) {
    console.error('Error during setup:', err);
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setup();
}

module.exports = { setup };
