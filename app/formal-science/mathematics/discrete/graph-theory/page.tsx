import type { Metadata } from "next";
import Link from "next/link";
import CurriculumSiblingNav from "@/app/_components/CurriculumSiblingNav";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  CircleDot,
  GitBranch,
  Network,
  Route,
  ScanSearch,
  ShieldAlert,
} from "lucide-react";
import CampusGraphDiagram from "./CampusGraphDiagram";
import GraphTheoryAssessment from "./GraphTheoryAssessment";
import GraphTheoryWorld from "./GraphTheoryWorld";
import GraphTraversalLab from "./GraphTraversalLab";
import {
  CAMPUS_EDGES,
  CAMPUS_VERTICES,
  campusDegree,
} from "./graphTheoryNetwork";

const NODE_ID = "formal.mathematics.discrete.graph-theory";

export const metadata: Metadata = {
  title: "Graph Theory",
  description:
    "Model pairwise relationships with vertices and edges, inspect degree and connectivity, and trace deterministic graph traversals through a bounded learning path.",
};

const DEGREE_SUM = CAMPUS_VERTICES.reduce(
  (total, vertex) => total + campusDegree(vertex.id),
  0
);

const GRAPH_LANGUAGE = [
  {
    term: "Vertex",
    symbol: "v ∈ V",
    meaning: "one object retained by the model",
    example: "B represents the Library",
    tone: "cyan",
  },
  {
    term: "Edge",
    symbol: "{u, v} ∈ E",
    meaning: "one pair declared directly related",
    example: "{B, E} records a corridor",
    tone: "emerald",
  },
  {
    term: "Path",
    symbol: "v₀, v₁, …, vₖ",
    meaning: "a route whose consecutive vertices share edges",
    example: "A—B—E—G reaches the Garden",
    tone: "amber",
  },
] as const;

const TONE_CLASS = {
  cyan: "border-cyan-200/20 bg-cyan-300/[0.045] text-cyan-100",
  emerald: "border-emerald-200/20 bg-emerald-300/[0.045] text-emerald-100",
  amber: "border-amber-200/20 bg-amber-300/[0.045] text-amber-100",
} as const;

