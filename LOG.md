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
