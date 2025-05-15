import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import Task from './models/Task';

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
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
  Task.watch().on('change', (change) => {
    if (change.operationType === 'insert' || change.operationType === 'update') {
      const task = change.fullDocument;
      io.to(task.workflowId.toString()).emit('taskUpdate', task);
    }
  });

  return io;
};