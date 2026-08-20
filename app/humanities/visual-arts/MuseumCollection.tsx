"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ImageIcon, LoaderCircle, Search, Sparkles, X } from "lucide-react";
import GalleryWallTopology from "@/app/_page-system/topologies/GalleryWallTopology";
import MediaDetailDrawer from "@/app/_page-system/widgets/MediaDetailDrawer";
import type { CollectionMediaRecord, CollectionSearchPayload } from "@/lib/collections/schema";

const STARTER: CollectionMediaRecord[] = [
  curated("starry-night", "The Starry Night", "Vincent van Gogh", "1889", "Painting", ["Post-Impressionism", "Landscape"], "A painted night landscape organized through repeated directional brushwork, exaggerated color, and a strong contrast between the moving sky and quiet village."),
  curated("wave-kanagawa", "Under the Wave off Kanagawa", "Katsushika Hokusai", "c. 1830–32", "Woodblock print", ["Ukiyo-e", "Printmaking"], "A woodblock print balancing an enormous breaking wave, tiny boats, and distant Mount Fuji through cropping, repetition, scale contrast, and graphic contour."),
  curated("seated-scribe", "Seated Scribe", "Unknown Egyptian artist", "c. 2620–2500 BCE", "Sculpture", ["Ancient Egypt", "Portraiture"], "A painted limestone figure whose posture, gaze, materials, and social role make portrait sculpture a record of both body and status."),
  curated("vermeer", "Young Woman with a Water Pitcher", "Johannes Vermeer", "c. 1662", "Painting", ["Dutch Golden Age", "Interior"], "An interior scene structured by window light, restrained geometry, reflective surfaces, and a carefully staged relationship between figure and room."),
  curated("armor", "Armor for Man and Horse", "German armorer", "16th century", "Armor", ["Metalwork", "Design"], "A functional object that is also a highly controlled visual surface, joining engineering, ornament, status, craft, and bodily movement."),
  curated("textile", "Andean Tunic", "Andean artist", "15th–16th century", "Textile", ["Textile", "Pattern"], "A woven garment in which material, color, repeated pattern, technical process, identity, and social context are inseparable."),
];

const SUGGESTIONS = ["van Gogh", "Japanese prints", "Egyptian", "portrait", "textile", "armor", "landscape"];

export default function MuseumCollection() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<CollectionMediaRecord[]>(STARTER);
  const [selected, setSelected] = useState<CollectionMediaRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState("curated starter wall");

  const mediums = useMemo(
    () => Array.from(new Set(records.map((record) => String(record.facts.medium ?? record.facts.objectName ?? "")).filter(Boolean))),
    [records],
  );

  async function search(event?: FormEvent, override?: string) {
    event?.preventDefault();
    const value = (override ?? query).trim();
    if (!value) return;
    setQuery(value);
    setLoading(true);
    setError(null);
    setSelected(null);
    try {
      const response = await fetch(`/api/art/met?q=${encodeURIComponent(value)}`);
      const payload = (await response.json()) as CollectionSearchPayload;
      if (!response.ok) throw new Error(payload.error || "Unable to search the museum collection.");
      setRecords(payload.records);
      setSource(payload.source);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to search the museum collection.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setQuery("");
    setRecords(STARTER);
    setSelected(null);
    setError(null);
    setSource("curated starter wall");
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.11] shadow-[0_32px_110px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-orange-200/70"><ImageIcon size={13} /> Museum collection</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Look at objects before sorting them into movements.</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400">Search museum records, then inspect medium, maker, date, culture, dimensions, department, and collection context. A work of art is simultaneously an image, a physical object, a made thing, and a historical artifact.</p>
        </div>
        <form onSubmit={(event) => void search(event)} className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the museum collection…" className="h-12 w-full rounded-[15px] border border-white/[0.08] bg-black/[0.26] pl-11 pr-12 text-[13px] text-white outline-none placeholder:text-stone-600 focus:border-orange-300/[0.22]" />
          {query ? <button type="button" onClick={reset} aria-label="Clear museum search" className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-stone-500 hover:bg-white/[0.04] hover:text-white"><X size={13} /></button> : null}
        </form>
      </div>

      <div className="border-b border-white/[0.07] px-5 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[8px] uppercase tracking-[0.07em] text-stone-500">Try</span>
          {SUGGESTIONS.map((suggestion) => <button key={suggestion} type="button" onClick={() => void search(undefined, suggestion)} className="rounded-full border border-white/[0.06] bg-white/[0.015] px-3 py-1.5 text-[10px] text-stone-500 transition hover:text-orange-200">{suggestion}</button>)}
          <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.06em] text-stone-600">{source} · {mediums.length || 1} media</span>
        </div>
      </div>

      <div className="relative p-4 sm:p-5">
        {loading ? <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[20px] bg-black/[0.62] backdrop-blur-sm"><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-orange-100/75"><LoaderCircle size={15} className="animate-spin" /> opening storage</span></div> : null}
        {error ? <div className="mb-4 rounded-[14px] border border-red-300/[0.12] bg-red-400/[0.035] px-4 py-3 text-[11px] leading-5 text-red-100/70">{error} The starter wall remains available.</div> : null}
        {!records.length && !loading ? <div className="rounded-[20px] border border-dashed border-white/[0.08] p-10 text-center"><Sparkles size={19} className="mx-auto text-stone-600" /><p className="mt-3 text-[12px] text-stone-500">No image-bearing objects matched that search.</p></div> : <GalleryWallTopology records={records} selectedId={selected?.id} onSelect={setSelected} accentRgb="251, 146, 60" />}
      </div>

      {selected ? <MediaDetailDrawer record={selected} accentRgb="251, 146, 60" onClose={() => setSelected(null)} /> : null}
    </section>
  );
}

function curated(id: string, title: string, creator: string, year: string, medium: string, tags: string[], description: string): CollectionMediaRecord {
  return {
    id,
    title,
    primaryCreator: creator,
    year,
    subtitle: medium,
    description,
    tags,
    facts: { medium, maker: creator, date: year, source: "Curated teaching record" },
    sources: [{ label: "Curated starter record" }],
  };
}
