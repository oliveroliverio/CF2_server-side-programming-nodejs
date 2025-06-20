# API Testing Guide

## User Operations

### 1. Register new user
```bash
curl -X POST http://localhost:8080/users \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpassword",
  "email": "test@example.com",
  "birthDate": "1990-01-01"
}'
```

### 2. Login to get token
```bash
curl -X POST http://localhost:8080/users/login \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpassword"
}'
```

### 3. Update user information
```bash
curl -X PUT http://localhost:8080/users/testuser \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_token>" \
-d '{
  "username": "newusername",
  "password": "newpassword",
  "email": "newemail@example.com",
  "birthDate": "1990-01-01"
}'
```

## Movie Operations

### 1. Create new movie
```bash
curl -X POST http://localhost:8080/movies \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_token>" \
-d '{
  "title": "Test Movie",
  "description": "A test movie description",
  "genre": {
    "name": "Drama",
    "description": "Drama genre description"
  },
  "director": {
    "name": "Test Director",
    "bio": "Director biography",
    "birthYear": 1970,
    "deathYear": null
  },
  "imageURL": "https://example.com/movie.jpg",
  "featured": false
}'
```

### 2. Get all movies
```bash
curl -X GET http://localhost:8080/movies \
-H "Authorization: Bearer <your_token>"
```

### 3. Get movie by title
```bash
curl -X GET http://localhost:8080/movies/title/Test%20Movie \
-H "Authorization: Bearer <your_token>"
```

## Favorite Movies Operations

### 1. Add movie to favorites
```bash
curl -X POST http://localhost:8080/users/testuser/favorites/<movie_id> \
-H "Authorization: Bearer <your_token>"
```

### 2. Remove movie from favorites
```bash
curl -X DELETE http://localhost:8080/users/testuser/favorites/<movie_id> \
-H "Authorization: Bearer <your_token>"
```

### 3. Get user's favorite movies
```bash
curl -X GET http://localhost:8080/users/testuser/favorites \
-H "Authorization: Bearer <your_token>"
```

## Notes:
1. Replace `<your_token>` with the actual JWT token received after login
2. Replace `<movie_id>` with actual MongoDB ObjectId of the movie
3. All endpoints except registration and login require JWT authentication
4. Dates should be in ISO format (YYYY-MM-DD)
5. The server responds with HTTP status codes:
   - 200/201: Success
   - 400: Bad Request
   - 401: Unauthorized
   - 404: Not Found
   - 500: Server Error