export default function GraphTheoryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "unit") {
    throw new Error("Graph Theory must be classified as a root unit.");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02080a] text-slate-100 selection:bg-emerald-300/25">
      <GraphTheoryWorld />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_52%_35%,transparent_0%,rgba(2,8,10,0.08)_48%,rgba(2,8,10,0.72)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-28 sm:px-6 xl:px-10">
        <div className="sticky top-0 z-30 -mx-4 border-b border-emerald-100/[0.08] bg-[#02080a]/70 px-4 pb-4 pt-6 shadow-[0_18px_58px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-10 xl:px-10">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Discrete mathematics · root unit"
            eyebrowStyle="rule"
            icon={Network}
            title={<span>Graph Theory</span>}
            subtitle="A graph keeps the relationships and discards the irrelevant scenery. Begin with vertices and edges, then follow those connections into routes, components, trees, weighted networks, coloring, and planarity."
            accentRgb="110, 231, 183"
            titleClassName="font-sans text-[clamp(2.8rem,5.2vw,5.35rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#f4fffb]"
            headerClassName="border-emerald-100/[0.1]"
            aside={
              <div className="grid grid-cols-2 border border-emerald-100/[0.12] bg-black/20 font-mono">
                <div className="border-r border-white/[0.08] px-4 py-3 text-center">
                  <strong className="block text-[18px] text-emerald-100">
                    7
                  </strong>
                  <span className="text-[9px] uppercase tracking-[0.13em] text-slate-600">
                    vertices
                  </span>
                </div>
                <div className="px-4 py-3 text-center">
                  <strong className="block text-[18px] text-cyan-100">
                    10
                  </strong>
                  <span className="text-[9px] uppercase tracking-[0.13em] text-slate-600">
                    edges
                  </span>
                </div>
              </div>
            }
          />
        </div>

        <GraphTheoryLearningPath lessons={context.children} />

        <section
          className="mt-28 grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-center"
          aria-labelledby="graph-model-title"
        >
          <div className="max-w-xl">
            <div className="text-cyan-100/64 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <ScanSearch size={14} /> Orient · preserve the relation
            </div>
            <h2
              id="graph-model-title"
              className="mt-3 text-[clamp(2rem,4.3vw,4rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white"
            >
              The map can move. The graph stays the same.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-slate-300">
              The seven places in this campus model become vertices A through G.
              A corridor becomes an edge only when its two endpoints are
              declared adjacent. Bend, rotate, or redraw the picture and the
              graph is unchanged as long as that vertex-and-edge structure is
              preserved.
            </p>
            <div className="mt-6 border-y border-white/[0.08] py-5 font-mono text-[13px] leading-7 text-slate-300">
              <div>
                <span className="text-cyan-200">V</span> ={" "}
                {"{A, B, C, D, E, F, G}"}
              </div>
              <div>
                <span className="text-emerald-200">|E|</span> ={" "}
                {CAMPUS_EDGES.length}
              </div>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-slate-500">
              This is the exact seven-vertex graph carried by the background,
              worked model, degree ledger, and default traversal below.
            </p>
          </div>

          <div className="bg-[#031013]/68 relative overflow-hidden border border-emerald-100/[0.14] p-3 shadow-[0_34px_100px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6">
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
            <div className="relative flex items-start justify-between gap-4 px-2 pt-2">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100/60">
                  Canonical campus graph
                </div>
                <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">
                  Degree counts local connections
                </h3>
              </div>
              <CircleDot className="shrink-0 text-emerald-200/65" size={23} />
            </div>
            <CampusGraphDiagram
              showDegree
              className="relative mt-3 h-auto w-full"
            />
          </div>
        </section>

        <section className="mt-28" aria-labelledby="graph-language-title">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-emerald-100/62 text-[11px] font-semibold uppercase tracking-[0.16em]">
              Explain · the reusable language
            </div>
            <h2
              id="graph-language-title"
              className="mt-3 text-[clamp(2rem,3.8vw,3.45rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            >
              Objects, relationships, then routes.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-400">
              Graph language becomes useful because each term answers a
              different structural question. Keep the campus model fixed while
              the focus changes.
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {GRAPH_LANGUAGE.map((entry) => (
              <article
                key={entry.term}
                className={`border p-5 backdrop-blur-xl ${TONE_CLASS[entry.tone]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[20px] font-semibold text-white">
                    {entry.term}
                  </h3>
                  <span className="font-mono text-[13px]">{entry.symbol}</span>
                </div>
                <p className="mt-5 min-h-12 text-[13px] leading-6 text-slate-400">
                  {entry.meaning}
                </p>
                <div className="mt-5 border-t border-white/[0.08] pt-4 font-mono text-[12px] leading-5 text-slate-200">
                  {entry.example}
                </div>
              </article>
            ))}
          </div>

          <div className="bg-[#031013]/48 mt-5 grid border-y border-white/[0.08] backdrop-blur-xl sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="p-5 sm:p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                Degree ledger
              </div>
              <div className="mt-2 font-mono text-[14px] leading-7 text-slate-300">
                2 + 3 + 3 + 4 + 3 + 3 + 2 = {DEGREE_SUM}
              </div>
            </div>
            <div className="hidden h-12 w-px bg-white/[0.1] sm:block" />
            <div className="border-t border-white/[0.08] p-5 sm:border-t-0 sm:p-6 sm:text-right">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-100/55">
                Handshake relationship
              </div>
              <div className="mt-2 font-mono text-[18px] text-emerald-100">
                Σ deg(v) = 2|E| = 2({CAMPUS_EDGES.length}) = {DEGREE_SUM}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32" aria-labelledby="graph-traversal-title">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <div className="text-cyan-100/64 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <GitBranch size={14} /> Do · traversal workbench
              </div>
              <h2
                id="graph-traversal-title"
                className="mt-3 text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
              >
                Change the search order. Watch discovery unfold.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-400">
                Breadth-first search uses a queue and expands in layers.
                Depth-first search uses a stack and follows one branch before
                backtracking. Trace both on the same network so the order—not
                the graph—changes.
              </p>
            </div>
            <aside className="border-l border-amber-200/20 pl-5 text-[13px] leading-6 text-slate-400">
              <strong className="block text-[14px] text-amber-100">
                Reachability is not distance.
              </strong>
              DFS can prove that a route exists. In an unweighted graph, BFS
              also guarantees a route with the fewest edges.
            </aside>
          </div>

          <GraphTraversalLab />
        </section>

        <section
          className="mt-32 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]"
          aria-labelledby="graph-boundaries-title"
        >
          <div className="border border-amber-200/[0.15] bg-[#100d08]/60 p-6 backdrop-blur-xl sm:p-8">
            <div className="text-amber-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <ShieldAlert size={14} /> Boundary · drawing versus structure
            </div>
            <h2
              id="graph-boundaries-title"
              className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-white"
            >
              A crossing is not automatically a vertex.
            </h2>
            <div className="mt-5 border border-white/[0.08] bg-black/20 p-4">
              <svg
                viewBox="0 0 360 120"
                className="h-32 w-full"
                role="img"
                aria-label="Two graph edges crossing without a vertex at the crossing"
              >
                <line
                  x1="48"
                  y1="25"
                  x2="312"
                  y2="95"
                  stroke="rgba(251,191,36,0.65)"
                  strokeWidth="5"
                />
                <line
                  x1="48"
                  y1="95"
                  x2="312"
                  y2="25"
                  stroke="rgba(103,232,249,0.65)"
                  strokeWidth="5"
                />
                {[
                  [48, 25],
                  [312, 95],
                  [48, 95],
                  [312, 25],
                ].map(([x, y]) => (
                  <circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="12"
                    fill="#071014"
                    stroke="rgba(226,232,240,0.7)"
                    strokeWidth="3"
                  />
                ))}
                <circle
                  cx="180"
                  cy="60"
                  r="5"
                  fill="#02080a"
                  stroke="rgba(244,63,94,0.75)"
                  strokeWidth="2"
                />
                <text
                  x="180"
                  y="88"
                  textAnchor="middle"
                  fill="rgba(251,113,133,0.82)"
                  fontSize="11"
                >
                  no declared vertex
                </text>
              </svg>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-slate-400">
              Lines may cross because of the drawing. They become adjacent at
              the crossing only when a vertex is explicitly part of the graph.
            </p>
          </div>

          <div className="border border-violet-200/[0.15] bg-[#090811]/60 p-6 backdrop-blur-xl sm:p-8">
            <div className="text-violet-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <Binary size={14} /> Boundary · related route words
            </div>
            <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-white">
              Every path is a walk. Not every walk is a path.
            </h2>
            <div className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08] text-[13px] leading-6">
              <div className="grid grid-cols-[70px_1fr] gap-4 py-3">
                <strong className="text-violet-100">Walk</strong>
                <span className="text-slate-400">
                  vertices and edges may repeat
                </span>
              </div>
              <div className="grid grid-cols-[70px_1fr] gap-4 py-3">
                <strong className="text-violet-100">Trail</strong>
                <span className="text-slate-400">no edge repeats</span>
              </div>
              <div className="grid grid-cols-[70px_1fr] gap-4 py-3">
                <strong className="text-violet-100">Path</strong>
                <span className="text-slate-400">no vertex repeats</span>
              </div>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-slate-400">
              Informal speech often calls any route a path. Graph theory
              separates the terms because repeated vertices and repeated edges
              change what a route can prove.
            </p>
          </div>
        </section>

        <section className="mt-32" aria-labelledby="graph-check-title">
          <div className="mb-8 max-w-3xl">
            <div className="text-emerald-100/62 text-[11px] font-semibold uppercase tracking-[0.16em]">
              Check · transfer and fluency
            </div>
            <h2
              id="graph-check-title"
              className="mt-3 text-[clamp(2rem,4vw,3.55rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            >
              Can you reason from the edges alone?
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-400">
              First test connectivity after a structural change. Then read
              degree and degree sum from reproducibly generated small graphs.
            </p>
          </div>
          <GraphTheoryAssessment />
        </section>

        <section className="bg-[#031013]/54 mt-28 border-y border-white/[0.08] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8 lg:border-r lg:border-white/[0.08]">
              <div className="text-cyan-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <Route size={14} /> Continue modeling connections
              </div>
              <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-white">
                Build the graph before choosing the algorithm.
              </h2>
              <p className="mt-4 max-w-2xl text-[14px] leading-7 text-slate-400">
                Return to the Discrete Mathematics connection workshop to place
                your own vertices and edges. The present unit then supplies the
                language for interpreting the structure you made.
              </p>
              <Link
                href="/formal-science/mathematics/discrete#connection-workshop-title"
                className="group mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-cyan-100/75 transition hover:text-cyan-50"
              >
                Open the graph builder
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
            <div className="p-6 sm:p-8">
              <div className="text-violet-100/62 text-[11px] font-semibold uppercase tracking-[0.16em]">
                Applied lens
              </div>
              <Link
                href="/formal-science/computer-science/algorithms"
                className="group mt-4 flex items-center justify-between gap-5 border-y border-white/[0.08] py-4"
              >
                <span>
                  <strong className="block text-[15px] text-slate-100">
                    Algorithms
                  </strong>
                  <span className="mt-1 block text-[12px] leading-5 text-slate-500">
                    Turn traversal, shortest paths, and spanning structure into
                    procedures.
                  </span>
                </span>
                <ArrowRight
                  className="shrink-0 text-slate-500 transition-transform group-hover:translate-x-1"
                  size={15}
                />
              </Link>
            </div>
          </div>
        </section>

        <CurriculumSiblingNav
          previous={context.previousActiveSibling}
          parent={context.parent}
          next={context.nextActiveSibling}
          accentRgb="110, 231, 183"
        />
      </div>
    </main>
  );
}

function GraphTheoryLearningPath({
  lessons,
}: {
  lessons: readonly CurriculumNode[];
}) {
  return (
    <section
      className="mt-12 border-b border-emerald-100/[0.08] pb-16"
      aria-labelledby="graph-theory-path-title"
    >
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div className="max-w-xl">
          <div className="text-emerald-100/64 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Route size={14} /> Navigate · one route through the field
          </div>
          <h2
            id="graph-theory-path-title"
            className="mt-3 text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
          >
            Start local. Build toward network structure.
          </h2>
        </div>
        <p className="max-w-2xl text-[15px] leading-7 text-slate-400 lg:justify-self-end">
          Six direct lessons form the current depth ceiling. The overview below
          introduces the shared model; each planned stop will later isolate one
          question deeply without expanding into an endless theory tree.
        </p>
      </div>

      <nav className="relative mt-9" aria-label="Graph Theory learning path">
        <div
          className="absolute left-[8.33%] right-[8.33%] top-[20px] hidden h-px bg-gradient-to-r from-cyan-200/30 via-emerald-200/35 to-violet-200/25 lg:block"
          aria-hidden="true"
        />
        <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
          {lessons.map((lesson, index) => (
            <li key={lesson.id} className="relative min-w-0 lg:px-1.5">
              <div className="flex items-center gap-3 lg:block lg:text-center">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-200/30 bg-[#061317] font-mono text-[10px] font-semibold text-emerald-100/70 lg:mx-auto">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600 lg:mt-3 lg:block">
                  planned lesson
                </span>
              </div>
              <article className="bg-[#041014]/48 mt-3 min-h-40 border-t border-white/[0.09] px-3 py-4 backdrop-blur-xl lg:text-center">
                <h3 className="text-[15px] font-semibold leading-5 tracking-[-0.015em] text-slate-200">
                  {lesson.label}
                </h3>
                <p className="mt-3 text-[12px] leading-5 text-slate-600">
                  {lesson.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-5 flex items-center gap-3 border-l border-cyan-200/25 bg-cyan-300/[0.035] px-4 py-3 text-[12px] leading-5 text-slate-500">
        <CircleDot className="shrink-0 text-cyan-200/65" size={15} />
        <span>
          <strong className="text-slate-200">Current overview workshop:</strong>{" "}
          graph models, degree, connectivity, and traversal.
        </span>
      </div>
    </section>
  );
}
