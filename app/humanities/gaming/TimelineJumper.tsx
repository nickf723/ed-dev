"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Gamepad2, History } from "lucide-react";

const MOMENTS = [
  {
    date: "Ancient worlds",
    title: "Board play leaves archaeological traces",
    code: "BOARD",
    rgb: "251,191,36",
    detail: "Senet was played across long periods of ancient Egyptian history, while surviving Royal Game of Ur boards from Mesopotamia date to roughly the mid-third millennium BCE. Their evidence reminds us that games long predate modern commercial media.",
  },
  {
    date: "1974",
    title: "Published role-playing rules open a new design space",
    code: "RPG",
    rgb: "52,211,153",
    detail: "The original Dungeons & Dragons appeared in 1974. It helped establish tabletop role-playing as a form built around persistent fictional situations, refereed rules, characters, conversation, and open-ended group decisions.",
  },
  {
    date: "1977",
    title: "Cartridge-based home play expands",
    code: "VCS",
    rgb: "34,211,238",
    detail: "Atari released the Video Computer System, later known as the Atari 2600, in 1977. Swappable cartridges helped make one household machine a platform for many different games rather than a device tied to a single built-in activity.",
  },
  {
    date: "1978 → 1980",
    title: "Arcade success crosses into the living room",
    code: "ARCADE",
    rgb: "244,114,182",
    detail: "Space Invaders debuted as an arcade game in 1978. Its 1980 Atari 2600 version became especially important to that console's success, showing how a hit could travel between arcade and home formats.",
  },
  {
    date: "1993",
    title: "Doom showcases a new kind of computer-game circulation",
    code: "PC",
    rgb: "96,165,250",
    detail: "Doom arrived in 1993 and became a landmark in computer-game history. Its fast first-person presentation, networked play, shareware distribution, and later modification culture made it useful for studying games as software ecosystems as well as finished products.",
  },
  {
    date: "Now",
    title: "Many game cultures coexist",
    code: "PLAY",
    rgb: "192,132,252",
    detail: "Contemporary play spans tabletop campaigns, physical games, mobile and console releases, PC scenes, online worlds, mods, livestreams, esports, speedrunning, accessibility communities, archives, emulation, and small experimental works. No single format replaces the others.",
  },
] as const;

export default function TimelineJumper() {
  const [index, setIndex] = useState(0);
  const moment = MOMENTS[index];

  return (
    <div className="overflow-hidden rounded-[28px] border border-fuchsia-100/[0.12] bg-[#090815]/48 backdrop-blur-[18px]">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-fuchsia-200/62"><History size={14} /> Timeline jumper · selective history</div>
        <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">{String(index + 1).padStart(2, "0")} / {String(MOMENTS.length).padStart(2, "0")}</span>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_180px]">
        <div className="relative min-h-[215px] overflow-hidden border border-white/[0.07] bg-black/20 p-5">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(217,70,239,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="relative">
            <div className="flex items-center gap-3"><span className="rounded border px-2 py-1 font-mono text-[10px]" style={{ color: `rgba(${moment.rgb},0.82)`, borderColor: `rgba(${moment.rgb},0.26)`, background: `rgba(${moment.rgb},0.05)` }}>{moment.code}</span><span className="font-mono text-[12px] font-semibold" style={{ color: `rgba(${moment.rgb},0.70)` }}>{moment.date}</span></div>
            <h3 className="mt-4 max-w-2xl text-[23px] font-semibold leading-[1.02] tracking-[-0.04em] text-white">{moment.title}</h3>
            <p className="mt-4 max-w-2xl text-[12px] leading-6 text-slate-400/78">{moment.detail}</p>
          </div>
          <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: `rgba(${moment.rgb},0.18)`, color: `rgba(${moment.rgb},0.48)`, background: `rgba(${moment.rgb},0.035)` }}><Gamepad2 size={18} /></div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.07em] text-slate-600">Reading boundary</span>
            <p className="mt-2 text-[10px] leading-5 text-slate-500">These moments are not a complete history and do not form one inevitable progression. Ancient, tabletop, physical, arcade, console, computer, and online traditions overlap and influence one another.</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setIndex((current) => (current - 1 + MOMENTS.length) % MOMENTS.length)} className="flex items-center justify-center gap-2 border border-white/[0.07] bg-black/[0.04] px-3 py-3 text-[11px] text-slate-400 transition hover:bg-white/[0.03] hover:text-white"><ChevronLeft size={13} /> Earlier</button>
            <button type="button" onClick={() => setIndex((current) => (current + 1) % MOMENTS.length)} className="flex items-center justify-center gap-2 border border-white/[0.07] bg-black/[0.04] px-3 py-3 text-[11px] text-slate-400 transition hover:bg-white/[0.03] hover:text-white">Later <ChevronRight size={13} /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-white/[0.07]">
        {MOMENTS.map((item, itemIndex) => <button key={item.code} type="button" onClick={() => setIndex(itemIndex)} aria-label={`Jump to ${item.date}: ${item.title}`} className="relative h-11 border-r border-white/[0.05] last:border-r-0" style={{ background: itemIndex === index ? `rgba(${item.rgb},0.055)` : "rgba(0,0,0,0.025)" }}><span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: `rgba(${item.rgb},${itemIndex === index ? 0.65 : 0.20})`, background: itemIndex === index ? `rgba(${item.rgb},0.35)` : "transparent" }} /></button>)}
      </div>
    </div>
  );
}
