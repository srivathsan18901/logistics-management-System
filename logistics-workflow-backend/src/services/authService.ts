import User from '../models/User';
import { generateToken } from '../utils/auth';

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  
  return {
    token: generateToken(user),
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  };
};

export const register = async (username: string, password: string, role: 'admin' | 'operator') => {
  const existingUser = await User.findOne({ username });
  
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  const user = await User.create({ username, password, role });
  
  return {
    token: generateToken(user),
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  };
};