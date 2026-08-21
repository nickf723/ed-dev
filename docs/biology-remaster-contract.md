# Biology remaster contract

## Educational job

The Biology root is a scale atlas and orientation lesson. It helps a learner
choose the level of organization appropriate to a question, follow recurring
themes across those levels, calculate one exact magnification, and distinguish
claims about regulation, evolution, and phylogenetic relationship.

It is not a compressed survey of every organism, a decorative tree of life, a
taxonomy authority, or a substitute for the active Cytology, Microbiology,
Mycology, Botany, Zoology, and Anatomy & Physiology routes.

## Registry contract

`BIOLOGY_CURRICULUM` owns exactly ten direct branches in registry order:

1. Cytology
2. Genetics
3. Molecular Biology
4. Microbiology
5. Mycology
6. Botany
7. Zoology
8. Anatomy & Physiology
9. Ecology
10. Evolution

The scale atlas is an analytical arrangement, not a second hierarchy. Its four
bands cover the nine non-Evolution branches exactly once. Evolution stays on a
separate cross-scale rail because inheritance, selection, and generational
change connect molecular, organismal, and ecological observations.

Active branches render as links. Planned branches remain visible and inert.
The page derives labels, descriptions, status, hrefs, and breadcrumbs from the
curriculum registry and fails loudly if the model and registry drift apart.

## Lesson flow

1. Registry-derived orientation and four scale bands
2. Cross-scale Evolution rail
3. Five recurring themes: information, energy and matter, structure and
   function, regulation, and evolution
4. Magnification bench with explicit unit conversion
5. Four-file evidence review
6. Repository and source-boundary shelf

Major surfaces keep generous scenery corridors so the page can breathe and the
living-scale background remains legible.

## Shared model and exact fixtures

`biologyModel.ts` owns branch parity, scale-band coverage, four fixed teaching
specimens, magnification arithmetic, recurring themes, and evidence answers.

Magnification uses `image magnification = image length / actual length`.
Lengths are converted to the same unit before division. Fixed fixtures are:

- onion epidermal cell: 72 mm / 180 µm = 400×
- cheek epithelial cell: 30 mm / 60 µm = 500×
- pollen grain: 20 mm / 25 µm = 800×
- rod-shaped bacterium: 8 mm / 2 µm = 4,000×

The specimen drawings are labeled schematics, not micrographs. The result does
not claim resolving power, image quality, or taxonomic identification.

The evidence review tests four different boundaries:

- ratios require like units;
- homeostasis is dynamic regulation around functional conditions, not perfect
  constancy;
- natural selection changes heritable-variant frequencies in populations
  across generations;
- tree topology represents branching hypotheses, not a ladder in which one
  living species necessarily becomes another.

## Vocabulary ownership

Biology owns 12 broad terms. Thirteen branch groups own two specialized terms
each. Botany retains its existing 10 terms. The Biology scope therefore
aggregates 48 unique terms while preserving narrow ownership:

- `bio-homeostasis` remains at Biology;
- `bio-mitosis` belongs to Cytology;
- `bio-phenotype` belongs to Genetics;
- Zoology aggregates its two root terms plus two terms from each of its four
  active children;
- Botany stays an independent 10-term child group.

## Visual and hydration contract

The root background is a deterministic, server-rendered SVG showing molecular,
cellular, organismal, and ecological structures joined by one scale line. It
uses no canvas, viewport measurement, random values, timers, request-animation
frame, or hydration-time drawing. Only the magnification bench and evidence
review are client islands, and both initialize from fixed model data.

Required interface copy remains at least 11px. Focus states are visible. Motion
is not required to understand the route.

## Repository boundaries

The root links to official source documentation but performs no render-time
fetch:

- [NCBI Taxonomy and Datasets](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/data-processing/taxonomy-processing/taxonomy/)
  for names, TaxIds, ranks, lineages, synonyms, and linked sequence records;
- [GBIF occurrence API](https://techdocs.gbif.org/en/openapi/v1/occurrence)
  for evidence-backed specimen and observation records;
- [Open Tree of Life](https://tree.opentreeoflife.org/about/open-tree-of-life)
  for a versioned synthesis of published phylogenies and taxonomy.

A future collection adapter must retain source record identity, dataset and
release context, licensing, identification and geospatial uncertainty, quality
flags, citations, pagination, retry/error states, and provider attribution. A
name is not an occurrence, an occurrence is not an abundance estimate, and a
synthetic topology is not final authority or a ladder of progress.

## Verification contract

Before publication:

- run `npm run test:biology` and `npm run test:vocabulary`;
- run TypeScript and targeted React/Next lint;
- run architecture, readability, and remaster audits as informational scans;
- complete the production build;
- inspect generated Biology HTML for metadata, ancestry, exact branch labels,
  active/planned link behavior, the 400× default fixture, evidence and source
  copy, and the absence of root canvas/random/animation behavior;
- queue desktop, narrower desktop, mobile, keyboard, zoom, console, and
  interaction checks when a trusted browser is available;
- publish the exact verified tree to `studio` and confirm no deployment was
  created during the guard window.
