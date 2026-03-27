import React from "react";
import { Handle, Position } from "reactflow";

const ResultNode = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-64 border">
      <h2 className="text-sm font-semibold mb-2 text-gray-600">
        AI Response
      </h2>

      <div className="text-sm text-gray-800 whitespace-pre-wrap">
        {data.result || "Result will appear here..."}
      </div>

      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default ResultNode;