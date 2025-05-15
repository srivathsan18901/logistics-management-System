import Workflow from '../models/Workflow';
import Task from '../models/Task';
import { IWorkflow, INode, ITransition } from '../models/Workflow';
import { ITask } from '../models/Task';

export const createWorkflow = async (workflowData: Omit<IWorkflow, 'createdAt' | 'updatedAt'>, userId: string) => {
  const workflow = await Workflow.create({
    ...workflowData,
    createdBy: userId
  });
  
  return workflow;
};

export const getWorkflowById = async (id: string) => {
  return await Workflow.findById(id).populate('createdBy', 'username');
};

export const executeWorkflow = async (workflowId: string) => {
  const workflow = await Workflow.findById(workflowId);
  if (!workflow) throw new Error('Workflow not found');
  
  // Find the start node
  const startNode = workflow.nodes.find(node => node.type === 'start');
  if (!startNode) throw new Error('No start node found');
  
  // Create initial task
  const task = await Task.create({
    workflowId,
    nodeId: startNode.id,
    status: 'pending'
  });
  
  return task;
};

export const updateTaskStatus = async (taskId: string, status: ITask['status'], metadata?: any) => {
  const updateData: any = { status };
  
  if (status === 'in-progress') {
    updateData.startedAt = new Date();
  } else if (status === 'completed' || status === 'failed') {
    updateData.completedAt = new Date();
  }
  
  if (metadata) {
    updateData.metadata = metadata;
  }
  
  const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
  return task;
};

export const getTasksByWorkflow = async (workflowId: string) => {
  return await Task.find({ workflowId }).sort({ createdAt: -1 });
};