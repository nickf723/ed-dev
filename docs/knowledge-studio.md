# Knowledge Studio

Knowledge Studio is the local authoring environment for Education Station 64. It turns page development from direct TSX/Tailwind editing into a higher-level recipe and design-system workflow.

Run `npm run dev`, then open `http://localhost:3000/studio`. The route and its write APIs are unavailable outside local development.

## Three editing views

### Page

Judge the full composition, hierarchy, spacing, responsiveness, and section flow.

### Style guide

Inspect one page as a component system: palette, typography, eyebrows, iconography, children, and supporting widgets.

### Parameters

Use the spreadsheet-like workbook for rapid cross-page editing. It contains five sheets:

- **Palettes** — editable global semantic color roles
- **Typography** — editable global font and eyebrow systems
- **Pages** — one row per recipe with palette, typography, icon, width, density, surface, radius, spacing, and motion
- **Children** — one row per direct destination with label, icon, color role, status, and tags
- **Widgets** — one row per supporting section with type, eyebrow, title, icon, visibility, and part count

## Global design registry

Global styles live in:

```text
content/design-system/globals.json
```

A palette is a named set of semantic roles rather than one primary color:

```text
primary · secondary · tertiary · quaternary
success · warning · danger
background · surface · text · muted · border
```

A page links to a palette with `theme.paletteId`. Children and widget parts link to roles such as `primary`, `secondary`, or `danger`. Editing a global role immediately updates every linked page in the Studio preview and every recipe-rendered route after saving.

Typography presets similarly define:

```text
display font · body font · title case · eyebrow style
```

Pages link through `theme.typographyId`.

## Save behavior

`Ctrl+S` or **Save all** validates and writes every changed recipe plus the global design registry. Timestamped backups are stored under `.next/studio-backups`. GitHub Desktop then shows a small set of readable JSON changes.

## Architecture

```text
Curriculum registry       -> what exists and how it is related
Global design registry    -> reusable palettes and typography
Page recipe               -> how one page presents the knowledge
Design resolver           -> compiles global references into render values
PageRenderer              -> turns the resolved recipe into React UI
Knowledge Studio          -> edits recipes and global systems semantically
Custom instruments        -> escape hatch for specialized simulations
```

The editor remains constrained rather than freeform. Semantic parameters preserve cohesion while still allowing page-level overrides and custom instruments.
