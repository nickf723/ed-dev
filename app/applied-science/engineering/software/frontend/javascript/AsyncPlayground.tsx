"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, Loader2, CheckCircle, AlertOctagon, Wifi } from 'lucide-react';

export default function AsyncPlayground() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'resolved' | 'rejected'>('idle');
  const [data, setData] = useState<string | null>(null);

  const handleFetch = async () => {
    setStatus('pending');
    setData(null);

    // Simulate Network Delay
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success
      if (success) {
        setStatus('resolved');
        setData('{ "id": 1, "user": "Neo", "role": "The One" }');
      } else {
        setStatus('rejected');
        setData('Error: 404 Matrix Not Found');
      }
    }, 2000);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-yellow-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT: CODE VIEW */}
      <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-white/5 font-mono text-xs flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-slate-500">
          <Terminal size={14} />
          <span>script.js</span>
        </div>

        <div className="space-y-1 text-slate-300">
          <div className="text-purple-400">async function <span className="text-yellow-400">getData</span>() {'{'}</div>
          <div className="pl-4">
             <span className="text-slate-500">// 1. Start Request</span>
          </div>
          <div className={`pl-4 transition-colors ${status === 'pending' ? 'bg-yellow-500/20 text-yellow-200' : ''}`}>
             const res = <span className="text-purple-400">await</span> fetch('/api/user');
          </div>
          <div className="pl-4">
             <span className="text-slate-500">// 2. Wait for Data...</span>
          </div>
          <div className={`pl-4 transition-colors ${status === 'resolved' ? 'bg-emerald-500/20 text-emerald-200' : ''}`}>
             const data = <span className="text-purple-400">await</span> res.json();
          </div>
          <div className={`pl-4 transition-colors ${status === 'rejected' ? 'bg-red-500/20 text-red-200' : ''}`}>
             console.log(data);
          </div>
          <div className="text-purple-400">{'}'}</div>
        </div>

        <button 
            onClick={handleFetch}
            disabled={status === 'pending'}
            className="mt-8 flex items-center justify-center gap-2 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {status === 'pending' ? <Loader2 className="animate-spin" size={16}/> : <Play size={16}/>}
            {status === 'pending' ? 'Fetching...' : 'Run Function'}
        </button>
      </div>

      {/* RIGHT: RUNTIME VISUALIZER */}
      <div className="w-full md:w-1/2 p-8 bg-[url('/grid-pattern.svg')] bg-slate-950 flex flex-col items-center justify-center relative">
        <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1">
            <Wifi size={10} /> Network Status
        </div>

        <AnimatePresence mode="wait">
            {status === 'idle' && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-slate-600 text-center"
                >
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 mx-auto mb-4 animate-spin-slow" />
                    <p className="text-xs">Waiting for execution...</p>
                </motion.div>
            )}

            {status === 'pending' && (
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }}
                    className="text-yellow-400 text-center"
                >
                    <Loader2 size={48} className="mx-auto mb-4 animate-spin" />
                    <p className="text-xs font-mono">Promise {`<Pending>`}</p>
                </motion.div>
            )}

            {status === 'resolved' && (
                <motion.div 
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="w-full bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl"
                >
                    <div className="flex items-center gap-2 text-emerald-400 mb-2 font-bold text-sm">
                        <CheckCircle size={16} /> Promise Resolved
                    </div>
                    <pre className="text-[10px] font-mono text-emerald-200 overflow-x-auto">
                        {data}
                    </pre>
                </motion.div>
            )}

            {status === 'rejected' && (
                <motion.div 
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="w-full bg-red-950/30 border border-red-500/30 p-4 rounded-xl"
                >
                    <div className="flex items-center gap-2 text-red-400 mb-2 font-bold text-sm">
                        <AlertOctagon size={16} /> Promise Rejected
                    </div>
                    <pre className="text-[10px] font-mono text-red-200">
                        {data}
                    </pre>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}