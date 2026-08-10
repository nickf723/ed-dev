"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Hexagon } from "lucide-react";
import { DOMAINS, type DomainDefinition } from "@/lib/domains";

export default function HexGrid() {
  const [hovered, setHovered] = useState<DomainDefinition>(DOMAINS[0]);
  const theme = hovered.theme;
  const HoveredIcon = hovered.icon;
  const translate = { x: 3, y: 4 };
  const hexPositions = [
    { x: -6 + translate.x, y: -10.5 + translate.y },
    { x: 6 + translate.x, y: -10.5 + translate.y },
    { x: 12 + translate.x, y: 0 + translate.y },
    { x: 6 + translate.x, y: 10.5 + translate.y },
    { x: -6 + translate.x, y: 10.5 + translate.y },
    { x: -12 + translate.x, y: 0 + translate.y },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-[800px] w-full overflow-visible z-10">
      <div className="absolute z-50 w-64 h-64 flex flex-col items-center justify-center text-center p-6 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_0_100px_rgba(0,0,0,0.8)] pointer-events-auto ring-1 ring-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={hovered.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
              <HoveredIcon className={theme.text} size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter uppercase text-white leading-none mb-1">
                {hovered.title}
              </h2>
              <p className="text-[9px] font-medium text-slate-400 leading-tight max-w-[160px] mx-auto mb-3">
                {hovered.description}
              </p>

              <div className="flex flex-wrap justify-center gap-1 mb-3">
                {hovered.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[8px] px-1.5 py-0.5 rounded border border-white/10 ${theme.text} bg-white/5`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={hovered.href}
              className={`group inline-flex items-center gap-2 text-[9px] font-black px-6 py-2 rounded-full border transition-all uppercase tracking-widest text-white ${theme.border} ${theme.background} hover:bg-white hover:text-black`}
            >
              Explore
              <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-0 h-0 flex items-center justify-center"
      >
        {DOMAINS.map((domain, index) => (
          <div
            key={domain.id}
            className="absolute transition-all duration-500"
            style={{
              transform: `translate(${hexPositions[index].x}rem, ${hexPositions[index].y}rem)`,
            }}
            onMouseEnter={() => setHovered(domain)}
          >
            <HexTile data={domain} isActive={hovered.id === domain.id} />
          </div>
        ))}
        <GhostHex x={-18} y={-10.5} />
        <GhostHex x={18} y={-10.5} />
        <GhostHex x={-18} y={10.5} />
        <GhostHex x={18} y={10.5} />
      </motion.div>
    </div>
  );
}

function HexTile({ data, isActive }: { data: DomainDefinition; isActive: boolean }) {
  const Icon = data.icon;
  const theme = data.theme;

  return (
    <Link href={data.href}>
      <motion.div
        whileHover={{ scale: 1.05, zIndex: 50 }}
        className="relative w-48 h-56 -ml-24 -mt-28 cursor-pointer transition-all duration-300 group"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <div
          className="absolute inset-0 bg-slate-900/90 backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor: isActive
              ? `rgba(${theme.rgb}, 0.1)`
              : "rgba(10, 10, 20, 0.8)",
          }}
        />

        <div
          className="absolute inset-[1px] pointer-events-none"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            border: isActive
              ? "2px solid rgba(255,255,255,0.3)"
              : "1px solid rgba(255,255,255,0.05)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-30">
          <Icon
            size={28}
            className={`mb-3 transition-colors ${isActive ? theme.text : "text-slate-600"}`}
          />
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-white" : "text-slate-600"}`}
          >
            {data.title}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function GhostHex({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="absolute w-48 h-56 -ml-24 -mt-28 opacity-5 pointer-events-none"
      style={{
        transform: `translate(${x}rem, ${y}rem)`,
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        border: "1px dashed white",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Hexagon size={24} />
      </div>
    </div>
  );
}
