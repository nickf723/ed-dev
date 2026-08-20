"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, RefreshCw, X } from "lucide-react";

type PracticeGraph = {
  vertexCount: number;
  edges: readonly [number, number][];
  target: number;
  question: "degree" | "handshake";
  answer: number;
};

const POSITIONS = [
  [50, 10],
  [84, 31],
  [78, 73],
  [50, 91],
  [17, 72],
  [14, 30],
] as const;

function generatedGraph(caseIndex: number): PracticeGraph {
  const vertexCount = caseIndex % 2 === 0 ? 5 : 6;
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  const addEdge = (left: number, right: number) => {
    const pair = left < right ? `${left}-${right}` : `${right}-${left}`;
    if (left === right || seen.has(pair)) return;
    seen.add(pair);
    edges.push(left < right ? [left, right] : [right, left]);
  };

  for (let index = 0; index < vertexCount - 1; index += 1) {
    addEdge(index, index + 1);
  }

  const extraCandidates: [number, number][] = [];
  for (let left = 0; left < vertexCount; left += 1) {
    for (let right = left + 2; right < vertexCount; right += 1) {
      extraCandidates.push([left, right]);
    }
  }
  const candidateOffset = (caseIndex * 3) % extraCandidates.length;
  const rotatedCandidates = [
    ...extraCandidates.slice(candidateOffset),
    ...extraCandidates.slice(0, candidateOffset),
  ];
  rotatedCandidates
    .slice(0, 2)
    .forEach(([left, right]) => addEdge(left, right));

  const target = (caseIndex * 3 + 1) % vertexCount;
  const question = caseIndex % 3 === 2 ? "handshake" : "degree";
  const answer =
    question === "degree"
      ? edges.filter(([left, right]) => left === target || right === target)
          .length
      : edges.length * 2;

  return { vertexCount, edges, target, question, answer };
}

