"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Disc,
  MoveHorizontal,
  SlidersHorizontal,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import InequalitiesBackground from "./_components/InequalitiesBackground";

type Relation = "<" | "≤" | ">" | "≥";
type NumberExampleId = "strict" | "inclusive" | "negative";

type NumberExample = {
  id: NumberExampleId;
  label: string;
  a: number;
  c: number;
  r: number;
  relation: Relation;
  note: string;
};

const COEFFICIENTS = [-3, -2, -1, 1, 2, 3] as const;
const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];
const NUMBER_MIN = -10;
const NUMBER_MAX = 10;

const NUMBER_EXAMPLES: readonly NumberExample[] = [
  {
    id: "strict",
    label: "Strict boundary",
    a: 1,
    c: 0,
    r: 3,
    relation: "<",
    note: "Values smaller than 3 work, but the boundary value 3 itself does not.",
  },
  {
    id: "inclusive",
    label: "Include the boundary",
    a: 1,
    c: 0,
    r: -2,
    relation: "≥",
    note: "The equality bar includes the boundary, so −2 belongs to the solution set.",
  },
  {
    id: "negative",
    label: "Reverse the order",
    a: -2,
    c: 0,
    r: 6,
    relation: "<",
    note: "Dividing by a negative reflects the number line, so the order reverses.",
  },
] as const;

