import { Request, Response } from 'express';
import { registerUser, loginUser, getAllUsers } from '../services/userService';

const register = async (req: Request, res: Response) => {

    console.log("body: ", req.body);
    const { email, password } = req.body;
    try {
        const user = await registerUser(email, password);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        res.status(200).send({
            message: 'Login successful',
            user
        });
    } catch (err: any) {
        console.error(err);
        res.status(400).send(err.message);
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
};

const home = async (req: Request, res: Response) => {
    try {
        
        res.status(200).send("Hello from HOME");
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
};

export { register, login, getUsers, home };
