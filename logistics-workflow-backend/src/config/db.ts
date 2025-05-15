import mongoose, { Connection } from 'mongoose';
import { config } from 'dotenv';

config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be defined in your .env file');
}

let dbConnection: Connection;

export const connectDB = async (): Promise<Connection> => {
  try {
    dbConnection = await mongoose.createConnection("mongodb://localhost:27017/logistics-workflow");

    console.log(`MongoDB Connected: ${dbConnection}`);
    return dbConnection;
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

// Optional: Getter for the connection if you need to access it elsewhere
export const getDBConnection = (): Connection => {
  if (!dbConnection) {
    throw new Error('Database not initialized');
  }
  return dbConnection;
};