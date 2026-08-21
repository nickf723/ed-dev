import { ArrowUpRight, Braces, Database, Filter, KeyRound, ShieldCheck } from "lucide-react";

const QUERY_PARTS = [
  ["endpoint", "/photos/", "Choose the collection surface being searched."],
  ["q", "moon", "Search indexed metadata and available full text for a stated term."],
  ["fo", "json", "Request a machine-readable representation."],
  ["at", "results,pagination", "Return only the result summaries and paging context needed here."],
  ["c", "5", "Bound the teaching response to five records."],
] as const;

const PROVENANCE_FIELDS = [
  ["Query", "endpoint + every parameter"],
  ["Retrieval", "service + access time"],
  ["Identity", "persistent item identifier"],
  ["Description", "title + creator + date + subjects"],
  ["Access", "resource links + format"],
  ["Rights", "item-level statement, not a collection-wide guess"],
] as const;

export default function CollectionProtocol() {
  return (
    <section className="overflow-hidden border-y border-cyan-100/[0.10] bg-[#07131d]/[0.24] backdrop-blur-xl">
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b border-white/[0.07] p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58">
            <Database size={14} aria-hidden="true" /> Repository protocol · Library of Congress
          </div>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.98] tracking-[-0.048em] text-white">
            A collection result is an addressable query slice, not a context-free pile of objects.
          </h2>
          <p className="mt-4 max-w-2xl text-[13px] leading-6 text-slate-400/78">
            This connector blueprint uses the public loc.gov JSON API. It does not fetch during page rendering, so the lesson remains deterministic and cheap to host. The live endpoint is available for inspection, and a future repository can add cached requests, rate-limit handling, typed validation, and item-level rights display without changing the conceptual model.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.loc.gov/photos/?q=moon&fo=json&at=results,pagination&c=5"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-300/[0.055] px-4 py-2 text-[12px] font-semibold text-amber-100/78 transition hover:border-amber-200/38 hover:text-amber-50"
            >
              Inspect live JSON <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href="https://www.loc.gov/apis/json-and-yaml/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-black/10 px-4 py-2 text-[12px] font-semibold text-slate-400 transition hover:border-cyan-100/25 hover:text-cyan-100"
            >
              Official API guide <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-7 grid grid-cols-3 border-y border-white/[0.07] py-4">
            <ProtocolFact icon={KeyRound} label="Authentication" value="No API key" />
            <ProtocolFact icon={Filter} label="Useful control" value="Facets + fields" />
            <ProtocolFact icon={ShieldCheck} label="Boundary" value="Rate limited" />
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-cyan-100/48"><Braces size={13} aria-hidden="true" /> Query anatomy</div>
          <code className="mt-3 block overflow-x-auto border border-white/[0.07] bg-black/[0.13] px-4 py-4 text-[11px] leading-5 text-cyan-100/64">
            https://www.loc.gov/photos/?q=moon&amp;fo=json&amp;at=results,pagination&amp;c=5
          </code>
          <dl className="mt-4 divide-y divide-white/[0.055] border-y border-white/[0.07]">
            {QUERY_PARTS.map(([key, value, note]) => (
              <div key={key} className="grid gap-2 py-3 sm:grid-cols-[86px_125px_minmax(0,1fr)] sm:items-start">
                <dt className="font-mono text-[10px] text-cyan-200/50">{key}</dt>
                <dd className="font-mono text-[10px] text-amber-100/60">{value}</dd>
                <dd className="text-[11px] leading-5 text-slate-500">{note}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-violet-100/48">Minimum provenance envelope</div>
          <div className="mt-3 grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.055] sm:grid-cols-2">
            {PROVENANCE_FIELDS.map(([label, value]) => (
              <div key={label} className="bg-[#07131d]/90 px-3 py-3">
                <strong className="block text-[11px] text-white/76">{label}</strong>
                <span className="mt-1 block text-[10px] leading-4 text-slate-500">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProtocolFact({ icon: Icon, label, value }: { icon: typeof KeyRound; label: string; value: string }) {
  return (
    <div className="px-2 text-center first:pl-0 last:pr-0">
      <Icon size={14} className="mx-auto text-amber-200/48" aria-hidden="true" />
      <span className="mt-2 block font-mono text-[8px] uppercase tracking-[0.08em] text-slate-600">{label}</span>
      <strong className="mt-1 block text-[10px] text-slate-300/72">{value}</strong>
    </div>
  );
}
