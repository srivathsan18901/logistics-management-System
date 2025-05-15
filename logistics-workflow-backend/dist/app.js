"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const workflowRoutes_1 = __importDefault(require("./routes/workflowRoutes"));
(0, dotenv_1.config)(); // Load environment variables
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/workflows', workflowRoutes_1.default);
// Simple route for health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
exports.default = app;
