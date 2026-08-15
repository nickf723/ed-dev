# Knowledge Studio

Knowledge Studio is the local authoring environment for Education Station 64. It turns page development from direct TSX/Tailwind editing into a higher-level recipe workflow.

Run the site with `npm run dev`, then open:

```text
http://localhost:3000/studio
```

The route and its write API are deliberately unavailable outside `next dev`.

## Architecture

```text
Curriculum registry  -> what exists and how it is related
Page recipe          -> how a page presents that knowledge
PageRenderer         -> compiles the recipe into React UI
Knowledge Studio     -> edits recipes through semantic controls
Custom instruments  -> escape hatch for specialized simulations and diagrams
```

The curriculum remains the ontology source of truth. Recipes hold presentation parameters and reference curriculum nodes through `nodeId`.

## Page canvas

The Page view edits a complete page in context. Current controls include:

- page identity, eyebrow, subtitle, and icon
- constrained density, spacing, width, radius, surface, border, shadow, and motion tokens
- child navigation topology
- lens, regime, and navigation-item content
- supporting sections and their nested parts
- desktop, tablet, and mobile widths
- zoom, alignment guides, motion freeze, undo, redo, reset, and save

## Parameterized style guide

The Style guide view lays the page's design system out as a component workbench. It uses the same recipe and immediately reflects every parameter change.

### Palette

System palettes update coordinated color roles rather than only the title color. They propagate through:

- page accent
- child navigation accents
- regime accents
- supporting widget accents
- the ambient background field

Included starting systems cover mathematics red, physics cyan, history archive, biology green, social-science blue, and humanities rose. Every resulting color remains individually editable.

### Typography and eyebrows

Recipes can independently choose:

- display font: serif, sans, or mono
- body font: serif, sans, or mono
- natural or uppercase title treatment
- compact, standard, or display header scale
- dot, rule, pill, or plain eyebrow treatment

These roles apply to the real page renderer, not only to the workbench preview.

### Iconography

The style guide displays page and child icons together. The inspector uses a visual icon grid rather than a name-only dropdown. The registry includes general educational symbols such as a line chart, trend line, scales, globe, laboratory flask, DNA, landmark, network, and domain-specific physics icons.

### Children and navigation

The Children section exposes direct destinations as a coordinated component family. It supports:

- adding, duplicating, deleting, and reordering children
- changing icons, labels, summaries, tags, status, routes, and accents
- changing lens or regime column structure
- preserving planned destinations without fake links

### Supporting widgets

The Widgets section previews all supporting sections with shared shell parameters. Case studies and model guides can be added, hidden, reordered, duplicated, or broken into nested parts.

## Saving

`Ctrl+S` validates and writes the active recipe under `content/pages`. Timestamped backups are stored under `.next/studio-backups`. GitHub Desktop then shows one readable recipe diff instead of a large set of class-string edits.

## Deliberate constraints

Knowledge Studio is not a freeform drag-and-drop builder. Semantic parameters preserve coherence while still allowing strong subject identity. New topology types should correspond to real knowledge relationships: hierarchy, sequence, scale, containment, process, map, comparison, or independent lenses.

## Next slices

1. Global -> domain -> branch -> page inheritance with promote/reset controls.
2. Atomic lesson recipes with Explain -> Do -> Check and configurable content pieces.
3. A widget/component registry for custom instruments and simulations.
4. Automated TREE / FRAME / FIELD / FLOW checks.
5. An add-child workflow that creates curriculum node, route, and recipe together.
6. More subject recipes, beginning with Mathematics and Economics, to validate palette and icon-system reuse.
