import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  BookOpenText,
  Boxes,
  Clock3,
  Compass,
  Drama,
  Eye,
  FileStack,
  Map,
  MessageSquareText,
  ScanSearch,
  ScrollText,
  Shuffle,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import NarrativeEventMark from "./NarrativeEventMark";
import NarrativeWorkbench from "./NarrativeWorkbench";
import NarrativeWorld from "./NarrativeWorld";
import {
  eventCodes,
  orderedNarrativeEvents,
  type NarrativeEvent,
} from "./narrativeModel";

const NODE_ID = "humanities.literature.narrative-fiction";

export const metadata: Metadata = {
  title: "Narrative & Fiction",
  description:
    "Learn how narrators, plot order, character, setting, scene, conflict, and genre arrange story material into a reader's experience.",
};

type LessonMeta = {
  icon: LucideIcon;
  folio: string;
  question: string;
  accent: string;
};

const LESSON_META: Record<string, LessonMeta> = {
  "humanities.literature.narrative-fiction.narrator-perspective": {
    icon: Eye,
    folio: "01",
    question: "Who speaks, who perceives, and what can this telling know?",
    accent: "rose",
  },
  "humanities.literature.narrative-fiction.story-plot-time": {
    icon: Clock3,
    folio: "02",
    question:
      "In what order, duration, and frequency does the reader meet events?",
    accent: "amber",
  },
  "humanities.literature.narrative-fiction.character-desire": {
    icon: UserRound,
    folio: "03",
    question:
      "Which actions, relations, contradictions, and desires make a character legible?",
    accent: "violet",
  },
  "humanities.literature.narrative-fiction.setting-world": {
    icon: Map,
    folio: "04",
    question:
      "Which material and social conditions make some actions possible and others costly?",
    accent: "cyan",
  },
  "humanities.literature.narrative-fiction.scene-conflict-structure": {
    icon: Drama,
    folio: "05",
    question:
      "Where does pressure become action, reversal, consequence, and structural change?",
    accent: "orange",
  },
  "humanities.literature.narrative-fiction.genre-convention": {
    icon: Boxes,
    folio: "06",
    question:
      "Which expectations does the text fulfill, combine, revise, or refuse?",
    accent: "emerald",
  },
};

const LESSON_ACCENTS = {
  rose: {
    line: "rgba(251,113,133,0.40)",
    text: "text-rose-100/70",
    wash: "bg-rose-300/[0.035]",
  },
  amber: {
    line: "rgba(252,211,77,0.40)",
    text: "text-amber-100/70",
    wash: "bg-amber-300/[0.035]",
  },
  violet: {
    line: "rgba(196,181,253,0.40)",
    text: "text-violet-100/70",
    wash: "bg-violet-300/[0.035]",
  },
  cyan: {
    line: "rgba(165,243,252,0.38)",
    text: "text-cyan-100/70",
    wash: "bg-cyan-300/[0.035]",
  },
  orange: {
    line: "rgba(253,186,116,0.40)",
    text: "text-orange-100/70",
    wash: "bg-orange-300/[0.035]",
  },
  emerald: {
    line: "rgba(167,243,208,0.38)",
    text: "text-emerald-100/70",
    wash: "bg-emerald-300/[0.035]",
  },
} as const;

