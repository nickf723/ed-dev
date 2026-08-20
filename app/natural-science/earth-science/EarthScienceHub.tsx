"use client";

import Link from "next/link";
import { useState } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import {
  ArrowRight,
  CloudRain,
  Droplets,
  Gem,
  Globe2,
  Layers3,
  Map,
  Mountain,
  RefreshCw,
  ThermometerSun,
  Wind,
  type LucideIcon,
} from "lucide-react";
import GlobeBackground, { type DomainKey } from "./GlobeBackground";

export type EarthScienceHubNode = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
};

type SystemMeta = {
  icon: LucideIcon;
  domain: DomainKey;
  layer: string;
  cue: string;
  rgb: string;
};

const SYSTEM_META: Record<string, SystemMeta> = {
  "natural.earth-science.meteorology": {
    icon: CloudRain,
    domain: "meteorology",
    layer: "Atmosphere",
    cue: "air · moisture · weather",
    rgb: "56, 189, 248",
  },
  "natural.earth-science.hydrology": {
    icon: Droplets,
    domain: "hydrology",
    layer: "Hydrosphere",
    cue: "storage · flow · phase",
    rgb: "59, 130, 246",
  },
  "natural.earth-science.geography": {
    icon: Map,
    domain: "geography",
    layer: "Surface interface",
    cue: "landform · place · pattern",
    rgb: "250, 204, 21",
  },
  "natural.earth-science.geology": {
    icon: Mountain,
    domain: "geology",
    layer: "Solid Earth",
    cue: "tectonics · rock · deep time",
    rgb: "74, 222, 128",
  },
  "natural.earth-science.mineralogy": {
    icon: Gem,
    domain: "mineralogy",
    layer: "Earth materials",
    cue: "crystal · chemistry · structure",
    rgb: "216, 180, 254",
  },
  "natural.earth-science.climatology": {
    icon: ThermometerSun,
    domain: "climatology",
    layer: "Cross-system climate",
    cue: "forcing · feedback · variability",
    rgb: "248, 113, 113",
  },
};

const STACK_IDS = [
  "natural.earth-science.meteorology",
  "natural.earth-science.hydrology",
  "natural.earth-science.geography",
  "natural.earth-science.geology",
  "natural.earth-science.mineralogy",
] as const;

const COUPLINGS = [
  {
    title: "Weathering & erosion",
    input: "rock + water + air",
    output: "sediment + dissolved material",
    detail: "Surface materials are broken down, transported, sorted, and redeposited by interacting geological, hydrological, and atmospheric processes.",
    rgb: "250, 204, 21",
  },
  {
    title: "Water cycle",
    input: "ocean + land + atmosphere",
    output: "evaporation + precipitation + runoff",
    detail: "Water changes phase and reservoir while carrying energy and material between the surface, atmosphere, ice, soils, rivers, and oceans.",
    rgb: "59, 130, 246",
  },
  {
    title: "Tectonic relief",
    input: "interior energy + crust",
    output: "uplift + volcanism + basins",
    detail: "Plate motion and deformation create topography that redirects water, alters habitats, exposes rock, and changes regional atmospheric circulation.",
    rgb: "74, 222, 128",
  },
  {
    title: "Climate feedback",
    input: "radiation + air + water + land",
    output: "long-term system response",
    detail: "Climate emerges from coupled exchanges among the atmosphere, ocean, ice, land, biosphere, and external forcing rather than from weather alone.",
    rgb: "248, 113, 113",
  },
] as const;

