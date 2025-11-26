"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import AxiomExplorer from "@/components/AxiomExplorer";

export default function AxiomArchivePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      {/* Background Symbols: Math/Logic */}
      <FloatingSymbols symbols={["=", "∴", "∑", "∫", "≠", "∀", "∃", "∈", "∞"]} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="Axiom Archive"
          subtitle="The immutable laws of the universe. Interact with the formulas and principles that govern physics, economics, and logic."
        />

        {/* The Application */}
        <div className="mx-auto w-full max-w-5xl">
            <AxiomExplorer />
        </div>

      </div>
    </main>
  );
}