export default function InequalitiesPage() {
  const [activeExample, setActiveExample] = useState<NumberExampleId | null>("strict");
  const [coefficient, setCoefficient] = useState(1);
  const [constant, setConstant] = useState(0);
  const [rightSide, setRightSide] = useState(3);
  const [relation, setRelation] = useState<Relation>("<");
  const [probe, setProbe] = useState(0);

  const solution = useMemo(
    () => solveLinearInequality(coefficient, constant, rightSide, relation),
    [coefficient, constant, rightSide, relation],
  );
  const probePasses = compare(coefficient * probe + constant, rightSide, relation);

  const applyExample = (id: NumberExampleId) => {
    const example = NUMBER_EXAMPLES.find((item) => item.id === id) ?? NUMBER_EXAMPLES[0];
    setActiveExample(id);
    setCoefficient(example.a);
    setConstant(example.c);
    setRightSide(example.r);
    setRelation(example.relation);
    setProbe(0);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#071426] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-28">
        <InequalitiesBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(14,165,233,0.11),transparent_27%),radial-gradient(circle_at_12%_82%,rgba(99,102,241,0.07),transparent_28%),linear-gradient(to_bottom,rgba(7,20,38,0.20),rgba(3,8,18,0.88))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.015)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Algebra", href: "/formal-science/mathematics/algebra" },
            { label: "Integrated Algebra", href: "/formal-science/mathematics/algebra/elementary-algebra" },
            { label: "Algebraic Inequalities" },
          ]}
          eyebrow="Boundary · Direction · Inclusion · Interval"
          icon={MoveHorizontal}
          title={<span>Algebraic Inequalities</span>}
          subtitle="An inequality describes a set of allowed numbers instead of one exact answer. Find the boundary, choose the direction, and decide whether the boundary belongs to the solution."
          accentRgb="14, 165, 233"
          titleClassName="font-mono text-[clamp(2.6rem,4.8vw,5.05rem)] font-semibold uppercase leading-[0.85] tracking-[-0.058em] text-[#f5fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-sky-300/[0.14]"
          aside={
            <div className="rounded-full border border-sky-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[13px] text-sky-200/85 backdrop-blur-md">
              {formatLinearExpression(coefficient, constant)} {relation} {rightSide}
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-sky-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.16fr)_minmax(330px,0.84fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-300/70">Core idea</div>
            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-white">An inequality keeps every number on one side of a boundary.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">
              First find the value where equality would hold. Then read the inequality symbol for direction. Finally decide whether the boundary itself is included. On a number line, that produces a ray or interval containing many solutions at once.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <ConceptFact icon={Target} label="1 · Boundary" text="Where equality would hold." rgb="14, 165, 233" />
            <ConceptFact icon={MoveHorizontal} label="2 · Direction" text="Which side contains valid values." rgb="99, 102, 241" />
            <ConceptFact icon={Disc} label="3 · Inclusion" text="Whether the boundary itself counts." rgb="251, 191, 36" />
          </div>
        </section>

        <section className="mt-3 grid items-stretch gap-3 xl:grid-cols-[minmax(0,1.22fr)_minmax(360px,0.78fr)]">
          <BoundaryAtlas />
          <CaseTester
            coefficient={coefficient}
            constant={constant}
            rightSide={rightSide}
            relation={relation}
            probe={probe}
            solution={solution}
            passes={probePasses}
            onProbe={setProbe}
          />
        </section>

        <section className="mt-3 rounded-[26px] border border-sky-200/[0.12] bg-black/[0.25] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300/75">Number-line studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Compare the guided cases, then open the sandbox to change each part of the inequality yourself.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">statement ↔ boundary ↔ interval</div>
          </div>

          <div className="grid items-start gap-3 xl:grid-cols-[300px_minmax(520px,1fr)_330px]">
            <div className="rounded-[20px] border border-sky-200/[0.08] bg-[#061221]/76 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Guided cases</div>
              <div className="mt-3 grid gap-2">
                {NUMBER_EXAMPLES.map((example, index) => (
                  <ExampleButton
                    key={example.id}
                    active={activeExample === example.id}
                    number={index + 1}
                    label={example.label}
                    equation={`${formatLinearExpression(example.a, example.c)} ${example.relation} ${example.r}`}
                    note={example.note}
                    onClick={() => applyExample(example.id)}
                  />
                ))}
              </div>

              <div className="mt-3 rounded-[16px] border border-white/[0.045] bg-black/[0.16] p-3.5">
                <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">Current statement</div>
                <div className="mt-2 font-mono text-[24px] font-semibold text-white">
                  {formatLinearExpression(coefficient, constant)} <span className="text-sky-300">{relation}</span> {rightSide}
                </div>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">{relationMeaning(relation)}</p>
              </div>
            </div>

            <NumberLinePanel solution={solution} probe={probe} probePasses={probePasses} />

            <div className="rounded-[20px] border border-indigo-200/[0.09] bg-[#080b1b]/74 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-300/70">Read the region</div>
              <div className="mt-2 rounded-[14px] border border-white/[0.045] bg-black/[0.16] px-3 py-3 font-mono text-[22px] text-white">
                x <span className="text-sky-300">{solution.relation}</span> {formatNumber(solution.boundary)}
              </div>
              <div className="mt-3 grid gap-2">
                <Readout label="1 · Boundary" value={`x = ${formatNumber(solution.boundary)}`} rgb="14, 165, 233" />
                <Readout label="2 · Direction" value={solution.greater ? "values to the right" : "values to the left"} rgb="99, 102, 241" />
                <Readout label="3 · Inclusion" value={solution.inclusive ? "closed endpoint · boundary included" : "open endpoint · boundary excluded"} rgb="251, 191, 36" />
                <Readout label="Interval notation" value={solution.interval} rgb="192, 132, 252" />
                <Readout label={`Test x = ${probe}`} value={probePasses ? "belongs to the region" : "does not belong"} rgb={probePasses ? "52, 211, 153" : "251, 113, 133"} />
              </div>

              {coefficient < 0 ? (
                <div className="mt-3 rounded-[15px] border border-rose-300/[0.12] bg-rose-400/[0.025] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-rose-300/75">Order reversal</div>
                  <p className="mt-1.5 text-[11px] leading-5 text-slate-500">Dividing by {coefficient} reverses the order, so {relation} becomes {solution.relation} when x is isolated.</p>
                </div>
              ) : null}
            </div>

            <details className="group rounded-[18px] border border-white/[0.055] bg-black/[0.16] xl:col-span-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5">
                <span className="flex items-center gap-2 text-[12px] font-semibold text-slate-400"><SlidersHorizontal size={14} className="text-sky-300/70" /> Explore your own inequality</span>
                <span className="text-[10px] text-slate-600 group-open:hidden">optional sandbox</span>
              </summary>
              <div className="grid gap-3 border-t border-white/[0.05] p-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3">
                  <div className="text-[10px] font-semibold text-slate-400">Coefficient of x</div>
                  <div className="mt-2 grid grid-cols-6 gap-1.5">
                    {COEFFICIENTS.map((value) => (
                      <button key={value} type="button" onClick={() => { setActiveExample(null); setCoefficient(value); }} className={`h-9 rounded-lg border font-mono text-[11px] ${coefficient === value ? "border-sky-300/[0.30] bg-sky-400/[0.07] text-sky-200" : "border-white/[0.045] bg-black/[0.14] text-slate-500"}`}>{value}</button>
                    ))}
                  </div>
                </div>
                <SliderControl label="Constant" value={constant} min={-5} max={5} step={1} rgb="99, 102, 241" onChange={(value) => { setActiveExample(null); setConstant(value); }} />
                <SliderControl label="Right side" value={rightSide} min={-5} max={8} step={1} rgb="251, 191, 36" onChange={(value) => { setActiveExample(null); setRightSide(value); }} />
                <RelationPicker value={relation} onChange={(value) => { setActiveExample(null); setRelation(value); }} />
              </div>
            </details>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="rounded-[22px] border border-rose-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-300/70">Why a negative reverses the sign</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] px-3 py-3 font-mono text-[15px] text-slate-300">2 &lt; 5</div>
              <div className="rounded-[15px] border border-rose-300/[0.10] bg-rose-400/[0.025] px-3 py-3 font-mono text-[15px] text-rose-200">−2 &gt; −5</div>
            </div>
            <p className="mt-3 text-[12px] leading-5 text-slate-400">Multiplying the number line by a negative reflects it through zero, reversing left and right. That geometric reversal is why order reverses too.</p>
          </div>

          <div className="rounded-[22px] border border-indigo-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300/70">Compound regions</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <CompoundCard label="AND" subtitle="intersection" expression="−2 < x ≤ 5" explanation="Keep only values satisfying both boundaries, producing the overlap between them." rgb="14, 165, 233" variant="and" />
              <CompoundCard label="OR" subtitle="union" expression="x < −3  or  x > 4" explanation="Keep values satisfying either condition, combining separate solution regions." rgb="129, 140, 248" variant="or" />
            </div>
          </div>
        </section>

        <TopicNavigation />
      </div>
    </main>
  );
}

