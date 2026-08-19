import Link from "next/link";
import {
  ArrowRight,
  CircleDashed,
  CircleHelp,
  Landmark,
  Scale,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import EthicsField from "./EthicsField";

const NODE_ID = "humanities.philosophy.ethics";
const ACCENT = "245, 158, 11";

type BranchMeta = {
  icon: LucideIcon;
  question: string;
  register: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "humanities.philosophy.ethics.metaethics": {
    icon: CircleHelp,
    question: "What do moral claims mean, and what could make them true, justified, or knowable?",
    register: "meaning · truth · reasons · knowledge",
    rgb: "167, 139, 250",
  },
  "humanities.philosophy.ethics.normative": {
    icon: Scale,
    question: "What ought people to do, what reasons matter, and what makes an action or character good?",
    register: "standards · duties · outcomes · virtues",
    rgb: "245, 158, 11",
  },
  "humanities.philosophy.ethics.applied": {
    icon: Landmark,
    question: "How should ethical reasons guide decisions in medicine, technology, environment, war, business, and public life?",
    register: "cases · institutions · policy · practice",
    rgb: "45, 212, 191",
  },
  "humanities.philosophy.ethics.responsibility": {
    icon: UsersRound,
    question: "When is an agent responsible, blameworthy, praiseworthy, excused, coerced, lucky, or unable to do otherwise?",
    register: "agency · intention · blame · moral psychology",
    rgb: "244, 114, 182",
  },
};

export default function EthicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07070b] text-slate-100 selection:bg-amber-300/25">
      <EthicsField />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-14 pt-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Philosophy · Value, action & responsibility"
          icon={Scale}
          title={<span>Ethics</span>}
          subtitle="Ethics is not one dilemma or one list of theories. It is a family of questions about moral meaning, standards for action, concrete cases, and responsible agency."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.7rem,6vw,5.8rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-[#fffaf0]"
          headerClassName="border-white/[0.09]"
        />

        <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] lg:items-center">
          <div className="rounded-[24px] border border-amber-200/[0.12] bg-black/[0.22] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-200/70">The navigation question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.035em] text-white">What kind of ethical question am I asking?</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-200">
              Start by locating the level of inquiry. A disagreement about whether moral facts exist is different from a disagreement about which policy is just, even when both are “ethics.”
            </p>
            <div className="mt-5 space-y-3 text-[13px] leading-6 text-slate-300">
              <Relationship label="Foundations" text="What are moral claims and reasons?" rgb="167, 139, 250" />
              <Relationship label="Standards" text="What should guide action and character?" rgb="245, 158, 11" />
              <Relationship label="Cases" text="What should be done in this domain or situation?" rgb="45, 212, 191" />
              <Relationship label="Agents" text="Who is responsible, and under what conditions?" rgb="244, 114, 182" />
            </div>
          </div>

          <nav aria-label="Ethics branches" className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#0a090d]/82 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:p-4">
            <div className="pointer-events-none absolute inset-y-5 left-1/2 hidden w-px bg-white/[0.07] md:block" />
            <div className="pointer-events-none absolute inset-x-5 top-1/2 hidden h-px bg-white/[0.07] md:block" />
            <div className="grid gap-3 md:grid-cols-2">
              {context.children.map((child) => {
                const meta = BRANCH_META[child.id];
                if (!meta) return null;
                const Icon = meta.icon;
                const active = child.status !== "placeholder";
                const region = (
                  <div
                    className="group relative min-h-[245px] overflow-hidden rounded-[22px] border p-5 transition sm:p-6"
                    style={{
                      borderColor: `rgba(${meta.rgb},${active ? "0.20" : "0.09"})`,
                      background: `linear-gradient(145deg, rgba(${meta.rgb},${active ? "0.065" : "0.022"}), rgba(5,5,9,0.62))`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-[15px] border" style={{ borderColor: `rgba(${meta.rgb},.20)`, color: `rgb(${meta.rgb})`, background: `rgba(${meta.rgb},.055)` }}>
                        <Icon size={20} />
                      </span>
                      {active ? <ArrowRight size={17} style={{ color: `rgb(${meta.rgb})` }} /> : <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600"><CircleDashed size={11} /> planned</span>}
                    </div>
                    <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${meta.rgb},.76)` }}>{meta.register}</div>
                    <h3 className={`mt-2 text-[24px] font-semibold tracking-[-0.03em] ${active ? "text-white" : "text-slate-400"}`}>{child.label}</h3>
                    <p className={`mt-3 text-[14px] leading-7 ${active ? "text-slate-200" : "text-slate-500"}`}>{meta.question}</p>
                  </div>
                );

                return active ? <Link key={child.id} href={child.href} className="block transition-transform hover:-translate-y-0.5">{region}</Link> : <div key={child.id} aria-disabled="true">{region}</div>;
              })}
            </div>
            <div className="mt-3 rounded-[18px] border border-white/[0.07] bg-black/[0.22] px-4 py-3 text-center text-[12px] leading-6 text-slate-400">
              These branches overlap. Normative theories inform applied cases; metaethical commitments shape what counts as a reason; responsibility questions can change how an otherwise wrong action is judged.
            </div>
          </nav>
        </section>

        <section className="mt-6 rounded-[24px] border border-white/[0.08] bg-black/[0.18] p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200/65">Live path</div>
              <h2 className="mt-2 text-[22px] font-semibold text-white">Start with Normative Ethics when the question is “What should I do, and why?”</h2>
              <p className="mt-2 max-w-3xl text-[14px] leading-7 text-slate-300">That branch contains the Ethical Reasoning lesson you already explored, while leaving room for the individual theories and future thought-experiment units to become their own destinations.</p>
            </div>
            <Link href="/humanities/philosophy/ethics/normative-ethics" className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-amber-200/[0.18] bg-amber-300/[0.055] px-5 py-3 text-[13px] font-semibold text-amber-100 transition hover:bg-amber-300/[0.09]">Enter Normative Ethics <ArrowRight size={15} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Relationship({ label, text, rgb }: { label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[82px_1fr] gap-3">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgb(${rgb})` }}>{label}</span>
      <span>{text}</span>
    </div>
  );
}
