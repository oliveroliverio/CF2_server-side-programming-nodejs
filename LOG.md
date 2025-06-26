# Development Log

## 2025-06-12: Improve movie API endpoints

### Commit: Improve movie API endpoints: Separate ID and title routes, add case-insensitive title search with space handling

#### Files Changed:
- `movie_api/index.js`: Modified route handlers to properly handle movie searches by ID and title

#### Changes:
1. Fixed route conflict between `/movies/:id` and `/movies/:title` by creating specific paths:
   - `/movies/id/:id` - For getting movies by ID
   - `/movies/title/:title` - For getting movies by title
2. Improved title search with:
   - URL decoding to properly handle spaces in movie titles
   - Case-insensitive search for better user experience
   
#### Why:
The original implementation had conflicting routes that prevented title-based searches from working correctly. Express was treating all parameters at the same URL position as the same parameter type, so only the first route (ID search) was being matched. The new implementation allows for both ID and title searches with proper handling of spaces and case sensitivity.

## 2025-06-12: Restructure API with modular route organization

### Commit: refactor: Restructure API with modular route organization

#### Files Changed:
- `movie_api/index.js`: Updated to import and use route modules instead of containing all routes
- `movie_api/routes/movieRoutes.js`: Created dedicated file for movie-related routes using Express Router
- `movie_api/routes/userRoutes.js`: Created dedicated file for user-related endpoints

#### Changes:
1. Moved movie routes from index.js to dedicated movieRoutes.js using Express Router
2. Created userRoutes.js with basic user endpoints:
   - GET `/users` - List all users
   - GET `/users/:username` - Get user by username
   - GET `/users/:username/favorites` - Get user's favorite movies
3. Updated index.js to import and use route modules
4. Fixed route paths to work with Express Router mounting

#### Why:
Restructuring the API with a modular approach provides several benefits:
- **Maintainability**: Easier to find and modify specific routes
- **Scalability**: Easier to add new routes without cluttering a single file
- **Organization**: Clear separation of concerns between different resource types
- **Readability**: Code is more organized and easier to understand

## 2025-06-12: Add comprehensive test suite for all API routes

### Commit: test: Add comprehensive test suite for all API routes

#### Files Changed:
- `movie_api/tests/index.test.js`: Completely revised with tests for all API endpoints

#### Changes:
1. Organized tests into three main sections:
   - Main API Routes tests (root and documentation endpoints)
   - Movie Routes tests (all movie-related endpoints)
   - User Routes tests (all user-related endpoints)
2. Added tests for all endpoints including error cases (404 responses)
3. Included tests for special cases:
   - Case insensitivity for title searches
   - URL encoding for spaces in titles and director names
4. Verified proper response structures and status codes for all endpoints

#### Why:
A comprehensive test suite ensures that all API endpoints function correctly and handle edge cases properly. The organized structure makes it easy to identify which part of the API has issues if tests fail, and the coverage of error cases helps ensure robust error handling throughout the application.

## 2025-06-12: Add CRUD operations with file persistence

### Commit: feat: Add CRUD operations with file persistence

#### Files Changed:
- `movie_api/routes/movieRoutes.js`: Added POST, PUT, DELETE endpoints for movies
- `movie_api/routes/userRoutes.js`: Added POST, PUT, DELETE endpoints for users

#### Changes:
1. Added complete CRUD operations for movies:
   - POST `/movies` - Create a new movie
   - PUT `/movies/id/:id` - Update an existing movie
   - DELETE `/movies/id/:id` - Delete a movie
2. Added complete CRUD operations for users:
   - POST `/users` - Create a new user
   - PUT `/users/:username` - Update an existing user
   - DELETE `/users/:username` - Delete a user
3. Added favorite movie management:
   - POST `/users/:username/favorites/:movieId` - Add a movie to favorites
   - DELETE `/users/:username/favorites/:movieTitle` - Remove a movie from favorites
4. Implemented file persistence by writing changes back to JSON files
5. Added validation and error handling for all operations

#### Why:
Adding CRUD operations completes the API functionality, allowing not just retrieval but also creation, modification, and deletion of resources. The implementation uses file-based persistence to maintain data between server restarts by reading from and writing to the static JSON files. This approach provides a simple yet effective way to handle data persistence without requiring a database setup.

