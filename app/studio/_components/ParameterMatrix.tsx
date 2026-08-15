"use client";

import type { ChangeEvent, ReactNode } from "react";
import { Copy, ExternalLink, Plus, Trash2 } from "lucide-react";
import { PAGE_ICON_OPTIONS } from "@/app/_page-system/icon-registry";
import { applyGlobalDesign } from "@/lib/design-system/resolve";
import {
  DESIGN_ACCENT_ROLES,
  DESIGN_SURFACE_ROLES,
  type DesignAccentRole,
  type DesignPalette,
  type DesignTypographyPreset,
  type GlobalDesignSystem,
} from "@/lib/design-system/schema";
import type { PageRecipe, RecipeLink } from "@/lib/page-system/schema";
import {
  hexToRgb,
  rgbToHex,
  uniqueId,
  type ParameterSheet,
} from "@/app/studio/_components/studio-types";

type Props = {
  sheet: ParameterSheet;
  recipes: PageRecipe[];
  designSystem: GlobalDesignSystem;
  onSheet: (sheet: ParameterSheet) => void;
  updateDesignSystem: (mutator: (next: GlobalDesignSystem) => void) => void;
  updateRecipe: (id: string, mutator: (next: PageRecipe) => void) => void;
  openRecipe: (id: string, target?: "page" | "style-guide") => void;
};

type Option = string | { value: string; label: string };
type ChildRow = {
  page: PageRecipe;
  groupId?: string;
  groupLabel?: string;
  item: RecipeLink & { question?: string };
};

const SHEETS: readonly { id: ParameterSheet; label: string }[] = [
  { id: "palettes", label: "Palettes" },
  { id: "typography", label: "Typography" },
  { id: "pages", label: "Pages" },
  { id: "children", label: "Children" },
  { id: "widgets", label: "Widgets" },
];

const COLOR_ROLES = [...DESIGN_ACCENT_ROLES, ...DESIGN_SURFACE_ROLES];

export default function ParameterMatrix(props: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#080a0f]">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-white/[0.08] bg-[#0b0e14] px-4">
        <strong className="mr-3 text-[10px] uppercase tracking-[0.13em] text-slate-300">
          Parameter workbook
        </strong>
        {SHEETS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => props.onSheet(item.id)}
            className={`h-8 rounded-[9px] border px-3 text-[9px] font-medium transition ${
              props.sheet === item.id
                ? "border-cyan-300/18 bg-cyan-400/[0.07] text-cyan-100"
                : "border-transparent text-slate-600 hover:border-white/[0.07] hover:text-slate-300"
            }`}
          >
            {item.label}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700 xl:block">
          edit cells · scroll horizontally · Ctrl+S saves all changed files
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        {props.sheet === "palettes" ? <PaletteSheet {...props} /> : null}
        {props.sheet === "typography" ? <TypographySheet {...props} /> : null}
        {props.sheet === "pages" ? <PageSheet {...props} /> : null}
        {props.sheet === "children" ? <ChildrenSheet {...props} /> : null}
        {props.sheet === "widgets" ? <WidgetsSheet {...props} /> : null}
      </div>
    </div>
  );
}

