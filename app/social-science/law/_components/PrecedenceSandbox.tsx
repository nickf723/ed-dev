"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Gavel, Landmark, Scale, type LucideIcon } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type CourtLevel = "SUPREME" | "CIRCUIT" | "DISTRICT";

type CourtInfo = {
  title: string;
  short: string;
  icon: LucideIcon;
  rgb: string;
  work: string;
  authority: string;
  appeal: string;
};

const COURTS: Record<CourtLevel, CourtInfo> = {
  SUPREME: {
    title: "U.S. Supreme Court",
    short: "highest federal court",
    icon: Landmark,
    rgb: "251,191,36",
    work: "Reviews a limited set of cases presenting federal questions and other matters within its jurisdiction. It does not function as a routine third trial court and generally reviews a record made below.",
    authority: "Its holdings on federal law and the U.S. Constitution bind lower federal courts and state courts on those federal questions, unless the governing law later changes or the Court revises the rule.",
    appeal: "Many cases reach the Court only after lower-court review, and the Court has substantial control over which appeals it hears.",
  },
  CIRCUIT: {
    title: "U.S. Court of Appeals",
    short: "regional appellate court",
    icon: Scale,
    rgb: "125,211,252",
    work: "Reviews federal trial-court decisions and certain agency matters for legal error under the relevant standard of review. Appellate judges ordinarily work from the record rather than retrying the facts from scratch.",
    authority: "Published precedential decisions generally bind federal district courts within that circuit. A circuit does not ordinarily bind the other federal circuits, which is one reason federal law can develop circuit splits.",
    appeal: "Parties commonly appeal final federal district-court judgments to the court of appeals with jurisdiction over that district, subject to procedural rules and exceptions.",
  },
  DISTRICT: {
    title: "U.S. District Court",
    short: "federal trial court",
    icon: Gavel,
    rgb: "94,234,212",
    work: "Develops the trial record in federal cases: pleadings, motions, evidence, fact finding, jury trials where applicable, judgments, and many first-instance procedural decisions.",
    authority: "A district court must follow controlling Supreme Court and circuit precedent. Its own opinions can be persuasive elsewhere, but a single district-court opinion generally does not bind other district judges as precedent.",
    appeal: "Appealable rulings can move upward to the appropriate court of appeals. The exact timing and route depend on jurisdiction and procedural doctrine.",
  },
};

const ORDER: readonly CourtLevel[] = ["SUPREME", "CIRCUIT", "DISTRICT"] as const;

export default function PrecedenceSandbox() {
  const [activeCourt, setActiveCourt] = useState<CourtLevel>("CIRCUIT");
  const active = COURTS[activeCourt];
  const ActiveIcon = active.icon;

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-amber-100/[0.12]"
      style={{ background: "rgba(13,13,12,0.36)" }}
    >
      <div className="grid border-b border-white/[0.08] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/66">
            <Scale size={14} /> Precedent sandbox · simplified U.S. federal hierarchy
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            Appeals usually move upward. Controlling precedent can constrain courts below.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-zinc-300/70">
            Select a court tier to see the difference between the work a court performs, the authority its decisions can carry, and the direction an appeal may travel.
          </p>
        </div>
        <div className="border-t border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-rose-200/58">Model boundary</div>
          <p className="mt-3 text-[13px] leading-6 text-zinc-300/64">
            This widget isolates the basic U.S. federal court hierarchy. State courts, specialized federal courts, administrative review, original jurisdiction, interlocutory appeals, en banc review, unpublished opinions, and many jurisdictional details are outside this simplified model.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[390px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative mx-auto max-w-[330px]">
            <div className="absolute bottom-12 left-[22px] top-12 w-px bg-gradient-to-t from-sky-300/18 via-zinc-300/10 to-amber-300/18" />
            {ORDER.map((level, index) => {
              const info = COURTS[level];
              const Icon = info.icon;
              const selected = level === activeCourt;
              return (
                <div key={level} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveCourt(level)}
                    className="relative z-10 grid w-full grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-[18px] border px-3 py-3 text-left transition"
                    style={{ borderColor: selected ? `rgba(${info.rgb},0.36)` : "rgba(255,255,255,0.07)", background: selected ? `rgba(${info.rgb},0.07)` : "rgba(0,0,0,0.10)" }}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ color: `rgb(${info.rgb})`, borderColor: `rgba(${info.rgb},0.28)`, background: `rgba(${info.rgb},0.045)` }}><Icon size={16} /></span>
                    <span><span className="font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: `rgba(${info.rgb},0.70)` }}>Tier {index + 1}</span><strong className="mt-0.5 block text-[14px] text-white/88">{info.title}</strong><span className="mt-1 block text-[11px] leading-4 text-zinc-500">{info.short}</span></span>
                  </button>
                  {index < ORDER.length - 1 ? (
                    <div className="flex h-11 items-center justify-center gap-10 font-mono text-[11px] uppercase tracking-[0.07em]">
                      <span className="flex items-center gap-1 text-sky-200/36"><ArrowUp size={12} /> appeal</span>
                      <span className="flex items-center gap-1 text-amber-200/36">authority <ArrowDown size={12} /></span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${active.rgb},0.72)` }}>Selected court</div>
              <h3 className="mt-1 text-[26px] font-semibold tracking-[-0.035em] text-white">{active.title}</h3>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${active.rgb})`, borderColor: `rgba(${active.rgb},0.26)`, background: `rgba(${active.rgb},0.05)` }}><ActiveIcon size={20} /></span>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <CourtReadout label="Primary work" text={active.work} rgb={active.rgb} />
            <CourtReadout label="Precedent / authority" text={active.authority} rgb={active.rgb} />
            <CourtReadout label="Appeal path" text={active.appeal} rgb={active.rgb} />
          </div>

          <div className="mt-5 border-l border-amber-200/20 pl-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-200/50">Reasoning habit</div>
            <p className="mt-2 text-[13px] leading-6 text-zinc-300/66">
              Before treating a judicial opinion as controlling, ask which court issued it, which jurisdiction you are in, what legal question the holding actually resolved, whether later authority changed the rule, and whether the cited language is part of the holding or merely persuasive discussion.
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function CourtReadout({ label, text, rgb }: { label: string; text: string; rgb: string }) {
  return (
    <div className="border-t pt-3" style={{ borderColor: `rgba(${rgb},0.20)` }}>
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">{label}</div>
      <p className="mt-2 text-[12px] leading-5 text-zinc-300/68">{text}</p>
    </div>
  );
}
