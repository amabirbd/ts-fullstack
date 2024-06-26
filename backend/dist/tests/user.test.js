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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const db_1 = __importDefault(require("../config/db"));
describe('User API', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create the users table before running tests
        yield db_1.default.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clean up the database and close the pool
        yield db_1.default.query('DROP TABLE IF EXISTS users');
        yield db_1.default.end();
    }));
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send({
            email: 'test@example.com',
            password: 'password123'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email', 'test@example.com');
    }));
    it('should login an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        // First, register a new user
        yield (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send({
            email: 'test2@example.com',
            password: 'password123'
        });
        // Then, login with the registered user's credentials
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({
            email: 'test2@example.com',
            password: 'password123'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Login successful');
    }));
    it('should fetch all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    }));
});
