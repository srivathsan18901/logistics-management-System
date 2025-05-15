import app from './app';
import { connectDB } from './config/db';
import { setupSocket } from './socket';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Setup Socket.io
setupSocket(server);