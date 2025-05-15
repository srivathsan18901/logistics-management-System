import mongoose, { Document } from 'mongoose';

export interface INode {
  id: string;
  type: 'start' | 'task' | 'decision' | 'end';
  data: {
    label: string;
    [key: string]: any;
  };
  position: { x: number; y: number };
}

export interface ITransition {
  id: string;
  source: string;
  target: string;
  condition?: string;
}

export interface IWorkflow extends Document {
  name: string;
  nodes: INode[];
  transitions: ITransition[];
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const WorkflowSchema = new mongoose.Schema<IWorkflow>(
  {
    name: { type: String, required: true },
    nodes: [
      {
        id: String,
        type: String,
        data: Object,
        position: Object
      }
    ],
    transitions: [
      {
        id: String,
        source: String,
        target: String,
        condition: String
      }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model<IWorkflow>('Workflow', WorkflowSchema);