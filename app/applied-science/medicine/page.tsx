import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Beaker,
  BookOpen,
  BookOpenCheck,
  BrainCircuit,
  ClipboardCheck,
  Database,
  HeartPulse,
  Microscope,
  Scale,
  ShieldAlert,
  Stethoscope,
  Syringe,
} from "lucide-react";
import AnatomyWidget from "./AnatomyWidget";
import ClinicalReasoningLab from "./ClinicalReasoningLab";
import MedicineEvidenceReview from "./MedicineEvidenceReview";
import PulseBackground from "./PulseBackground";
import {
  MEDICINE_DIRECT_BRANCH_IDS,
  type MedicineBranchId,
} from "./medicineModel";

const NODE_ID = "applied.medicine";

export const metadata: Metadata = {
  title: "Medicine | Education Station 64",
  description:
    "Navigate medicine from anatomy and disease mechanisms through diagnosis, treatment, care settings, ethics, evidence, and longitudinal follow-up.",
};

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  rgb: string;
  group: "foundations" | "reasoning" | "action" | "care";
  question: string;
};

const BRANCH_META: Record<MedicineBranchId, BranchMeta> = {
  "applied.medicine.anatomy-physiology": {
    icon: Activity,
    code: "A&P",
    rgb: "125,211,252",
    group: "foundations",
    question:
      "How do body structures and functions constrain symptoms, examination, disease, and intervention?",
  },
  "applied.medicine.pathology": {
    icon: Microscope,
    code: "PATH",
    rgb: "248,113,113",
    group: "foundations",
    question:
      "Which mechanisms alter cells, tissues, organs, function, and the course of illness?",
  },
  "applied.medicine.diagnostics": {
    icon: Beaker,
    code: "DX",
    rgb: "94,234,212",
    group: "reasoning",
    question:
      "What does a history, examination, test, image, specimen, or trend measure—and how does it change uncertainty?",
  },
  "applied.medicine.pharmacology": {
    icon: Syringe,
    code: "TX",
    rgb: "192,132,252",
    group: "action",
    question:
      "How do targets, dose, exposure, response, interactions, benefits, harms, and monitoring connect?",
  },
  "applied.medicine.surgery-procedures": {
    icon: ShieldAlert,
    code: "PROC",
    rgb: "251,191,36",
    group: "action",
    question:
      "When do procedural benefit, anatomy, technique, consent, recovery, and complication risk justify action?",
  },
  "applied.medicine.clinical-reasoning": {
    icon: BrainCircuit,
    code: "CR",
    rgb: "45,212,191",
    group: "reasoning",
    question:
      "How should a working problem representation, differential, test plan, action, and reassessment change together?",
  },
  "applied.medicine.specialties": {
    icon: Stethoscope,
    code: "SPEC",
    rgb: "147,197,253",
    group: "care",
    question:
      "How is expertise organized around organ systems, life stages, diseases, procedures, and care settings?",
  },
  "applied.medicine.acute-care": {
    icon: HeartPulse,
    code: "ACUTE",
    rgb: "251,113,133",
    group: "care",
    question:
      "What must be recognized, stabilized, prioritized, monitored, escalated, and handed off when time is limited?",
  },
  "applied.medicine.longitudinal-care": {
    icon: ClipboardCheck,
    code: "LONG",
    rgb: "134,239,172",
    group: "care",
    question:
      "How do prevention, chronic care, multimorbidity, goals, access, continuity, and change over time reshape a plan?",
  },
  "applied.medicine.ethics-professionalism": {
    icon: Scale,
    code: "ETH",
    rgb: "253,186,116",
    group: "care",
    question:
      "How do consent, capacity, privacy, equity, uncertainty, communication, and professional duties guide care?",
  },
};