export default function GraphTheoryAssessment() {
  const [transferChoice, setTransferChoice] = useState<string>();
  const [transferChecked, setTransferChecked] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceChecked, setPracticeChecked] = useState(false);
  const practice = useMemo(() => generatedGraph(caseIndex), [caseIndex]);
  const numericAnswer = Number(practiceAnswer);
  const practiceCorrect = practiceChecked && numericAnswer === practice.answer;
  const transferCorrect = transferChoice === "upper-route";

  const nextCase = () => {
    setCaseIndex((current) => current + 1);
    setPracticeAnswer("");
    setPracticeChecked(false);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <section
        className="bg-[#041014]/66 border border-cyan-100/[0.14] p-5 backdrop-blur-2xl sm:p-7"
        aria-labelledby="graph-transfer-title"
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-100/60">
          Transfer · reason about structure
        </div>
        <h3
          id="graph-transfer-title"
          className="mt-3 text-[24px] font-semibold tracking-[-0.035em] text-white"
        >
          One corridor closes. Is the garden still reachable?
        </h3>
        <p className="mt-3 text-[14px] leading-6 text-slate-400">
          In the campus graph, close edge D—F between Commons and Workshop.
          Choose the claim that proves whether A can still reach G.
        </p>

        <div className="mt-6 grid gap-2">
          {[
            ["disconnected", "No. Removing any edge disconnects a graph."],
            ["upper-route", "Yes. A—B—E—G remains a valid path."],
            [
              "crossing",
              "Yes. Two drawn lines cross, so the crossing is a new vertex.",
            ],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setTransferChoice(value);
                setTransferChecked(false);
              }}
              aria-pressed={transferChoice === value}
              className={`border px-4 py-3 text-left text-[13px] leading-5 transition ${
                transferChoice === value
                  ? "border-cyan-200/35 bg-cyan-300/[0.08] text-slate-100"
                  : "border-white/[0.08] bg-black/15 text-slate-400 hover:border-white/[0.16]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setTransferChecked(true)}
          disabled={!transferChoice}
          className="mt-5 inline-flex min-h-11 items-center gap-2 border border-cyan-200/35 bg-cyan-300/[0.1] px-4 text-[13px] font-semibold text-cyan-50 transition hover:bg-cyan-300/[0.16] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Check the route <ArrowRight size={15} />
        </button>

        {transferChecked ? (
          <Feedback correct={transferCorrect}>
            {transferCorrect
              ? "Correct. Connectivity asks whether at least one path survives; it does not require every original edge. The upper route A—B—E—G avoids D—F completely."
              : "Not yet. Trace adjacency only through marked endpoints: A connects to B, B to E, and E to G. A line crossing has no graph-theoretic meaning unless a vertex is explicitly placed there."}
          </Feedback>
        ) : null}
      </section>

      <section
        className="bg-[#04100c]/66 border border-emerald-100/[0.14] p-5 backdrop-blur-2xl sm:p-7"
        aria-labelledby="graph-practice-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-100/60">
              Fluency · generated and checked
            </div>
            <h3
              id="graph-practice-title"
              className="mt-3 text-[24px] font-semibold tracking-[-0.035em] text-white"
            >
              Read the edge structure.
            </h3>
          </div>
          <span className="border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-slate-500">
            case {caseIndex + 1}
          </span>
        </div>

        <PracticeGraphDiagram graph={practice} />

        <p className="mt-4 min-h-12 text-[14px] leading-6 text-slate-300">
          {practice.question === "degree" ? (
            <>
              What is the degree of highlighted vertex{" "}
              {String.fromCharCode(65 + practice.target)}?
            </>
          ) : (
            <>
              What is the sum of all vertex degrees? Use the handshake
              relationship if it helps.
            </>
          )}
        </p>

        <div className="mt-4 flex gap-2">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Numeric answer</span>
            <input
              type="number"
              min={0}
              value={practiceAnswer}
              onChange={(event) => {
                setPracticeAnswer(event.target.value);
                setPracticeChecked(false);
              }}
              className="h-11 w-full border border-white/[0.12] bg-black/25 px-3 text-[15px] text-white outline-none focus:border-emerald-200/40"
              placeholder="Enter a number"
            />
          </label>
          <button
            type="button"
            onClick={() => setPracticeChecked(true)}
            disabled={practiceAnswer === ""}
            className="min-h-11 border border-emerald-200/35 bg-emerald-300/[0.09] px-4 text-[13px] font-semibold text-emerald-50 transition hover:bg-emerald-300/[0.15] disabled:cursor-not-allowed disabled:opacity-35"
          >
            Check
          </button>
        </div>

        {practiceChecked ? (
          <Feedback correct={practiceCorrect}>
            {practiceCorrect
              ? practice.question === "degree"
                ? `Correct. Exactly ${practice.answer} edges meet the highlighted vertex, so its degree is ${practice.answer}.`
                : `Correct. The graph has ${practice.edges.length} edges, and each contributes 2 to the degree sum: 2 × ${practice.edges.length} = ${practice.answer}.`
              : practice.question === "degree"
                ? `Count only edges with the highlighted vertex as an endpoint. There are ${practice.answer}. A line that merely passes nearby does not count.`
                : `Count ${practice.edges.length} edges, then double: every edge has two endpoints, so the degree sum is ${practice.answer}.`}
          </Feedback>
        ) : null}

        <button
          type="button"
          onClick={nextCase}
          className="mt-4 inline-flex min-h-10 items-center gap-2 text-[12px] font-semibold text-emerald-100/75 transition hover:text-emerald-50"
        >
          <RefreshCw size={14} /> Generate the next case
        </button>
      </section>
    </div>
  );
}

function PracticeGraphDiagram({ graph }: { graph: PracticeGraph }) {
  return (
    <div className="mt-5 border border-white/[0.08] bg-black/20 p-3">
      <svg
        viewBox="0 0 100 100"
        className="mx-auto h-52 w-full max-w-sm"
        role="img"
        aria-label={`Practice graph with ${graph.vertexCount} vertices and ${graph.edges.length} edges`}
      >
        {graph.edges.map(([left, right]) => (
          <line
            key={`${left}-${right}`}
            x1={POSITIONS[left][0]}
            y1={POSITIONS[left][1]}
            x2={POSITIONS[right][0]}
            y2={POSITIONS[right][1]}
            stroke="rgba(148,163,184,0.38)"
            strokeWidth="1.7"
          />
        ))}
        {POSITIONS.slice(0, graph.vertexCount).map(([x, y], index) => {
          const selected =
            graph.question === "degree" && index === graph.target;
          return (
            <g key={index} transform={`translate(${x} ${y})`}>
              <circle
                r="6.5"
                fill={selected ? "#6ee7b7" : "#07130f"}
                stroke={selected ? "#a7f3d0" : "rgba(167,243,208,0.6)"}
                strokeWidth="1.4"
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill={selected ? "#022c22" : "#d1fae5"}
                fontSize="5"
                fontWeight="700"
              >
                {String.fromCharCode(65 + index)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Feedback({
  correct,
  children,
}: {
  correct: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-4 flex gap-3 border-l px-4 py-3 text-[13px] leading-6 ${
        correct
          ? "border-emerald-300/50 bg-emerald-300/[0.06] text-emerald-50/85"
          : "border-rose-300/50 bg-rose-300/[0.06] text-rose-50/85"
      }`}
      role="status"
    >
      {correct ? (
        <Check className="mt-1 shrink-0" size={15} />
      ) : (
        <X className="mt-1 shrink-0" size={15} />
      )}
      <p>{children}</p>
    </div>
  );
}
