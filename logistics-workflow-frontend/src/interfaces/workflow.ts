// Define types for workflow nodes and transitions
export type NodeType = 'start' | 'task' | 'decision' | 'end' | 'custom';

export interface INode {
  id: string;
  type: NodeType;
  data: {
    label: string;
    [key: string]: any;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface ITransition {
  id: string;
  source: string;
  target: string;
  condition?: string;
}

export interface IWorkflow {
  _id: string;
  name: string;
  nodes: INode[];
  transitions: ITransition[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITask {
  _id: string;
  workflowId: string;
  nodeId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedTo?: string;
  metadata?: any;
  startedAt?: string;
  completedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Node types configuration for NodePanel
export const nodeTypes = {
  start: 'Start Node',
  task: 'Task Node',
  decision: 'Decision Node',
  end: 'End Node',
  custom: 'Custom Node'
};

export type NodeTypesKey = keyof typeof nodeTypes;