const FIELD_GROUPS = [
  {
    id: "foundations",
    index: "01",
    title: "Structure and mechanism",
    note: "Learn the organized body and the processes that change it before treating a finding as a disease name.",
    ids: ["applied.medicine.anatomy-physiology", "applied.medicine.pathology"],
  },
  {
    id: "reasoning",
    index: "02",
    title: "Evidence and explanation",
    note: "Represent the problem, keep alternatives alive, and choose observations that can change the working assessment.",
    ids: [
      "applied.medicine.diagnostics",
      "applied.medicine.clinical-reasoning",
    ],
  },
  {
    id: "action",
    index: "03",
    title: "Intervention and response",
    note: "Connect an action to goals, alternatives, consent, benefit, harm, feasibility, monitoring, and stopping rules.",
    ids: [
      "applied.medicine.pharmacology",
      "applied.medicine.surgery-procedures",
    ],
  },
  {
    id: "care",
    index: "04",
    title: "Settings and commitments",
    note: "Organize expertise and time-sensitive or longitudinal care while keeping the patient, ethics, systems, and handoffs visible.",
    ids: [
      "applied.medicine.specialties",
      "applied.medicine.acute-care",
      "applied.medicine.longitudinal-care",
      "applied.medicine.ethics-professionalism",
    ],
  },
] as const satisfies readonly {
  id: BranchMeta["group"];
  index: string;
  title: string;
  note: string;
  ids: readonly MedicineBranchId[];
}[];

const GUARDRAILS = [
  {
    number: "01",
    title: "Represent the problem",
    text: "Compress the case enough to reason while preserving the features, source, time course, and context that could change what matters next.",
  },
  {
    number: "02",
    title: "Keep alternatives alive",
    text: "A favored explanation should face competing hypotheses, dangerous alternatives, and evidence that could weigh against it.",
  },
  {
    number: "03",
    title: "Connect action to monitoring",
    text: "Treatment and procedures create new observations. Response, adverse effects, and trajectory can revise the working model.",
  },
  {
    number: "04",
    title: "Separate evidence from certainty",
    text: "Tests, imaging, pathology, studies, guidelines, and models can reduce uncertainty without erasing judgment, limitations, or patient goals.",
  },
] as const;

const MEDICINE_SOURCES = [
  {
    label: "ClinicalTrials.gov API",
    eyebrow: "Study records · status · design · locations · results",
    href: "https://clinicaltrials.gov/data-api/api",
    boundary:
      "A future study shelf can retain NCT ID, API and data timestamp, record version or last update, sponsor, status, study type, design, conditions, interventions, outcomes, eligibility, locations, posted results, source URL, retrieval time, fields requested, and pagination token. Registration is not government approval, favorable results, complete reporting, evidence synthesis, or care advice.",
    rgb: "45,212,191",
    icon: ClipboardCheck,
  },
  {
    label: "openFDA Drug Label API",
    eyebrow: "SPL labels · sections · identifiers · revisions",
    href: "https://open.fda.gov/apis/drug/label/",
    boundary:
      "A future label repository must preserve SPL set and version identifiers, product and ingredient names, route, dosage form, application or NDC identifiers when supplied, label sections, effective time, update and retrieval time, source URL, pagination, and openFDA annotations. A submitted or reformatted label is not a personalized recommendation, proof of approval, or a substitute for current professional guidance.",
    rgb: "192,132,252",
    icon: Syringe,
  },
  {
    label: "NCBI E-utilities",
    eyebrow: "PubMed · search · identifiers · summaries · records",
    href: "https://www.ncbi.nlm.nih.gov/home/develop/api/",
    boundary:
      "A literature trail can preserve PMID and related identifiers, query, database, title, authors, journal, publication types, date, abstract where supplied, links, retrieval time, result order, pagination or history state, and API policy context. Bibliographic inclusion, an abstract, citation count, or one publication does not automatically establish evidence quality, consensus, applicability, or a clinical recommendation.",
    rgb: "125,211,252",
    icon: BookOpen,
  },
] as const satisfies readonly {
  label: string;
  eyebrow: string;
  href: string;
  boundary: string;
  rgb: string;
  icon: LucideIcon;
}[];

export default function MedicinePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Medicine must be classified as a navigation hub.");
  }

  const directIds = context.children.map((child) => child.id);
  if (
    directIds.length !== MEDICINE_DIRECT_BRANCH_IDS.length ||
    directIds.some((id, index) => id !== MEDICINE_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error(
      "Medicine branch navigation is out of sync with the curriculum registry."
    );
  }

  const children = new Map(context.children.map((child) => [child.id, child]));

  return (
    <SceneFrame
      background={<PulseBackground />}
      className="bg-[#07100f] text-slate-100 selection:bg-teal-300/25"
      maxWidthClassName="max-w-[1640px]"
      headerBackground="rgba(7,16,15,0.56)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Clinical reasoning · disease · diagnosis · treatment · follow-up"
          eyebrowStyle="rule"
          icon={Stethoscope}
          title={<span>Medicine</span>}
          subtitle="Medicine connects a person’s story, observed findings, disease mechanisms, evidence, interventions, ethics, and follow-up. The goal is not one clever diagnosis; it is a safe, revisable account of what may be happening and what should happen next."
          accentRgb="45, 212, 191"
          metadataTextClassName="text-[11px]"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#ecfeff]"
          headerClassName="border-teal-100/[0.10]"
        />
      }
    >
      <section className="bg-[#061312]/52 relative isolate mt-8 overflow-hidden rounded-[38px] border border-teal-100/[0.11] px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(45,212,191,0.05),transparent_34%,rgba(125,211,252,0.018))]" />
        <div className="relative">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-100/65">
                <Stethoscope size={14} aria-hidden="true" /> Primary navigation
                · ten clinical fields
              </div>
              <h2 className="mt-3 max-w-5xl text-[clamp(2.1rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
                Move from organized body to working explanation, action, and
                response.
              </h2>
            </div>
            <p className="text-[14px] leading-6 text-slate-300/70">
              The four bands are clinical task groupings, not hidden curriculum
              parents. All ten destinations remain direct peers; only Anatomy &
              Physiology currently has a live page.
            </p>
          </div>

          <nav aria-label="Medicine branches" className="mt-8 space-y-4">
            {FIELD_GROUPS.map((group) => (
              <section
                key={group.id}
                className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.10]"
              >
                <div className="grid border-b border-white/[0.07] md:grid-cols-[230px_minmax(0,1fr)]">
                  <div className="p-4 sm:p-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-teal-100/55">
                      {group.index} · clinical task
                    </div>
                    <h3 className="mt-2 text-[18px] font-semibold text-white">
                      {group.title}
                    </h3>
                  </div>
                  <p className="border-t border-white/[0.07] p-4 text-[13px] leading-6 text-slate-400 sm:p-5 md:border-l md:border-t-0">
                    {group.note}
                  </p>
                </div>
                <div
                  className={`grid gap-px bg-white/[0.06] ${
                    group.ids.length === 4
                      ? "md:grid-cols-2 xl:grid-cols-4"
                      : "md:grid-cols-2"
                  }`}
                >
                  {group.ids.map((id) => {
                    const child = children.get(id);
                    if (!child) {
                      throw new Error(`Missing Medicine branch: ${id}`);
                    }
                    return <MedicineRoute key={id} branch={child} />;
                  })}
                </div>
              </section>
            ))}
          </nav>
        </div>
      </section>

      <section className="mt-14 sm:mt-16">
        <div className="mb-5 grid gap-4 border-b border-teal-100/[0.09] pb-5 lg:grid-cols-[minmax(0,1fr)_450px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-teal-100/60">
              Clinical workspace · fictional teaching record
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Context, evidence, action, and response belong in the same frame.
            </h2>
          </div>
          <p className="text-[13px] leading-6 text-slate-400/75">
            Every name, score, finding, weight, and diagram here is synthetic.
            The lab demonstrates revision, not diagnosis, triage, prognosis, or
            treatment selection.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <ClinicalReasoningLab />
          <AnatomyWidget />
        </div>
      </section>

      <section className="mt-14 border-t border-teal-100/[0.09] pt-8 sm:mt-16 sm:pt-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-100/60">
              <BookOpenCheck size={14} aria-hidden="true" /> Reasoning
              guardrails
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Good medicine is a revisable process with consequences.
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/75">
            Decisions combine evidence with patient context, goals,
            alternatives, feasibility, uncertainty, equity, benefit, harm, and
            the changing course of illness over time.
          </p>
        </div>

        <div className="mt-6 grid overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.10] md:grid-cols-2 xl:grid-cols-4">
          {GUARDRAILS.map((guardrail) => (
            <Guardrail key={guardrail.number} {...guardrail} />
          ))}
        </div>
      </section>

      <div className="mt-14 sm:mt-16">
        <MedicineEvidenceReview />
      </div>

      <section className="mt-14 sm:mt-16">
        <div className="rounded-[26px] border border-amber-200/[0.15] bg-amber-200/[0.035] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <ShieldAlert
              size={20}
              className="mt-0.5 shrink-0 text-amber-200/70"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-[17px] font-semibold text-white">
                Education, not individual medical advice
              </h2>
              <p className="mt-2 max-w-5xl text-[13px] leading-6 text-slate-400">
                This page cannot evaluate symptoms, identify an emergency,
                diagnose a condition, select a test, recommend a drug or
                procedure, interpret a personal record, or replace a qualified
                clinician. Urgent or concerning symptoms require appropriate
                local medical or emergency care—not a teaching simulator.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 pb-16 sm:mt-16 sm:pb-24">
        <div className="grid gap-5 border-t border-white/[0.09] pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-100/65">
              <Database size={14} aria-hidden="true" /> Source shelf · future
              collection boundary
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Keep study records, labels, publications, evidence synthesis, and
              care decisions distinct.
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/75">
            The root makes no provider request during rendering. These official
            interfaces define future adapters, provenance, versioning, and
            safety boundaries—not a clinical decision engine.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {MEDICINE_SOURCES.map((source) => {
            const Icon = source.icon;
            return (
              <a
                key={source.label}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[26px] border border-white/[0.08] bg-[#061312]/60 p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-teal-100/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200/60 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
                    style={{
                      color: `rgb(${source.rgb})`,
                      borderColor: `rgba(${source.rgb},0.24)`,
                      background: `rgba(${source.rgb},0.055)`,
                    }}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-600 transition group-hover:text-teal-100/70"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.09em] text-slate-500">
                  {source.eyebrow}
                </div>
                <h3 className="mt-2 text-[19px] font-semibold text-white">
                  {source.label}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-slate-400/80">
                  {source.boundary}
                </p>
              </a>
            );
          })}
        </div>
      </section>
    </SceneFrame>
  );
}

