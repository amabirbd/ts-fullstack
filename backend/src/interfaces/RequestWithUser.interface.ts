import { Request as ExpressRequest, Request } from 'express';

// Define a custom interface by extending Express's Request interface
export interface RequestWithUser extends ExpressRequest {
    user?: { userId: string }; // Define a user property with userId
}
