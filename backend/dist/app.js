"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controllers/userController");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Adjust as needed, e.g., secure: true for HTTPS
}));
app.post('/register', userController_1.register);
app.post('/login', userController_1.login);
app.get('/users', userController_1.getUsers);
app.get('/protected', isAuthenticated_1.requireAuth, (req, res) => {
    // Access protected data
    res.json({ message: 'Access granted', user: req.user });
});
exports.default = app;
