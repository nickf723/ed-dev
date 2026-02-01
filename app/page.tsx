'use client';

import { motion } from 'framer-motion';
import LibraryBackground from '@/app/_homepage/HomepageBackground';
import NetworkBackground from '@/app/_homepage/NetworkBackground';
import WireframeBackground from '@/app/_homepage/WireframeBackground';
import HexGrid from './_homepage/HexGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 relative selection:bg-cyan-500/30 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Layered Visual Engines */}
      <NetworkBackground />
      <LibraryBackground />
      <WireframeBackground />

      <div className="relative z-10 w-full max-w-7xl px-6 py-12 flex flex-col items-center">       
        <motion.header 
          initial={{ opacity: 0, y: 0 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center space-y-2 mb-4"
        >

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic leading-none">THE WEB</h1>
        </motion.header>

        <HexGrid />

      </div>
    </main>
  );
}