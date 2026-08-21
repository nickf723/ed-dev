import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import DialecticFieldBackground from "@/app/_page-system/backgrounds/DialecticFieldBackground";
import QuestionMatrixTopology, {
  type QuestionMatrixIcon,
  type QuestionMatrixNode,
} from "@/app/_page-system/topologies/QuestionMatrixTopology";
import ArgumentMap from "@/app/_page-system/widgets/ArgumentMap";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  Sigma,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import PhilosophyEvidenceReview from "./PhilosophyEvidenceReview";
import {
  PHILOSOPHY_ARGUMENT_NODES,
  PHILOSOPHY_DIRECT_BRANCH_IDS,
} from "./philosophyModel";

const NODE_ID = "humanities.philosophy";

export const metadata: Metadata = {
  title: "Philosophy | Education Station 64",
  description:
    "Navigate philosophical questions, inspect arguments, distinguish validity from soundness, test counterexamples, and preserve source context.",
};

type Meta = {
  question: string;
  rgb: string;
  icon: QuestionMatrixIcon;
  x: number;
  y: number;
};

const META: Record<string, Meta> = {
  "humanities.philosophy.metaphysics": {
    question: "What is there, and what makes it the kind of reality it is?",
    rgb: "251, 191, 36",
    icon: "orbit",
    x: 18,
    y: 22,
  },
  "humanities.philosophy.epistemology": {
    question: "What can we know, and what makes belief justified?",
    rgb: "34, 211, 238",
    icon: "eye",
    x: 27,
    y: 48,
  },
  "humanities.philosophy.mind": {
    question:
      "What is a mind, and how does experience relate to body and world?",
    rgb: "167, 139, 250",
    icon: "brain",
    x: 50,
    y: 22,
  },
  "humanities.philosophy.ethics": {
    question: "What should an agent do, value, or become?",
    rgb: "52, 211, 153",
    icon: "scale",
    x: 50,
    y: 78,
  },
  "humanities.philosophy.political": {
    question:
      "What makes social power, rules, rights, and institutions justifiable?",
    rgb: "96, 165, 250",
    icon: "landmark",
    x: 82,
    y: 78,
  },
  "humanities.philosophy.aesthetics": {
    question:
      "What makes art, beauty, expression, and aesthetic judgment matter?",
    rgb: "244, 114, 182",
    icon: "palette",
    x: 19,
    y: 77,
  },
  "humanities.philosophy.science": {
    question:
      "What makes a scientific model, explanation, or inference trustworthy?",
    rgb: "192, 132, 252",
    icon: "flask",
    x: 77,
    y: 46,
  },
};

