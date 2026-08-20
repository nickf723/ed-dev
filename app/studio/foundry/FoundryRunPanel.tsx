"use client";

import { Play, Plus } from "lucide-react";
import {
  FOUNDRY_CONTRIBUTION_KINDS,
  FOUNDRY_SCOPES,
  type PageFoundryQueue,
} from "@/lib/page-foundry/schema";
import { Field, Panel, Select, StringList, TextArea, Toggle } from "./FoundryFields";
import { uniqueId } from "./foundry-utils";

export default function FoundryRunPanel({
  queue,
  message,
  error,
  update,
  prepareRun,
}: {
  queue: PageFoundryQueue;
  message: string;
  error: boolean;
  update: (mutator: (next: PageFoundryQueue) => void) => void;
  prepareRun: (count?: 1 | 3 | 5) => void;
}) {
  return (
    <aside className="space-y-4 lg:col-span-2 2xl:col-span-1">
      <Panel title="Run contract" note={queue.activeRun?.status ?? "idle"}>
        <Field label="Batch size">
          <Select
            value={String(queue.settings.batchSize)}
            options={["1", "3", "5"]}
            onChange={(value) =>
              update((next) => {
                next.settings.batchSize = Number(value) as 1 | 3 | 5;
              })
            }
          />
        </Field>
        <Toggle
          checked={queue.settings.pauseAfterEach}
          label="Pause after every page"
          onChange={(value) =>
            update((next) => {
              next.settings.pauseAfterEach = value;
            })
          }
        />
        <Toggle
          checked={queue.settings.continueThroughNonBlocked}
          label="Continue through non-blocked pages"
          onChange={(value) =>
            update((next) => {
              next.settings.continueThroughNonBlocked = value;
            })
          }
        />
        <Toggle
          checked={queue.settings.commitPerPage}
          label="One commit per page"
          onChange={(value) =>
            update((next) => {
              next.settings.commitPerPage = value;
            })
          }
        />
        <Toggle
          checked={queue.settings.previewAfterBatch}
          label="Preview after batch"
          onChange={(value) =>
            update((next) => {
              next.settings.previewAfterBatch = value;
            })
          }
        />
        <Field label="Stop conditions">
          <StringList
            value={queue.settings.stopConditions}
            rows={6}
            onChange={(value) =>
              update((next) => {
                next.settings.stopConditions = value;
              })
            }
          />
        </Field>
        <button
          type="button"
          onClick={() => prepareRun()}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-amber-300/15 bg-amber-400/[0.04] text-[9px] text-amber-100/75"
        >
          <Play size={12} /> Prepare bounded run
        </button>
        {queue.activeRun ? (
          <TextArea
            value={queue.activeRun.command}
            rows={8}
            onChange={(value) =>
              update((next) => {
                if (next.activeRun) next.activeRun.command = value;
              })
            }
          />
        ) : null}
      </Panel>

      <Panel title="Pattern library" note={`${queue.patterns.length} records`}>
        <div className="space-y-2">
          {queue.patterns.map((pattern) => (
            <div
              key={pattern.id}
              className="rounded-[10px] border border-white/[0.06] bg-black/20 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-[9px] text-slate-300">{pattern.label}</strong>
                <span className="font-mono text-[7px] uppercase text-slate-700">
                  {pattern.status}
                </span>
              </div>
              <p className="mt-1 text-[8px] leading-4 text-slate-600">
                {pattern.description}
              </p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            update((next) => {
              const id = uniqueId(
                "new-pattern",
                next.patterns.map((item) => item.id),
              );
              next.patterns.push({
                id,
                label: "New pattern",
                kind: FOUNDRY_CONTRIBUTION_KINDS[0],
                sourcePage: "/",
                scope: FOUNDRY_SCOPES[3],
                status: "candidate",
                description: "Describe the reusable system.",
              });
            })
          }
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-white/[0.08] text-[9px] text-slate-600"
        >
          <Plus size={12} /> Add pattern record
        </button>
      </Panel>

      {message ? (
        <div
          className={`rounded-[12px] border px-3 py-3 text-[9px] leading-5 ${
            error
              ? "border-red-300/15 text-red-200/75"
              : "border-white/[0.07] text-slate-500"
          }`}
        >
          {message}
        </div>
      ) : null}
    </aside>
  );
}
