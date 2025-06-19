/**
 * Documentation Generator
 *
 * This script automatically generates API documentation by scanning controllers and routes.
 * It extracts endpoint information, methods, parameters, and descriptions.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Configuration
const config = {
  // Paths to scan for routes and controllers
  paths: {
    mongodb: {
      controllers: path.join(__dirname, '../../mongodb/controllers'),
      routes: path.join(__dirname, '../../mongodb/routes'),
      models: path.join(__dirname, '../../mongodb/models'),
      baseUrl: '/api/v1'
    },
    postgresql: {
      controllers: path.join(__dirname, '../../postgresql/controllers'),
      routes: path.join(__dirname, '../../postgresql/routes'),
      models: path.join(__dirname, '../../postgresql/models'),
      baseUrl: '/api/v1'
    }
  },
  // Output path for documentation
  outputPath: path.join(__dirname, '../public/documentation.html'),
  // Template path
  templatePath: path.join(__dirname, '../templates/documentation.template.html')
};

/**
 * Extract route information from route files
 * @param {string} routesDir - Directory containing route files
 * @param {string} controllersDir - Directory containing controller files
 * @param {string} baseUrl - Base URL for API endpoints
 * @returns {Promise<Array>} - Array of endpoint objects
 */
async function extractRoutes(routesDir, controllersDir, baseUrl) {
  const endpoints = [];

  try {
    // Read route directory
    const routeFiles = fs.readdirSync(routesDir).filter(file => file.endsWith('.js'));

    for (const routeFile of routeFiles) {
      const routePath = path.join(routesDir, routeFile);
      const routeContent = await readFileAsync(routePath, 'utf8');

      // Extract route base path from filename (e.g., movieRoutes.js -> /movies)
      const routeBase = '/' + routeFile.replace('Routes.js', '').toLowerCase() + 's';

      // Extract controller name
      const controllerMatch = routeContent.match(/require\(['"]\.\.\/controllers\/(\w+)Controller['"]\)/);
      if (!controllerMatch) continue;

      const controllerName = controllerMatch[1] + 'Controller';
      const controllerPath = path.join(controllersDir, `${controllerName}.js`);

      if (!fs.existsSync(controllerPath)) continue;

      const controllerContent = await readFileAsync(controllerPath, 'utf8');

      // Extract routes and their handlers
      const routeRegex = /router\.(get|post|put|delete)\(['"]([^'"]*)['"]\s*,\s*(\w+)\.(\w+)\)/g;
      let match;

      while ((match = routeRegex.exec(routeContent)) !== null) {
        const method = match[1].toUpperCase();
        const path = match[2];
        const controllerFunction = match[4];

        // Find the controller function in the controller file to extract comments
        const functionRegex = new RegExp(`exports\\.${controllerFunction}\\s*=\\s*async.*?\\{`, 's');
        const functionMatch = controllerContent.match(functionRegex);

        if (functionMatch) {
          // Look for comments above the function
          const functionStartIndex = functionMatch.index;
          const commentBlock = controllerContent.substring(Math.max(0, functionStartIndex - 500), functionStartIndex);
          const commentMatch = commentBlock.match(/\/\/\s*(.*?)(?=\n\s*exports\.|\n\s*\/\/)/);

          const description = commentMatch ? commentMatch[1].trim() : `${method} endpoint for ${path}`;

          // Extract parameters from path
          const params = [];
          const paramRegex = /:([^\/]+)/g;
          let paramMatch;

          while ((paramMatch = paramRegex.exec(path)) !== null) {
            params.push(paramMatch[1]);
          }

          // Extract request body parameters by analyzing the controller function
          const bodyParams = [];
          const bodyParamRegex = /const\s*\{\s*([^}]+)\s*\}\s*=\s*req\.body/;
          const bodyParamMatch = controllerContent.substring(functionStartIndex, functionStartIndex + 1000).match(bodyParamRegex);

          if (bodyParamMatch) {
            const paramList = bodyParamMatch[1].split(',').map(param => param.trim());
            bodyParams.push(...paramList);
          }

          // Build full endpoint path
          const fullPath = `${baseUrl}${routeBase}${path === '/' ? '' : path}`;

          endpoints.push({
            method,
            path: fullPath,
            description,
            urlParams: params,
            bodyParams,
            controller: controllerName,
            function: controllerFunction
          });
        }
      }
    }

    return endpoints;
  } catch (err) {
    console.error('Error extracting routes:', err);
    return [];
  }
}

/**
 * Generate HTML documentation from endpoints
 * @param {Array} endpoints - Array of endpoint objects
 * @returns {string} - HTML content
 */
function generateHtml(endpoints) {
  // Group endpoints by their base path
  const groupedEndpoints = {};

  endpoints.forEach(endpoint => {
    const basePath = endpoint.path.split('/').slice(0, 4).join('/');
    if (!groupedEndpoints[basePath]) {
      groupedEndpoints[basePath] = [];
    }
    groupedEndpoints[basePath].push(endpoint);
  });

  // Generate HTML for each endpoint
  let endpointsHtml = '';

  Object.keys(groupedEndpoints).sort().forEach(basePath => {
    const group = groupedEndpoints[basePath];
    endpointsHtml += `<h3>${basePath}</h3>\n<ul class="endpoints">`;

    group.forEach(endpoint => {
      const methodClass = endpoint.method.toLowerCase();

      endpointsHtml += `
        <li class="endpoint">
          <div class="method ${methodClass}">${endpoint.method}</div>
          <div class="path">${endpoint.path}</div>
          <div class="description">${endpoint.description}</div>

          <div class="details">
            ${endpoint.urlParams.length > 0 ? `
              <div class="params">
                <h4>URL Parameters:</h4>
                <ul>
                  ${endpoint.urlParams.map(param => `<li><code>${param}</code></li>`).join('')}
                </ul>
              </div>
            ` : ''}

            ${endpoint.bodyParams.length > 0 ? `
              <div class="params">
                <h4>Request Body:</h4>
                <ul>
                  ${endpoint.bodyParams.map(param => `<li><code>${param}</code></li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </li>
      `;
    });

    endpointsHtml += '</ul>';
  });

  // Generate full HTML document
  const html = `<!-- @format -->

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
    ${endpointsHtml}

    <div class="timestamp">
      Documentation automatically generated on ${new Date().toLocaleString()}
    </div>
  </body>
</html>`;

  return html;
}

/**
 * Main function to generate documentation
 */
async function generateDocumentation() {
  try {
    console.log('Generating API documentation...');

    let allEndpoints = [];

    // Process MongoDB endpoints
    if (fs.existsSync(config.paths.mongodb.routes)) {
      const mongoEndpoints = await extractRoutes(
        config.paths.mongodb.routes,
        config.paths.mongodb.controllers,
        config.paths.mongodb.baseUrl
      );
      allEndpoints = allEndpoints.concat(mongoEndpoints);
    }

    // Process PostgreSQL endpoints
    if (fs.existsSync(config.paths.postgresql.routes)) {
      const pgEndpoints = await extractRoutes(
        config.paths.postgresql.routes,
        config.paths.postgresql.controllers,
        config.paths.postgresql.baseUrl
      );
      allEndpoints = allEndpoints.concat(pgEndpoints);
    }

    // Generate HTML
    const html = generateHtml(allEndpoints);

    // Write to file
    await writeFileAsync(config.outputPath, html);

    console.log(`Documentation generated successfully at ${config.outputPath}`);
  } catch (err) {
    console.error('Error generating documentation:', err);
  }
}

// Run the generator if this file is executed directly
if (require.main === module) {
  generateDocumentation();
}

module.exports = { generateDocumentation };
