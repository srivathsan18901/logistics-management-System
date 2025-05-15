import { apiClient } from './client';

export const WorkflowService = {
  createWorkflow: async (workflowData: any) => {
    const response = await apiClient.post('/workflows', workflowData);
    return response.data;
  },
  getWorkflow: async (id: string) => {
    const response = await apiClient.get(`/workflows/${id}`);
    return response.data;
  },
  executeWorkflow: async (id: string) => {
    const response = await apiClient.post(`/workflows/${id}/execute`);
    return response.data;
  },
  getWorkflowTasks: async (id: string) => {
    const response = await apiClient.get(`/workflows/${id}/tasks`);
    return response.data;
  },
  updateTaskStatus: async (taskId: string, status: string, metadata?: any) => {
    const response = await apiClient.put(`/workflows/tasks/${taskId}`, { status, metadata });
    return response.data;
  },
};