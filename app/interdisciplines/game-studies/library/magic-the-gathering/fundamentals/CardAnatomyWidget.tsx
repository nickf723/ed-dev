"use client";

import { useState } from "react";
import { Info, Layers3 } from "lucide-react";

type ZoneId = "name" | "cost" | "art" | "type" | "text" | "pt";

const ZONES: readonly {
  id: ZoneId;
  label: string;
  short: string;
  detail: string;
  style: React.CSSProperties;
  rgb: string;
}[] = [
  { id: "name", label: "Name", short: "identity", detail: "The card name identifies the game object. Deck-building and copy-limit rules can refer to card names, while differently printed versions may represent the same card name.", style: { left: "5%", top: "4%", width: "63%", height: "7%" }, rgb: "250,204,21" },
  { id: "cost", label: "Mana cost", short: "casting requirement", detail: "Mana symbols in the upper-right contribute to the card's mana cost. Mana value is a numerical property derived from that cost under the rules; color identity is a separate concept used by some formats.", style: { right: "5%", top: "4%", width: "24%", height: "7%" }, rgb: "167,139,250" },
  { id: "art", label: "Illustration", short: "visual representation", detail: "Artwork is visually prominent and culturally important, but it normally does not define rules behavior unless a rule or card specifically refers to information represented elsewhere on the card.", style: { left: "5%", top: "14%", width: "90%", height: "39%" }, rgb: "244,114,182" },
  { id: "type", label: "Type line", short: "card types & subtypes", detail: "The type line tells you whether a card is a land, creature, artifact, enchantment, instant, sorcery, planeswalker, battle, or another defined type, plus any subtypes or supertypes it has.", style: { left: "5%", top: "56%", width: "90%", height: "8%" }, rgb: "34,211,238" },
  { id: "text", label: "Rules text", short: "abilities & instructions", detail: "Rules text defines abilities and instructions. The official current wording is its Oracle text, which can differ from older printed wording after errata or templating updates.", style: { left: "5%", top: "67%", width: "90%", height: "23%" }, rgb: "94,234,212" },
  { id: "pt", label: "Power / toughness", short: "creature combat values", detail: "On creature cards, power contributes to combat damage dealt and toughness is used when checking lethal marked damage and some effects. These numbers do not by themselves determine every way a creature can leave the battlefield.", style: { right: "5%", bottom: "3%", width: "27%", height: "7%" }, rgb: "248,113,113" },
] as const;

export default function CardAnatomyWidget() {
  const [activeId, setActiveId] = useState<ZoneId>("text");
  const active = ZONES.find((zone) => zone.id === activeId) ?? ZONES[4];

  return (
    <section className="overflow-hidden rounded-[22px] border border-amber-100/[0.10] bg-[#100c07]/70 backdrop-blur-xl">
      <div className="border-b border-white/[0.07] p-4">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/68"><Info size={13} /> Card anatomy</div>
        <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">A card is both a physical component and a structured rules object.</h3>
      </div>

      <div className="grid gap-5 p-4 lg:grid-cols-[240px_minmax(0,1fr)] sm:p-5 lg:items-center">
        <div className="relative mx-auto aspect-[2.5/3.5] w-full max-w-[240px] rounded-[18px] border-2 border-amber-100/22 bg-[linear-gradient(145deg,#2b2419,#14110d)] p-3 shadow-[0_22px_60px_rgba(0,0,0,0.30)]">
          <div className="absolute inset-[5%] rounded-[12px] border border-white/[0.07]" />
          <div className="absolute left-[8%] right-[8%] top-[16%] h-[34%] rounded-[8px] border border-white/[0.06] bg-[radial-gradient(circle_at_65%_35%,rgba(251,191,36,0.18),transparent_30%),linear-gradient(145deg,rgba(96,165,250,0.14),rgba(0,0,0,0.12))]" />
          <div className="absolute left-[9%] right-[9%] top-[70%] space-y-2"><span className="block h-2 rounded bg-white/[0.08]" /><span className="block h-2 w-[88%] rounded bg-white/[0.06]" /><span className="block h-2 w-[72%] rounded bg-white/[0.05]" /></div>
          <Layers3 size={28} className="absolute left-1/2 top-[31%] -translate-x-1/2 text-white/12" />

          {ZONES.map((zone) => {
            const selected = zone.id === activeId;
            return <button key={zone.id} type="button" onClick={() => setActiveId(zone.id)} onMouseEnter={() => setActiveId(zone.id)} className="absolute rounded-[6px] border-2 transition" style={{ ...zone.style, borderColor: selected ? `rgba(${zone.rgb},0.88)` : "rgba(255,255,255,0.04)", background: selected ? `rgba(${zone.rgb},0.13)` : "transparent", boxShadow: selected ? `0 0 18px rgba(${zone.rgb},0.16)` : undefined }} aria-label={`Inspect ${zone.label}`} />;
          })}
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${active.rgb},0.70)` }}>{active.short}</div>
          <h4 className="mt-1 text-[24px] font-semibold text-white">{active.label}</h4>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/76">{active.detail}</p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ZONES.map((zone) => <button key={zone.id} type="button" onClick={() => setActiveId(zone.id)} className="rounded-[12px] border px-2.5 py-2 text-[10px] font-semibold transition" style={{ borderColor: zone.id === activeId ? `rgba(${zone.rgb},0.28)` : "rgba(255,255,255,0.06)", color: zone.id === activeId ? `rgb(${zone.rgb})` : "rgb(148,163,184)", background: zone.id === activeId ? `rgba(${zone.rgb},0.04)` : "rgba(0,0,0,0.05)" }}>{zone.label}</button>)}
          </div>
          <p className="mt-4 border-l-2 border-amber-300/28 pl-3 text-[11px] leading-5 text-slate-500">This schematic uses a creature-like card frame so power/toughness has somewhere to appear. Not every Magic card has every zone shown here.</p>
        </div>
      </div>
    </section>
  );
}
