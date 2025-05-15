"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const generateToken = (user) => {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRE) {
        throw new Error('Missing JWT configuration in environment variables.');
    }
    return jsonwebtoken_1.default.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET);
    // return jwt.sign(
    //   { id: user._id, username: user.username, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: process.env.JWT_EXPIRE as string }
    // );
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