## 2025-06-16: Refactor API to MVC architecture with MongoDB/Mongoose

### Commit: refactor: Implement MVC architecture with MongoDB and Mongoose integration

#### Files Changed:
- `movie_api/models/Movie.js`: Created Mongoose schema for movies
- `movie_api/models/User.js`: Created Mongoose schema for users with password hashing
- `movie_api/controllers/movieController.js`: Created controller for movie operations
- `movie_api/controllers/userController.js`: Created controller for user operations
- `movie_api/routes/movieRoutes.js`: Updated to use movie controller
- `movie_api/routes/userRoutes.js`: Updated to use user controller
- `movie_api/index.js`: Updated to connect to MongoDB
- `movie_api/package.json`: Added MongoDB/Mongoose dependencies
- `movie_api/.gitignore`: Created to exclude node_modules and .env
- `movie_api/utils/seedDatabase.js`: Created utility to migrate JSON data to MongoDB

#### Changes:
1. Implemented proper MVC (Model-View-Controller) architecture:
   - Models: Mongoose schemas for Movie and User
   - Controllers: Separate logic for movie and user operations
   - Routes: Clean routing using controllers
2. Added MongoDB integration with Mongoose:
   - Connection setup in index.js
   - Proper schema definitions with validation
   - Password hashing for user security
3. Created data migration utility to seed MongoDB from existing JSON files
4. Updated all CRUD operations to use MongoDB instead of file-based storage
5. Added proper error handling for database operations

#### Why:
Refactoring to MVC architecture with MongoDB provides numerous benefits:
- **Scalability**: MongoDB can handle much larger datasets than file-based storage
- **Performance**: Faster queries and operations on large datasets
- **Data Integrity**: Schema validation ensures data consistency
- **Security**: Proper password hashing for user authentication
- **Maintainability**: Clear separation of concerns makes code easier to maintain
- **Extensibility**: Easier to add new features or modify existing ones

## 2025-06-16: Add PostgreSQL implementation and reorganize project structure

### Commit: feat: Add PostgreSQL implementation and reorganize project structure

#### Files Changed:
- `movie_api/postgresql/models/Movie.js`: Created Sequelize models for movies, genres, and directors
- `movie_api/postgresql/models/User.js`: Created Sequelize model for users with password hashing
- `movie_api/postgresql/controllers/movieController.js`: Implemented controllers for movie operations using PostgreSQL
- `movie_api/postgresql/controllers/userController.js`: Implemented controllers for user operations using PostgreSQL
- `movie_api/postgresql/routes/movieRoutes.js`: Created routes for PostgreSQL implementation
- `movie_api/postgresql/routes/userRoutes.js`: Created routes for PostgreSQL implementation
- `movie_api/postgresql/config/database.js`: Added PostgreSQL connection configuration
- `movie_api/postgresql/utils/seedDatabase.js`: Created script to seed PostgreSQL with initial data
- `movie_api/postgresql/server.js`: Created server file for PostgreSQL implementation
- `movie_api/postgresql/index.js`: Created main app file for PostgreSQL implementation
- `movie_api/postgresql/README.md`: Added documentation for PostgreSQL implementation
- `movie_api/README.md`: Created main README with information about both implementations
- `package.json`: Added PostgreSQL dependencies and updated scripts
- `.env`: Added PostgreSQL environment variables
- `.gitignore`: Updated to include environment variables and other files

#### Changes:
1. Created a PostgreSQL implementation of the movie API using Sequelize ORM
2. Reorganized project structure to support both MongoDB and PostgreSQL implementations
3. Moved MongoDB implementation to `movie_api/mongodb/` directory
4. Created a shared directory for common files
5. Updated package.json with scripts for both implementations
6. Created comprehensive documentation for both implementations
7. Implemented proper relational database structure with foreign keys and join tables

#### Why:
Adding a PostgreSQL implementation provides flexibility in database choice and demonstrates the API's adaptability to different database systems. The reorganized project structure makes it easier to maintain both implementations and switch between them. The relational database structure in PostgreSQL offers strong data consistency and integrity through foreign key constraints, while the MongoDB implementation offers flexibility and schema-less design.

## 2025-06-16: Fix PostgreSQL Database Setup and Seeding

### Commit: fix: PostgreSQL database configuration and seeding script

