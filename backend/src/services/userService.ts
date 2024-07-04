import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `);
        client.release();
    } catch (err) {
        console.error('Error creating users table:', err);
    }
};

const registerUser = async (email: string, password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const client = await pool.connect();
    
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if(result) {
            throw new Error("Email already exist")
        }
        const newUser = await client.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);

        client.release();
        return newUser;
    } catch (err: any) {
        client.release();
            throw new Error('something wrong');
    }
};

const loginUser = async (email: string, password: string) => {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    client.release();

    if (result.rows.length === 0) {
        throw new Error('Invalid email or password');
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

    return { user, token }; // Return user and token
};

const getAllUsers = async () => {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    client.release();
    return result.rows;
};

export { createUserTable, registerUser, loginUser, getAllUsers };
