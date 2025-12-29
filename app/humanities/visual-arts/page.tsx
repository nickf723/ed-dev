"use client";
import Link from "next/link";
import FluidBackground from "@/app/humanities/visual-arts/FluidBackground";
import ChromaEngine from "@/app/humanities/visual-arts/ChromaEngine";
import { 
  ArrowLeft, Palette, Eye, PenTool, Image as ImageIcon, 
  Box, Layers, Maximize, Move 
} from "lucide-react";

export default function VisualArtsPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-fuchsia-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <FluidBackground />
      
      {/* OVERLAY: Grain */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto">
             <Link href="/humanities" className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Humanities // Arts
             </Link>
             <div className="flex items-center gap-4">
                 <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                    <Eye size={32} className="text-white" />
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-xl font-serif italic">
                    VISUAL ARTS
                 </h1>
             </div>
             <p className="mt-4 text-neutral-400 max-w-xl text-lg border-l-2 border-white/20 pl-4 font-light">
                 The organization of line, shape, and color to express the inexpressible.
             </p>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE LANGUAGE OF ART */}
            <div className="lg:col-span-7 space-y-12">
                
                {/* ELEMENTS SECTION */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-2">
                        <Layers size={20} /> The Elements of Art
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <ElementCard title="Line" desc="A path created by a moving point." icon={PenTool} />
                        <ElementCard title="Shape" desc="A 2D enclosed area." icon={Box} />
                        <ElementCard title="Color" desc="Light reflected off objects." icon={Palette} />
                        <ElementCard title="Texture" desc="Surface quality (tactile or visual)." icon={Layers} />
                        <ElementCard title="Value" desc="Lightness or darkness of tones." icon={Eye} />
                        <ElementCard title="Space" desc="Perspective and depth." icon={Maximize} />
                    </div>
                </section>

                {/* PRINCIPLES SECTION */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-2">
                        <Move size={20} /> Principles of Design
                    </h2>
                    <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                        If the elements are the "words," the principles are the "grammar"—how we organize the elements to create meaning.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Balance", "Contrast", "Emphasis", "Movement", "Pattern", "Rhythm", "Unity"].map((p) => (
                            <span key={p} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm hover:bg-white/10 transition-colors cursor-default">
                                {p}
                            </span>
                        ))}
                    </div>
                </section>

            </div>


            {/* RIGHT: INTERACTIVE TOOLS */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* COLOR THEORY WIDGET */}
                <ChromaEngine />

                {/* MEDIUMS CARD */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <ImageIcon size={18} /> Major Mediums
                    </h3>
                    <div className="space-y-3">
                        <MediumRow title="Painting" desc="Oil, Acrylic, Watercolor, Fresco" />
                        <MediumRow title="Sculpture" desc="Stone, Bronze, Clay, Wood" />
                        <MediumRow title="Digital" desc="Vector, Raster, 3D Modeling" />
                        <MediumRow title="Printmaking" desc="Etching, Lithography, Screenprint" />
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}

// Helper Components
function ElementCard({ title, desc, icon: Icon }: any) {
    return (
        <div className="p-4 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors group">
            <Icon size={20} className="text-neutral-500 group-hover:text-white mb-2 transition-colors" />
            <div className="font-bold text-sm text-white">{title}</div>
            <div className="text-[10px] text-neutral-400 leading-tight mt-1">{desc}</div>
        </div>
    )
}

function MediumRow({ title, desc }: any) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
            <span className="text-sm font-bold text-neutral-200">{title}</span>
            <span className="text-xs text-neutral-500 font-mono text-right">{desc}</span>
        </div>
    )
}