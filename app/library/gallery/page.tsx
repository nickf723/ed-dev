"use client";
import PageHeader from "@/components/PageHeader";
import StudioBackground from "@/components/StudioBackground"; // NEW BACKGROUND
import AssetBrowser from "@/components/AssetBrowser";

export default function AssetGalleryPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      {/* 1. VISUAL ENGINE: Darkroom Studio */}
      <StudioBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="Asset Gallery"
          subtitle="A curated collection of interactive models, simulations, and diagrams. Explore the visual tools used to explain the universe."
        />

        {/* The Application */}
        <AssetBrowser />

      </div>
    </main>
  );
}