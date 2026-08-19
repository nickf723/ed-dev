import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  BrainCircuit,
  ChartNoAxesCombined,
  Database,
  Gauge,
  GitCompareArrows,
  RefreshCw,
  Sigma,
  SlidersHorizontal,
} from "lucide-react";
import NeuralNetworkBackground from "../NeuralNetworkBackground";
import PerceptronWidget from "../PerceptronWidget";

const NODE_ID = "formal.computer-science.artificial-intelligence.machine-learning";

const LEARNING_LOOP = [
  {
    icon: Database,
    label: "Data & task",
    detail: "Define examples, inputs, targets or learning signal, sampling process, and the performance question the model is meant to answer.",
    rgb: "34, 211, 238",
  },
  {
    icon: BrainCircuit,
    label: "Model",
    detail: "Choose a family of functions or representations capable of mapping inputs to useful predictions, scores, clusters, or features.",
    rgb: "192, 132, 252",
  },
  {
    icon: Sigma,
    label: "Objective",
    detail: "Quantify error, likelihood, margin, reconstruction quality, or another signal that expresses what parameter settings should improve.",
    rgb: "244, 114, 182",
  },
  {
    icon: RefreshCw,
    label: "Optimization",
    detail: "Adjust model parameters to improve the training objective using update rules, gradients, closed-form solutions, search, or other algorithms.",
    rgb: "250, 204, 21",
  },
  {
    icon: Gauge,
    label: "Evaluation",
    detail: "Measure performance on data not used to fit the model, using metrics and comparisons appropriate to the actual task and decision context.",
    rgb: "52, 211, 153",
  },
] as const;

const PARADIGMS = [
  ["Supervised learning", "Examples include desired targets. The model learns a mapping useful for classification, regression, ranking, forecasting, or other predictive tasks."],
  ["Unsupervised learning", "No explicit target label is supplied. Methods seek structure such as clusters, latent factors, density, or lower-dimensional representations."],
  ["Self-supervised learning", "Targets are constructed from the data itself, allowing models to learn representations by predicting masked, missing, future, or transformed information."],
] as const;

const GENERALIZATION = [
  ["Training ≠ evaluation", "A model can memorize or exploit quirks of its training data. Performance must be measured on appropriately separated validation or test data."],
  ["Capacity", "A model class must be expressive enough to capture relevant structure but can become flexible enough to fit noise or accidental patterns."],
  ["Inductive bias", "Architecture, features, regularization, priors, augmentation, and optimization all influence which solutions are easier for a learning system to discover."],
  ["Distribution shift", "Evaluation is only predictive when future data resembles the conditions represented by the test process. Changing populations or environments can invalidate old metrics."],
] as const;

export default function MachineLearningPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070410] text-slate-100 selection:bg-violet-300/25">
      <NeuralNetworkBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(139,92,246,0.12),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(34,211,238,0.045),transparent_28%),linear-gradient(to_bottom,rgba(7,4,16,0.08),rgba(7,4,16,0.80)_78%,rgba(4,2,10,0.98))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#070410]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Data · model · objective · optimization · generalization"
            eyebrowStyle="rule"
            icon={BrainCircuit}
            title={<span>Machine Learning</span>}
            subtitle="Machine learning fits computational models from experience. A learning system is defined not only by its model architecture, but also by the data-generating process, training objective, optimization method, evaluation design, and the conditions under which performance must generalize."
            accentRgb="139, 92, 246"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.067em] text-[#fbf8ff]"
            headerClassName="border-violet-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-violet-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/56"><GitCompareArrows size={13} /> Learning loop</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Training changes parameters; evaluation asks whether the learned rule survives new examples.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">A low training error is evidence that optimization found a model that fits the training examples. It is not yet evidence that the model learned the structure we care about.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-5">
            {LEARNING_LOOP.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                  <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)`, background: `rgba(${item.rgb},0.035)` }}><Icon size={15} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-5 text-[13px] font-semibold text-white/86">{item.label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-slate-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-6"><PerceptronWidget /></div>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/48"><ChartNoAxesCombined size={13} /> Learning paradigms · reference</div>
              <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">The source of the learning signal changes the problem.</h2>
            </div>
            <div className="grid lg:grid-cols-3">
              {PARADIGMS.map(([name, detail], index) => (
                <article key={name} className="min-h-[190px] border-b border-white/[0.06] px-5 py-4 lg:border-b-0 lg:border-r lg:last:border-r-0"><span className="font-mono text-[8px] text-violet-200/30">0{index + 1}</span><h3 className="mt-3 text-[13px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200/46"><SlidersHorizontal size={13} /> Parameters vs hyperparameters</div>
            <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">Learning adjusts some quantities; designers choose or tune others.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500"><strong className="text-slate-300/80">Parameters</strong> are values fitted by training, such as weights in the perceptron. <strong className="text-slate-300/80">Hyperparameters</strong> configure the model or training process, such as model size, regularization strength, learning rate, or optimization settings.</p>
          </aside>
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/46">Generalization guardrails</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">A model is useful only inside conditions where its evaluation remains informative.</h2></div>
            <p className="text-[11px] leading-5 text-slate-500">Architecture, data, metrics, and deployment context are coupled. A benchmark score detached from how examples were sampled and how the model will be used is easy to overinterpret.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {GENERALIZATION.map(([name, detail], index) => (
              <article key={name} className="min-h-[180px] border-b border-white/[0.06] px-5 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-emerald-200/28">0{index + 1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/computer-science/artificial-intelligence" label="Artificial Intelligence" note="Return to the wider agent, reasoning, search, learning, and perception landscape." rgb="139, 92, 246" />
          <Neighbor href="/formal-science/mathematics/statistics" label="Statistics" note="Probability, inference, experimental design, and uncertainty are foundational to learning from data." rgb="129, 140, 248" />
          <Neighbor href="/formal-science/mathematics/calculus" label="Calculus" note="Gradients and continuous optimization drive many modern parameter-learning methods." rgb="248, 113, 113" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
