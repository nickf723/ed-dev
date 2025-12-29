"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ScaleNavigator from "@/app/natural-science/ScaleNavigator";
import DomainHUD, { DomainData } from "@/app/natural-science/DomainHUD";
import { 
  AstronomySimulation, 
  EarthSimulation, 
  BiologySimulation, 
  ChemistrySimulation, 
  PhysicsSimulation 
} from "@/app/natural-science/ScienceSimulations";

// --- CONTENT DATA ---
// This is the "Generic Content" mapped to specific domains
const domainContent: Record<string, DomainData> = {
  astronomy: {
    id: "astronomy",
    title: "Astronomy",
    subtitle: "Macrocosm",
    description: "The study of everything beyond Earth's atmosphere, from the moon to the edge of the visible universe.",
    question: "How did the universe begin, and how will it end?",
    subdomains: ["Cosmology", "Astrophysics", "Planetary Science"],
    tools: ["Radio Telescopes", "Spectroscopy", "Gravitational Waves"],
    metricLabel: "OBSERVABLE RADIUS",
    metricValue: "46.5B LY",
    color: "text-amber-400",
    buttonColor: "bg-amber-600"
  },
  "earth-science": {
    id: "earth-science",
    title: "Earth Science",
    subtitle: "Planetary Systems",
    description: "A unified study of the lithosphere, atmosphere, hydrosphere, and biosphere of our home planet.",
    question: "How do Earth's systems interact to sustain a habitable environment?",
    subdomains: ["Geology", "Meteorology", "Oceanography"],
    tools: ["Seismographs", "Satellites", "Core Samples"],
    metricLabel: "ATMOSPHERIC CO2",
    metricValue: "420 PPM",
    color: "text-emerald-400",
    buttonColor: "bg-emerald-600"
  },
  biology: {
    id: "biology",
    title: "Biology",
    subtitle: "Living Matter",
    description: "The science of life. Examining the structure, function, growth, origin, evolution, and distribution of living things.",
    question: "What distinguishes living matter from non-living matter?",
    subdomains: ["Genetics", "Ecology", "Cell Biology"],
    tools: ["Microscopes", "PCR", "Field Studies"],
    metricLabel: "KNOWN SPECIES",
    metricValue: "8.7 MILLION",
    color: "text-pink-400",
    buttonColor: "bg-pink-600"
  },
  chemistry: {
    id: "chemistry",
    title: "Chemistry",
    subtitle: "Molecular interactions",
    description: "The study of the properties, composition, and structure of elements and compounds, and the energy released or absorbed when they change.",
    question: "How do atoms combine to form the infinite variety of matter?",
    subdomains: ["Organic", "Inorganic", "Physical Chem"],
    tools: ["Chromatography", "Spectrometers", "Bunsen Burners"],
    metricLabel: "ELEMENTS",
    metricValue: "118 TYPES",
    color: "text-sky-400",
    buttonColor: "bg-sky-600"
  },
  physics: {
    id: "physics",
    title: "Physics",
    subtitle: "Fundamental Laws",
    description: "The natural science that studies matter, its fundamental constituents, its motion and behavior through space and time.",
    question: "What are the fundamental forces that govern the universe?",
    subdomains: ["Quantum Mechanics", "Relativity", "Thermodynamics"],
    tools: ["Colliders", "Lasers", "Mathematics"],
    metricLabel: "LIGHT SPEED",
    metricValue: "299,792 km/s",
    color: "text-indigo-400",
    buttonColor: "bg-indigo-600"
  }
};

export default function NaturalSciencePage() {
  const [activeSection, setActiveSection] = useState("astronomy");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll("section").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white">
      
      {/* Navigation & Header Overlay */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto">
           <Link href="/" className="text-xs font-mono opacity-50 hover:opacity-100 tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/10">
             ← HUB
           </Link>
        </div>
      </div>

      <ScaleNavigator currentSection={activeSection} />

      {/* 1. ASTRONOMY */}
      <section id="astronomy" className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-neutral-900/10" />
         <AstronomySimulation />
         <DomainHUD data={domainContent.astronomy} />
      </section>

      {/* 2. EARTH SCIENCE */}
      <section id="earth-science" className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-emerald-950/20" />
         <EarthSimulation />
         <DomainHUD data={domainContent["earth-science"]} />
      </section>

      {/* 3. BIOLOGY */}
      <section id="biology" className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-pink-950/20" />
         <BiologySimulation />
         <DomainHUD data={domainContent.biology} />
      </section>

      {/* 4. CHEMISTRY */}
      <section id="chemistry" className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-sky-950/30" />
         <ChemistrySimulation />
         <DomainHUD data={domainContent.chemistry} />
      </section>

      {/* 5. PHYSICS */}
      <section id="physics" className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-indigo-950/30" />
         <PhysicsSimulation />
         <DomainHUD data={domainContent.physics} />
      </section>

    </main>
  );
}