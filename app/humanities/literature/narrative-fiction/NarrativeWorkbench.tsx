"use client";

import { useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Eye,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import NarrativeEventMark, { EVENT_PALETTE } from "./NarrativeEventMark";
import {
  NARRATIVE_EVENTS,
  NARRATIVE_TRANSFER_CHECK,
  orderedNarrativeEvents,
  type NarrativeOrder,
} from "./narrativeModel";

export default function NarrativeWorkbench() {
  const [order, setOrder] = useState<NarrativeOrder>("plot");
  const [activeStep, setActiveStep] = useState(1);
  const [answerId, setAnswerId] = useState<string | null>(null);
  const events = orderedNarrativeEvents(order);
  const current = events[activeStep - 1];
  const revealed = events.slice(0, activeStep);

  function chooseOrder(nextOrder: NarrativeOrder) {
    setOrder(nextOrder);
    setActiveStep(1);
  }

  return (
    <div className="bg-[#130b0f]/58 border-y border-rose-100/[0.13] backdrop-blur-xl">
      <div className="grid lg:grid-cols-[minmax(0,1.24fr)_minmax(320px,0.76fr)]">
        <div className="p-5 sm:p-7 lg:border-r lg:border-white/[0.08]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-rose-100/60">
                Editing mode
              </div>
              <p className="mt-1 text-[13px] leading-5 text-stone-500">
                Keep the events fixed. Change the order in which they are read.
              </p>
            </div>
            <div className="grid grid-cols-2 border border-white/[0.09] bg-black/20 p-1">
              <OrderButton
                active={order === "story"}
                icon={Clock3}
                label="Story order"
                onClick={() => chooseOrder("story")}
              />
              <OrderButton
                active={order === "plot"}
                icon={Shuffle}
                label="Plot order"
                onClick={() => chooseOrder("plot")}
              />
            </div>
          </div>

          <div className="mt-7 overflow-x-auto pb-3">
            <div className="relative flex min-w-[660px] items-start justify-between gap-4">
              <div className="absolute left-8 right-8 top-[22px] h-px bg-white/[0.11]" />
              {events.map((event, index) => {
                const selected = index + 1 === activeStep;
                const disclosed = index + 1 <= activeStep;
                const palette = EVENT_PALETTE[event.tone];
                return (
                  <button
                    key={event.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveStep(index + 1)}
                    className="group relative z-10 flex w-[145px] flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#130b0f]"
                  >
                    <NarrativeEventMark event={event} selected={selected} />
                    <span
                      className="mt-3 text-[11px] font-semibold uppercase tracking-[0.11em]"
                      style={{
                        color: disclosed
                          ? palette.light
                          : "rgba(168,162,158,0.44)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")} · {event.title}
                    </span>
                    <span className="mt-1 text-[11px] leading-4 text-stone-600 group-hover:text-stone-500">
                      event {event.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 border-t border-white/[0.08] pt-5 sm:grid-cols-[160px_minmax(0,1fr)]">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600">
                Current sequence
              </div>
              <div className="text-white/84 mt-2 font-mono text-[19px]">
                {events.map((event) => event.code).join(" -> ")}
              </div>
            </div>
            <div className="border-l border-white/[0.08] pl-4">
              <div className="text-amber-100/48 text-[10px] font-semibold uppercase tracking-[0.14em]">
                Selected event
              </div>
              <p className="mt-2 text-[15px] leading-6 text-stone-200">
                {current.detail}
              </p>
            </div>
          </div>
        </div>

        <aside className="flex min-h-[470px] flex-col p-5 sm:p-7">
          <div className="text-cyan-100/58 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
            <Eye size={14} aria-hidden="true" /> Reader knowledge · after step{" "}
            {activeStep}
          </div>
          <h3 className="mt-3 text-[25px] font-semibold tracking-[-0.04em] text-white">
            Disclosure is cumulative.
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-stone-500">
            The reader can interpret only the events and relations the telling
            has supplied so far. Later information can revise an earlier
            inference.
          </p>

          <div className="mt-5 space-y-2">
            {NARRATIVE_EVENTS.map((event) => {
              const visible = revealed.some(
                (candidate) => candidate.id === event.id
              );
              return (
                <div
                  key={event.id}
                  className={`flex items-center gap-3 border px-3 py-2.5 transition-colors ${
                    visible
                      ? "border-white/[0.10] bg-white/[0.025]"
                      : "border-white/[0.045] bg-black/[0.06] opacity-[0.38]"
                  }`}
                >
                  <NarrativeEventMark event={event} compact />
                  <span>
                    <strong className="block text-[12px] text-stone-200">
                      {event.title}
                    </strong>
                    <span className="mt-0.5 block text-[11px] text-stone-600">
                      {visible
                        ? "available to the reader"
                        : "not yet disclosed"}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-auto border-t border-cyan-100/[0.12] pt-4">
            <div className="text-cyan-100/46 text-[10px] font-semibold uppercase tracking-[0.14em]">
              Interpretive effect
            </div>
            <p className="text-stone-300/72 mt-2 text-[13px] leading-6">
              {current.revealEffect}
            </p>
          </div>
        </aside>
      </div>

      <section
        className="border-t border-white/[0.08] p-5 sm:p-7"
        aria-labelledby="narrative-transfer-title"
      >
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-100/55">
              <BookOpenCheck size={14} aria-hidden="true" /> Check · transfer
              the distinction
            </div>
            <h3
              id="narrative-transfer-title"
              className="mt-3 text-[25px] font-semibold tracking-[-0.04em] text-white"
            >
              Same material, new disclosure.
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-stone-400">
              {NARRATIVE_TRANSFER_CHECK.prompt}
            </p>
          </div>

          <div>
            <div className="grid gap-2 sm:grid-cols-3">
              {NARRATIVE_TRANSFER_CHECK.options.map((option) => {
                const selected = answerId === option.id;
                const correct =
                  option.id === NARRATIVE_TRANSFER_CHECK.correctId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setAnswerId(option.id)}
                    className={`min-h-[68px] border px-4 py-3 text-left text-[13px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 ${
                      selected
                        ? correct
                          ? "border-emerald-200/45 bg-emerald-300/[0.10] text-emerald-50"
                          : "border-rose-200/40 bg-rose-300/[0.09] text-rose-50"
                        : "border-white/[0.09] bg-black/[0.10] text-stone-300 hover:bg-white/[0.035]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {answerId ? (
              <div
                className={`mt-3 flex min-h-[84px] items-start gap-3 border-l-2 px-4 py-3 ${
                  answerId === NARRATIVE_TRANSFER_CHECK.correctId
                    ? "border-emerald-300/55 bg-emerald-300/[0.035]"
                    : "border-rose-300/55 bg-rose-300/[0.035]"
                }`}
                role="status"
              >
                <CheckCircle2
                  size={17}
                  className={
                    answerId === NARRATIVE_TRANSFER_CHECK.correctId
                      ? "mt-0.5 shrink-0 text-emerald-200"
                      : "mt-0.5 shrink-0 text-rose-200"
                  }
                  aria-hidden="true"
                />
                <p className="text-[13px] leading-6 text-stone-300">
                  {
                    NARRATIVE_TRANSFER_CHECK.options.find(
                      (option) => option.id === answerId
                    )?.explanation
                  }
                </p>
              </div>
            ) : (
              <div className="mt-3 min-h-[84px] border-l-2 border-white/[0.08] px-4 py-3 text-[13px] leading-6 text-stone-600">
                Choose the relationship that changed. The explanation will
                distinguish the event set from its presentation.
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-white/[0.07] px-5 py-3 sm:px-7">
        <button
          type="button"
          onClick={() => {
            setOrder("plot");
            setActiveStep(1);
            setAnswerId(null);
          }}
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500 transition-colors hover:text-stone-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/70"
        >
          <RotateCcw size={13} aria-hidden="true" /> Return to narrated opening
        </button>
      </div>
    </div>
  );
}

function OrderButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof Clock3;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-[0.09em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/70 ${
        active
          ? "bg-rose-200/[0.13] text-rose-50"
          : "text-stone-500 hover:bg-white/[0.035] hover:text-stone-300"
      }`}
    >
      <Icon size={13} aria-hidden="true" /> {label}
    </button>
  );
}
