"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import UnitConverter from "@/components/UnitConverter";
import WikiPortal from "@/components/WIkiPortal"; // Re-use the portal here too!
import { PenTool } from "lucide-react";

export default function ToolboxPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      <FloatingSymbols symbols={["%", "kg", "m/s", "0101", "∑", "π", "RGB"]} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="Student Toolbox"
          subtitle="Utility modules for calculation, conversion, and connection. Tools to help you process the data you find."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            
            {/* LEFT: Utilities */}
            <div className="lg:col-span-4 space-y-8">
                <UnitConverter />
                
                {/* Placeholder for future tools */}
                <div className="p-6 rounded-xl border border-dashed border-white/10 bg-white/5 text-center">
                    <PenTool className="mx-auto mb-3 text-neutral-600" />
                    <p className="text-xs text-neutral-500">Citation Machine & Graph Plotter<br/>(Coming Soon)</p>
                </div>
            </div>

            {/* RIGHT: The Graph */}
            <div className="lg:col-span-8">
                <KnowledgeGraph />
                
                <div className="mt-8 p-6 rounded-xl border border-white/10 bg-neutral-900/50">
                    <h3 className="text-lg font-bold text-white mb-2">System Topology</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        This graph represents the real-time interconnections between the <strong>{Object.keys(require('@/lib/glossary-db').glossaryTerms).length}</strong> definitions, 
                        <strong> {require('@/lib/axiom-db').AXIOM_LIBRARY.length}</strong> laws, and 
                        <strong> {require('@/lib/asset-db').ASSET_LIBRARY.length}</strong> assets currently loaded in the Knowledge Network.
                    </p>
                </div>
            </div>

        </div>

      </div>
    </main>
  );
}