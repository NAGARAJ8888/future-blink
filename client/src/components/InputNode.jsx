import React from "react";
import { Handle, Position } from "reactflow";

const InputNode = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-64 border">
      <h2 className="text-sm font-semibold mb-2 text-gray-600">
        Input Prompt
      </h2>

      <textarea
        value={data.prompt}
        onChange={(e) => data.setPrompt(e.target.value)}
        placeholder="Type your question..."
        className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default InputNode;