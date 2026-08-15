# Knowledge Studio

Knowledge Studio is the local authoring environment for Education Station 64. It turns page development from direct TSX/Tailwind editing into a higher-level recipe workflow.

## Open the editor

Run the site with `npm run dev`, then open:

```text
http://localhost:3000/studio
```

The route is deliberately unavailable in production and Preview builds. Its write API also rejects requests outside `next dev`.

The first two recipes are:

- `content/pages/humanities/history.json`
- `content/pages/natural/physics.json`

History is rendered directly from its recipe. Physics is the second structural validation case inside the editor before its live route is migrated.

## Architecture

```text
Curriculum registry  -> what exists and how it is related
Page recipe          -> how a page presents that knowledge
PageRenderer         -> compiles the recipe into React UI
Knowledge Studio     -> edits recipes through semantic controls
Custom instruments  -> escape hatch for specialized simulations and diagrams
```

The curriculum remains the ontology source of truth. Recipe links identify curriculum nodes with `nodeId`; route/status data is resolved from the curriculum for actual page rendering.

## Current editor capabilities

### Canvas and workflow

- ontology/page picker
- nested structure tree
- clickable live canvas regions
- desktop, tablet, and mobile widths
- canvas zoom from 50% to 120%
- alignment grid and region outlines
- motion freeze
- undo and redo
- reset to saved recipe
- Ctrl+S save, Ctrl+Z undo, Ctrl+Shift+Z redo, Ctrl+0 reset zoom
- runtime validation
- safe writes restricted to `content/pages`
- timestamped backups under `.next/studio-backups`

### Whole-page design controls

- Focused, Balanced, and Showcase presets
- focused, standard, and wide content widths
- compact, standard, and display headers
- compact, balanced, and spacious density
- small, medium, and large section spacing
- medium, large, and extra-large panel radii
- clear, glass, and dense-glass surfaces
- subtle, standard, and strong borders
- no, soft, and dramatic shadows
- surface opacity
- background strength and motion
- reusable palette swatches plus a custom color picker

### Structure and content controls

- lens columns and card height
- regime columns and fields per row
- editable lens, regime, field, section, case-study-column, and model-choice content
- active/planned states
- diagram and visual-grammar selection
- add, duplicate, delete, and reorder actions
- hide and restore supporting sections without deleting them
- character counts on text fields

## Deliberate constraints

Knowledge Studio is not a freeform drag-and-drop website builder. Semantic tokens preserve cohesion. The editor exposes meaningful decisions—density, hierarchy, topology, atmosphere, and emphasis—rather than every possible CSS property.

Current topologies:

- multiple lenses
- split regimes

Future topologies should be added only when they encode a real knowledge relationship such as hierarchy, sequence, scale, containment, process, map, or comparison.

## Next slices

1. Global -> domain -> branch -> page inheritance with promote/reset controls.
2. Automated TREE / FRAME / FIELD / FLOW checks.
3. Recipe migration for Physics after the pilot renderer is accepted.
4. Atomic lesson recipes with Explain -> Do -> Check and custom instrument slots.
5. Add-child workflow that creates curriculum node, recipe, and route together.
6. Reusable component gallery and branch-wide comparison mode.
