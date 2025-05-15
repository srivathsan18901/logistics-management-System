import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import CustomNode from '../components/workflow/CustomNode';
import { WorkflowService } from '../api/workflow';
import NodePanel from '../components/workflow/NodePanel';
import { useAuth } from '../contexts/AuthContext';

const nodeTypes = {
  custom: CustomNode,
};

const WorkflowEditorPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX,
        y: event.clientY,
      };

      const newNode: Node = {
        id: `${Date.now()}`,
        type: 'custom',
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const handleSaveWorkflow = async () => {
    try {
      const workflowData = {
        name: workflowName,
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.data.type || 'task',
          data: node.data,
          position: node.position,
        })),
        transitions: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      };

      await WorkflowService.createWorkflow(workflowData);
      navigate('/');
    } catch (error) {
      console.error('Failed to save workflow:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <NodePanel />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Create New Workflow</Typography>
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="Workflow name"
          />
          <Button variant="contained" onClick={handleSaveWorkflow}>
            Save Workflow
          </Button>
        </Box>
        <Box sx={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkflowEditorPage;