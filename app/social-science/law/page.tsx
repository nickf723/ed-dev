import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import VocabApplet from "@/app/_components/VocabApplet";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { lawVocab } from "@/app/_data/vocab/l/law";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  Building2,
  FileSearch,
  Gavel,
  Globe2,
  Landmark,
  LibraryBig,
  Scale,
  ScrollText,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import JusticeBackground from "./_components/JusticeBackground";
import PrecedenceSandbox from "./_components/PrecedenceSandbox";

const NODE_ID = "social.law";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "social.law.jurisprudence": {
    icon: Scale,
    code: "JUR",
    question: "What gives law authority, what counts as a legal reason, and how should legitimacy, rights, duties, and justice be understood?",
    rgb: "251,191,36",
  },
  "social.law.constitutional": {
    icon: Landmark,
    code: "CON",
    question: "How are public powers created, divided, constrained, interpreted, and challenged through constitutional rules and rights?",
    rgb: "244,114,182",
  },
  "social.law.criminal": {
    icon: ShieldCheck,
    code: "CRM",
    question: "How do offenses, culpability, defenses, investigation, prosecution, proof, punishment, and procedural rights fit together?",
    rgb: "248,113,113",
  },
  "social.law.civil-procedure": {
    icon: ScrollText,
    code: "CVP",
    question: "Which court can hear a dispute, how does a civil case move, and which procedures shape evidence, judgment, appeal, and remedy?",
    rgb: "125,211,252",
  },
  "social.law.private": {
    icon: UsersRound,
    code: "PVT",
    question: "How does law structure agreements, ownership, injuries, obligations, liability, compensation, and relationships among private parties?",
    rgb: "94,234,212",
  },
  "social.law.administrative": {
    icon: Building2,
    code: "ADM",
    question: "How do agencies receive authority, make rules, decide cases, enforce policy, and remain subject to legal review?",
    rgb: "192,132,252",
  },
  "social.law.international-comparative": {
    icon: Globe2,
    code: "INT",
    question: "What changes when legal authority crosses borders or when different legal traditions solve the same institutional problem differently?",
    rgb: "96,165,250",
  },
  "social.law.method": {
    icon: FileSearch,
    code: "MTH",
    question: "How do lawyers and courts locate authority, distinguish holdings, use evidence, interpret text, compare cases, and construct legal arguments?",
    rgb: "251,146,60",
  },
};

const REASONING_PATH = [
  { label: "Authority", text: "Which constitution, statute, regulation, case, rule, or other source governs?" },
  { label: "Issue", text: "What legal question must actually be resolved?" },
  { label: "Facts", text: "Which facts matter under the governing legal rule, and which remain disputed?" },
  { label: "Interpret", text: "How should the relevant language, precedent, purpose, or doctrine be understood?" },
  { label: "Apply", text: "How does the rule interact with the specific facts and competing arguments?" },
  { label: "Remedy", text: "What consequence, relief, sanction, judgment, or procedural next step follows?" },
] as const;

const METHOD_NOTES = [
  { label: "Jurisdiction", text: "A correct legal rule applied by a court without authority to decide the dispute can still be the wrong path." },
  { label: "Hierarchy", text: "Not every legal source has equal force. Binding, persuasive, superseded, and conflicting authority must be distinguished." },
  { label: "Procedure", text: "Rights and remedies depend not only on substantive rules but also on timing, burdens, pleadings, evidence, review, and available forums." },
  { label: "Facts", text: "Legal analysis changes when a supposedly minor fact changes the category, element, defense, standard, or remedy." },
  { label: "Interpretation", text: "Text, precedent, structure, purpose, history, canons, institutional role, and other interpretive methods can point in different directions." },
  { label: "Uncertainty", text: "Legal reasoning often works under ambiguity, competing authority, unsettled doctrine, credibility disputes, or incomplete records." },
] as const;

