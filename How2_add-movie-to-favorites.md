# How to Add a Movie to User's Favorites

## Issue
When trying to add a movie to a user's favorites, you might encounter a "Movie not found" error even when the movie exists in the database. This typically happens due to one of these reasons:

1. Incorrect movie ID format
2. Movie ID doesn't exist in the database
3. Authentication/authorization issues
4. The movie is already in favorites

## Solution

### Prerequisites
- Valid user account with username and password
- Movie ID that exists in the database
- JWT token from login

### Steps

1. **Get a list of all movies to verify movie IDs**
```bash
curl https://myflix2-54ee4b2daeee.herokuapp.com/movies
```

2. **Login to get JWT token**
```bash
TOKEN=$(curl -X POST https://myflix2-54ee4b2daeee.herokuapp.com/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}' | jq -r '.token')
```

3. **Add movie to favorites**
```bash
curl -X POST https://myflix2-54ee4b2daeee.herokuapp.com/users/your_username/favorites/6851c61e393c945e51f54cdc \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### Common Issues and Fixes

1. **"Movie not found" error**
   - Verify the movie ID exists in the database
   - Check for typos in the movie ID
   - Ensure the movie ID is in the correct format (MongoDB ObjectId)

2. **"Movie is already in favorites" error**
   - The movie is already in the user's favorites list
   - Check current favorites with:
   ```bash
   curl https://myflix2-54ee4b2daeee.herokuapp.com/users/your_username/favorites \
     -H "Authorization: Bearer $TOKEN"
   ```

3. **Authentication errors**
   - Make sure to include the `Authorization` header with a valid JWT token
   - Tokens expire after some time - get a new one by logging in again

### Using in JavaScript (Axios)

```javascript
const axios = require('axios');

async function addToFavorites(username, password, movieId) {
  try {
    // Login
    const loginRes = await axios.post('https://myflix2-54ee4b2daeee.herokuapp.com/users/login', {
      username,
      password
    });

    const token = loginRes.data.token;

    // Add to favorites
    const response = await axios.post(
      `https://myflix2-54ee4b2daeee.herokuapp.com/users/${username}/favorites/${movieId}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Added to favorites:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}
```

### Notes
- Always use HTTPS for production requests
- Store sensitive information (tokens, credentials) in environment variables
- Handle errors appropriately in your application code
- The API returns the updated list of favorite movies on success
