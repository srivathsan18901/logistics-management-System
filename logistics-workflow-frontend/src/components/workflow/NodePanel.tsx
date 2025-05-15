import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { nodeTypes } from '../../interfaces/workflow';

const NodePanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Paper sx={{ width: 250, p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Nodes
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.entries(nodeTypes).map(([type, label]) => (
          <Box
            key={type}
            sx={{
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 1,
              cursor: 'grab',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
            draggable
            onDragStart={(event) => onDragStart(event, type)}
          >
            {label}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default NodePanel;