function BoundaryAtlas() {
  const rows: readonly { symbol: Relation; reading: string; endpoint: "open" | "closed"; direction: "left" | "right" }[] = [
    { symbol: "<", reading: "less than", endpoint: "open", direction: "left" },
    { symbol: "≤", reading: "less than or equal", endpoint: "closed", direction: "left" },
    { symbol: ">", reading: "greater than", endpoint: "open", direction: "right" },
    { symbol: "≥", reading: "greater than or equal", endpoint: "closed", direction: "right" },
  ];

  return (
    <div className="rounded-[22px] border border-sky-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/70">Number-line reference</div>
      <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
        <span className="rounded-full border border-sky-300/[0.12] bg-sky-400/[0.025] px-3 py-1.5 text-sky-200/80">strict &lt; or &gt; → open endpoint</span>
        <span className="rounded-full border border-amber-300/[0.12] bg-amber-400/[0.025] px-3 py-1.5 text-amber-200/80">inclusive ≤ or ≥ → closed endpoint</span>
      </div>

      <div className="mt-3 rounded-[16px] border border-white/[0.045] bg-black/[0.14] p-3">
        <div className="grid grid-cols-[54px_minmax(150px,1fr)_110px_90px] gap-2 border-b border-white/[0.05] pb-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">
          <span>Symbol</span><span>Read as</span><span>Endpoint</span><span>Shade</span>
        </div>
        <div className="mt-1 grid gap-1">
          {rows.map((row) => (
            <div key={row.symbol} className="grid min-h-11 grid-cols-[54px_minmax(150px,1fr)_110px_90px] items-center gap-2 rounded-xl px-1 text-[11px] text-slate-400">
              <span className="font-mono text-[18px] text-sky-200">{row.symbol}</span>
              <span>{row.reading}</span>
              <span className="flex items-center gap-2"><span className={`h-3.5 w-3.5 rounded-full border-2 border-sky-300 ${row.endpoint === "closed" ? "bg-sky-300" : "bg-[#071426]"}`} />{row.endpoint}</span>
              <span className="font-mono text-indigo-300">{row.direction === "left" ? "← left" : "right →"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseTester({ coefficient, constant, rightSide, relation, probe, solution, passes, onProbe }: { coefficient: number; constant: number; rightSide: number; relation: Relation; probe: number; solution: ReturnType<typeof solveLinearInequality>; passes: boolean; onProbe: (value: number) => void }) {
  const leftValue = coefficient * probe + constant;
  const quickValues = Array.from(new Set([0, 4, Math.round(solution.boundary)]));

  return (
    <div className="rounded-[22px] border border-emerald-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300/70">Test a value</div>
      <p className="mt-1 text-[11px] leading-5 text-slate-600">Substitute one candidate value. A true statement means that value belongs to the solution set.</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {quickValues.map((value) => (
          <button key={value} type="button" onClick={() => onProbe(value)} className={`rounded-lg border px-3 py-2 font-mono text-[11px] ${probe === value ? "border-emerald-300/[0.28] bg-emerald-400/[0.06] text-emerald-200" : "border-white/[0.05] bg-black/[0.15] text-slate-500"}`}>x = {value}</button>
        ))}
      </div>

      <div className="mt-3 grid gap-2">
        <TestRow label="Original" value={`${formatLinearExpression(coefficient, constant)} ${relation} ${rightSide}`} />
        <TestRow label="Substitute" value={`${formatSubstitutedExpression(coefficient, constant, probe)} ${relation} ${rightSide}`} />
        <TestRow label="Compare" value={`${formatNumber(leftValue)} ${relation} ${rightSide}`} />
      </div>

      <div className={`mt-3 rounded-[16px] border p-3.5 ${passes ? "border-emerald-300/[0.18] bg-emerald-400/[0.04]" : "border-rose-300/[0.16] bg-rose-400/[0.035]"}`}>
        <div className="flex items-center gap-2">
          {passes ? <Check size={15} className="text-emerald-300" /> : <X size={15} className="text-rose-300" />}
          <strong className={`text-[13px] ${passes ? "text-emerald-200" : "text-rose-200"}`}>{passes ? "True" : "False"}</strong>
        </div>
        <p className="mt-1 text-[11px] leading-5 text-slate-500">x = {probe} {passes ? "is" : "is not"} in the region x {solution.relation} {formatNumber(solution.boundary)}.</p>
      </div>
    </div>
  );
}

function TestRow({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-white/[0.045] bg-black/[0.14] px-3 py-2.5"><span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">{label}</span><span className="font-mono text-[12px] text-slate-300">{value}</span></div>;
}

function ConceptFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>;
}

function ExampleButton({ active, number, label, equation, note, onClick }: { active: boolean; number: number; label: string; equation: string; note: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-[15px] border p-3 text-left ${active ? "border-sky-300/[0.28] bg-sky-400/[0.06]" : "border-white/[0.045] bg-black/[0.14]"}`}><div className="flex items-center gap-2"><span className="font-mono text-[9px] text-slate-600">0{number}</span><strong className="text-[12px] text-slate-200">{label}</strong></div><div className="mt-2 font-mono text-[13px] text-sky-300">{equation}</div><p className="mt-1.5 text-[10px] leading-4 text-slate-600">{note}</p></button>;
}

function SliderControl({ label, value, min, max, step, rgb, onChange }: { label: string; value: number; min: number; max: number; step: number; rgb: string; onChange: (value: number) => void }) {
  return <label className="block rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3"><span className="flex items-center justify-between gap-2"><span className="text-[10px] font-semibold text-slate-400">{label}</span><span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{formatNumber(value)}</span></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-sky-400" /></label>;
}

function RelationPicker({ value, onChange }: { value: Relation; onChange: (value: Relation) => void }) {
  return <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3"><div className="text-[10px] font-semibold text-slate-400">Relation</div><div className="mt-2 grid grid-cols-4 gap-1.5">{RELATIONS.map((item) => <button key={item} type="button" onClick={() => onChange(item)} className={`h-9 rounded-lg border font-mono text-[14px] ${value === item ? "border-sky-300/[0.28] bg-sky-400/[0.07] text-sky-200" : "border-white/[0.045] bg-black/[0.14] text-slate-500"}`}>{item}</button>)}</div></div>;
}

function NumberLinePanel({ solution, probe, probePasses }: { solution: ReturnType<typeof solveLinearInequality>; probe: number; probePasses: boolean }) {
  const width = 760;
  const height = 300;
  const left = 52;
  const right = width - 52;
  const y = 150;
  const xFor = (value: number) => left + ((value - NUMBER_MIN) / (NUMBER_MAX - NUMBER_MIN)) * (right - left);
  const boundaryX = xFor(clamp(solution.boundary, NUMBER_MIN, NUMBER_MAX));
  const probeX = xFor(clamp(probe, NUMBER_MIN, NUMBER_MAX));

  return <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-[20px] border border-sky-200/[0.10] bg-[#051321]/82 p-4"><div className="pointer-events-none absolute left-4 top-4 z-10"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Solution region</div><div className="mt-1 font-mono text-[12px] text-sky-300/80">x {solution.relation} {formatNumber(solution.boundary)}</div></div><svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[820px]" aria-label="Number line showing the inequality solution"><line x1={left} y1={y} x2={right} y2={y} stroke="#64748b" strokeWidth="2" />{Array.from({ length: 21 }, (_, index) => NUMBER_MIN + index).map((value) => { const x = xFor(value); return <g key={value}><line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(148,163,184,0.45)" />{value % 2 === 0 ? <text x={x} y={y + 28} fill="rgba(148,163,184,0.55)" fontSize="10" textAnchor="middle">{value}</text> : null}</g>; })}<line x1={solution.greater ? boundaryX : left} y1={y} x2={solution.greater ? right : boundaryX} y2={y} stroke="#38bdf8" strokeWidth="10" strokeLinecap="round" opacity="0.65" /><circle cx={boundaryX} cy={y} r="10" fill={solution.inclusive ? "#38bdf8" : "#051321"} stroke="#38bdf8" strokeWidth="4" /><line x1={probeX} y1={y - 58} x2={probeX} y2={y - 18} stroke={probePasses ? "#34d399" : "#fb7185"} strokeWidth="2" strokeDasharray="4 4" /><circle cx={probeX} cy={y - 66} r="7" fill={probePasses ? "#34d399" : "#fb7185"} /><text x={probeX} y={y - 84} fill={probePasses ? "#6ee7b7" : "#fda4af"} fontSize="11" textAnchor="middle">x = {probe}</text></svg></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] px-3 py-2.5"><div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 text-[11px] font-medium" style={{ color: `rgba(${rgb},0.82)` }}>{value}</div></div>;
}

function CompoundCard({ label, subtitle, expression, explanation, rgb, variant }: { label: string; subtitle: string; expression: string; explanation: string; rgb: string; variant: "and" | "or" }) {
  return <div className="rounded-[18px] border p-3.5" style={{ borderColor: `rgba(${rgb},0.14)`, background: `rgba(${rgb},0.025)` }}><div className="flex items-center justify-between gap-3"><strong className="text-[15px] text-white">{label}</strong><span className="text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.68)` }}>{subtitle}</span></div><MiniCompoundLine variant={variant} rgb={rgb} /><div className="mt-3 font-mono text-[12px]" style={{ color: `rgba(${rgb},0.82)` }}>{expression}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{explanation}</p></div>;
}

function MiniCompoundLine({ variant, rgb }: { variant: "and" | "or"; rgb: string }) {
  return <div className="relative mt-3 h-11 overflow-hidden rounded-xl border border-white/[0.04] bg-black/[0.14]"><div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-white/[0.12]" />{variant === "and" ? <><div className="absolute left-[28%] right-[28%] top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} /><div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} /><div className="absolute right-[28%] top-1/2 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `rgb(${rgb})` }} /></> : <><div className="absolute left-0 right-[72%] top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} /><div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} /><div className="absolute left-[72%] right-0 top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} /><div className="absolute left-[72%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} /></>}</div>;
}

