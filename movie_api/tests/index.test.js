const request = require('supertest');
const app = require('../index');

describe('Movie API Tests', () => {
    test('GET / should return welcome message', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
        expect(response.text).toBe('Welcome to my movie API!');
    });

    test('GET /movies should return movie list', async () => {
        const response = await request(app)
            .get('/movies')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('title', 'Inception');
    });

    test('GET /documentation should return HTML', async () => {
        const response = await request(app)
            .get('/documentation')
            .expect(200)
            .expect('Content-Type', /html/);
    });
});