function MedicineRoute({ branch }: { branch: CurriculumNode }) {
  const meta = BRANCH_META[branch.id as MedicineBranchId];
  if (!meta) {
    throw new Error(`Missing Medicine presentation metadata: ${branch.id}`);
  }
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const card = (
    <article
      className={`bg-[#06110f]/94 group min-h-[220px] p-5 sm:p-6 ${
        planned ? "opacity-[0.70]" : "transition hover:bg-[#0a1815]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.26)`,
            background: `rgba(${meta.rgb},0.055)`,
          }}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.11em] text-slate-600">
          {planned ? "planned" : "open"}
        </span>
      </div>
      <div
        className="mt-5 font-mono text-[11px] uppercase tracking-[0.10em]"
        style={{ color: `rgba(${meta.rgb},0.60)` }}
      >
        {meta.code}
      </div>
      <h4 className="mt-2 text-[18px] font-semibold text-white">
        {branch.label}
      </h4>
      <p className="mt-2 text-[13px] leading-6 text-slate-400">
        {meta.question}
      </p>
      {!planned ? (
        <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-teal-100/70">
          Enter field <ArrowRight size={13} aria-hidden="true" />
        </span>
      ) : null}
    </article>
  );

  return planned ? (
    <div aria-disabled="true">{card}</div>
  ) : (
    <Link
      href={branch.href}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-200/60"
    >
      {card}
    </Link>
  );
}

function Guardrail({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="grid min-h-[190px] grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-5 py-6 last:border-b-0 md:border-r xl:border-b-0 xl:last:border-r-0 md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r">
      <span className="font-mono text-[11px] text-teal-100/40">{number}</span>
      <span>
        <strong className="text-[14px] text-white/85">{title}</strong>
        <span className="mt-3 block text-[13px] leading-6 text-slate-400">
          {text}
        </span>
      </span>
    </article>
  );
}