function PaletteSheet({ designSystem, updateDesignSystem }: Props) {
  function addPalette() {
    updateDesignSystem((next) => {
      const source = next.palettes[0];
      if (!source) return;
      next.palettes.push({
        ...structuredClone(source),
        id: uniqueId("new-palette", next.palettes.map((item) => item.id)),
        label: "New Palette",
        description: "Describe this reusable semantic color system.",
      });
    });
  }

  return (
    <Sheet title="Global palettes" description="Every role is editable. Pages and components linked to the palette update together." action={<AddAction label="Add palette" onClick={addPalette} />}>
      <table className="min-w-[2100px] border-separate border-spacing-0 text-left">
        <thead><tr>
          <Head sticky>Palette</Head><Head>Description</Head>
          {COLOR_ROLES.map((role) => <Head key={role}>{role}</Head>)}
          <Head>Actions</Head>
        </tr></thead>
        <tbody>
          {designSystem.palettes.map((palette) => (
            <tr key={palette.id}>
              <Cell sticky>
                <TextCell value={palette.label} strong onChange={(value) => updatePalette(updateDesignSystem, palette.id, (next) => { next.label = value; })} />
                <IdLabel>{palette.id}</IdLabel>
              </Cell>
              <Cell><AreaCell value={palette.description} width="w-72" onChange={(value) => updatePalette(updateDesignSystem, palette.id, (next) => { next.description = value; })} /></Cell>
              {COLOR_ROLES.map((role) => (
                <Cell key={role} compact>
                  <ColorCell value={palette.roles[role]} onChange={(value) => updatePalette(updateDesignSystem, palette.id, (next) => { next.roles[role] = value; })} />
                </Cell>
              ))}
              <Cell compact>
                <RowActions
                  onDuplicate={() => duplicatePalette(palette, updateDesignSystem)}
                  onDelete={() => deletePalette(palette.id, designSystem, updateDesignSystem)}
                  deleteDisabled={designSystem.palettes.length <= 1}
                />
              </Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  );
}

function TypographySheet({ designSystem, updateDesignSystem }: Props) {
  function addTypography() {
    updateDesignSystem((next) => {
      next.typography.push({
        id: uniqueId("new-typography", next.typography.map((item) => item.id)),
        label: "New Typography",
        description: "Describe where this typography system belongs.",
        displayFont: "sans",
        bodyFont: "sans",
        titleCase: "natural",
        eyebrowStyle: "plain",
      });
    });
  }

  return (
    <Sheet title="Global typography" description="Edit one named type system and every linked page inherits the result." action={<AddAction label="Add typography" onClick={addTypography} />}>
      <table className="min-w-[1250px] border-separate border-spacing-0 text-left">
        <thead><tr>
          <Head sticky>Typography</Head><Head>Description</Head><Head>Display</Head><Head>Body</Head><Head>Title case</Head><Head>Eyebrow</Head><Head>Actions</Head>
        </tr></thead>
        <tbody>
          {designSystem.typography.map((preset) => (
            <tr key={preset.id}>
              <Cell sticky><TextCell value={preset.label} strong onChange={(value) => updateTypography(updateDesignSystem, preset.id, (next) => { next.label = value; })} /><IdLabel>{preset.id}</IdLabel></Cell>
              <Cell><AreaCell value={preset.description} width="w-80" onChange={(value) => updateTypography(updateDesignSystem, preset.id, (next) => { next.description = value; })} /></Cell>
              <Cell compact><CellSelect value={preset.displayFont} options={["serif", "sans", "mono"]} onChange={(value) => updateTypography(updateDesignSystem, preset.id, (next) => { next.displayFont = value as DesignTypographyPreset["displayFont"]; })} /></Cell>
              <Cell compact><CellSelect value={preset.bodyFont} options={["serif", "sans", "mono"]} onChange={(value) => updateTypography(updateDesignSystem, preset.id, (next) => { next.bodyFont = value as DesignTypographyPreset["bodyFont"]; })} /></Cell>
              <Cell compact><CellSelect value={preset.titleCase} options={["natural", "uppercase"]} onChange={(value) => updateTypography(updateDesignSystem, preset.id, (next) => { next.titleCase = value as DesignTypographyPreset["titleCase"]; })} /></Cell>
              <Cell compact><CellSelect value={preset.eyebrowStyle} options={["dot", "rule", "pill", "plain"]} onChange={(value) => updateTypography(updateDesignSystem, preset.id, (next) => { next.eyebrowStyle = value as DesignTypographyPreset["eyebrowStyle"]; })} /></Cell>
              <Cell compact><RowActions onDuplicate={() => duplicateTypography(preset, updateDesignSystem)} onDelete={() => deleteTypography(preset.id, designSystem, updateDesignSystem)} deleteDisabled={designSystem.typography.length <= 1} /></Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  );
}

function PageSheet({ recipes, designSystem, updateRecipe, openRecipe }: Props) {
  const paletteOptions = designSystem.palettes.map((item) => ({ value: item.id, label: item.label }));
  const typographyOptions = designSystem.typography.map((item) => ({ value: item.id, label: item.label }));

  return (
    <Sheet title="Page matrix" description="A compact reference for identity, global systems, layout, and page-scale parameters.">
      <table className="min-w-[2200px] border-separate border-spacing-0 text-left">
        <thead><tr>
          <Head sticky>Page</Head><Head>Route</Head><Head>Palette</Head><Head>Typography</Head><Head>Icon</Head><Head>Width</Head><Head>Header</Head><Head>Density</Head><Head>Surface</Head><Head>Radius</Head><Head>Gap</Head><Head>Motion</Head><Head>Children</Head><Head>Widgets</Head><Head>Open</Head>
        </tr></thead>
        <tbody>
          {recipes.map((recipe) => {
            const resolved = applyGlobalDesign(recipe, designSystem);
            const childCount = recipe.organization.kind === "multiple-lenses"
              ? recipe.organization.items.length
              : recipe.organization.groups.reduce((sum, group) => sum + group.items.length, 0);
            return (
              <tr key={recipe.id}>
                <Cell sticky><TextCell value={recipe.identity.title} strong onChange={(value) => updateRecipe(recipe.id, (next) => { next.identity.title = value; })} /><IdLabel>{recipe.id}</IdLabel></Cell>
                <Cell><span className="font-mono text-[8px] text-slate-600">{recipe.route}</span></Cell>
                <Cell compact><CellSelect value={recipe.theme.paletteId ?? ""} options={paletteOptions} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.paletteId = value || undefined; })} /></Cell>
                <Cell compact><CellSelect value={recipe.theme.typographyId ?? ""} options={typographyOptions} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.typographyId = value || undefined; })} /></Cell>
                <Cell compact><CellSelect value={recipe.identity.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateRecipe(recipe.id, (next) => { next.identity.icon = value; })} /></Cell>
                <Cell compact><CellSelect value={recipe.theme.contentWidth ?? "standard"} options={["focused", "standard", "wide"]} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.contentWidth = value as NonNullable<PageRecipe["theme"]["contentWidth"]>; })} /></Cell>
                <Cell compact><CellSelect value={recipe.theme.headerScale ?? "standard"} options={["compact", "standard", "display"]} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.headerScale = value as NonNullable<PageRecipe["theme"]["headerScale"]>; })} /></Cell>
                <Cell compact><CellSelect value={recipe.theme.density} options={["compact", "balanced", "spacious"]} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.density = value as PageRecipe["theme"]["density"]; })} /></Cell>
                <Cell compact><CellSelect value={recipe.theme.surface} options={["clear", "glass", "dense-glass"]} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.surface = value as PageRecipe["theme"]["surface"]; })} /></Cell>
                <Cell compact><CellSelect value={recipe.theme.panelRadius} options={["md", "lg", "xl"]} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.panelRadius = value as PageRecipe["theme"]["panelRadius"]; })} /></Cell>
                <Cell compact><CellSelect value={recipe.theme.sectionGap} options={["sm", "md", "lg"]} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.sectionGap = value as PageRecipe["theme"]["sectionGap"]; })} /></Cell>
                <Cell compact><CellSelect value={recipe.theme.motion} options={["off", "subtle", "expressive"]} onChange={(value) => updateRecipe(recipe.id, (next) => { next.theme.motion = value as PageRecipe["theme"]["motion"]; })} /></Cell>
                <Cell compact><Count value={childCount} color={resolved.theme.resolvedPalette?.secondary ?? resolved.theme.accentRgb} /></Cell>
                <Cell compact><Count value={recipe.sections.length} color={resolved.theme.resolvedPalette?.tertiary ?? resolved.theme.accentRgb} /></Cell>
                <Cell compact><OpenAction onClick={() => openRecipe(recipe.id)} /></Cell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Sheet>
  );
}

