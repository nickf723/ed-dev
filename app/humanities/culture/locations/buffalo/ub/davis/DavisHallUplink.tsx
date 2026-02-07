"use client";
import React from 'react';
import { ExternalLink, Calendar, Video, FileCode, Beaker, Zap } from 'lucide-react';

const RESOURCES = [
  {
    category: "FACILITY ACCESS",
    links: [
      { 
        label: "Book the Cleanroom", 
        sub: "Class 1000/100 Fabrication Space",
        href: "https://www.buffalo.edu/shared-facilities-equip/facilities-equipment/Cleanrooms/Cleanroom-locations/Davis.html",
        icon: Beaker
      },
      { 
        label: "Schedule a Tour", 
        sub: "In-Person or Virtual SEAS Visit",
        href: "https://engineering.buffalo.edu/home/school/explore/visit.html",
        icon: Calendar
      }
    ]
  },
  {
    category: "RESEARCH LABS",
    links: [
      { 
        label: "Energy Systems Integration", 
        sub: "Smart Grid & Power Electronics",
        href: "https://engineering.buffalo.edu/ee/research/areas/energy.html",
        icon: Zap
      },
      { 
        label: "Extreme Environment Comms", 
        sub: "Underwater & Underground Networking",
        href: "https://engineering.buffalo.edu/ee/research/research_facilities.html",
        icon: FileCode
      }
    ]
  },
  {
    category: "OFFICIAL CHANNELS",
    links: [
      { 
        label: "Dept of Computer Science", 
        sub: "Faculty Directory & News",
        href: "https://engineering.buffalo.edu/computer-science-engineering.html",
        icon: ExternalLink
      },
      { 
        label: "Dept of Electrical Engineering", 
        sub: "Curriculum & Events",
        href: "https://engineering.buffalo.edu/ee.html",
        icon: ExternalLink
      }
    ]
  }
];

export default function DavisHallUplink() {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
        {/* HEADER */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                UB Network Uplink
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
                SECURE CONNECTION
            </div>
        </div>

        {/* LIST */}
        <div className="divide-y divide-slate-100 overflow-y-auto">
            {RESOURCES.map((section, i) => (
                <div key={i} className="p-4">
                    <div className="text-[10px] font-bold text-amber-600 uppercase mb-3 opacity-80">
                        {section.category}
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {section.links.map((link, j) => (
                            <a 
                                key={j}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all"
                            >
                                <div className="p-2 bg-slate-100 text-slate-500 rounded group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                                    <link.icon size={16} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-slate-700 group-hover:text-amber-700 flex items-center gap-2">
                                        {link.label}
                                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-xs text-slate-400 group-hover:text-slate-500">
                                        {link.sub}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        
        {/* FOOTER */}
        <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
             <p className="text-[10px] text-slate-400 font-mono">
                 Direct access to UB Engineering servers.
             </p>
        </div>
    </div>
  );
}