function TopicNavigation() {
  return <nav className="mt-3 pb-8" aria-label="Inequalities navigation"><div className="mb-2"><Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300"><ArrowLeft size={12} /> Integrated Algebra map</Link></div><div className="grid gap-3 sm:grid-cols-2"><Link href="/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-cyan-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-cyan-300/[0.18]"><ArrowLeft size={15} className="text-cyan-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Previous Integrated Algebra topic</span><strong className="mt-0.5 block text-[15px] text-slate-200">Systems of Equations</strong></span></Link><Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-indigo-300/[0.14] bg-indigo-400/[0.025] px-4 py-3 transition-colors hover:border-indigo-300/[0.24] hover:bg-indigo-400/[0.045]"><span className="min-w-0 flex-1 text-right"><span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-indigo-300/60">Next lesson</span><strong className="mt-0.5 block text-[15px] text-slate-200">Systems of Inequalities</strong></span><ArrowRight size={15} className="text-indigo-300 transition-transform group-hover:translate-x-0.5" /></Link></div></nav>;
}

function solveLinearInequality(a: number, c: number, r: number, relation: Relation) {
  const boundary = (r - c) / a;
  const normalizedRelation = a < 0 ? flipRelation(relation) : relation;
  const greater = isGreaterRelation(normalizedRelation);
  const inclusive = isInclusive(normalizedRelation);
  const value = formatNumber(boundary);
  const interval = greater ? `${inclusive ? "[" : "("}${value}, ∞)` : `(-∞, ${value}${inclusive ? "]" : ")"}`;
  return { boundary, relation: normalizedRelation, greater, inclusive, interval };
}

