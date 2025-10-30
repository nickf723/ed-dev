"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Lightbulb,
} from "lucide-react";

/* ------------------------- IMAGES / DIAGRAMS ------------------------- */
// (This component is unchanged)
export function LessonImage({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={caption || "Diagram"}
        className="mx-auto rounded-lg border border-neutral-800 shadow-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* --------------------------- VIDEO EMBED ----------------------------- */
// (This component is unchanged)
export function LessonVideo({ url }: { url: string }) {
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 shadow-md">
      <iframe
        src={url}
        title="Embedded video"
        className="h-full w-full"
        allowFullScreen
      />
    </div>
  );
}

/* --------------------------- CODED APPLET ---------------------------- */
// This is the new, self-contained applet you requested.
export function EvaluateApplet({
  expression,
  fn,
}: {
  expression: string;
  fn: (x: number) => number;
}) {
  const [value, setValue] = useState(0);
  const result = fn(value);

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="font-mono text-lg text-neutral-200 md:text-xl">
          Evaluate: <code className="text-cyan-300">{expression}</code>
        </div>
        <div className="font-mono text-lg md:text-xl">
          When: <code className="text-amber-300">x = {value}</code>
        </div>
      </div>

      <input
        type="range"
        min="-10"
        max="10"
        step="1"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        className="w-full"
      />

      <div className="mt-6 border-t border-neutral-700 pt-4 text-center">
        <div className="text-sm uppercase tracking-wide text-neutral-400">
          Result
        </div>
        <div className="font-mono text-3xl font-bold text-green-300">
          {result}
        </div>
      </div>
    </div>
  );
}

/* ------------------------ PRACTICE PROBLEMS -------------------------- */
// This is the new PracticeProblem with a "Show Solution" toggle.
export function PracticeProblem({
  question,
  solution,
}: {
  question: string;
  solution?: string;
}) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="mb-4 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
      <p className="mb-2 font-medium text-cyan-300">{question}</p>
      {solution && (
        <>
          <button
            onClick={() => setIsShown(!isShown)}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium
                       text-neutral-400 transition-colors hover:text-cyan-200
                       data-[open=true]:text-cyan-300"
            data-open={isShown}
          >
            {isShown ? (
              <EyeOff size={14} />
            ) : (
              <Eye size={14} />
            )}
            {isShown ? "Hide Solution" : "Show Solution"}
          </button>
          {isShown && (
            <p className="mt-3 rounded-md border border-neutral-700 bg-neutral-900 p-3 text-neutral-300">
              <span className="font-semibold text-cyan-400">Solution:</span>{" "}
              {solution}
            </p>
          )}
        </>
      )}
    </div>
  );
}

/* ------------------------ STEP-BY-STEP SOLUTION -------------------------- */
// This is the new component for multi-step answers.
export function StepByStepSolution({
  title,
  steps,
}: {
  title: string;
  steps: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="my-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-2 font-medium text-amber-300">
          <Lightbulb size={16} />
          {title}
        </span>
        {isExpanded ? (
          <ChevronUp size={18} className="text-neutral-500" />
        ) : (
          <ChevronDown size={18} className="text-neutral-500" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-neutral-800 p-4 pb-6">
          <ol className="list-decimal space-y-3 pl-6 font-mono text-neutral-300">
            {steps.map((step, index) => (
              <li key={index} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* --------------------------- RESOURCE LINKS -------------------------- */
// (This component is unchanged)
export function ResourceLink({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-neutral-800 bg-neutral-900/50 
                 px-4 py-3 text-cyan-300 transition hover:bg-neutral-800"
    >
      🔗 {title}
    </a>
  );
}