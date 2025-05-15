"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const socket_io_1 = require("socket.io");
const Task_1 = __importDefault(require("./models/Task"));
const setupSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('New client connected');
        // Join a workflow room
        socket.on('joinWorkflow', (workflowId) => {
            socket.join(workflowId);
            console.log(`Client joined workflow ${workflowId}`);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
    // Listen for task updates and emit events
    Task_1.default.watch().on('change', (change) => {
        if (change.operationType === 'insert' || change.operationType === 'update') {
            const task = change.fullDocument;
            io.to(task.workflowId.toString()).emit('taskUpdate', task);
        }
    });
    return io;
};
exports.setupSocket = setupSocket;
