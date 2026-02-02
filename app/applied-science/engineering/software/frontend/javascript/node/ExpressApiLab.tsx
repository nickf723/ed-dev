"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Play, Code, Database, Globe } from 'lucide-react';

export default function ExpressApiLab() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleRequest = () => {
    setLoading(true);
    setResponse(null);
    setLogs(p => [...p, `[INFO] GET /api/users - Incoming Request`]);

    setTimeout(() => {
        setLogs(p => [...p, `[INFO] Querying Database...`]);
        setTimeout(() => {
            setLoading(false);
            setResponse(JSON.stringify({ status: 200, data: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }] }, null, 2));
            setLogs(p => [...p, `[SUCCESS] 200 OK - 24ms`]);
        }, 800);
    }, 600);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-emerald-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row shadow-2xl">
      
      {/* LEFT: SERVER CODE */}
      <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-white/5 bg-black/40 font-mono text-xs flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold uppercase tracking-wider">
          <Code size={14} /> server.js
        </div>

        <div className="space-y-1 text-slate-400">
          <div><span className="text-purple-400">const</span> express = <span className="text-yellow-200">require</span>(<span className="text-green-300">'express'</span>);</div>
          <div><span className="text-purple-400">const</span> app = <span className="text-yellow-200">express</span>();</div>
          <br/>
          <div><span className="text-slate-500">// Define Route</span></div>
          <div>app.<span className="text-yellow-200">get</span>(<span className="text-green-300">'/api/users'</span>, (req, res) ={'>'} {'{'}</div>
          <div className="pl-4 text-slate-500">// Simulating DB Call</div>
          <div className="pl-4">
             <span className="text-purple-400">const</span> users = db.<span className="text-yellow-200">findAll</span>();
          </div>
          <div className="pl-4">
             res.<span className="text-yellow-200">json</span>(users);
          </div>
          <div>{'}'});</div>
          <br/>
          <div>app.<span className="text-yellow-200">listen</span>(3000);</div>
        </div>

        {/* Server Logs Output */}
        <div className="mt-8 flex-1 bg-black rounded p-3 text-[10px] text-slate-500 overflow-hidden flex flex-col justify-end min-h-[100px] border border-white/10">
            {logs.length === 0 && <span className="italic opacity-50">Server listening on port 3000...</span>}
            {logs.map((log, i) => (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className="text-emerald-500/80 font-mono">
                    {log}
                </motion.div>
            ))}
        </div>
      </div>

      {/* RIGHT: CLIENT TESTER */}
      <div className="w-full md:w-1/2 p-8 flex flex-col">
        <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
          <Globe size={14} /> Client (Browser / Postman)
        </div>

        <div className="flex gap-2 mb-6">
            <div className="flex-1 bg-slate-800 rounded px-3 py-2 text-xs font-mono text-white flex items-center border border-white/10">
                <span className="text-emerald-400 font-bold mr-2">GET</span>
                http://localhost:3000/api/users
            </div>
            <button 
                onClick={handleRequest}
                disabled={loading}
                className="px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-xs uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {loading ? 'Sending...' : <><Play size={12} fill="white"/> Send</>}
            </button>
        </div>

        <div className="flex-1 bg-slate-950 rounded-xl border border-white/5 p-4 relative min-h-[200px]">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            
            {response ? (
                <pre className="text-xs font-mono text-emerald-300">
                    {response}
                </pre>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                    <Database size={32} className="mb-2 opacity-20" />
                    <span className="text-xs">No Data Fetched</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}