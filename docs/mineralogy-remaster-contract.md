# Mineralogy Remaster Contract

## Identity and rotation role

- **Route:** `/natural-science/earth-science/mineralogy`
- **Curriculum node:** `natural.earth-science.mineralogy`
- **Page kind:** reference collection with a guided comparison instrument
- **Parent:** Earth Science, which already exposes Mineralogy as the direct Earth-materials branch
- **Rotation role:** move from Formal Science's network-drafting unit to Natural Science's specimen cabinet. The page changes page job, dominant axis, material language, and learner action rather than recoloring the Graph Theory composition.

## Preserve

- Keep the chemistry → crystal structure → observable property → identification throughline.
- Keep Quartz, Calcite, Halite, and Pyrite as familiar diagnostic specimens.
- Keep the useful warning that color alone is weak evidence.
- Replace the random shard cloud and isolated four-record test panel with a deterministic crystal environment and a larger searchable teaching cabinet.

## Learning and retrieval contract

The learner should be able to distinguish a mineral from a rock or gem category, then use several independent properties—not color alone—to narrow or compare an identification.

The central learner question is:

> Which observations actually separate two plausible minerals?

The page supports that question through:

1. a compact structure-to-property orientation;
2. a curated cabinet searchable by mineral name, formula, class, property, or use;
3. filters for chemical class, Mohs hardness band, luster, crystal system, and gem relationship;
4. a selected-specimen ledger with diagnostic observations and source links;
5. a comparison slot that keeps the same property visible for both specimens;
6. a mineral / rock / gem boundary reference after the cabinet.

## Collection contract

- **Type:** curated/open teaching collection, not a complete catalog of mineral species.
- **Stable record ID:** mineral slug such as `quartz` or `calcite`.
- **Detail address:** `/natural-science/earth-science/mineralogy#specimen-{id}`.
- **Local spine:** reviewed records remain fully usable without a provider request.
- **Provider behavior:** none in this pass; no API call, loading state, rate-limit state, or Vercel-cost exposure.
- **Provenance:** property summaries link to the Minerals Education Coalition mineral database; the category boundary and broader collection context link to the Smithsonian National Museum of Natural History.
- **Freshness:** curated facts carry a repository review date. The page says that ranges and specimen variation exist and that laboratory identification may require optical, chemical, or X-ray methods.
- **Empty state:** report zero matches and keep a one-action clear/reset route.
- **Accessible alternative:** every specimen silhouette is decorative; all diagnostic content is available as text in the record ledger and comparison table.

## Vocabulary contribution

Mineralogy owns the terms mineral, crystal structure, mineral species, Mohs hardness, streak, cleavage, fracture, luster, crystal habit, and gem. Earth Science inherits them automatically through a curriculum-node vocabulary registration.

## Academic world and composition

- **World:** field-station specimen cabinet crossed with a lapidary inspection table.
- **Dominant silhouette:** tall cabinet drawers and one enlarged specimen bay, not a centered dashboard or route-card grid.
- **Background:** deterministic crystal clusters, lattice planes, and a slow inspection glow. It is atmospheric rather than a fake crystallographic diagram.
- **Data marks:** each specimen retains its own hue, crystal-system silhouette, and material treatment when selected.
- **Scenery corridors:** preserve visible crystal shelves between orientation, cabinet, boundary reference, and provenance.
- **Motion budget:** calm ambient glow only; no random generation, pointer chasing, or high-frequency full-screen animation.

## Verification fixtures

- Default comparison: Quartz versus Calcite.
- Search: `FeS2` returns Pyrite; `gem` returns relevant gem-associated records.
- Combined filter: Halide + soft returns Halite; Native element + very hard returns Diamond.
- Empty state: Sulfide + very hard returns no record in the curated cabinet.
- Comparison: a record cannot compare against itself; changing the selected record preserves a distinct comparison target.
- Narrow widths: filters enter normal flow, specimen records remain readable, and the comparison table scrolls horizontally rather than clipping.

## Rotation return queue

After this Natural Science reference pass, retain `Combinatorics` as the Formal Science family return target. The next contrasting hop should prefer Social Science, Humanities, or Applied Science before another mineral-cabinet or network-drafting composition is repeated.
