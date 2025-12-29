"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import OrbitalBackground from "@/app/natural-science/chemistry/OrbitalBackground";
import PeriodicTable from "@/app/natural-science/chemistry/PeriodicTable";
import ElementInspector from "@/app/natural-science/chemistry/ElementInspector";
import { motion } from "framer-motion";

type ElementType = {
  z: number;
  symbol: string;
  name: string;
  group: string;
  mass: number;
  config: string;
};

export default function PeriodicTablePage() {
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Orbital Background */}
      <OrbitalBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Chemistry"
          title="Periodic Table"
          subtitle="The map of matter. Organized by atomic structure, this table predicts the properties of every element in the universe, from the hydrogen in your water to the carbon in your DNA."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) - The Table */}
          <div className="lg:col-span-8">
             <div className="glass p-6 rounded-2xl border border-white/10 bg-neutral-900/50 overflow-hidden">
                 <PeriodicTable onSelect={setSelectedElement} />
             </div>
             <p className="mt-4 text-xs text-neutral-500 text-center">
                 *Simplified view showing representative elements from major groups.
             </p>
          </div>

          {/* SIDEBAR (4 cols) - The Inspector */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 h-fit pt-2">
             <motion.div layout>
                <ElementInspector element={selectedElement} />
             </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}