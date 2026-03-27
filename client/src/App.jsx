import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import InputNode from "./components/InputNode";
import ResultNode from "./components/ResultNode";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "inputNode",
      position: { x: 50, y: 100 },
      data: { prompt: "", setPrompt: () => {} },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 450, y: 100 },
      data: { result: "" },
    },
  ]);

  const edges = [
    { 
      id: "e1-2", 
      source: "1", 
      target: "2", 
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 }
    }
  ];

  // Sync state to nodes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1") {
          return { ...node, data: { ...node.data, prompt, setPrompt } };
        }
        if (node.id === "2") {
          return { ...node, data: { ...node.data, result } };
        }
        return node;
      })
    );
  }, [prompt, result]);

  const runFlow = async () => {
    if (!prompt) return toast.error("Please enter a prompt in the Input Node!");
    setIsLoading(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const res = await axios.post(`${API_BASE_URL}/api/ai/ask-ai`, { prompt });
      setResult(res.data.result);
      toast.success("AI request successful!");
    } catch (err) {
      console.error(err);
      toast.error("AI request failed. Check your server and API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    if (!result) return toast.error("Nothing to save yet!");
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try {
      await axios.post(`${API_BASE_URL}/api/ai/save`, {
        prompt,
        response: result,
      });
      toast.success("Conversation saved to database!");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
      <Toaster position="bottom-left" />
      {/* Modern Header */}
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-blue-200 shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">AI Flow Builder</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-tight uppercase mt-0.5">Visual prompt engineering</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={saveData}
            className="px-4 py-2 text-xs font-semibold cursor-pointer text-slate-600 hover:text-slate-900 transition-colors"
          >
            Save to DB
          </button>
          <button
            onClick={runFlow}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Thinking...</span>
              </>
            ) : (
              <span>Run Pipeline</span>
            )}
          </button>
        </div>
      </header>

      {/* Canvas Area */}
      <main className="flex-1 relative">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-50"
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls />
        </ReactFlow>
        
        {/* Subtle overlay info */}
        <div className="absolute bottom-6 right-6 pointer-events-none">
          <div className="bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-slate-400 font-medium">Node Status: <span className="text-emerald-500 italic">Ready</span></p>
          </div>
        </div>
      </main>
    </div>
  );
}
