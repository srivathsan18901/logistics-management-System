import jwt from 'jsonwebtoken'; 
import { config } from 'dotenv';
import { IUser } from '../models/User';

config();

export const generateToken = (user: IUser) => {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRE) {
      throw new Error('Missing JWT configuration in environment variables.');
    }

    return jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET);

    // return jwt.sign(
    //   { id: user._id, username: user.username, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: process.env.JWT_EXPIRE as string }
    // );
  };
  

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
