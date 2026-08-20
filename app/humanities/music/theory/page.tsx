import DomainPageHeader from "@/app/_components/DomainPageHeader";
import HarmonicLatticeBackground from "@/app/_page-system/backgrounds/HarmonicLatticeBackground";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import CircleOfFifthsLab from "../CircleOfFifthsLab";
import {
  ArrowRight,
  AudioLines,
  Braces,
  Clock3,
  Layers3,
  Music2,
  ScrollText,
  Waves,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "humanities.music.theory";

type TheoryMeta = {
  question: string;
  role: string;
  icon: LucideIcon;
  rgb: string;
  position: { x: number; y: number };
};

const META: Record<string, TheoryMeta> = {
  "humanities.music.theory.rhythm": {
    question: "When does sound happen?",
    role: "time",
    icon: Clock3,
    rgb: "45, 212, 191",
    position: { x: 12, y: 70 },
  },
  "humanities.music.theory.scales": {
    question: "Which pitches belong to the field?",
    role: "pitch collection",
    icon: Waves,
    rgb: "244, 114, 182",
    position: { x: 31, y: 28 },
  },
  "humanities.music.theory.chords": {
    question: "Which pitches sound at once?",
    role: "vertical structure",
    icon: Layers3,
    rgb: "251, 146, 60",
    position: { x: 51, y: 62 },
  },
  "humanities.music.theory.harmony": {
    question: "How do sonorities move and resolve?",
    role: "relationship through time",
    icon: AudioLines,
    rgb: "167, 139, 250",
    position: { x: 70, y: 25 },
  },
  "humanities.music.theory.notation": {
    question: "How is the structure encoded?",
    role: "representation",
    icon: ScrollText,
    rgb: "96, 165, 250",
    position: { x: 88, y: 67 },
  },
};

export default function MusicTheoryHub() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090309] text-slate-100 selection:bg-rose-400/25">
      <HarmonicLatticeBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#090309]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "Music", href: "/humanities/music" },
              { label: "Theory & Composition" },
            ]}
            eyebrow="Pitch · time · simultaneity · progression · representation"
            eyebrowStyle="rule"
            icon={Music2}
            title={<span>Theory & Composition</span>}
            subtitle="Music theory separates a sounding piece into structural questions: when events occur, which pitches are available, which pitches combine, how those combinations move, and how the result is represented."
            accentRgb="244, 114, 182"
            titleClassName="font-sans text-[clamp(2.5rem,5vw,5.6rem)] font-semibold leading-[0.85] tracking-[-0.063em] text-[#fff7fb]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-white/[0.09] bg-black/[0.13] shadow-[0_32px_105px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:p-6">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-rose-200/70">Structural map</div>
              <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A score is several coordinate systems superimposed.</h2>
            </div>
            <p className="text-[10px] leading-5 text-slate-500">The categories below are not a sequence. Each answers a different structural question, and real music uses all of them simultaneously.</p>
          </div>

          <div className="relative hidden min-h-[520px] overflow-hidden lg:block">
            <div className="absolute left-[8%] right-[8%] top-[46%] h-[126px] -translate-y-1/2 opacity-45">
              {Array.from({ length: 5 }, (_, index) => <div key={index} className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" style={{ top: `${index * 25}%` }} />)}
            </div>
            <svg viewBox="0 0 1000 520" className="absolute inset-0 h-full w-full opacity-75" preserveAspectRatio="none">
              <path d="M120 360 C250 110 380 380 510 300 S760 90 880 350" fill="none" stroke="rgba(244,114,182,0.10)" strokeWidth="2" />
              <path d="M120 360 C310 450 480 80 700 150 S820 310 880 350" fill="none" stroke="rgba(167,139,250,0.08)" strokeWidth="1.5" strokeDasharray="4 10" />
            </svg>

            {context.children.map((child) => <TheoryStation key={child.id} child={child} />)}

            <div className="absolute bottom-7 left-1/2 w-[500px] -translate-x-1/2 rounded-[18px] border border-white/[0.07] bg-black/[0.34] px-5 py-4 text-center backdrop-blur-lg">
              <div className="flex items-center justify-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600"><Braces size={11} /> composition</div>
              <p className="mt-2 text-[9px] leading-4 text-slate-500">Composition is the act of choosing and coordinating these dimensions into a coherent temporal form.</p>
            </div>
          </div>

          <div className="space-y-2 p-4 lg:hidden">
            {context.children.map((child) => <MobileTheoryStation key={child.id} child={child} />)}
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_minmax(330px,0.88fr)]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-3 shadow-[0_28px_95px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-4">
            <CircleOfFifthsLab />
          </div>
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/65">One cyclic relationship</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">The circle of fifths is a map of key proximity, not the definition of harmony.</h2>
            <p className="mt-3 text-[11px] leading-6 text-slate-400">Adjacent keys share most of their pitch material, so the circle makes closely related tonal regions visible. It is one useful coordinate system inside a much larger theory of rhythm, melody, harmony, form, timbre, and notation.</p>
            <div className="mt-5 space-y-2">
              <TheoryRule label="Cycle" text="Moving by perfect fifths eventually visits all twelve pitch classes and returns to the starting class." />
              <TheoryRule label="Neighborhood" text="Nearby major keys differ by only one sharp or flat, so they share many notes." />
              <TheoryRule label="Function" text="Tonic, predominant, and dominant relationships describe tendencies inside a tonal context, not universal emotional laws." />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function TheoryStation({ child }: { child: (ReturnType<typeof requireCurriculumPageContext>)["children"][number] }) {
  const meta = META[child.id];
  if (!meta) return null;
  const Icon = meta.icon;
  const planned = child.status === "placeholder";
  const content = (
    <div className={`group absolute w-[190px] -translate-x-1/2 -translate-y-1/2 text-center ${planned ? "opacity-55" : ""}`} style={{ left: `${meta.position.x}%`, top: `${meta.position.y}%` }}>
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border bg-[#0b0710]/90 transition group-hover:scale-105" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.28)`, boxShadow: `0 0 38px rgba(${meta.rgb},0.10)` }}><Icon size={19} /></span>
      <div className="mt-3 font-mono text-[7px] uppercase tracking-[0.1em]" style={{ color: `rgba(${meta.rgb},0.62)` }}>{meta.role}</div>
      <strong className="mt-1 block text-[12px] text-white">{child.label}</strong>
      <p className="mt-1 text-[8px] leading-4 text-slate-600">{meta.question}</p>
    </div>
  );
  return planned ? content : <a href={child.href}>{content}</a>;
}

function MobileTheoryStation({ child }: { child: (ReturnType<typeof requireCurriculumPageContext>)["children"][number] }) {
  const meta = META[child.id];
  if (!meta) return null;
  const Icon = meta.icon;
  return (
    <a href={child.href} className="flex items-center gap-3 rounded-[16px] border border-white/[0.07] bg-white/[0.014] p-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.2)` }}><Icon size={15} /></span>
      <div className="min-w-0 flex-1"><div className="font-mono text-[7px] uppercase tracking-[0.09em]" style={{ color: `rgba(${meta.rgb},0.6)` }}>{meta.role}</div><strong className="mt-1 block text-[10px] text-white">{child.label}</strong><p className="mt-1 text-[8px] text-slate-600">{meta.question}</p></div>
      <ArrowRight size={12} className="text-slate-700" />
    </a>
  );
}

function TheoryRule({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[15px] border border-white/[0.06] bg-white/[0.012] p-3">
      <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-amber-200/55">{label}</div>
      <p className="mt-1.5 text-[8px] leading-4 text-slate-700">{text}</p>
    </div>
  );
}
