# Movie API

This project implements a RESTful API for a movie database with two different database implementations:

1. **MongoDB Implementation** - Using MongoDB and Mongoose
2. **PostgreSQL Implementation** - Using PostgreSQL and Sequelize

Both implementations follow the MVC (Model-View-Controller) architecture and provide identical API endpoints.

## Directory Structure

```
movie_api/
├── mongodb/           # MongoDB implementation
│   ├── controllers/   # Controllers for MongoDB
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── utils/         # Utility scripts
│   └── data/          # JSON data files
│
├── postgresql/        # PostgreSQL implementation
│   ├── controllers/   # Controllers for PostgreSQL
│   ├── models/        # Sequelize models
│   ├── routes/        # Express routes
│   ├── utils/         # Utility scripts
│   ├── migrations/    # Database migrations
│   └── config/        # Database configuration
│
└── shared/            # Shared resources
    ├── public/        # Static files
    └── index.html     # Main HTML file
```

## API Features

Both implementations provide the following features:

1. Return a list of ALL movies to the user
2. Return data about a single movie by title
3. Return data about a genre by name/title
4. Return data about a director by name
5. Allow new users to register
6. Allow users to update their user info
7. Allow users to add a movie to their list of favorites
8. Allow users to remove a movie from their list of favorites
9. Allow existing users to deregister

## Getting Started

### MongoDB Implementation

1. Make sure MongoDB is installed and running
2. Set up environment variables in `.env`:
   ```
   CONNECTION_URI=mongodb://localhost:27017/movieAPI
   PORT=3000
   ```
3. Start the server:
   ```
   npm run start:mongodb
   ```

### PostgreSQL Implementation

1. Make sure PostgreSQL is installed and running
2. Create a database:
   ```
   createdb movieAPI
   ```
3. Set up environment variables in `.env`:
   ```
   DB_NAME=movieAPI
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   DB_PORT=5432
   PORT=3000
   ```
4. Start the server:
   ```
   npm run start:postgresql
   ```

## API Endpoints

Both implementations provide identical API endpoints:

### Movies
- `GET /movies`: Get all movies
- `GET /movies/id/:id`: Get a movie by ID
- `GET /movies/title/:title`: Get a movie by title
- `GET /movies/director/:director`: Get movies by director name
- `GET /movies/genre/:genre`: Get movies by genre name
- `POST /movies`: Create a new movie
- `PUT /movies/id/:id`: Update a movie
- `DELETE /movies/id/:id`: Delete a movie

### Users
- `GET /users`: Get all users
- `GET /users/:username`: Get a user by username
- `GET /users/:username/favorites`: Get a user's favorite movies
- `POST /users`: Create a new user
- `PUT /users/:username`: Update a user
- `DELETE /users/:username`: Delete a user
- `POST /users/:username/favorites/:movieId`: Add a movie to a user's favorites
- `DELETE /users/:username/favorites/:movieId`: Remove a movie from a user's favorites