export default function EarthScienceHub({ nodes }: { nodes: readonly EarthScienceHubNode[] }) {
  const [activeDomain, setActiveDomain] = useState<DomainKey>("geology");
  const stack = STACK_IDS.flatMap((id) => {
    const node = nodes.find((candidate) => candidate.id === id);
    return node ? [{ node, meta: SYSTEM_META[id] }] : [];
  });
  const climate = nodes.find((node) => node.id === "natural.earth-science.climatology");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03080b] text-slate-100 selection:bg-cyan-300/25">
      <GlobeBackground domain={activeDomain} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_73%_30%,rgba(14,116,144,0.10),transparent_30%),linear-gradient(to_bottom,rgba(3,8,11,0.18),rgba(3,8,11,0.78)_72%,rgba(2,6,8,0.96))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.10] [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#03080b]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Natural Sciences", href: "/natural-science" },
              { label: "Earth Science" },
            ]}
            eyebrow="Rock · water · air · climate · surface · deep time"
            eyebrowStyle="rule"
            icon={Globe2}
            title={<span>Earth Science</span>}
            subtitle="Study Earth as a coupled planet. Rock, minerals, water, atmosphere, climate, landforms, and spatial patterns continually exchange matter and energy, so the boundaries between Earth-science fields are useful lenses rather than sealed compartments."
            accentRgb="34, 211, 238"
            titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f0fdff]"
            headerClassName="border-cyan-100/[0.09]"
          />
        </div>

        <section className="relative mt-5 overflow-hidden rounded-[34px] border border-cyan-100/[0.10] bg-[#041016]/58 shadow-[0_30px_110px_rgba(0,0,0,0.30)] backdrop-blur-xl">
          <div className="grid gap-5 border-b border-white/[0.07] px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end lg:px-8 lg:py-7">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-cyan-200/68">
                <Layers3 size={14} /> Coupled Earth systems
              </div>
              <h2 className="mt-2 max-w-5xl text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.92] tracking-[-0.052em] text-white">
                Read the planet from atmosphere to crystal, then follow the exchanges between them.
              </h2>
            </div>
            <p className="text-[14px] leading-6 text-slate-300/76">
              Hover or focus a system to retune the globe behind the page. The stack is spatial, not hierarchical: each field can become the starting point for a process that crosses several layers.
            </p>
          </div>

          <div className="grid xl:grid-cols-[minmax(0,1fr)_410px]">
            <nav aria-label="Earth Science fields" className="relative border-b border-white/[0.07] px-4 py-5 sm:px-6 xl:border-b-0 xl:border-r xl:px-7">
              <div className="pointer-events-none absolute bottom-8 left-[48px] top-8 w-px bg-gradient-to-b from-sky-300/35 via-blue-400/30 via-amber-300/30 via-emerald-400/30 to-fuchsia-300/30 sm:left-[58px]" aria-hidden="true" />
              <div className="space-y-2">
                {stack.map(({ node, meta }, index) => (
                  <SystemRoute
                    key={node.id}
                    node={node}
                    meta={meta}
                    index={index}
                    active={activeDomain === meta.domain}
                    onActivate={() => setActiveDomain(meta.domain)}
                  />
                ))}
              </div>
            </nav>

            <div className="flex flex-col p-5 sm:p-6 xl:sticky xl:top-[172px] xl:self-start">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-rose-200/64">
                <RefreshCw size={13} /> Cross-system time
              </div>
              <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] text-white">Climate is not another physical layer.</h3>
              <p className="mt-3 text-[13px] leading-6 text-slate-400">
                It describes long-term behavior emerging from exchanges among atmosphere, ocean, ice, land, life, and incoming energy. That makes climatology a thread across the whole stack.
              </p>

              {climate ? (
                <ClimateRoute
                  node={climate}
                  meta={SYSTEM_META[climate.id]}
                  active={activeDomain === "climatology"}
                  onActivate={() => setActiveDomain("climatology")}
                />
              ) : null}

              <div className="mt-5 border-t border-white/[0.07] pt-5">
                <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-slate-500">Two kinds of geography</div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <div className="rounded-[14px] border border-amber-200/[0.12] bg-amber-200/[0.025] px-3 py-3">
                    <strong className="text-[13px] text-amber-100/82">Physical Geography</strong>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">Earth surface patterns, landforms, water, soils, climate, and environmental processes.</p>
                  </div>
                  <Link href="/social-science/geography" className="group rounded-[14px] border border-violet-200/[0.12] bg-violet-200/[0.025] px-3 py-3 transition hover:bg-violet-200/[0.05]">
                    <div className="flex items-center justify-between gap-2"><strong className="text-[13px] text-violet-100/82">Human Geography</strong><ArrowRight size={12} className="text-violet-200/45 transition group-hover:translate-x-1" /></div>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">People, places, movement, settlement, culture, economies, and spatial organization.</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/60"><Wind size={13} /> Process connections · reference, not navigation</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Most Earth-science questions cross more than one field.</h2>
            </div>
            <p className="text-[13px] leading-6 text-slate-400">A useful boundary tells you which measurements and mechanisms to emphasize. A useful Earth-system explanation then reconnects those pieces.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {COUPLINGS.map((coupling, index) => <Coupling key={coupling.title} coupling={coupling} index={index} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

function SystemRoute({
  node,
  meta,
  index,
  active,
  onActivate,
}: {
  node: EarthScienceHubNode;
  meta: SystemMeta;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const Icon = meta.icon;
  const planned = node.status === "placeholder";
  const content = (
    <div
      className={`group relative grid min-h-[94px] grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-3 rounded-[20px] border px-3 py-3 transition ${planned ? "opacity-50" : "hover:-translate-y-0.5"}`}
      style={{
        borderColor: active ? `rgba(${meta.rgb},0.32)` : "rgba(255,255,255,0.065)",
        background: active ? `linear-gradient(100deg,rgba(${meta.rgb},0.10),rgba(3,10,13,0.34))` : "rgba(0,0,0,0.055)",
      }}
    >
      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-[#061014]" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.30)` }}><Icon size={17} /></span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.68)` }}>{meta.layer}</span><span className="font-mono text-[8px] text-slate-600">0{index + 1}</span></span>
        <strong className="mt-0.5 block text-[16px] font-semibold text-white">{node.label}</strong>
        <span className="mt-1 block text-[11px] text-slate-500">{meta.cue}</span>
      </span>
      {planned ? <span className="font-mono text-[8px] uppercase tracking-[0.07em] text-slate-600">planned</span> : <ArrowRight size={14} className="text-slate-500 transition group-hover:translate-x-1" />}
    </div>
  );

  return planned ? (
    <div onMouseEnter={onActivate} onFocus={onActivate} tabIndex={0}>{content}</div>
  ) : (
    <Link href={node.href} onMouseEnter={onActivate} onFocus={onActivate}>{content}</Link>
  );
}

function ClimateRoute({ node, meta, active, onActivate }: { node: EarthScienceHubNode; meta: SystemMeta; active: boolean; onActivate: () => void }) {
  const Icon = meta.icon;
  const planned = node.status === "placeholder";
  const content = (
    <div className="group mt-5 rounded-[22px] border p-4 transition" style={{ borderColor: active ? `rgba(${meta.rgb},0.30)` : `rgba(${meta.rgb},0.15)`, background: `linear-gradient(135deg,rgba(${meta.rgb},${active ? 0.09 : 0.045}),rgba(0,0,0,0.10))` }}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.26)` }}><Icon size={16} /></span>
        <span className="min-w-0 flex-1"><span className="font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.68)` }}>{meta.cue}</span><strong className="mt-1 block text-[16px] text-white">{node.label}</strong><span className="mt-1.5 block text-[12px] leading-5 text-slate-400">{node.description}</span></span>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500"><span>atmosphere ↔ ocean ↔ ice ↔ land ↔ life</span><span>{planned ? "planned branch" : "open branch"}</span></div>
    </div>
  );
  return planned ? <div onMouseEnter={onActivate} onFocus={onActivate} tabIndex={0}>{content}</div> : <Link href={node.href} onMouseEnter={onActivate} onFocus={onActivate}>{content}</Link>;
}

function Coupling({ coupling, index }: { coupling: (typeof COUPLINGS)[number]; index: number }) {
  return (
    <article className="min-h-[230px] border-b border-white/[0.065] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
      <div className="flex items-center justify-between gap-3"><span className="font-mono text-[9px] text-slate-600">0{index + 1}</span><span className="h-2 w-2 rounded-full" style={{ background: `rgba(${coupling.rgb},0.70)`, boxShadow: `0 0 18px rgba(${coupling.rgb},0.24)` }} /></div>
      <h3 className="mt-5 text-[16px] font-semibold text-white">{coupling.title}</h3>
      <div className="mt-3 font-mono text-[10px] leading-5" style={{ color: `rgba(${coupling.rgb},0.64)` }}>{coupling.input}<br /><span className="text-slate-600">↓</span><br />{coupling.output}</div>
      <p className="mt-3 text-[12px] leading-5 text-slate-400">{coupling.detail}</p>
    </article>
  );
}
