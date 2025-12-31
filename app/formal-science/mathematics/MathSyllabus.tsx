"use client";
import { useState } from "react";
import { 
  Binary, Braces, FunctionSquare, Infinity as Inf, 
  Box, GitGraph, Activity, PieChart, ShieldQuestion 
} from "lucide-react";

// The Map of Mathematics
const domains = [
  {
    id: "foundations",
    label: "Foundations",
    color: "text-rose-500",
    border: "border-rose-200",
    bg: "bg-rose-50",
    icon: ShieldQuestion,
    items: [
      { name: "Mathematical Logic", desc: "Formal languages and rules of inference." },
      { name: "Set Theory", desc: "Collections of objects. The basis of all math (ZFC)." },
      { name: "Category Theory", desc: "The 'mathematics of mathematics'. Structures and mappings." },
      { name: "Computability", desc: "What can be calculated? Turing machines and P vs NP." }
    ]
  },
  {
    id: "structures",
    label: "Structures",
    color: "text-amber-600",
    border: "border-amber-200",
    bg: "bg-amber-50",
    icon: Box,
    items: [
      { name: "Number Theory", desc: "Integers and primes. The 'Queen of Mathematics'." },
      { name: "Abstract Algebra", desc: "Groups, Rings, Fields, and vector spaces." },
      { name: "Combinatorics", desc: "Counting, arrangement, and discrete structures." },
      { name: "Order Theory", desc: "Binary relations capturing the notion of 'ranking'." }
    ]
  },
  {
    id: "space",
    label: "Space",
    color: "text-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    icon: Braces, // Approximate for geometry/shapes
    items: [
      { name: "Euclidean Geometry", desc: "Flat space. Points, lines, and planes." },
      { name: "Non-Euclidean", desc: "Curved space. Hyperbolic and Elliptic geometry." },
      { name: "Topology", desc: "Rubber-sheet geometry. Properties preserved under deformation." },
      { name: "Differential Geom", desc: "Calculus on smooth manifolds (curves/surfaces)." }
    ]
  },
  {
    id: "change",
    label: "Change",
    color: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
    icon: Activity,
    items: [
      { name: "Calculus", desc: "Limits, derivatives, integrals, and series." },
      { name: "Diff. Equations", desc: "Functions defined by their rate of change." },
      { name: "Dynamical Systems", desc: "Systems that evolve over time (Chaos Theory)." },
      { name: "Complex Analysis", desc: "Functions of complex numbers." }
    ]
  },
  {
    id: "applied",
    label: "Applied",
    color: "text-violet-600",
    border: "border-violet-200",
    bg: "bg-violet-50",
    icon: PieChart,
    items: [
      { name: "Probability", desc: "The measure of likelihood and random events." },
      { name: "Statistics", desc: "Analysis and interpretation of data." },
      { name: "Game Theory", desc: "Strategic decision making." },
      { name: "Cryptography", desc: "Secure communication via Number Theory." }
    ]
  }
];

export default function MathSyllabus() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="space-y-8">
        
        {domains.map((domain) => (
            <div key={domain.id} className="relative group">
                
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
                    <div className={`p-2 rounded-lg ${domain.bg}`}>
                        <domain.icon size={18} className={domain.color} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg font-serif">{domain.label}</h3>
                </div>

                {/* Grid of Topics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {domain.items.map((item) => (
                        <div 
                            key={item.name}
                            className={`
                                p-3 rounded border transition-all duration-200 cursor-default relative overflow-hidden
                                ${activeItem === item.name 
                                    ? `bg-slate-800 border-slate-800 text-white shadow-xl scale-[1.02] z-10` 
                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                }
                            `}
                            onMouseEnter={() => setActiveItem(item.name)}
                            onMouseLeave={() => setActiveItem(null)}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className={`font-bold text-sm ${activeItem === item.name ? "text-amber-400" : "text-slate-800"}`}>
                                    {item.name}
                                </span>
                                {activeItem === item.name && <Binary size={12} className="text-slate-500" />}
                            </div>
                            
                            <p className={`text-xs leading-relaxed ${activeItem === item.name ? "text-slate-300" : "text-slate-400"}`}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        ))}

    </div>
  );
}