#### Files Changed:
- `movie_api/postgresql/config/database.js`: Updated database name to lowercase for PostgreSQL compatibility
- `movie_api/postgresql/utils/seedDatabase.js`: Fixed data loading from JSON files and added better error handling

#### Changes:
1. Updated database configuration to use lowercase 'movieapi' instead of 'movieAPI' for better PostgreSQL compatibility
2. Fixed the seed script to properly handle nested JSON data structure
3. Added comprehensive error handling and debugging to the seed script
4. Updated file paths to correctly load data from the shared directory
5. Added validation to ensure data is properly loaded before attempting to seed the database

#### Why:
The case-sensitive database name was causing connection issues with PostgreSQL. The seed script needed to be updated to handle the nested JSON structure of the data files. These changes ensure that the PostgreSQL implementation can be properly set up and seeded with initial data, enabling full functionality of the API with PostgreSQL as the backend.

## 2025-06-16: Add Automated API Documentation Generation

### Commit: feat: Implement automated HTML documentation generation system

#### Files Changed:
- `movie_api/shared/utils/generateDocs.js`: Created main documentation generator that scans controllers and routes
- `movie_api/shared/utils/watchAndGenerateDocs.js`: Added file watcher to automatically regenerate docs when code changes
- `movie_api/shared/utils/setupDocTemplates.js`: Created template setup script for documentation
- `package.json`: Added new npm scripts for documentation generation

#### Changes:
1. Implemented an automated documentation system that extracts API endpoints, methods, parameters, and descriptions from the codebase
2. Created a file watcher that automatically regenerates documentation when controllers, routes, or models are modified
3. Added a template system for consistent documentation styling and formatting
4. Integrated with both MongoDB and PostgreSQL implementations to document all API endpoints
5. Improved developer experience by eliminating the need to manually update documentation

#### NPM Commands:
```
# Generate documentation once
npm run generate-docs

# Start the documentation watcher (auto-regenerates when files change)
npm run watch-docs

# Setup documentation templates (run once before first use)
npm run setup-docs
```

#### Why:
The automated documentation system streamlines the process of maintaining accurate and up-to-date API documentation, reducing the overhead of manual documentation updates and ensuring that the documentation remains consistent with the codebase.

## 2025-06-16: Add local image storage system for markdown documentation

### Commit: feat: Add local image storage system for markdown documentation

