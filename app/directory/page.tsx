"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import DomainExplorer from "@/components/DomainExplorer";

export default function DirectoryPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      <FloatingSymbols symbols={["N", "S", "E", "W", "LAT", "LONG", "⊕", "⊚"]} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="System Map"
          title="The Directory"
          subtitle="The organizational structure of the Knowledge Network. Explore the six primary sectors of human understanding."
        />

        <div className="mt-12">
            <DomainExplorer />
        </div>

      </div>
    </main>
  );
}