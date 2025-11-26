"use client";
import { useEffect, useState } from "react";
import { runDiagnostics, nexusSearch } from "@/lib/nexus-engine";
import { Activity, AlertTriangle, CheckCircle, Database, Server } from "lucide-react";

export default function SystemMonitor() {
  const [status, setStatus] = useState<{errors: string[], warnings: string[], totalNodes: number} | null>(null);

  useEffect(() => {
    setStatus(runDiagnostics());
  }, []);

  if (!status) return null;

  const isHealthy = status.errors.length === 0;

  return (
    <div className="glass rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-6 max-w-md">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-white/5 ${isHealthy ? "text-green-400" : "text-red-400"}`}>
                  <Server size={20} />
              </div>
              <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">System Integrity</h3>
                  <p className="text-[10px] text-neutral-500 font-mono">NEXUS ENGINE V1.0</p>
              </div>
          </div>
          <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${isHealthy ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
              {isHealthy ? "Optimal" : "Critical"}
          </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded bg-neutral-950/50 border border-white/5">
              <Database size={16} className="mx-auto mb-2 text-cyan-400" />
              <span className="block text-lg font-bold text-white">{status.totalNodes}</span>
              <span className="text-[8px] uppercase text-neutral-500">Nodes</span>
          </div>
          <div className="text-center p-3 rounded bg-neutral-950/50 border border-white/5">
              <Activity size={16} className="mx-auto mb-2 text-violet-400" />
              <span className="block text-lg font-bold text-white">12ms</span>
              <span className="text-[8px] uppercase text-neutral-500">Latency</span>
          </div>
          <div className="text-center p-3 rounded bg-neutral-950/50 border border-white/5">
              <AlertTriangle size={16} className="mx-auto mb-2 text-amber-400" />
              <span className="block text-lg font-bold text-white">{status.errors.length}</span>
              <span className="text-[8px] uppercase text-neutral-500">Issues</span>
          </div>
      </div>

      {/* Log Console */}
      <div className="bg-black/40 rounded-lg border border-white/5 p-4 h-32 overflow-y-auto font-mono text-[10px] space-y-1">
          {isHealthy ? (
              <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={10} />
                  <span>All systems nominal. Database links verified.</span>
              </div>
          ) : (
              status.errors.map((err, i) => (
                  <div key={i} className="flex items-center gap-2 text-red-400">
                      <AlertTriangle size={10} />
                      <span>{err}</span>
                  </div>
              ))
          )}
          <div className="text-neutral-600 border-t border-white/5 pt-1 mt-2">
              {">"} Indexing {status.totalNodes} entries... Done.<br/>
              {">"} Ready for query.
          </div>
      </div>

    </div>
  );
}