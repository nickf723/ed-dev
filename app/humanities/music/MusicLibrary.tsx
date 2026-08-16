"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Disc3, LoaderCircle, Search, Sparkles, X } from "lucide-react";
import MediaShelfTopology from "@/app/_page-system/topologies/MediaShelfTopology";
import MediaDetailDrawer from "@/app/_page-system/widgets/MediaDetailDrawer";
import type { CollectionMediaRecord, CollectionSearchPayload } from "@/lib/collections/schema";

const FEATURED: CollectionMediaRecord[] = [
  record("kind-of-blue", "Kind of Blue", "Miles Davis", "1959", ["Jazz", "Modal jazz"], "A landmark modal jazz album whose spacious harmonic framework leaves exceptional room for melodic improvisation."),
  record("abbey-road", "Abbey Road", "The Beatles", "1969", ["Rock", "Studio craft"], "A studio-centered album whose production, sequencing, harmony, and medley form make recording technique part of the composition."),
  record("whats-going-on", "What's Going On", "Marvin Gaye", "1971", ["Soul", "Concept album"], "A continuous soul cycle combining layered vocals, social observation, orchestration, and recurring musical motives."),
  record("songs-in-key", "Songs in the Key of Life", "Stevie Wonder", "1976", ["Soul", "R&B", "Pop"], "A wide-ranging double album connecting groove, harmony, synthesis, songwriting, and social commentary."),
  record("rumours", "Rumours", "Fleetwood Mac", "1977", ["Rock", "Pop"], "A tightly arranged pop-rock record where vocal harmony, production polish, and interpersonal tension reinforce one another."),
  record("miseducation", "The Miseducation of Lauryn Hill", "Lauryn Hill", "1998", ["Hip hop", "R&B", "Soul"], "A genre-crossing album joining rap, singing, live instrumentation, sampling, and autobiographical songwriting."),
  record("discovery", "Discovery", "Daft Punk", "2001", ["Electronic", "House", "Sampling"], "A bright electronic album built from filtered samples, synthesis, repetition, and highly controlled timbral transformation."),
  record("to-pimp-a-butterfly", "To Pimp a Butterfly", "Kendrick Lamar", "2015", ["Hip hop", "Jazz rap", "Funk"], "A conceptually dense album linking rap narrative with jazz, funk, spoken word, recurring motifs, and large-scale formal design."),
];

const SUGGESTIONS = ["Nina Simone", "Radiohead", "Björk", "Miles Davis", "Beyoncé", "Prince", "Joni Mitchell"];

export default function MusicLibrary() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<CollectionMediaRecord[]>(FEATURED);
  const [selected, setSelected] = useState<CollectionMediaRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"featured" | "search">("featured");

  const yearRange = useMemo(() => {
    const years = records.map((item) => Number(item.year)).filter(Number.isFinite);
    if (!years.length) return "mixed dates";
    return `${Math.min(...years)}–${Math.max(...years)}`;
  }, [records]);

  async function submit(event?: FormEvent, override?: string) {
    event?.preventDefault();
    const value = (override ?? query).trim();
    if (!value) return;
    setQuery(value);
    setLoading(true);
    setError(null);
    setSelected(null);
    try {
      const response = await fetch(`/api/music/albums?q=${encodeURIComponent(value)}`);
      const payload = (await response.json()) as CollectionSearchPayload;
      if (!response.ok) throw new Error(payload.error || "Unable to search MusicBrainz.");
      setRecords(payload.records);
      setMode("search");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to search MusicBrainz.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setQuery("");
    setRecords(FEATURED);
    setMode("featured");
    setError(null);
    setSelected(null);
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.12] shadow-[0_32px_110px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-rose-200/70"><Disc3 size={12} /> Recorded works</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Use the catalog as evidence, not decoration.</h2>
          <p className="mt-3 max-w-3xl text-[10px] leading-5 text-slate-500">Search MusicBrainz release groups and compare recordings by creator, date, type, and edition history. The shelf treats an album as a work with metadata rather than a poster grid.</p>
        </div>
        <form onSubmit={(event) => void submit(event)} className="relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search artist or album…" className="h-12 w-full rounded-[15px] border border-white/[0.08] bg-black/[0.26] pl-11 pr-12 text-[11px] text-white outline-none placeholder:text-slate-700 focus:border-rose-300/[0.22]" />
          {query ? <button type="button" onClick={reset} aria-label="Clear search" className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-700 hover:bg-white/[0.04] hover:text-white"><X size={12} /></button> : null}
        </form>
      </div>

      <div className="border-b border-white/[0.07] px-5 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">Try</span>
          {SUGGESTIONS.map((suggestion) => <button key={suggestion} type="button" onClick={() => void submit(undefined, suggestion)} className="rounded-full border border-white/[0.06] bg-white/[0.015] px-2.5 py-1.5 text-[8px] text-slate-600 transition hover:text-rose-200">{suggestion}</button>)}
          <span className="ml-auto font-mono text-[7px] uppercase tracking-[0.08em] text-slate-800">{mode === "featured" ? "curated starter shelf" : `MusicBrainz · ${yearRange}`}</span>
        </div>
      </div>

      <div className="relative p-4 sm:p-5">
        {loading ? <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[20px] bg-black/[0.60] backdrop-blur-sm"><span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.11em] text-rose-100/70"><LoaderCircle size={14} className="animate-spin" /> searching catalog</span></div> : null}
        {error ? <div className="mb-4 rounded-[14px] border border-red-300/[0.12] bg-red-400/[0.035] px-4 py-3 text-[9px] text-red-100/65">{error} The curated shelf remains available.</div> : null}
        {!records.length && !loading ? <div className="rounded-[20px] border border-dashed border-white/[0.08] p-10 text-center"><Sparkles size={18} className="mx-auto text-slate-700" /><p className="mt-3 text-[10px] text-slate-600">No release groups matched that search.</p></div> : <MediaShelfTopology records={records} selectedId={selected?.id} onSelect={setSelected} accentRgb="244, 114, 182" />}
      </div>

      {selected ? <MediaDetailDrawer record={selected} accentRgb="244, 114, 182" onClose={() => setSelected(null)} /> : null}
    </section>
  );
}

function record(id: string, title: string, artist: string, year: string, tags: string[], description: string): CollectionMediaRecord {
  return {
    id,
    title,
    primaryCreator: artist,
    year,
    tags,
    description,
    facts: { artist, firstRelease: year, recordType: "Album" },
    sources: [{ label: "Curated starter record" }],
  };
}
