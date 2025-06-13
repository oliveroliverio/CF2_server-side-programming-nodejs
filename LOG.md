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
