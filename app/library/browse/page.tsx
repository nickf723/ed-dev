"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols"; // Or use GlyphBackground for extra flair
import LibraryStorefront from "@/components/LibraryStoreFront";
import { BookOpen } from "lucide-react";

export default function LibraryBrowsePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      {/* Optional: Re-use GlyphBackground here if you want the "Matrix" feel, otherwise symbols */}
      <FloatingSymbols symbols={["A", "文", "Ω", "א", "あ", "世", "書", "Data", "Item", "Code"]} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="Universal Library"
          subtitle="An index of concepts, objects, and ideas across languages and cultures. Browse the inventory of human understanding."
        />

        {/* The Application */}
        <LibraryStorefront />

      </div>
    </main>
  );
}