import app from './app';
import dotenv from 'dotenv';
import { createUserTable } from './services/userService';

dotenv.config();

const PORT = process.env.PORT || 3000;

createUserTable();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
