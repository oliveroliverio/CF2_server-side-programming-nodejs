# Movie API - PostgreSQL Implementation

This is the PostgreSQL implementation of the Movie API, refactored from the MongoDB version to use a relational database structure.

## Database Structure

### Tables
- **Movies**: Stores movie information
- **Genres**: Stores genre information
- **Directors**: Stores director information
- **Users**: Stores user information
- **FavoriteMovies**: Junction table for the many-to-many relationship between users and their favorite movies

### Relationships
- Each movie belongs to one genre (one-to-many)
- Each movie belongs to one director (one-to-many)
- Users can have many favorite movies, and movies can be favorited by many users (many-to-many)

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running

### Installation

1. Install dependencies:
```bash
brew install postgresql
# install pgadmin4 for a GUI to manage the database
brew install --cask pgadmin4
brew services start postgresql
createdb movieAPI
npm install
```

2. Create a PostgreSQL database:
```bash
createdb movieapi
```

3. Configure environment variables in `.env` file:
```
DB_NAME=movieAPI
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

4. Seed the database with initial data:
```bash
node movie_api/postgresql/utils/seedDatabase.js
```
or
```bash
npm run seed:postgresql
```

5. Start the server:
```bash
node movie_api/postgresql/server.js
```

## API Endpoints

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

## Key Differences from MongoDB Implementation

1. **Relational Structure**: Uses separate tables for Movies, Genres, and Directors instead of embedded documents
2. **Foreign Keys**: Uses proper foreign key relationships instead of references
3. **Join Tables**: Uses a join table for the many-to-many relationship between users and favorite movies
4. **SQL Queries**: Uses Sequelize ORM for SQL queries instead of Mongoose
5. **Data Validation**: Uses Sequelize validators instead of Mongoose validators

## Technologies Used
- Express.js: Web framework
- Sequelize: ORM for PostgreSQL
- pg: PostgreSQL client for Node.js
- bcrypt: Password hashing
- dotenv: Environment variable management