export default function PhilosophyPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const directIds = context.children.map((child) => child.id);
  if (
    directIds.length !== PHILOSOPHY_DIRECT_BRANCH_IDS.length ||
    directIds.some((id, index) => id !== PHILOSOPHY_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error("Philosophy branches must match the curriculum registry");
  }
  const nodes: QuestionMatrixNode[] = context.children.map((child) => {
    const meta = META[child.id] ?? META["humanities.philosophy.epistemology"];
    return {
      id: child.id,
      label: child.label,
      question: meta.question,
      summary: child.description ?? "",
      rgb: meta.rgb,
      x: meta.x,
      y: meta.y,
      href: child.href,
      status: child.status === "placeholder" ? "planned" : "active",
      icon: meta.icon,
    };
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0805] text-slate-100 selection:bg-amber-400/25">
      <DialecticFieldBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="bg-[#0b0805]/78 sticky top-0 z-30 -mx-4 border-b border-white/[0.06] px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Questions · positions · reasons · objections · revision"
            eyebrowStyle="rule"
            icon={Sparkles}
            title={<span>Philosophy</span>}
            subtitle="Philosophy organizes difficult questions, proposes positions, and tests the reasons for them. Its branches overlap because questions about reality, knowledge, mind, value, and society constrain one another."
            accentRgb="251, 191, 36"
            titleClassName="font-serif text-[clamp(2.9rem,5.6vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fffaf0]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-6">
          <QuestionMatrixTopology
            nodes={nodes}
            xLabels={["world", "agent", "collective"]}
            yLabels={["being", "knowing", "valuing / ought"]}
          />
        </section>

        <section className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.16fr)_minmax(330px,0.84fr)]">
          <div className="rounded-[28px] border border-amber-200/[0.11] bg-black/[0.11] p-5 shadow-[0_28px_95px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-200/70">
              What philosophy does
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,2.9rem)] font-semibold tracking-[-0.05em] text-white">
              A philosophical disagreement can target the question, the claim,
              the reasons, or the standards being used.
            </h2>
            <p className="text-slate-400/76 mt-3 max-w-3xl text-[14px] leading-6">
              That makes philosophy less like a shelf of famous opinions and
              more like a structured space of competing explanations. The goal
              is not merely to collect positions, but to understand what would
              make one position better supported than another.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-[28px] border border-white/[0.08] bg-black/[0.11] p-3 backdrop-blur-xl">
            <Practice
              icon={Eye}
              label="Clarify"
              text="Make the question and concepts precise enough to disagree about."
              rgb="34, 211, 238"
            />
            <Practice
              icon={Sigma}
              label="Argue"
              text="Separate conclusions from the reasons intended to support them."
              rgb="251, 191, 36"
            />
            <Practice
              icon={ArrowRight}
              label="Revise"
              text="Use objections and counterexamples to strengthen or abandon a view."
              rgb="192, 132, 252"
            />
          </div>
        </section>

        <section className="mt-20 grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_minmax(330px,0.88fr)]">
          <ArgumentMap nodes={PHILOSOPHY_ARGUMENT_NODES} />
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/65">
              Cross-disciplinary tool
            </div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">
              Logic studies valid inference more formally.
            </h2>
            <p className="text-slate-400/74 mt-3 text-[14px] leading-6">
              Philosophers use logic constantly, but Logic already has a
              canonical home in Formal Science. Philosophy asks what claims
              mean, which premises matter, what standards are appropriate, and
              what follows if a position is accepted; formal logic provides
              tools for analyzing inferential structure.
            </p>
            <Link
              href="/formal-science/logic"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.16] bg-cyan-300/[0.025] px-4 py-2.5 text-[13px] font-semibold text-cyan-100/75 hover:bg-cyan-300/[0.05]"
            >
              Open Logic <ArrowRight size={14} />
            </Link>
            <div className="mt-6 rounded-[18px] border border-white/[0.06] bg-white/[0.012] p-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500/70">
                Navigation rule
              </div>
              <p className="mt-2 text-[13px] leading-6 text-slate-400/70">
                A cross-link can be important without pretending the linked
                subject is a child. The knowledge graph should preserve both the
                relationship and the correct hierarchy.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <PhilosophyEvidenceReview />
        </section>

        <section className="mt-20 overflow-hidden border-y border-white/[0.09] bg-[#0b0808]/50 backdrop-blur-xl">
          <div className="grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div className="border-b border-white/[0.07] p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="text-amber-200/58 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
                Source trail · future argument bibliography
              </div>
              <h2 className="mt-3 font-serif text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                A source can document a position without becoming the position,
                its argument, or its truth.
              </h2>
              <p className="mt-4 text-[13px] leading-6 text-slate-400">
                A future philosophy repository should connect concepts,
                arguments, objections, authors, works, editions, citations, and
                branch context. It must distinguish a current reference entry
                from a fixed citable edition, and bibliographic metadata from
                full text or evaluated reasoning. This root performs no
                render-time provider request.
              </p>
            </div>
            <div className="grid gap-px bg-white/[0.055] sm:grid-cols-3">
              {[
                [
                  "Stanford Encyclopedia · current",
                  "Expert-authored entries are revised under editorial review. Link to the entry and retain author, title, revision state, and topic rather than redistributing full text.",
                  "https://plato.stanford.edu/",
                ],
                [
                  "Stanford Encyclopedia · archives",
                  "Fixed quarterly editions support stable citation. Preserve edition, entry path, editors, access context, and the distinction from the changing current entry.",
                  "https://plato.stanford.edu/archives/",
                ],
                [
                  "Crossref · REST API",
                  "Works metadata can support DOI search and citation trails, but coverage and fields vary. Retain DOI, authors, title, type, container, dates, publisher, relation, license, and update context.",
                  "https://api.crossref.org/",
                ],
              ].map(([label, note, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0b0808]/94 group px-4 py-5 transition hover:bg-[#15100d]"
                >
                  <strong className="text-white/82 flex items-center justify-between gap-3 text-[12px] transition group-hover:text-amber-100">
                    {label}
                    <ArrowUpRight
                      size={13}
                      className="text-amber-200/40"
                      aria-hidden="true"
                    />
                  </strong>
                  <span className="mt-3 block text-[11px] leading-5 text-slate-500">
                    {note}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Practice({
  icon: Icon,
  label,
  text,
  rgb,
}: {
  icon: LucideIcon;
  label: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="flex min-h-[160px] flex-col justify-between rounded-[18px] border border-white/[0.06] bg-white/[0.012] p-3">
      <Icon size={17} style={{ color: `rgb(${rgb})` }} />
      <div>
        <div
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
          style={{ color: `rgba(${rgb},0.68)` }}
        >
          {label}
        </div>
        <p className="text-slate-400/72 mt-1.5 text-[12px] leading-5">{text}</p>
      </div>
    </div>
  );
}