export default function NarrativeFictionPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "unit" || context.status !== "active") {
    throw new Error("Narrative & Fiction must be an active curriculum unit.");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080708] text-stone-100 selection:bg-rose-300/25">
      <NarrativeWorld />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_70%_31%,transparent_0%,rgba(8,7,8,0.10)_45%,rgba(8,7,8,0.74)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 pb-28 sm:px-6 xl:px-10">
        <div className="sticky top-0 z-30 -mx-4 border-b border-rose-100/[0.09] bg-[#080708]/70 px-4 pb-4 pt-6 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-10 xl:px-10">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Literature · narrative studies · root unit"
            eyebrowStyle="rule"
            icon={BookOpenText}
            title={<span>Narrative &amp; Fiction</span>}
            subtitle="A narrative does more than report events. It selects a voice, filters knowledge, arranges time, gives pressure to character and setting, and uses form to control what a reader can notice, expect, and revise."
            accentRgb="251, 113, 133"
            titleClassName="font-serif text-[clamp(2.85rem,5.4vw,5.8rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-[#fff4f1]"
            headerClassName="border-rose-100/[0.10]"
            aside={<HeaderOrderRegister />}
          />
        </div>

        <NarrativeLessonFolio lessons={context.children} />

        <section
          className="mt-28 grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"
          aria-labelledby="narrative-model-title"
        >
          <div className="max-w-xl">
            <div className="text-cyan-100/58 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
              <ScanSearch size={14} aria-hidden="true" /> Orient · one event
              set, two orders
            </div>
            <h2
              id="narrative-model-title"
              className="mt-3 font-serif text-[clamp(2.2rem,4.2vw,4rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white"
            >
              What happened is not the same question as how it is told.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-stone-300">
              The chronological story runs A → B → C → D. Our microfiction
              begins with C, returns to A, reaches D, and withholds B until the
              end. No event changes identity; the plot changes the reader&apos;s
              route through the material.
            </p>
            <div className="mt-6 grid gap-3 border-y border-white/[0.08] py-5 sm:grid-cols-2">
              <Definition
                label="Story"
                text="The events and situations reconstructed in chronological and causal relations."
              />
              <Definition
                label="Plot"
                text="The selection and arrangement through which the reader encounters that material."
              />
            </div>
          </div>

          <CanonicalOrderRegister />
        </section>

        <section className="mt-32" aria-labelledby="narrative-workbench-title">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-rose-100/60">
                <FileStack size={14} aria-hidden="true" /> Do · disclosure
                editor
              </div>
              <h2
                id="narrative-workbench-title"
                className="mt-3 font-serif text-[clamp(2.1rem,4vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.048em] text-white"
              >
                Read in sequence. Watch knowledge accumulate.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-stone-400">
                Compare chronological order with the narrated order, then move
                the reading head one disclosure at a time. The co-visible ledger
                shows exactly which events the reader can use at that moment.
              </p>
            </div>
            <aside className="border-l border-amber-100/[0.18] pl-5 text-[13px] leading-6 text-stone-400">
              <strong className="block text-[14px] text-amber-50">
                Arrangement creates an information problem.
              </strong>
              Suspense asks what will happen. Curiosity can ask what already
              happened but has not yet been disclosed.
            </aside>
          </div>

          <NarrativeWorkbench />
        </section>

        <section
          className="mt-28 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"
          aria-labelledby="narrative-boundaries-title"
        >
          <div className="border-y border-rose-100/[0.13] bg-rose-300/[0.025] p-6 backdrop-blur-xl sm:p-8">
            <div className="text-rose-100/58 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
              <MessageSquareText size={14} aria-hidden="true" /> Boundary ·
              voice is a constructed position
            </div>
            <h2
              id="narrative-boundaries-title"
              className="mt-3 font-serif text-[30px] font-semibold tracking-[-0.04em] text-white"
            >
              Narrator does not mean author.
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-stone-400">
              A first-person narrator can misunderstand, omit, exaggerate, or
              speak from a sharply limited position. A third-person narration
              can also restrict perception to one character. Ask separately who
              tells, who perceives, and what evidence the text gives you for
              trusting an account.
            </p>
          </div>

          <div className="border-y border-cyan-100/[0.12] bg-cyan-300/[0.022] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-100/55">
              <Sparkles size={14} aria-hidden="true" /> Deferred horizon
            </div>
            <h3 className="mt-3 text-[23px] font-semibold tracking-[-0.035em] text-white">
              Useful depth, not an endless taxonomy.
            </h3>
            <p className="mt-4 text-[14px] leading-7 text-stone-500">
              Unreliable narration, free indirect discourse, flashback and
              anticipation, pacing, characterization systems, world-building,
              and genre histories belong inside the six lessons above. We will
              deepen them when their parent lesson exists rather than
              manufacturing more placeholder routes now.
            </p>
          </div>
        </section>

        <section
          className="mt-32 border-t border-white/[0.08] pt-6"
          aria-label="Continue through Literature"
        >
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600">
                <ScrollText size={14} aria-hidden="true" /> Continue · parent
                field
              </div>
              <h2 className="mt-2 font-serif text-[28px] font-semibold tracking-[-0.035em] text-white">
                Return to the Literature reading room.
              </h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-6 text-stone-500">
                Place narrative beside poetry, drama, nonfiction, style,
                criticism, comparative literature, and literary history without
                treating those branches as interchangeable.
              </p>
            </div>
            <Link
              href={context.parent?.href ?? "/humanities/literature"}
              className="group inline-flex min-h-12 items-center justify-center gap-3 border border-rose-100/[0.15] bg-rose-300/[0.035] px-5 text-[13px] font-semibold text-rose-50 transition-colors hover:bg-rose-300/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/70"
            >
              Literature{" "}
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function HeaderOrderRegister() {
  return (
    <div className="min-w-[238px] border border-rose-100/[0.12] bg-black/20 px-4 py-3 font-mono">
      <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.11em] text-stone-600">
        <span>story</span>
        <strong className="text-amber-100/78">{eventCodes("story")}</strong>
      </div>
      <div className="mt-2 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-2 text-[10px] uppercase tracking-[0.11em] text-stone-600">
        <span>plot</span>
        <strong className="text-rose-100/78">{eventCodes("plot")}</strong>
      </div>
    </div>
  );
}

