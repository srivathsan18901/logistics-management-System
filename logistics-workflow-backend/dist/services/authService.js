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
exports.register = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    if (!user || !(yield user.comparePassword(password))) {
        throw new Error('Invalid credentials');
    }
    return {
        token: (0, auth_1.generateToken)(user),
        user: {
            id: user._id,
            username: user.username,
            role: user.role
        }
    };
});
exports.login = login;
const register = (username, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User_1.default.findOne({ username });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const user = yield User_1.default.create({ username, password, role });
    return {
        token: (0, auth_1.generateToken)(user),
        user: {
            id: user._id,
            username: user.username,
            role: user.role
        }
    };
});
exports.register = register;
