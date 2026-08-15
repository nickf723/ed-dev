# Knowledge Studio

Knowledge Studio is the local authoring environment for Education Station 64. It turns page development from direct TSX/Tailwind editing into a higher-level recipe workflow.

## Current pilot

Run the site with `npm run dev`, then open:

```text
http://localhost:3000/studio
```

The route is deliberately unavailable in production and Preview builds. Its write API also rejects requests outside `next dev`.

The first two recipes are:

- `content/pages/humanities/history.json`
- `content/pages/natural/physics.json`

History is the first route rendered directly from a recipe. Physics is the second structural validation case inside the editor before its production route is migrated.

## Architecture

```text
Curriculum registry  -> what exists and how it is related
Page recipe          -> how a page presents that knowledge
PageRenderer         -> compiles the recipe into React UI
Knowledge Studio     -> edits recipes through semantic controls
Custom instruments  -> escape hatch for specialized simulations and diagrams
```

The curriculum remains the ontology source of truth. Recipe links identify curriculum nodes with `nodeId`; route/status data is resolved from the curriculum for actual page rendering.

## Editor capabilities in the first slice

- ontology/page picker
- structure tree
- clickable live canvas regions
- desktop, tablet, and mobile widths
- alignment grid and region outlines
- motion freeze
- undo and redo
- reset to saved recipe
- Ctrl+S save and Ctrl+Z undo
- identity editing
- constrained density, spacing, radius, surface, motion, and atmosphere tokens
- lens, regime, and navigation-item editing
- section shell editing and reordering
- runtime validation
- safe writes restricted to `content/pages`
- timestamped backups under `.next/studio-backups`

## Deliberate constraints

Knowledge Studio is not a freeform drag-and-drop website builder. Semantic tokens preserve cohesion:

- density: compact / balanced / spacious
- section gap: small / medium / large
- panel radius: medium / large / extra large
- surface: clear / glass / dense glass
- motion: off / subtle / expressive
- topology: multiple lenses / split regimes (initial set)

Future topologies should be added only when they encode a real knowledge relationship such as hierarchy, sequence, scale, containment, process, map, or comparison.

## Next slices

1. Nested editing for case-study columns and model-guide choices.
2. Global -> domain -> branch -> page inheritance with promote/reset controls.
3. Automated TREE / FRAME / FIELD / FLOW checks.
4. Recipe migration for Physics after the pilot renderer is accepted.
5. Atomic lesson recipes with Explain -> Do -> Check and custom instrument slots.
6. Add-child workflow that creates curriculum node, recipe, and route together.
