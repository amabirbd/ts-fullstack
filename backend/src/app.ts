import express from 'express';
import cors from 'cors';
import { register, login, getUsers, home } from './controllers/userController';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { RequestWithUser, requireAuth } from './middlewares/isAuthenticated';

const app = express();

const corsOptions = {
    origin: process.env.CORS_ALLOWED_ORIGINS || '*', // Default to allow all origins
  };
  
app.use(cors(corsOptions));

  
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.post('/register', register);
app.post('/login', login);
app.get('/users', getUsers);
app.get('/home', home);

app.get('/protected', requireAuth, (req: RequestWithUser, res) => {
    // Access protected data
    res.json({ message: 'Access granted', user: req.user });
});
 
export default app;