export default function LawHubPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const left = context.children.slice(0, 4);
  const right = context.children.slice(4);

  return (
    <SceneFrame
      background={<JusticeBackground />}
      className="bg-[#090909] text-zinc-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(9,9,9,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Authority · jurisdiction · procedure · interpretation · precedent · remedy"
          eyebrowStyle="rule"
          icon={Scale}
          title={<span>Law</span>}
          subtitle="Law is a system of authority, institutions, procedures, rights, duties, interpretation, and remedies. Study not only what a rule says, but who can apply it, which sources control, how facts enter the process, how competing arguments are evaluated, and what legal consequences follow."
          accentRgb="251, 191, 36"
          titleClassName="font-serif text-[clamp(3rem,5.6vw,6.3rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fff8e7]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,9,0.46),transparent_31%,transparent_69%,rgba(9,9,9,0.42))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/66"><LibraryBig size={14} /> Primary navigation · legal field index</div>
            <h2 className="mt-2 max-w-5xl font-serif text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.042em] text-white">
              Choose a body of law, an institution, or the methods used to reason from authority.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-zinc-300/70">
              These planned branches are navigation categories, not mutually exclusive boxes. A criminal case can raise constitutional questions, administrative decisions can reach appellate courts, and legal method follows every branch into statutes, cases, evidence, interpretation, and procedure.
            </p>
          </div>
          <Link href="/social-science" className="group flex items-center justify-between gap-4 border-l border-amber-200/[0.18] bg-black/[0.10] px-4 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.18]">
            <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Social Science</strong></span>
            <ArrowRight size={15} className="text-amber-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px_minmax(0,1fr)] xl:items-stretch">
          <div className="space-y-2.5">{left.map((branch) => <LawRoute key={branch.id} branch={branch} side="left" />)}</div>
          <ReasoningCore />
          <div className="space-y-2.5">{right.map((branch) => <LawRoute key={branch.id} branch={branch} side="right" />)}</div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-sky-200/58">Authority instrument</div>
            <h2 className="mt-1 font-serif text-[25px] font-semibold tracking-[-0.025em] text-white">Track the direction of appeal separately from the direction of precedent.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-600">simplified U.S. federal hierarchy</span>
        </div>
        <PrecedenceSandbox />
      </section>

      <section className="mt-8 border-t border-amber-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/56"><BookOpenCheck size={14} /> Legal method · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl font-serif text-[clamp(1.9rem,3.2vw,3.1rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">A legal conclusion is only as strong as its authority, factual fit, procedure, and reasoning path.</h2>
          </div>
          <p className="text-[14px] leading-6 text-zinc-400/72">The same sentence can mean different things when it appears in a constitution, statute, regulation, majority holding, dissent, contract, or procedural rule. Legal method begins by identifying what kind of source is speaking and what authority it carries.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {METHOD_NOTES.map((item, index) => (
            <div key={item.label} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b xl:[&:nth-last-child(-n+3)]:border-b-0 xl:border-r xl:[&:nth-child(3n)]:border-r-0">
              <span className="font-mono text-[11px] text-amber-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-zinc-200/86">{item.label}</strong><span className="mt-1 block text-[12px] leading-5 text-zinc-500">{item.text}</span></span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t border-amber-100/[0.10] pt-6">
        <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-zinc-500"><Gavel size={13} /> Legal lexicon · reference tool</div>
        <VocabApplet currentDomain="Law" localTerms={lawVocab} />
      </section>
    </SceneFrame>
  );
}

function LawRoute({ branch, side }: { branch: CurriculumNode; side: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Scale, code: "LAW", question: branch.description ?? "Explore this branch of law.", rgb: "251,191,36" };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div className="group relative min-h-[112px] border-y border-white/[0.07] bg-black/[0.10] px-3 py-3 backdrop-blur-[11px] transition hover:bg-black/[0.17]" style={{ boxShadow: `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.38)` }}>
      <div className="grid grid-cols-[40px_minmax(0,1fr)_54px] gap-3">
        <span className="flex h-9 w-9 items-center justify-center border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)`, background: `rgba(${meta.rgb},0.045)` }}><Icon size={15} /></span>
        <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.code}</span><strong className="mt-0.5 block font-serif text-[16px] text-white/90">{branch.label}</strong><span className="mt-1 block text-[11px] leading-4 text-zinc-500">{meta.question}</span></span>
        <span className="pt-1 text-right font-mono text-[11px] uppercase text-zinc-600">{planned ? "planned" : "open"}</span>
      </div>
    </div>
  );
  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function ReasoningCore() {
  return (
    <Surface variant="ghost" className="relative min-h-[470px] overflow-hidden rounded-[28px] border-amber-100/[0.09]" style={{ background: "rgba(12,12,11,0.07)" }}>
      <div className="relative p-4">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-200/52">Legal reasoning path</div>
        <p className="mt-2 text-[12px] leading-5 text-zinc-400/64">A teaching sequence, not a promise that real disputes proceed in a clean line.</p>
      </div>
      <div className="relative mx-4 mt-1 space-y-1">
        {REASONING_PATH.map((step, index) => (
          <div key={step.label} className="relative border-b border-white/[0.06] py-3 last:border-b-0">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-100/[0.12] bg-amber-200/[0.03] font-mono text-[11px] text-amber-100/58">0{index + 1}</span>
              <span><strong className="block font-serif text-[13px] text-white/82">{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-zinc-500">{step.text}</span></span>
            </div>
            {index < REASONING_PATH.length - 1 ? <ArrowDown size={12} className="ml-[10px] mt-2 text-zinc-700" /> : null}
          </div>
        ))}
      </div>
    </Surface>
  );
}
