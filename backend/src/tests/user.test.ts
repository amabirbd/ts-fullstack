import request from 'supertest';
import app from '../app';
import pool from '../config/db';

describe('User API', () => {
    beforeAll(async () => {
        // Create the users table before running tests
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `);
    });

    afterAll(async () => {
        // Clean up the database and close the pool
        await pool.query('DROP TABLE IF EXISTS users');
        await pool.end();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should login an existing user', async () => {
        // First, register a new user
        await request(app)
            .post('/register')
            .send({
                email: 'test2@example.com',
                password: 'password123'
            });

        // Then, login with the registered user's credentials
        const res = await request(app)
            .post('/login')
            .send({
                email: 'test2@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Login successful');
    });

    it('should fetch all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
