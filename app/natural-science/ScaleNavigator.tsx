"use client";
import Link from "next/link";
import { Atom, FlaskConical, Dna, Mountain, Telescope } from "lucide-react";

type ScaleNavProps = {
  currentSection: string;
};

export default function ScaleNavigator({ currentSection }: ScaleNavProps) {
  const steps = [
    { id: "astronomy", icon: Telescope, label: "10²⁵m" },
    { id: "earth-science", icon: Mountain, label: "10⁷m" },
    { id: "biology", icon: Dna, label: "10⁰m" },
    { id: "chemistry", icon: FlaskConical, label: "10⁻¹⁰m" },
    { id: "physics", icon: Atom, label: "10⁻³⁵m" },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-center">
      {/* The Line */}
      <div className="absolute inset-0 w-px bg-white/20 -z-10 left-1/2" />
      
      {steps.map((step) => {
        const isActive = currentSection === step.id;
        return (
          <Link 
            key={step.id} 
            href={`#${step.id}`}
            className={`relative group transition-all duration-500 ${isActive ? "scale-110" : "scale-90 opacity-50 hover:opacity-100"}`}
          >
             <div className={`p-3 rounded-full border backdrop-blur-md transition-colors duration-500
                ${isActive 
                  ? "bg-white text-black border-white" 
                  : "bg-black/50 text-white border-white/20 group-hover:border-white/50"
                }`}
             >
                <step.icon size={20} />
             </div>
             
             {/* Tooltip Label */}
             <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs font-mono font-bold text-white bg-black/80 px-2 py-1 rounded">
                   {step.label}
                </span>
             </div>
          </Link>
        );
      })}
    </div>
  );
}