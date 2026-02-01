"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileJson, AlertCircle, CheckCircle } from 'lucide-react';

export default function InterfaceLab() {
  const [code, setCode] = useState('{\n  "id": 1,\n  "username": "Dev1"\n}');
  
  // The "Contract"
  const required = {
    id: 'number',
    username: 'string',
    isAdmin: 'boolean'
  };

  type User = {
    id?: number;
    username?: string;
    isAdmin?: boolean;
  };

  let error: string | null = null;
  let parsed: User = {};

  try {
    parsed = JSON.parse(code) as User;
    // Check types
    if (typeof parsed.id !== 'number') error = "Property 'id' must be of type number.";
    else if (typeof parsed.username !== 'string') error = "Property 'username' must be of type string.";
    else if (typeof parsed.isAdmin !== 'boolean') error = "Property 'isAdmin' is missing or not boolean.";
  } catch (e) {
    error = "Syntax Error: Invalid JSON format.";
  }

  return (
    <div className="w-full bg-slate-900/90 border border-blue-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT: THE INTERFACE DEFINITION */}
      <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-white/5 bg-black/20">
        <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-xs uppercase tracking-wider">
          <FileJson size={14} /> Interface Definition
        </div>
        <div className="font-mono text-xs leading-relaxed">
          <span className="text-purple-400">interface</span> <span className="text-yellow-200">User</span> {'{'}
          <div className="pl-4 text-slate-300">
            id: <span className="text-blue-400">number</span>;
          </div>
          <div className="pl-4 text-slate-300">
            username: <span className="text-blue-400">string</span>;
          </div>
          <div className="pl-4 text-slate-300">
            isAdmin: <span className="text-blue-400">boolean</span>;
          </div>
          {'}'}
        </div>
      </div>

      {/* RIGHT: THE IMPLEMENTATION (Editor) */}
      <div className="w-full md:w-2/3 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">const user: User = ...</span>
            {error ? (
                <span className="flex items-center gap-1 text-[10px] text-red-400 font-mono"><AlertCircle size={10}/> Type Error</span>
            ) : (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono"><CheckCircle size={10}/> Compiles</span>
            )}
        </div>
        
        <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full h-32 bg-slate-800 rounded p-4 font-mono text-xs text-white outline-none border transition-colors ${error ? 'border-red-500/50' : 'border-emerald-500/50'}`}
        />

        <AnimatePresence>
            {error && (
                <motion.div 
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-3 text-[10px] font-mono text-red-300 bg-red-900/20 p-2 rounded border border-red-500/20"
                >
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}