const request = require('supertest');
const app = require('../index');

// Main routes tests
describe('Main API Routes', () => {
    test('GET / should return welcome message', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
        expect(response.text).toBe('Welcome to my movie API!');
    });

    test('GET /documentation should return HTML', async () => {
        const response = await request(app)
            .get('/documentation')
            .expect(200)
            .expect('Content-Type', /html/);
    });
});

// Movie routes tests
describe('Movie Routes', () => {
    test('GET /movies should return all movies', async () => {
        const response = await request(app)
            .get('/movies')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('director');
        expect(response.body[0]).toHaveProperty('genre');
    });

    test('GET /movies/id/:id should return a specific movie', async () => {
        const response = await request(app)
            .get('/movies/id/1')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('id', '1');
        expect(response.body).toHaveProperty('title', 'Edge of Tomorrow');
    });

    test('GET /movies/id/:id should return 404 for non-existent movie', async () => {
        await request(app)
            .get('/movies/id/999')
            .expect(404);
    });

    test('GET /movies/title/:title should return a specific movie by title', async () => {
        const response = await request(app)
            .get('/movies/title/Parasite')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('title', 'Parasite');
        expect(response.body).toHaveProperty('director');
        expect(response.body.director).toHaveProperty('name', 'Bong Joon-ho');
    });

    test('GET /movies/title/:title should handle case insensitivity', async () => {
        const response = await request(app)
            .get('/movies/title/parasite')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('title', 'Parasite');
    });

    test('GET /movies/title/:title should handle URL encoded spaces', async () => {
        const response = await request(app)
            .get('/movies/title/La%20La%20Land')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('title', 'La La Land');
    });

    test('GET /movies/title/:title should return 404 for non-existent title', async () => {
        await request(app)
            .get('/movies/title/NonExistentMovie')
            .expect(404);
    });

    test('GET /movies/director/:director should return movies by a director', async () => {
        const response = await request(app)
            .get('/movies/director/Christopher%20Nolan')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].director).toHaveProperty('name', 'Christopher Nolan');
    });

    test('GET /movies/director/:director should return 404 for non-existent director', async () => {
        await request(app)
            .get('/movies/director/NonExistentDirector')
            .expect(404);
    });
});

// User routes tests
describe('User Routes', () => {
    test('GET /users should return all users', async () => {
        const response = await request(app)
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('username');
        expect(response.body[0]).toHaveProperty('email');
        expect(response.body[0]).toHaveProperty('favoriteMovies');
    });

    test('GET /users/:username should return a specific user', async () => {
        const response = await request(app)
            .get('/users/moviebuff123')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('username', 'moviebuff123');
        expect(response.body).toHaveProperty('email', 'moviebuff123@example.com');
    });

    test('GET /users/:username should return 404 for non-existent user', async () => {
        await request(app)
            .get('/users/nonexistentuser')
            .expect(404);
    });

    test('GET /users/:username/favorites should return user\'s favorite movies', async () => {
        const response = await request(app)
            .get('/users/moviebuff123/favorites')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toContain('Parasite');
        expect(response.body).toContain('The Dark Knight');
    });

    test('GET /users/:username/favorites should return 404 for non-existent user', async () => {
        await request(app)
            .get('/users/nonexistentuser/favorites')
            .expect(404);
    });
});