function NarrativeLessonFolio({
  lessons,
}: {
  lessons: readonly CurriculumNode[];
}) {
  return (
    <section className="mt-6" aria-labelledby="narrative-lessons-title">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
        <div>
          <div className="text-rose-100/58 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
            <Compass size={14} aria-hidden="true" /> Primary navigation · six
            reading lenses
          </div>
          <h2
            id="narrative-lessons-title"
            className="mt-3 max-w-4xl font-serif text-[clamp(2.1rem,3.8vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white"
          >
            A story becomes legible through several questions at once.
          </h2>
        </div>
        <p className="border-l border-rose-100/[0.16] pl-5 text-[14px] leading-6 text-stone-500">
          These are interdependent lenses, not a universal recipe for writing or
          a sequence every narrative must obey. Each lesson is planned and
          remains non-clickable until it can teach its full contract.
        </p>
      </div>

      <div className="bg-[#140b0e]/34 relative mt-6 border-y border-rose-100/[0.11] px-4 py-5 backdrop-blur-[12px] sm:px-5 lg:px-7">
        <div className="pointer-events-none absolute inset-y-4 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-rose-100/[0.16] to-transparent md:block" />
        <div className="grid gap-x-9 gap-y-3 md:grid-cols-2">
          {lessons.map((lesson) => (
            <LessonEntry key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LessonEntry({ lesson }: { lesson: CurriculumNode }) {
  const meta = LESSON_META[lesson.id] ?? {
    icon: BookOpenText,
    folio: "--",
    question: lesson.description ?? "Read this narrative lens.",
    accent: "rose",
  };
  const accent = LESSON_ACCENTS[meta.accent as keyof typeof LESSON_ACCENTS];
  const Icon = meta.icon;
  const planned = lesson.status === "placeholder";

  const content = (
    <div
      className={`min-h-[130px] border-y border-white/[0.08] px-4 py-4 ${accent.wash}`}
      style={{ boxShadow: `inset 3px 0 0 ${accent.line}` }}
    >
      <div className="grid grid-cols-[42px_minmax(0,1fr)_62px] gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center border border-white/[0.10] bg-black/15 ${accent.text}`}
        >
          <Icon size={16} aria-hidden="true" />
        </span>
        <span>
          <span
            className={`font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${accent.text}`}
          >
            Folio {meta.folio}
          </span>
          <strong className="mt-1 block font-serif text-[18px] text-white/90">
            {lesson.label}
          </strong>
          <span className="mt-1.5 block text-[12px] leading-5 text-stone-500">
            {meta.question}
          </span>
        </span>
        <span className="pt-1 text-right font-mono text-[10px] uppercase tracking-[0.08em] text-stone-600">
          {planned ? "planned" : "open"}
        </span>
      </div>
    </div>
  );

  return planned ? (
    <div aria-disabled="true">{content}</div>
  ) : (
    <Link href={lesson.href}>{content}</Link>
  );
}

function CanonicalOrderRegister() {
  return (
    <div className="bg-[#120a0d]/52 border border-white/[0.09] p-4 backdrop-blur-xl sm:p-6">
      <OrderRow
        icon={Clock3}
        label="Story order"
        note="chronological reconstruction"
        events={orderedNarrativeEvents("story")}
      />
      <div className="my-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-stone-600">
        <span className="h-px flex-1 bg-white/[0.08]" />
        same events · rearranged disclosure
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>
      <OrderRow
        icon={Shuffle}
        label="Plot order"
        note="the sequence a reader meets"
        events={orderedNarrativeEvents("plot")}
      />
    </div>
  );
}

function OrderRow({
  icon: Icon,
  label,
  note,
  events,
}: {
  icon: LucideIcon;
  label: string;
  note: string;
  events: readonly NarrativeEvent[];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-300">
          <Icon size={14} className="text-rose-100/58" aria-hidden="true" />{" "}
          {label}
        </div>
        <span className="text-[11px] text-stone-600">{note}</span>
      </div>
      <div className="relative mt-4 flex items-start justify-between gap-2 overflow-x-auto pb-2">
        <div className="absolute left-5 right-5 top-[22px] h-px bg-white/[0.10]" />
        {events.map((event, index) => (
          <div
            key={event.id}
            className="relative z-10 flex min-w-[96px] flex-col items-center text-center"
          >
            <NarrativeEventMark event={event} />
            <strong className="mt-2 text-[11px] text-stone-300">
              {event.title}
            </strong>
            <span className="mt-0.5 font-mono text-[10px] text-stone-600">
              step {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Definition({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <strong className="text-[13px] text-rose-50">{label}</strong>
      <p className="mt-1 text-[12px] leading-5 text-stone-500">{text}</p>
    </div>
  );
}
