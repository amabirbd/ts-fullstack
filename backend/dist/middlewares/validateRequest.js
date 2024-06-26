"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        next();
    };
};
exports.default = validateRequest;
