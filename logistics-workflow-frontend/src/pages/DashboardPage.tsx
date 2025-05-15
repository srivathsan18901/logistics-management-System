import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { WorkflowService } from '../api/workflow';

interface Workflow {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  nodes: any[];
  transitions: any[];
}

const DashboardPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkflows: 0,
    activeWorkflows: 0,
    nodesCount: 0
  });
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        // In a real app, you would call your API here
        // const response = await WorkflowService.getAllWorkflows();
        // setWorkflows(response.data);
        
        // Mock data for demonstration
        const mockWorkflows: Workflow[] = [
          {
            _id: '1',
            name: 'Delivery Process',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            nodes: [
              { id: '1', type: 'start', data: { label: 'Start' } },
              { id: '2', type: 'task', data: { label: 'Assign Driver' } },
              { id: '3', type: 'task', data: { label: 'Package Delivery' } },
              { id: '4', type: 'end', data: { label: 'End' } }
            ],
            transitions: [
              { from: '1', to: '2' },
              { from: '2', to: '3' },
              { from: '3', to: '4' }
            ]
          },
          {
            _id: '2',
            name: 'Inventory Check',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
            nodes: [
              { id: '1', type: 'start', data: { label: 'Start' } },
              { id: '2', type: 'task', data: { label: 'Check Stock' } },
              { id: '3', type: 'decision', data: { label: 'Low Stock?' } },
              { id: '4', type: 'task', data: { label: 'Order More' } },
              { id: '5', type: 'end', data: { label: 'End' } }
            ],
            transitions: [
              { from: '1', to: '2' },
              { from: '2', to: '3' },
              { from: '3', to: '4', condition: 'lowStock' },
              { from: '3', to: '5', condition: '!lowStock' },
              { from: '4', to: '5' }
            ]
          }
        ];
        
        setWorkflows(mockWorkflows);
        
        // Calculate stats
        const nodesCount = mockWorkflows.reduce(
          (sum, workflow) => sum + workflow.nodes.length, 0
        );
        
        setStats({
          totalWorkflows: mockWorkflows.length,
          activeWorkflows: mockWorkflows.length, // In real app, you'd filter by status
          nodesCount
        });
      } catch (error) {
        console.error('Failed to fetch workflows:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkflows();
  }, []);

  const handleDelete = async (id: string) => {
    // In a real app, you would call your API here
    // await WorkflowService.deleteWorkflow(id);
    setWorkflows(workflows.filter(wf => wf._id !== id));
    setStats(prev => ({
      ...prev,
      totalWorkflows: prev.totalWorkflows - 1,
      activeWorkflows: prev.activeWorkflows - 1
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Box>
          <Typography variant="subtitle1">
            Welcome, {user?.username} ({user?.role})
          </Typography>
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            onClick={logout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box 
  sx={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: 3, 
    mb: 4 
  }}
>
  <Box sx={{ flex: '1 1 300px' }}>
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Total Workflows
        </Typography>
        <Typography variant="h3">{stats.totalWorkflows}</Typography>
      </CardContent>
    </Card>
  </Box>

  <Box sx={{ flex: '1 1 300px' }}>
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Active Workflows
        </Typography>
        <Typography variant="h3">{stats.activeWorkflows}</Typography>
      </CardContent>
    </Card>
  </Box>

  <Box sx={{ flex: '1 1 300px' }}>
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Total Nodes
        </Typography>
        <Typography variant="h3">{stats.nodesCount}</Typography>
      </CardContent>
    </Card>
  </Box>
</Box>


      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="contained" 
          component={Link}
          to="/workflows/new"
        >
          Create New Workflow
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Workflows
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Nodes</TableCell>
                <TableCell>Transitions</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow key={workflow._id}>
                  <TableCell>
                    <Link to={`/workflows/${workflow._id}`}>
                      {workflow.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={workflow.nodes.length} 
                      color="primary" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={workflow.transitions.length} 
                      color="secondary" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(workflow.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/workflows/${workflow._id}`}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    {user?.role === 'admin' && (
                      <Button
                        color="error"
                        size="small"
                        onClick={() => handleDelete(workflow._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DashboardPage;