function ChildrenSheet({ recipes, updateRecipe, openRecipe }: Props) {
  const rows = recipes.flatMap(childRows);
  return (
    <Sheet title="Children matrix" description="Review every direct destination, its semantic color role, icon, status, and compact metadata.">
      <table className="min-w-[1900px] border-separate border-spacing-0 text-left">
        <thead><tr>
          <Head sticky>Page</Head><Head>Group</Head><Head>Child</Head><Head>Icon</Head><Head>Color role</Head><Head>Custom color</Head><Head>Status</Head><Head>Question / tags</Head><Head>Open</Head>
        </tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.page.id}:${row.groupId ?? "root"}:${row.item.id}`}>
              <Cell sticky><span className="text-[10px] font-semibold text-white">{row.page.identity.title}</span></Cell>
              <Cell><span className="text-[9px] text-slate-600">{row.groupLabel ?? row.page.organization.kind}</span></Cell>
              <Cell><TextCell value={row.item.label} onChange={(value) => updateChild(updateRecipe, row, (next) => { next.label = value; })} /></Cell>
              <Cell compact><CellSelect value={row.item.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateChild(updateRecipe, row, (next) => { next.icon = value; })} /></Cell>
              <Cell compact><CellSelect value={row.item.colorRole ?? "custom"} options={["custom", ...DESIGN_ACCENT_ROLES]} onChange={(value) => updateChild(updateRecipe, row, (next) => { next.colorRole = value === "custom" ? undefined : value as DesignAccentRole; })} /></Cell>
              <Cell compact><ColorCell value={row.item.accentRgb} onChange={(value) => updateChild(updateRecipe, row, (next) => { next.accentRgb = value; next.colorRole = undefined; })} /></Cell>
              <Cell compact><CellSelect value={row.item.status ?? "active"} options={["active", "planned"]} onChange={(value) => updateChild(updateRecipe, row, (next) => { next.status = value as RecipeLink["status"]; })} /></Cell>
              <Cell>
                <TextCell
                  value={"question" in row.item ? row.item.question ?? "" : (row.item.tags ?? []).join(" · ")}
                  onChange={(value) => updateChild(updateRecipe, row, (next) => {
                    if ("question" in next) next.question = value;
                    else next.tags = value.split(/[·,]/).map((tag) => tag.trim()).filter(Boolean);
                  })}
                />
              </Cell>
              <Cell compact><OpenAction onClick={() => openRecipe(row.page.id, "style-guide")} /></Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  );
}

function WidgetsSheet({ recipes, updateRecipe, openRecipe }: Props) {
  const rows = recipes.flatMap((page) => page.sections.map((section) => ({ page, section })));
  return (
    <Sheet title="Widgets matrix" description="Edit supporting-section shells and compare widget inventories across pages.">
      <table className="min-w-[1500px] border-separate border-spacing-0 text-left">
        <thead><tr>
          <Head sticky>Page</Head><Head>Type</Head><Head>Eyebrow</Head><Head>Title</Head><Head>Icon</Head><Head>Visible</Head><Head>Parts</Head><Head>Open</Head>
        </tr></thead>
        <tbody>
          {rows.map(({ page, section }) => (
            <tr key={`${page.id}:${section.id}`}>
              <Cell sticky><span className="text-[10px] font-semibold text-white">{page.identity.title}</span></Cell>
              <Cell compact><span className="font-mono text-[8px] text-slate-600">{section.type}</span></Cell>
              <Cell><TextCell value={section.eyebrow} onChange={(value) => updateSection(updateRecipe, page.id, section.id, (next) => { next.eyebrow = value; })} /></Cell>
              <Cell><TextCell value={section.title} onChange={(value) => updateSection(updateRecipe, page.id, section.id, (next) => { next.title = value; })} /></Cell>
              <Cell compact><CellSelect value={section.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateSection(updateRecipe, page.id, section.id, (next) => { next.icon = value; })} /></Cell>
              <Cell compact><CellSelect value={section.hidden ? "hidden" : "visible"} options={["visible", "hidden"]} onChange={(value) => updateSection(updateRecipe, page.id, section.id, (next) => { next.hidden = value === "hidden"; })} /></Cell>
              <Cell compact><Count value={section.type === "case-study" ? section.columns.length : section.choices.length} color="167, 139, 250" /></Cell>
              <Cell compact><OpenAction onClick={() => openRecipe(page.id, "style-guide")} /></Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  );
}

function Sheet({ title, description, action, children }: { title: string; description: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-w-max p-5">
      <div className="sticky left-0 mb-4 flex max-w-[960px] items-end justify-between gap-6">
        <div><h2 className="text-[18px] font-semibold text-white">{title}</h2><p className="mt-1 text-[10px] leading-5 text-slate-500">{description}</p></div>
        {action}
      </div>
      <div className="overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0b0e14] shadow-[0_24px_80px_rgba(0,0,0,0.24)]">{children}</div>
    </div>
  );
}

function Head({ children, sticky = false }: { children: ReactNode; sticky?: boolean }) {
  return <th className={`sticky top-0 z-20 border-b border-r border-white/[0.08] bg-[#11151d] px-3 py-3 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500 ${sticky ? "left-0 z-30 min-w-[210px]" : "min-w-[130px]"}`}>{children}</th>;
}
function Cell({ children, sticky = false, compact = false }: { children: ReactNode; sticky?: boolean; compact?: boolean }) {
  return <td className={`border-b border-r border-white/[0.06] bg-[#0c0f16] px-3 py-2.5 align-middle ${sticky ? "sticky left-0 z-10 bg-[#0f131a]" : ""} ${compact ? "min-w-[120px]" : "min-w-[190px]"}`}>{children}</td>;
}
function TextCell({ value, onChange, strong = false }: { value: string; onChange: (value: string) => void; strong?: boolean }) {
  return <input value={value} onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)} className={`w-full min-w-[150px] bg-transparent outline-none ${strong ? "text-[11px] font-semibold text-white" : "text-[9px] text-slate-400"}`} />;
}
function AreaCell({ value, onChange, width }: { value: string; onChange: (value: string) => void; width: string }) {
  return <textarea value={value} rows={2} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)} className={`${width} resize-none bg-transparent text-[9px] leading-4 text-slate-500 outline-none`} />;
}
function CellSelect({ value, options, onChange }: { value: string; options: readonly Option[]; onChange: (value: string) => void }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-full min-w-[110px] rounded-[8px] border border-white/[0.07] bg-black/25 px-2 text-[9px] text-slate-400 outline-none focus:border-cyan-300/25">
      <option value="">Custom</option>
      {options.map((raw) => { const option = typeof raw === "string" ? { value: raw, label: raw } : raw; return <option key={option.value} value={option.value}>{option.label}</option>; })}
    </select>
  );
}
function ColorCell({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="flex items-center gap-2"><input type="color" value={rgbToHex(value)} onChange={(event) => onChange(hexToRgb(event.target.value))} className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent p-0" /><input value={value} onChange={(event) => onChange(event.target.value)} className="w-24 bg-transparent font-mono text-[8px] text-slate-500 outline-none" /></div>;
}
function AddAction({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-cyan-300/15 bg-cyan-400/[0.04] px-3 text-[9px] text-cyan-100/75 hover:bg-cyan-400/[0.07]"><Plus size={12} />{label}</button>;
}
function OpenAction({ onClick }: { onClick: () => void }) {
  return <button type="button" title="Open in editor" onClick={onClick} className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-white/[0.07] text-slate-600 hover:bg-white/[0.04] hover:text-white"><ExternalLink size={12} /></button>;
}
function RowActions({ onDuplicate, onDelete, deleteDisabled }: { onDuplicate: () => void; onDelete: () => void; deleteDisabled?: boolean }) {
  return <div className="flex gap-1"><button type="button" title="Duplicate" onClick={onDuplicate} className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-white/[0.07] text-slate-600 hover:text-white"><Copy size={12} /></button><button type="button" title="Delete" onClick={onDelete} disabled={deleteDisabled} className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-red-300/10 text-red-300/55 hover:bg-red-400/[0.05] disabled:opacity-25"><Trash2 size={12} /></button></div>;
}
function IdLabel({ children }: { children: ReactNode }) { return <div className="mt-1 font-mono text-[8px] text-slate-700">{children}</div>; }
function Count({ value, color }: { value: number; color: string }) { return <span className="font-mono text-[11px]" style={{ color: `rgba(${color},0.78)` }}>{value}</span>; }

function updatePalette(update: Props["updateDesignSystem"], id: string, mutator: (palette: DesignPalette) => void) { update((next) => { const item = next.palettes.find((candidate) => candidate.id === id); if (item) mutator(item); }); }
function updateTypography(update: Props["updateDesignSystem"], id: string, mutator: (preset: DesignTypographyPreset) => void) { update((next) => { const item = next.typography.find((candidate) => candidate.id === id); if (item) mutator(item); }); }
function duplicatePalette(palette: DesignPalette, update: Props["updateDesignSystem"]) { update((next) => { const id = uniqueId(`${palette.id}-copy`, next.palettes.map((item) => item.id)); const index = next.palettes.findIndex((item) => item.id === palette.id); next.palettes.splice(index + 1, 0, { ...structuredClone(palette), id, label: `${palette.label} copy` }); }); }
function deletePalette(id: string, system: GlobalDesignSystem, update: Props["updateDesignSystem"]) { if (system.palettes.length <= 1 || !window.confirm("Delete this global palette? Linked pages will fall back to their stored colors.")) return; update((next) => { next.palettes = next.palettes.filter((item) => item.id !== id); }); }
function duplicateTypography(preset: DesignTypographyPreset, update: Props["updateDesignSystem"]) { update((next) => { const id = uniqueId(`${preset.id}-copy`, next.typography.map((item) => item.id)); const index = next.typography.findIndex((item) => item.id === preset.id); next.typography.splice(index + 1, 0, { ...structuredClone(preset), id, label: `${preset.label} copy` }); }); }
function deleteTypography(id: string, system: GlobalDesignSystem, update: Props["updateDesignSystem"]) { if (system.typography.length <= 1 || !window.confirm("Delete this global typography system? Linked pages will use their stored typography.")) return; update((next) => { next.typography = next.typography.filter((item) => item.id !== id); }); }

function childRows(page: PageRecipe): ChildRow[] {
  if (page.organization.kind === "multiple-lenses") return page.organization.items.map((item) => ({ page, item }));
  return page.organization.groups.flatMap((group) => group.items.map((item) => ({ page, groupId: group.id, groupLabel: group.label, item })));
}
function updateChild(updateRecipe: Props["updateRecipe"], row: ChildRow, mutator: (item: RecipeLink & { question?: string }) => void) {
  updateRecipe(row.page.id, (next) => {
    if (next.organization.kind === "multiple-lenses") {
      const item = next.organization.items.find((candidate) => candidate.id === row.item.id);
      if (item) mutator(item);
    } else {
      const item = next.organization.groups.find((group) => group.id === row.groupId)?.items.find((candidate) => candidate.id === row.item.id);
      if (item) mutator(item);
    }
  });
}
function updateSection(updateRecipe: Props["updateRecipe"], pageId: string, sectionId: string, mutator: (section: PageRecipe["sections"][number]) => void) {
  updateRecipe(pageId, (next) => { const section = next.sections.find((candidate) => candidate.id === sectionId); if (section) mutator(section); });
}
