import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../interfaces/RequestWithUser.interface';


// Define a middleware to check if the user is authenticated
const requireAuth = (req: RequestWithUser, res: Response, next: NextFunction) => {
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
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            // Store decoded token data in request object
            req.user = decoded as { userId: string }; // Cast decoded token data to user property
            next(); // Pass control to the next middleware
        }
    });
};

export { RequestWithUser, requireAuth };
