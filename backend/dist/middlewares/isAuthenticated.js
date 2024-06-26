"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define a middleware to check if the user is authenticated
const requireAuth = (req, res, next) => {
    // Check if Authorization header exists
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    // Extract token from Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    // Verify JWT token
    jsonwebtoken_1.default.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        else {
            // Store decoded token data in request object
            req.user = decoded; // Cast decoded token data to user property
            next(); // Pass control to the next middleware
        }
    });
};
exports.requireAuth = requireAuth;
