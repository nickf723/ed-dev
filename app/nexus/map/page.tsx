"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import NexusAtlas from "@/components/NexusAtlas";

export default function AtlasPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      <FloatingSymbols symbols={["N", "S", "E", "W", "LAT", "LONG", "⊕", "⊚"]} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="Knowledge Atlas"
          subtitle="A cartographic view of the academic landscape. Navigate the districts of human understanding."
        />

        <div className="mt-8">
            <NexusAtlas />
        </div>

        {/* Context Block */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-white/10 bg-neutral-900/50">
                <h3 className="text-sm font-bold text-white mb-2">The Formal North</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                    The realm of pure logic and structure. Here, Mathematics and Computer Science build the frameworks that the rest of the map relies upon.
                </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-neutral-900/50">
                <h3 className="text-sm font-bold text-white mb-2">The Natural West</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                    The domain of physical reality. Physics, Chemistry, and Biology explore the rules of the universe and life itself.
                </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-neutral-900/50">
                <h3 className="text-sm font-bold text-white mb-2">The Social South</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                    The complex web of human interaction. Economics, Psychology, and History chart the behaviors of the human animal.
                </p>
            </div>
        </div>

      </div>
    </main>
  );
}