function flipRelation(relation: Relation): Relation { if (relation === "<") return ">"; if (relation === "≤") return "≥"; if (relation === ">") return "<"; return "≤"; }
function isGreaterRelation(relation: Relation) { return relation === ">" || relation === "≥"; }
function isInclusive(relation: Relation) { return relation === "≤" || relation === "≥"; }
function compare(left: number, right: number, relation: Relation) { if (relation === "<") return left < right; if (relation === "≤") return left <= right; if (relation === ">") return left > right; return left >= right; }
function relationMeaning(relation: Relation) { if (relation === "<") return "Keep values below the boundary; do not include the boundary itself."; if (relation === "≤") return "Keep values below the boundary and include the boundary."; if (relation === ">") return "Keep values above the boundary; do not include the boundary itself."; return "Keep values above the boundary and include the boundary."; }
function formatLinearExpression(a: number, c: number) { const ax = a === 1 ? "x" : a === -1 ? "−x" : `${a}x`; if (c === 0) return ax; return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`; }
function formatSubstitutedExpression(a: number, c: number, x: number) { const ax = a === 1 ? `${x}` : a === -1 ? `−(${x})` : `${a}(${x})`; if (c === 0) return ax; return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`; }
function formatNumber(value: number) { if (Number.isInteger(value)) return String(value); return Number(value.toFixed(2)).toString(); }
function clamp(value: number, min: number, max: number) { return Math.max(min, Math.min(max, value)); }
