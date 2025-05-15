import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'admin' | 'operator';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'operator'], default: 'operator' }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);