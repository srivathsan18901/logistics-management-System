import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Chip,
  Button
} from '@mui/material';
import { WorkflowService } from '../api/workflow';

const WorkflowViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workflow, setWorkflow] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const fetchWorkflow = async () => {
      const workflowData = await WorkflowService.getWorkflow(id!);
      setWorkflow(workflowData);
      const tasksData = await WorkflowService.getWorkflowTasks(id!);
      setTasks(tasksData);
    };

    fetchWorkflow();

    // Initialize WebSocket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinWorkflow', id);

    socket.on('taskUpdate', (updatedTask: any) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on('initialTasks', (initialTasks: any[]) => {
      setTasks(initialTasks);
    });

    return () => {
      socket.off('taskUpdate');
      socket.off('initialTasks');
    };
  }, [socket, id]);

  const handleExecuteWorkflow = async () => {
    await WorkflowService.executeWorkflow(id!);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {workflow?.name}
      </Typography>
      <Button variant="contained" onClick={handleExecuteWorkflow} sx={{ mb: 3 }}>
        Execute Workflow
      </Button>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Workflow Nodes
          </Typography>
          {/* Visual representation of the workflow */}
        </Paper>

        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Task Status
          </Typography>
          <List>
            {tasks.map((task) => (
              <ListItem key={task._id}>
                <ListItemText
                  primary={`Task ${task.nodeId}`}
                  secondary={`Status: ${task.status}`}
                />
                <Chip label={task.status} color={getStatusColor(task.status)} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default WorkflowViewPage;