#### Files Changed:
- [images/README.md](cci:7://file:///Users/olivero54/Downloads/z-dev/CF2_server-side-programming-nodejs/images/README.md:0:0-0:0): Created README explaining the image directory structure
- `scripts/download-markdown-images.js`: Implemented script to download external images and update markdown references
- `scripts/README.md`: Added documentation for using the image downloader script
- [package.json](cci:7://file:///Users/olivero54/Downloads/z-dev/CF2_server-side-programming-nodejs/package.json:0:0-0:0): Added npm command `download-images` for easy script execution

#### Changes:
1. Created an organized image directory structure with categorized subdirectories:
   - `auth/` - Authentication and authorization related images
   - `ui/` - User interface screenshots and examples
   - `icons/` - Icons and small graphics
   - `diagrams/` - Architectural diagrams and flowcharts
   - `avatars/` - User avatars and profile pictures
   - `misc/` - Miscellaneous images
2. Implemented a Node.js script that:
   - Scans all markdown files for image URLs
   - Downloads images to appropriate local subdirectories
   - Updates markdown references to use local paths
   - Handles redirects and various image formats
3. Added npm command `download-images` for easy execution

#### Why:
External image URLs in markdown documentation can break over time, causing documentation to lose important visual elements. This local image storage system ensures that all images persist even if external URLs break, making the documentation more resilient and self-contained. The categorized directory structure also improves organization and makes it easier to manage images.

## 2025-06-16: Fix image downloader script

### Commit: fix: Use fsSync for createWriteStream in image downloader script

#### Files Changed:
- [scripts/download-markdown-images.js](cci:7://file:///Users/olivero54/Downloads/z-dev/CF2_server-side-programming-nodejs/scripts/download-markdown-images.js:0:0-0:0): Fixed error with fs.createWriteStream

#### Changes:
1. Added separate import for synchronous fs module: `const fsSync = require('fs');`
2. Updated the downloadImage function to use fsSync.createWriteStream instead of fs.createWriteStream

#### Why:
The script was using fs.promises for most operations but trying to use fs.createWriteStream directly, which doesn't exist in the promises API. This fix ensures the script can properly download images and update markdown references.

## 2025-06-19: uploaded to heroku
url: https://quiet-anchorage-12984-ad5a49403d9c.herokuapp.com/

## 2025-06-25: Fixed MongoDB Atlas Connection Issues with Heroku

### Issue:
Heroku app was failing to connect to MongoDB Atlas with a 500 Internal Server Error. The error logs showed:
```
Failed to connect to MongoDB: MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster
```

### Root Cause:
1. Heroku's IP address wasn't whitelisted in MongoDB Atlas
2. The CONNECTION_URI environment variable in Heroku wasn't properly set

### Solution Steps:

1. **Find Heroku App's IP**:
```bash
heroku run curl http://ifconfig.me
```

2. **MongoDB Atlas Configuration**:
   - Option 1 (Development): Add `0.0.0.0/0` to allow all IPs
   - Option 2 (Production): Add specific Heroku IP to whitelist

3. **Verify/Set Heroku Environment Variables**:
```bash
# Check current config
heroku config

# Get specific CONNECTION_URI value
heroku config:get CONNECTION_URI

# Set correct CONNECTION_URI
heroku config:set CONNECTION_URI="mongodb+srv://[username]:[password]@[cluster].mongodb.net/?retryWrites=true&w=majority"
```

4. **Restart Heroku**:
```bash
heroku restart
```

5. **Monitor Logs**:
```bash
heroku logs --tail
```

### Key Learnings:
1. When deploying to Heroku, the app's IP (not your local machine's IP) needs MongoDB Atlas whitelist access
2. For development, using `0.0.0.0/0` in MongoDB Atlas is acceptable but not recommended for production
3. Always verify environment variables are correctly set in Heroku's config
4. Use `heroku logs --tail` to monitor connection issues in real-time

## 2025-06-20: Fix MongoDB Atlas Connection Issues

### Commit: Update MongoDB connection options for Atlas compatibility

#### Files Changed:
- `movie_api/mongodb/index.js`: Updated MongoDB connection options

#### Changes:
1. Added required MongoDB Atlas connection options:
   - `retryWrites: true`
   - `w: 'majority'`
2. These options are required for proper write operations on MongoDB Atlas

#### Why:
The connection to MongoDB Atlas was timing out during write operations because the connection options weren't properly configured for Atlas's requirements. Adding these options ensures proper write operations and prevents timeout errors during user creation and other database operations.

#### Testing:
Successfully tested by:
1. Creating a new user via POST to /users
2. Logging in via POST to /users/login
3. Retrieving users list via GET /users with JWT authentication

## 2025-06-20: Fix MongoDB Atlas Database Configuration

### Issue:
User data was being created in the wrong database (test) instead of the intended database (movieAPI)

### Resolution:
1. Updated Heroku's CONNECTION_URI to explicitly specify the database name and include all required connection options:
```bash
heroku config:set CONNECTION_URI="mongodb+srv://<username>:<password>@myflix-cluster.zxbvej4.mongodb.net/movieAPI?retryWrites=true&w=majority&appName=myflix-cluster"
```

2. Restarted the Heroku app to apply the new configuration:
```bash
heroku restart
```

3. Tested user creation with the corrected database configuration:
```bash
curl -X POST https://myflix2-54ee4b2daeee.herokuapp.com/users \
-H "Content-Type: application/json" \
-d '{
  "username": "bethany",
  "password": "test123",
  "email": "bethany@test.com"
}'
```

### Key Changes:
1. Added `/movieAPI` to the connection URI to specify the correct database
2. Maintained all necessary connection options:
   - `retryWrites=true`
   - `w=majority`
   - `appName=myflix-cluster`

### Outcome:
User creation now successfully writes to the correct 'movieAPI' database in MongoDB Atlas.


# 250624
---begin advisor fix suggestion:
1. Add CORS middleware in mongodb/index.js.
2. Seed your MongoDB Atlas database using your existing seed:mongodb script or MongoDB Compass.
3. Submit Postman screenshots showing: -Registration and login results -Invalid inputs triggering validation errors -Confirmation that passwords are hashed in the database