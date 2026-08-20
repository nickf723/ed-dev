"use client";

import { useMemo, useState } from "react";
import { Baby, BarChart3, UsersRound } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ProfileKey = "expansive" | "column" | "constrictive";

type Profile = {
  label: string;
  values: readonly number[];
  description: string;
  implication: string;
  rgb: string;
};

const AGE_GROUPS = ["0–9", "10–19", "20–29", "30–39", "40–49", "50–59", "60–69", "70–79", "80+"] as const;

const PROFILES: Record<ProfileKey, Profile> = {
  expansive: {
    label: "Expansive",
    values: [92, 84, 72, 59, 47, 35, 24, 14, 7],
    description: "A broad base and progressively narrower older cohorts.",
    implication: "This stylized shape places a large share of the population in younger age groups, so schools, housing, labor-market entry, and future population momentum become important questions.",
    rgb: "56,189,248",
  },
  column: {
    label: "Column-like",
    values: [61, 63, 64, 62, 61, 58, 49, 35, 19],
    description: "Many younger and middle cohorts have similar relative width.",
    implication: "This stylized shape suggests a more even distribution through much of the age structure, while older cohorts still narrow. Stable-looking shapes can still change through migration, fertility, mortality, and cohort aging.",
    rgb: "94,234,212",
  },
  constrictive: {
    label: "Constrictive",
    values: [38, 43, 56, 67, 73, 70, 59, 43, 25],
    description: "Younger cohorts are narrower than several middle-age cohorts.",
    implication: "This stylized shape places relatively more people in middle and older cohorts, raising questions about labor-force replacement, care systems, pensions, housing, and how migration might alter the age structure.",
    rgb: "244,114,182",
  },
};

export default function PopulationPyramid() {
  const [profileKey, setProfileKey] = useState<ProfileKey>("expansive");
  const profile = PROFILES[profileKey];
  const shares = useMemo(() => {
    const total = profile.values.reduce((sum, value) => sum + value, 0);
    const young = profile.values.slice(0, 2).reduce((sum, value) => sum + value, 0) / total;
    const working = profile.values.slice(2, 6).reduce((sum, value) => sum + value, 0) / total;
    const older = profile.values.slice(6).reduce((sum, value) => sum + value, 0) / total;
    return {
      young: Math.round(young * 100),
      working: Math.round(working * 100),
      older: Math.round(older * 100),
    };
  }, [profile]);

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-sky-100/[0.12]"
      style={{ background: "rgba(4,14,28,0.34)" }}
    >
      <div className="grid border-b border-sky-100/[0.08] lg:grid-cols-[minmax(0,1fr)_350px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-sky-200/66">
            <UsersRound size={14} /> Demographic instrument · stylized age structure
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            What does the shape of a population reveal before we know its story?
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
            Compare three deliberately simplified age profiles. A population pyramid is a snapshot of cohort structure, not a complete explanation of fertility, mortality, migration, policy, or future change.
          </p>
        </div>
        <div className="border-t border-sky-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-200/62">Data boundary</div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/64">
            These bars are normalized teaching profiles, not measurements from a real country. The left and right halves are intentionally symmetric so the exercise isolates age structure rather than sex differences.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="border-b border-sky-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#03101e]/62 p-4 backdrop-blur-[8px] sm:p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] gap-x-2">
              {[...profile.values].reverse().map((value, reverseIndex) => {
                const index = profile.values.length - 1 - reverseIndex;
                const age = AGE_GROUPS[index];
                return (
                  <div key={age} className="contents">
                    <div className="flex min-h-[31px] items-center justify-end">
                      <div className="h-5 rounded-l-[6px] border-r transition-[width] duration-500" style={{ width: `${value}%`, background: `rgba(56,189,248,${0.18 + value / 380})`, borderColor: "rgba(125,211,252,0.45)" }} />
                    </div>
                    <div className="flex min-h-[31px] items-center justify-center font-mono text-[11px] text-slate-400">{age}</div>
                    <div className="flex min-h-[31px] items-center justify-start">
                      <div className="h-5 rounded-r-[6px] border-l transition-[width] duration-500" style={{ width: `${value}%`, background: `rgba(244,114,182,${0.16 + value / 420})`, borderColor: "rgba(249,168,212,0.42)" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-[1fr_56px_1fr] gap-2 border-t border-white/[0.07] pt-3 font-mono text-[11px] uppercase tracking-[0.08em]">
              <span className="text-right text-sky-200/58">Left half</span>
              <span />
              <span className="text-pink-200/58">Right half</span>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Readout icon={Baby} label="Young cohorts" value={`${shares.young}%`} note="relative share in ages 0–19" rgb="56,189,248" />
            <Readout icon={BarChart3} label="Core adult cohorts" value={`${shares.working}%`} note="relative share in ages 20–59" rgb="94,234,212" />
            <Readout icon={UsersRound} label="Older cohorts" value={`${shares.older}%`} note="relative share in ages 60+" rgb="244,114,182" />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">Shape presets</div>
          <div className="mt-3 grid gap-2">
            {(Object.entries(PROFILES) as Array<[ProfileKey, Profile]>).map(([key, item]) => {
              const selected = key === profileKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setProfileKey(key)}
                  className="rounded-[16px] border px-3 py-3 text-left transition"
                  style={{ borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.07)", background: selected ? `rgba(${item.rgb},0.065)` : "rgba(0,0,0,0.08)" }}
                >
                  <span className="flex items-center justify-between gap-3"><strong className="text-[13px] text-white/86">{item.label}</strong><span className="h-2 w-2 rounded-full" style={{ background: `rgb(${item.rgb})`, opacity: selected ? 0.9 : 0.35 }} /></span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">{item.description}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${profile.rgb},0.72)` }}>Interpretation</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-300/68">{profile.implication}</p>
          </div>

          <div className="mt-4 border-l border-sky-200/20 pl-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-sky-200/46">Next question</div>
            <p className="mt-1 text-[12px] leading-5 text-slate-400/62">What combination of births, deaths, migration, and cohort aging could have produced this shape, and how might those processes differ from place to place?</p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function Readout({ icon: Icon, label, value, note, rgb }: { icon: typeof Baby; label: string; value: string; note: string; rgb: string }) {
  return (
    <div className="border-l px-3 py-2" style={{ borderColor: `rgba(${rgb},0.30)` }}>
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500"><Icon size={13} style={{ color: `rgb(${rgb})` }} /> {label}</div>
      <strong className="mt-1 block text-[20px] text-white">{value}</strong>
      <span className="mt-1 block text-[11px] leading-4 text-slate-600">{note}</span>
    </div>
  );
}
