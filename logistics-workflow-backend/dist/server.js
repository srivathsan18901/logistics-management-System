"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const socket_1 = require("./socket");
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(0, db_1.connectDB)();
// Start Express server
const server = app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Setup Socket.io
(0, socket_1.setupSocket)(server);
