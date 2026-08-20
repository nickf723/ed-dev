import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CircleDashed,
  Compass,
  FlaskConical,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import EthicsField from "../EthicsField";

const NODE_ID = "humanities.philosophy.ethics.normative";
const ACCENT = "245, 158, 11";

type ChildMeta = {
  icon: LucideIcon;
  role: "practice" | "theory" | "stress";
  prompt: string;
  rgb: string;
};

const META: Record<string, ChildMeta> = {
  "humanities.philosophy.ethics.normative.reasoning": {
    icon: Compass,
    role: "practice",
    prompt: "Separate claims from reasons, distinguish kinds of reasons, build arguments, and ask what a competing lens would challenge.",
    rgb: "245, 158, 11",
  },
  "humanities.philosophy.ethics.normative.consequentialism": {
    icon: Sparkles,
    role: "theory",
    prompt: "Evaluate actions, rules, or institutions through the value, risk, distribution, and expected consequences they produce.",
    rgb: "250, 204, 21",
  },
  "humanities.philosophy.ethics.normative.deontology": {
    icon: ShieldCheck,
    role: "theory",
    prompt: "Ask what duties, rights, permissions, prohibitions, promises, and forms of respect constrain what may be done.",
    rgb: "167, 139, 250",
  },
  "humanities.philosophy.ethics.normative.virtue": {
    icon: Scale,
    role: "theory",
    prompt: "Evaluate character, flourishing, virtues, vices, habits, motives, and the practical wisdom needed in a concrete situation.",
    rgb: "45, 212, 191",
  },
  "humanities.philosophy.ethics.normative.care": {
    icon: HeartHandshake,
    role: "theory",
    prompt: "Center relationships, dependency, vulnerability, context, care, power, and responsibilities created through human connection.",
    rgb: "244, 114, 182",
  },
  "humanities.philosophy.ethics.normative.thought-experiments": {
    icon: FlaskConical,
    role: "stress",
    prompt: "Use deliberately controlled cases to isolate tensions, test principles, compare intuitions, and discover where theories diverge.",
    rgb: "96, 165, 250",
  },
};

export default function NormativeEthicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const practice = context.children.find((child) => META[child.id]?.role === "practice");
  const theories = context.children.filter((child) => META[child.id]?.role === "theory");
  const stress = context.children.find((child) => META[child.id]?.role === "stress");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07070b] text-slate-100 selection:bg-amber-300/25">
      <EthicsField />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-14 pt-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Ethics · Standards for action & character"
          icon={Scale}
          title={<span>Normative Ethics</span>}
          subtitle="Normative ethics asks which reasons should guide action and character. Learn the practice of moral argument, compare major theoretical lenses, then stress-test them with carefully designed cases."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.4rem,5.3vw,5.2rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-[#fffaf0]"
          headerClassName="border-white/[0.09]"
        />

        <section className="mt-6 rounded-[28px] border border-white/[0.10] bg-[#0a090d]/84 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-200/70">How this branch is organized</div>
            <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.035em] text-white">Theories are lenses. Reasoning is the practice. Thought experiments are stress tests.</h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-300">The navigation itself should make that distinction visible before you open a page.</p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_86px_minmax(300px,0.82fr)_86px_minmax(260px,0.72fr)] lg:items-center">
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Theory lenses</div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {theories.map((child) => {
                  const meta = META[child.id];
                  const Icon = meta.icon;
                  return (
                    <div key={child.id} aria-disabled="true" className="rounded-[18px] border p-4" style={{ borderColor: `rgba(${meta.rgb},.11)`, background: `rgba(${meta.rgb},.025)` }}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ borderColor: `rgba(${meta.rgb},.18)`, color: `rgb(${meta.rgb})` }}><Icon size={17} /></span>
                          <strong className="text-[15px] text-slate-200">{child.label}</strong>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600"><CircleDashed size={10} /> planned</span>
                      </div>
                      <p className="mt-3 text-[12px] leading-6 text-slate-400">{meta.prompt}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden flex-col items-center justify-center gap-2 text-slate-600 lg:flex">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em]">inform</span>
              <ArrowRight size={24} />
            </div>

            {practice ? (
              <Link href={practice.href} className="group block rounded-[24px] border border-amber-200/[0.20] bg-amber-300/[0.055] p-5 shadow-[0_18px_55px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:bg-amber-300/[0.075] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-amber-200/[0.20] bg-amber-300/[0.06] text-amber-100"><Compass size={22} /></span>
                  <ArrowRight size={18} className="text-amber-200" />
                </div>
                <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-200/70">Core practice · live</div>
                <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.03em] text-white">{practice.label}</h3>
                <p className="mt-3 text-[14px] leading-7 text-slate-200">{META[practice.id].prompt}</p>
                <div className="mt-5 rounded-[14px] border border-white/[0.08] bg-black/[0.18] px-3 py-3 font-mono text-[11px] text-amber-100/75">claim → reasons → lens → challenge → revised judgment</div>
              </Link>
            ) : null}

            <div className="hidden flex-col items-center justify-center gap-2 text-slate-600 lg:flex">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em]">test</span>
              <ArrowRight size={24} />
            </div>

            {stress ? (
              <div aria-disabled="true" className="rounded-[24px] border border-blue-200/[0.10] bg-blue-300/[0.025] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-blue-200/[0.16] text-blue-100"><FlaskConical size={22} /></span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600"><CircleDashed size={10} /> planned</span>
                </div>
                <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-200/60">Stress-test bench</div>
                <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-300">{stress.label}</h3>
                <p className="mt-3 text-[14px] leading-7 text-slate-400">{META[stress.id].prompt}</p>
                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-600 lg:hidden"><ArrowDown size={14} /> Future branch</div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-[22px] border border-white/[0.08] bg-black/[0.20] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-teal-200/65">Why the categories stay separate</div>
            <p className="mt-3 text-[15px] leading-7 text-slate-200">A trolley case is not “ethics” in miniature. It is one engineered case used to probe normative reasoning. Likewise, consequentialism is not a personality type; it is a family of theories about which features of an action carry moral weight.</p>
          </div>
          <Link href="/humanities/philosophy/ethics" className="flex items-center justify-between gap-4 rounded-[22px] border border-white/[0.08] bg-black/[0.18] p-5 text-slate-300 transition hover:border-amber-200/[0.14] hover:text-white sm:p-6">
            <div><div className="text-[10px] font-semibold uppercase tracking-[0.10em] text-slate-500">Up one level</div><strong className="mt-2 block text-[17px]">Return to the Ethics inquiry map</strong></div><ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}
