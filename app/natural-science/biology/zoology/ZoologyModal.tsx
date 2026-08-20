"use client";

import { useEffect, type ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  Clock3,
  Database,
  Dna,
  ExternalLink,
  Leaf,
  MapPin,
  ShieldAlert,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  ZOOLOGY_COLLECTION_BY_ID,
  type AnimalRecord,
} from "./zoology-data";

type Props = {
  animal: AnimalRecord;
  related: AnimalRecord[];
  onClose: () => void;
  onSelectRelated: (animal: AnimalRecord) => void;
};

export default function ZoologyModal({
  animal,
  related,
  onClose,
  onSelectRelated,
}: Props) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const taxonomy = [
    ["Kingdom", animal.taxonomy.kingdom],
    ["Phylum", animal.taxonomy.phylum],
    ["Class", animal.taxonomy.className],
    ["Order", animal.taxonomy.order],
    ["Family", animal.taxonomy.family],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  const memberships = animal.collectionIds
    .map((id) => ZOOLOGY_COLLECTION_BY_ID.get(id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <button
        type="button"
        aria-label="Close animal profile"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/[0.82] backdrop-blur-md"
      />

      <article className="relative z-10 grid max-h-[94vh] w-full max-w-[1280px] overflow-hidden rounded-[32px] border border-emerald-100/[0.14] bg-[#07100c]/[0.94] shadow-[0_40px_160px_rgba(0,0,0,0.62)] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[340px] overflow-hidden bg-[#020503] lg:min-h-[760px]">
          {animal.imageUrl ? (
            <img
              src={animal.imageUrl}
              alt={animal.commonName}
              className="absolute inset-0 h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.12),transparent_62%)]">
              <Dna
                size={82}
                className="text-emerald-300/[0.24]"
                strokeWidth={1.2}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06100b] via-[#06100b]/[0.16] to-black/[0.20]" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap gap-2">
              {animal.taxonomy.className ? (
                <Badge>{animal.taxonomy.className}</Badge>
              ) : null}
              {animal.conservationStatus ? (
                <ConservationBadge value={animal.conservationStatus} />
              ) : null}
            </div>
            <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
              {animal.commonName}
            </h2>
            <p className="mt-3 font-serif text-[20px] italic text-emerald-100/[0.72]">
              {animal.scientificName}
            </p>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto p-5 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-5 border-b border-white/[0.09] pb-7">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300/[0.74]">
                Animal profile
              </div>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-200/[0.82]">
                {animal.summary}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.035] text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Close animal profile"
            >
              <X size={18} />
            </button>
          </div>

          <section className="mt-7">
            <SectionLabel icon={Dna}>Taxonomic path</SectionLabel>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
              {taxonomy.map(([rank, value]) => (
                <div
                  key={rank}
                  className="rounded-[14px] border border-white/[0.08] bg-white/[0.025] p-3.5"
                >
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500">
                    {rank}
                  </div>
                  <div className="mt-2 break-words text-[13px] font-medium leading-5 text-slate-100">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7 grid gap-3 sm:grid-cols-2">
            <ProfileBlock icon={MapPin} label="Range & habitat">
              {[...animal.regions, ...animal.habitats].length ? (
                <TagList items={[...animal.regions, ...animal.habitats]} />
              ) : (
                <Muted>Not yet curated for this search result.</Muted>
              )}
            </ProfileBlock>
            <ProfileBlock icon={Leaf} label="Ecological role">
              {animal.ecologicalRoles.length || animal.diet ? (
                <TagList
                  items={[
                    ...(animal.diet ? [animal.diet] : []),
                    ...animal.ecologicalRoles,
                  ]}
                />
              ) : (
                <Muted>Open the source record for additional ecology.</Muted>
              )}
            </ProfileBlock>
            <ProfileBlock icon={Clock3} label="Behavior">
              {animal.activity || animal.traits.length ? (
                <TagList
                  items={[
                    ...(animal.activity ? [animal.activity] : []),
                    ...animal.traits,
                  ]}
                />
              ) : (
                <Muted>Behavioral traits are not yet curated.</Muted>
              )}
            </ProfileBlock>
            <ProfileBlock icon={Database} label="Live record">
              <div className="space-y-2 text-[12px] leading-5 text-slate-300/[0.72]">
                <DataLine
                  label="Observations"
                  value={
                    animal.observationsCount === undefined
                      ? "Not reported"
                      : compactNumber(animal.observationsCount)
                  }
                />
                <DataLine label="Source" value={animal.source} />
                <DataLine
                  label="Conservation"
                  value={animal.conservationStatus ?? "Not listed in response"}
                />
              </div>
            </ProfileBlock>
          </section>

          {memberships.length ? (
            <section className="mt-8">
              <SectionLabel icon={Sparkles}>Collection memberships</SectionLabel>
              <p className="mt-3 text-[13px] leading-6 text-slate-400">
                One species can belong to several overlapping biological sets at the
                same time.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {memberships.map((collection) =>
                  collection ? (
                    <span
                      key={collection.id}
                      className="rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
                      style={{
                        color: `rgb(${collection.accentRgb})`,
                        borderColor: `rgba(${collection.accentRgb},0.24)`,
                        background: `rgba(${collection.accentRgb},0.065)`,
                      }}
                    >
                      {collection.label}
                    </span>
                  ) : null,
                )}
              </div>
            </section>
          ) : null}

          {related.length ? (
            <section className="mt-8 border-t border-white/[0.09] pt-7">
              <SectionLabel icon={Activity}>Related in this set</SectionLabel>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {related.slice(0, 4).map((item) => (
                  <button
                    type="button"
                    key={String(item.id)}
                    onClick={() => onSelectRelated(item)}
                    className="group flex min-h-[74px] items-center gap-3 rounded-[15px] border border-white/[0.08] bg-white/[0.025] p-3 text-left transition hover:border-emerald-300/[0.22] hover:bg-emerald-400/[0.045]"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[11px] bg-white/[0.05]">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <strong className="block truncate text-[13px] text-slate-100">
                        {item.commonName}
                      </strong>
                      <span className="mt-1 block truncate font-serif text-[11px] italic text-slate-500">
                        {item.scientificName}
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-300"
                    />
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <footer className="mt-8 flex flex-col gap-4 border-t border-white/[0.09] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md text-[11px] leading-5 text-slate-500">
              {animal.imageAttribution ? (
                <>
                  Image: {animal.imageAttribution}
                  {animal.imageLicense ? ` · ${animal.imageLicense}` : ""}
                </>
              ) : (
                "Images and live counts appear when supplied by the connected taxon record."
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {animal.iNaturalistUrl ? (
                <SourceLink href={animal.iNaturalistUrl}>iNaturalist</SourceLink>
              ) : null}
              {animal.wikipediaUrl ? (
                <SourceLink href={animal.wikipediaUrl}>Wikipedia</SourceLink>
              ) : null}
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-200/[0.76]">
      <Icon size={14} /> {children}
    </div>
  );
}

function ProfileBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[17px] border border-white/[0.08] bg-black/[0.18] p-5">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-300/[0.72]">
        <Icon size={14} className="text-emerald-300/[0.70]" /> {label}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from(new Set(items)).map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] capitalize text-slate-300/[0.76]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function DataLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-2.5 last:border-0 last:pb-0">
      <span className="text-slate-500">{label}</span>
      <span className="max-w-[60%] text-right font-mono text-slate-200">
        {value}
      </span>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/[0.15] bg-black/[0.38] px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-white/[0.78] backdrop-blur-md">
      {children}
    </span>
  );
}

function ConservationBadge({ value }: { value: string }) {
  const tone = conservationTone(value);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] backdrop-blur-md"
      style={{
        color: `rgb(${tone})`,
        borderColor: `rgba(${tone},0.30)`,
        background: `rgba(${tone},0.09)`,
      }}
    >
      <ShieldAlert size={12} /> {value}
    </span>
  );
}

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-10 items-center gap-2 rounded-[11px] border border-white/[0.09] bg-white/[0.03] px-3.5 text-[11px] font-semibold text-slate-300 transition hover:border-emerald-300/[0.22] hover:text-emerald-200"
    >
      {children} <ExternalLink size={12} />
    </a>
  );
}

function Muted({ children }: { children: ReactNode }) {
  return <p className="text-[12px] leading-5 text-slate-500">{children}</p>;
}

function conservationTone(status: string) {
  const value = status.toLocaleLowerCase();
  if (value.includes("critically") || value === "cr") return "248, 113, 113";
  if (value.includes("endangered") || value === "en") return "251, 146, 60";
  if (value.includes("vulnerable") || value === "vu") return "250, 204, 21";
  if (value.includes("near") || value === "nt") return "163, 230, 53";
  return "110, 231, 183";
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
