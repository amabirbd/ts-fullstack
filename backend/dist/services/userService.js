"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.loginUser = exports.registerUser = exports.createUserTable = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db_1.default.connect();
        yield client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `);
        client.release();
    }
    catch (err) {
        console.error('Error creating users table:', err);
    }
});
exports.createUserTable = createUserTable;
const registerUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const client = yield db_1.default.connect();
    const result = yield client.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    client.release();
    return result.rows[0];
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.default.connect();
    const result = yield client.query('SELECT * FROM users WHERE email = $1', [email]);
    client.release();
    if (result.rows.length === 0) {
        throw new Error('Invalid email or password');
    }
    const user = result.rows[0];
    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
    return { user, token }; // Return user and token
});
exports.loginUser = loginUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.default.connect();
    const result = yield client.query('SELECT * FROM users');
    client.release();
    return result.rows;
});
exports.getAllUsers = getAllUsers;
