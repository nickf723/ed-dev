"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Command, Terminal } from "lucide-react";
import SoftwareBackground from "./SoftwareBackground";
import { SOFTWARE_SECTORS } from "./software-data";

export type SoftwareSectorNode = {
  id: string;
  label: string;
  href: string;
  description: string;
  status: "active" | "placeholder";
};

type SoftwareHubClientProps = {
  sectors: readonly SoftwareSectorNode[];
  parentHref: string;
};

function buildSoftwareSectors(nodes: readonly SoftwareSectorNode[]) {
  const byId = new Map(nodes.map((node) => [node.id, node]));

  return SOFTWARE_SECTORS.map((presentation) => {
    const node = byId.get(presentation.nodeId);
    if (!node) {
      throw new Error(`Software presentation ${presentation.nodeId} has no curriculum node.`);
    }

    return {
      ...node,
      desc: node.description,
      link: node.href,
      ...presentation,
    };
  });
}

export default function SoftwareHubClient({
  sectors,
  parentHref,
}: SoftwareHubClientProps) {
  const builtSectors = buildSoftwareSectors(sectors);
  const [activeSnippet, setActiveSnippet] = useState(builtSectors[0]?.snippet ?? "");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(() => {
        if (i < activeSnippet.length) {
          i++;
          return activeSnippet.slice(0, i);
        }
        return activeSnippet;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [activeSnippet]);

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono pl-0 md:pl-80 relative overflow-hidden selection:bg-green-500/30">
      <SoftwareBackground />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#000_150%)] pointer-events-none z-10" />

      <div className="relative z-20 p-6 md:p-12 min-h-screen flex flex-col justify-center">
        <header className="mb-12">
          <Link href={parentHref} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 hover:text-green-400 transition-colors mb-6">
            <ArrowLeft size={10} /> CS Department
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 flex items-center gap-4">
            SOFTWARE <Terminal className="opacity-50 animate-pulse text-green-500" size={48} />
          </h1>
          <p className="text-green-600/80 max-w-xl text-lg leading-relaxed">
            The architecture of the virtual world. Instructions, logic, and systems.
          </p>
        </header>

        <div className="flex flex-col xl:flex-row gap-12">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {builtSectors.map((sector, index) => (
              <SectorCard
                key={sector.id}
                sector={sector}
                index={index}
                onPreview={() => setActiveSnippet(sector.snippet)}
              />
            ))}
          </div>

          <div className="hidden xl:block w-96">
            <div className="sticky top-12 bg-[#0c0c0c] border border-green-900/50 rounded-lg p-1 shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-green-900/30 bg-black rounded-t-lg">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <div className="ml-auto text-[9px] uppercase tracking-widest text-green-900 flex items-center gap-1">
                  <Command size={10} /> bash
                </div>
              </div>

              <div className="p-6 h-96 font-mono text-xs overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
                <div className="text-green-700 mb-4">admin@vector-lab:~$ ./execute_preview.sh</div>
                <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                  {displayedText}
                  <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse" />
                </pre>
              </div>

              <div className="p-2 border-t border-green-900/30 text-center text-[9px] text-green-900 uppercase">
                Compile Status: <span className="text-green-500">OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

type SoftwareSector = ReturnType<typeof buildSoftwareSectors>[number];

function SectorCard({
  sector,
  index,
  onPreview,
}: {
  sector: SoftwareSector;
  index: number;
  onPreview: () => void;
}) {
  const Icon = sector.icon;
  const isPlanned = sector.status === "placeholder";
  const cardClass = `group relative p-6 bg-black/80 border rounded transition-all duration-300 ${
    isPlanned
      ? "border-dashed border-green-900/40 opacity-55 cursor-default"
      : `border-green-900/50 hover:bg-green-950/10 hover:-translate-y-0.5 ${sector.border}`
  }`;

  const content = (
    <>
      {isPlanned ? (
        <span className="absolute right-4 top-4 rounded border border-green-900/50 bg-black/70 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-green-800">
          Planned
        </span>
      ) : null}

      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded bg-black border border-green-900 ${sector.color}`}>
          <Icon size={24} />
        </div>
        <div className="pr-16 text-[10px] font-bold uppercase tracking-widest text-green-800 group-hover:text-green-500">
          SYS_DIR_{String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <h2 className={`text-2xl font-bold text-white mb-1 ${isPlanned ? "" : "group-hover:text-green-200"}`}>
        {sector.label}
      </h2>
      <div className={`mb-3 text-[9px] font-bold uppercase tracking-[0.18em] ${sector.color}`}>
        {sector.sub}
      </div>
      <p className="text-sm text-stone-500 leading-relaxed group-hover:text-stone-400">{sector.desc}</p>

      {!isPlanned ? (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={16} className={sector.color} />
        </div>
      ) : null}
    </>
  );

  if (isPlanned) {
    return (
      <article className={cardClass} onMouseEnter={onPreview} aria-disabled="true">
        {content}
      </article>
    );
  }

  return (
    <Link href={sector.link} onMouseEnter={onPreview} className={cardClass}>
      {content}
    </Link>
  );
}
