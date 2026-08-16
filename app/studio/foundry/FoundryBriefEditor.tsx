"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  FOUNDRY_CONTRIBUTION_KINDS,
  FOUNDRY_CONTRIBUTION_STATUSES,
  FOUNDRY_DATA_KINDS,
  FOUNDRY_PAGE_TYPES,
  FOUNDRY_PRIORITIES,
  FOUNDRY_SCOPES,
  FOUNDRY_STATUSES,
  type FoundryContribution,
  type FoundryPageBrief,
} from "@/lib/page-foundry/schema";
import { Field, Panel, Select, StringList, TextArea, TextInput } from "./FoundryFields";

export default function FoundryBriefEditor({
  brief,
  update,
}: {
  brief: FoundryPageBrief;
  update: (mutator: (brief: FoundryPageBrief) => void) => void;
}) {
  function set<K extends keyof FoundryPageBrief>(key: K, value: FoundryPageBrief[K]) {
    update((next) => {
      next[key] = value;
      next.updatedAt = new Date().toISOString();
    });
  }

  function updateContribution(id: string, mutator: (item: FoundryContribution) => void) {
    update((next) => {
      const item = next.studioContributions.find((candidate) => candidate.id === id);
      if (item) mutator(item);
      next.updatedAt = new Date().toISOString();
    });
  }

  function addContribution() {
    update((next) => {
      const id = uniqueId("new-pattern", next.studioContributions.map((item) => item.id));
      next.studioContributions.push({
        id,
        kind: "widget",
        label: "New reusable pattern",
        description: "Describe what this page should add to Knowledge Studio.",
        scope: "global",
        status: "planned",
      });
    });
  }

  return (
    <div className="space-y-4">
      <Panel title="Identity & queue state" note={brief.id}>
        <div className="grid gap-3 lg:grid-cols-2">
          <Field label="Title"><TextInput value={brief.title} onChange={(value) => set("title", value)} /></Field>
          <Field label="Route"><TextInput value={brief.route} onChange={(value) => set("route", value)} /></Field>
          <Field label="Status"><Select value={brief.status} options={FOUNDRY_STATUSES} onChange={(value) => set("status", value as FoundryPageBrief["status"])} /></Field>
          <Field label="Priority"><Select value={brief.priority} options={FOUNDRY_PRIORITIES} onChange={(value) => set("priority", value as FoundryPageBrief["priority"])} /></Field>
          <Field label="Page type"><Select value={brief.pageType} options={FOUNDRY_PAGE_TYPES} onChange={(value) => set("pageType", value as FoundryPageBrief["pageType"])} /></Field>
          <Field label="Parent label"><TextInput value={brief.parentLabel} onChange={(value) => set("parentLabel", value)} /></Field>
          <div className="lg:col-span-2"><Field label="Parent curriculum node"><TextInput value={brief.parentNodeId} onChange={(value) => set("parentNodeId", value)} /></Field></div>
        </div>
      </Panel>

      <Panel title="Knowledge architecture" note="TREE before styling">
        <Field label="Organizing principle"><TextArea value={brief.organizingPrinciple} rows={3} onChange={(value) => set("organizingPrinciple", value)} /></Field>
        <Field label="Primary learner question"><TextArea value={brief.learnerQuestion} rows={3} onChange={(value) => set("learnerQuestion", value)} /></Field>
        <Field label="Content scope"><StringList value={brief.contentScope} rows={5} onChange={(value) => set("contentScope", value)} /></Field>
      </Panel>

      <Panel title="Visual novelty contract" note="Different by design">
        <Field label="Visual topology"><TextInput value={brief.visual.topology} onChange={(value) => update((next) => { next.visual.topology = value; })} /></Field>
        <Field label="What should the page evoke?"><TextArea value={brief.visual.evocation} rows={3} onChange={(value) => update((next) => { next.visual.evocation = value; })} /></Field>
        <div className="grid gap-3 lg:grid-cols-2">
          <Field label="Background mood"><TextArea value={brief.visual.backgroundMood} rows={3} onChange={(value) => update((next) => { next.visual.backgroundMood = value; })} /></Field>
          <Field label="Background meaning"><TextArea value={brief.visual.backgroundMeaning} rows={3} onChange={(value) => update((next) => { next.visual.backgroundMeaning = value; })} /></Field>
        </div>
        <Field label="Background motion"><TextArea value={brief.visual.backgroundMotion} rows={3} onChange={(value) => update((next) => { next.visual.backgroundMotion = value; })} /></Field>
        <Field label="Primary interaction"><TextArea value={brief.visual.interaction} rows={3} onChange={(value) => update((next) => { next.visual.interaction = value; })} /></Field>
        <Field label="Must not resemble"><StringList value={brief.visual.avoid} rows={4} onChange={(value) => update((next) => { next.visual.avoid = value; })} /></Field>
      </Panel>

      <Panel title="Data contract" note="API with honest fallback">
        <div className="grid gap-3 lg:grid-cols-2">
          <Field label="Source kind"><Select value={brief.dataSource.kind} options={FOUNDRY_DATA_KINDS} onChange={(value) => update((next) => { next.dataSource.kind = value as FoundryPageBrief["dataSource"]["kind"]; })} /></Field>
          <Field label="Label"><TextInput value={brief.dataSource.label} onChange={(value) => update((next) => { next.dataSource.label = value; })} /></Field>
          <Field label="Provider"><TextInput value={brief.dataSource.provider ?? ""} onChange={(value) => update((next) => { next.dataSource.provider = value || undefined; })} /></Field>
          <Field label="Endpoint"><TextInput value={brief.dataSource.endpoint ?? ""} onChange={(value) => update((next) => { next.dataSource.endpoint = value || undefined; })} /></Field>
          <div className="lg:col-span-2"><Field label="Adapter"><TextInput value={brief.dataSource.adapter ?? ""} onChange={(value) => update((next) => { next.dataSource.adapter = value || undefined; })} /></Field></div>
        </div>
      </Panel>

      <Panel title="Studio extraction" note={`${brief.studioContributions.length} planned patterns`}>
        <div className="space-y-3">
          {brief.studioContributions.map((item) => (
            <div key={item.id} className="rounded-[12px] border border-white/[0.06] bg-black/20 p-3">
              <div className="grid gap-2 lg:grid-cols-2">
                <TextInput value={item.label} onChange={(value) => updateContribution(item.id, (next) => { next.label = value; })} />
                <TextInput value={item.id} onChange={(value) => updateContribution(item.id, (next) => { next.id = value; })} />
                <Select value={item.kind} options={FOUNDRY_CONTRIBUTION_KINDS} onChange={(value) => updateContribution(item.id, (next) => { next.kind = value as FoundryContribution["kind"]; })} />
                <Select value={item.scope} options={FOUNDRY_SCOPES} onChange={(value) => updateContribution(item.id, (next) => { next.scope = value as FoundryContribution["scope"]; })} />
                <div className="lg:col-span-2"><TextArea value={item.description} rows={2} onChange={(value) => updateContribution(item.id, (next) => { next.description = value; })} /></div>
                <Select value={item.status} options={FOUNDRY_CONTRIBUTION_STATUSES} onChange={(value) => updateContribution(item.id, (next) => { next.status = value as FoundryContribution["status"]; })} />
                <button type="button" onClick={() => update((next) => { next.studioContributions = next.studioContributions.filter((candidate) => candidate.id !== item.id); })} className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border border-red-300/10 text-[9px] text-red-200/55 hover:bg-red-400/[0.04]"><Trash2 size={12} /> Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addContribution} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-cyan-300/15 text-[9px] text-cyan-100/70"><Plus size={12} /> Add Studio contribution</button>
      </Panel>

      <Panel title="Quality & handoff" note="Stop before errors multiply">
        <Field label="Quality gates"><StringList value={brief.qualityGates} onChange={(value) => set("qualityGates", value)} /></Field>
        <Field label="Current blockers"><StringList value={brief.blockers} onChange={(value) => set("blockers", value)} /></Field>
        <Field label="Notes"><TextArea value={brief.notes} rows={4} onChange={(value) => set("notes", value)} /></Field>
        <Field label="Commit"><TextInput value={brief.commit ?? ""} placeholder="Filled after the page is committed" onChange={(value) => set("commit", value || undefined)} /></Field>
      </Panel>
    </div>
  );
}

function uniqueId(base: string, existing: readonly string[]) {
  const root = base.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "item";
  if (!existing.includes(root)) return root;
  let index = 2;
  while (existing.includes(`${root}-${index}`)) index += 1;
  return `${root}-${index}`;
}
