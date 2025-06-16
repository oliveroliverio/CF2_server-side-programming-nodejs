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
