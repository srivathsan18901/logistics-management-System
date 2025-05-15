import mongoose, { Document } from 'mongoose';

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export interface ITask extends Document {
  workflowId: mongoose.Schema.Types.ObjectId;
  nodeId: string;
  status: TaskStatus;
  assignedTo?: string;
  metadata?: any;
  startedAt?: Date;
  completedAt?: Date;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    workflowId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow', required: true },
    nodeId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed', 'failed'], default: 'pending' },
    assignedTo: String,
    metadata: Object,
    startedAt: Date,
    completedAt: Date
  },
  { timestamps: true }
);

// Indexes for faster queries
TaskSchema.index({ workflowId: 1 });
TaskSchema.index({ status: 1 });

export default mongoose.model<ITask>('Task', TaskSchema);