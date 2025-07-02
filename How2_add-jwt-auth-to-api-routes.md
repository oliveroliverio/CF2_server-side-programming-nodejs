# How to Add JWT Authentication to API Routes

This document details how to implement JWT authentication for protecting API routes in an Express.js application using Passport.js.

## Overview

JSON Web Tokens (JWT) provide a secure way to authenticate API requests. This guide shows how to add JWT authentication to existing Express routes, with a focus on implementing a mixed approach where some routes remain public while others require authentication.

## Files Modified

1. `/movie_api/mongodb/routes/movieRoutes.js`
   - Added Passport authentication middleware to protect specific routes
   - Kept some routes public for broader access

## Implementation Steps

### 1. Import Required Dependencies

First, import Passport in your routes file:

```javascript
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const passport = require('passport');  // Add this line
```

### 2. Define Authentication Middleware

Create a reusable authentication middleware using Passport JWT strategy:

```javascript
const auth = passport.authenticate('jwt', { session: false });
```

### 3. Apply Authentication Selectively

Decide which routes should be public and which should be protected:

```javascript
// Public routes (no authentication required)
router.get('/', movieController.getAllMovies);
router.get('/title/:title', movieController.getMovieByTitle);

// Protected routes (authentication required)
router.get('/id/:id', auth, movieController.getMovieById);
router.get('/director/:director', auth, movieController.getMoviesByDirector);
router.get('/genre/:genre', auth, movieController.getMoviesByGenre);
router.post('/', auth, movieController.createMovie);
router.put('/id/:id', auth, movieController.updateMovie);
router.delete('/id/:id', auth, movieController.deleteMovie);
```

## Authentication Flow

1. User logs in and receives a JWT token
2. For protected routes, user includes the token in the Authorization header
3. Passport verifies the token and allows/denies access accordingly

## Terminal Commands Used

### Committing and Deploying Changes

```bash
# Add the modified file to staging
git add movie_api/mongodb/routes/movieRoutes.js

# Commit the changes
git commit -m "Add authentication back to movie routes"

# Push to Heroku from feature branch
git push heroku feat/add-back-auth-in-movies-endpoint:main

# Open the deployed app
heroku open
```

## Testing Protected Routes

### 1. Obtain a JWT Token

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "testuser456",
  "password": "securepassword123!"
}' https://myflix2-54ee4b2daeee.herokuapp.com/users/login
```

### 2. Use the Token to Access Protected Routes

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" https://myflix2-54ee4b2daeee.herokuapp.com/movies/id/MOVIE_ID
```

### 3. Public Routes (No Authentication Required)

```bash
curl https://myflix2-54ee4b2daeee.herokuapp.com/movies
curl https://myflix2-54ee4b2daeee.herokuapp.com/movies/title/Movie%20Title
```

## Best Practices

1. **Mixed Access Strategy**: Keep some routes public (like basic listing endpoints) while protecting routes that modify data or access sensitive information.

2. **Consistent Authentication Pattern**: Use the same authentication middleware across all protected routes for consistency.

3. **Clear Route Organization**: Group public and protected routes together with clear comments for better code readability.

4. **Error Handling**: Ensure proper error responses when authentication fails (Passport handles this automatically).

5. **Token Security**: Use HTTPS in production to protect token transmission.

## Common Issues and Solutions

1. **"Unauthorized" Errors**: Make sure the token is correctly formatted in the Authorization header as `Bearer YOUR_TOKEN`.

2. **Token Expiration**: JWT tokens have an expiration time (set to 7 days in this application). Users need to log in again after expiration.

3. **Missing Authorization Header**: Double-check that the Authorization header is included in all requests to protected routes.

