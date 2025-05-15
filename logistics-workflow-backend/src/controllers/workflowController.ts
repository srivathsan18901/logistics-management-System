import { Request, Response } from 'express';
import * as workflowService from '../services/workflowService';
import { AuthenticatedRequest } from '../middlewares/auth';


export const createWorkflow = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const workflow = await workflowService.createWorkflow(req.body, req.user?.id);
    res.status(201).json(workflow);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getWorkflow = async (req: Request, res: Response) => {
  try {
    const workflow = await workflowService.getWorkflowById(req.params.id);
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json(workflow);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const executeWorkflow = async (req: Request, res: Response) => {
  try {
    const task = await workflowService.executeWorkflow(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { status, metadata } = req.body;
    const task = await workflowService.updateTaskStatus(req.params.id, status, metadata);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getWorkflowTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await workflowService.getTasksByWorkflow(req.params.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};