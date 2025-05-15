import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
      <div className="flex">
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default CustomNode;