# Botany Remaster Contract

## Identity and rotation role

Botany is a Natural Science → Biology navigation hub with a complete overview lesson. It follows the Social Science Geography pass to change academic world, material language, interaction grammar, and page job while preserving a registry-first production contract.

The page should feel like a living field station: vascular traces, leaf venation, specimen labels, gradients, and slow growth-like motion. It must not collapse into a generic green dashboard, an ornamental plant gallery, or a taxonomy tree with no physiological throughline.

## Bounded direct-child ontology

Botany owns six direct branches:

1. Structure & Development
2. Plant Physiology
3. Reproduction & Life Cycles
4. Diversity, Systematics & Evolution
5. Plant Ecology
6. Methods & Collections

All six are direct peers and remain planned, non-clickable, and absent from live sidebar navigation until a child receives a substantive page. Species, families, named structures, pathways, habitats, and techniques belong within these branches before any case is made for another direct peer.

The six-way atlas is the first major page section. It explains the kinds of questions the branches own before the overview lesson introduces one shared plant process.

## Overview lesson flow

The root follows a broad Orient → Navigate → Model → Connect → Bound → Check sequence:

1. orient the learner to plants as integrated living systems;
2. expose the six registry-owned branches;
3. model stomatal aperture as a coupled carbon-dioxide and water-vapor pathway;
4. connect root uptake, xylem, leaf exchange, phloem, sources, and sinks;
5. move between cell, tissue, organ, organism, population, and community scales;
6. label six common explanatory shortcuts;
7. assess calculation, model boundary, transport direction, and classification evidence.

The page remains an overview. It does not attempt to teach every photosynthetic pathway, plant lineage, tissue type, life cycle, ecological interaction, or identification method at root depth.

## Deterministic model contract

One shared module owns the stomatal model and the assessment fixtures. The teaching model defines:

- `openness = bounded aperture / 100`;
- `CO₂ capacity = round((0.08 + 0.92 × openness) × 100)`;
- `water-vapor flux = round(openness × dryness factor × 100)`;
- dryness factors of `0.46` for the more-humid preset and `1.00` for the drier preset.

These are normalized indicators invented for comparison. They are not stomatal conductance, photosynthetic assimilation, transpiration, water-use efficiency, or measured rates for a real species. The UI, test fixture, and assessment must call the same calculation rather than reimplementing it.

## Assessment contract

The evidence lab contains four deterministic files:

- calculate the humid/dry flux contrast at 50% aperture;
- infer the coupled diffusion pathway without claiming measured universal rates;
- trace phloem from changing source tissues to changing sinks rather than treating it as universally downward;
- classify by evolutionary relationship and multiple evidence streams rather than green color or human use.

Every file must support unanswered, correct, incorrect, changed-answer, switched-file, and reset states. Feedback explains why the selected claim fits or exceeds the evidence boundary.

## Vocabulary ownership

Botany owns ten terms taught directly by the overview: stoma, guard cell, transpiration, xylem, phloem, source, sink, meristem, alternation of generations, and herbarium.

The terms register at `natural.biology.botany` and aggregate into Biology and Natural Science through curriculum containment. Parent drawers must preserve Botany provenance rather than copying the terms into handwritten parent arrays.

## Collection and API boundary

The current iNaturalist adapter is Zoology-specific: it constrains searches to Animalia, normalizes records into `AnimalRecord`, and assigns an animal taxonomy shape. Botany must not reuse that adapter under a plant label.

A future flora atlas should have a separate typed contract that preserves accepted identity, rank and ancestry, specimen or observation evidence, place, time, collector or observer, media license and attribution, provider URL, retrieval state, and curated fallback behavior. A live provider may enrich a reviewed baseline, but a provider outage must not erase the lesson.

Until that contract exists, the page links to a real herbarium database and states the requirements openly rather than presenting decorative or weakly sourced search results as a scientific collection.

## Source boundary

The transport and stomatal sequence is checked against OpenStax _Biology 2e_, especially its plant transport and seed-plant evolution sections. The collection framing is checked against the Smithsonian National Museum of Natural History’s U.S. National Herbarium overview and collections database.

All pore percentages, flow arrows, scale cards, background traces, and branch motifs remain schematic teaching representations.

## Verification gate

Before publication, verify:

- exact six-child registry and atlas parity;
- all planned children are non-links and omitted from live navigation;
- canonical ancestry and metadata;
- exact model outputs at 0%, 50%, and 100% aperture plus bounded inputs;
- deterministic verdicts for all assessment options;
- Botany → Biology → Natural Science vocabulary inheritance;
- background remains deterministic and server-rendered;
- model, source, collection-boundary, and accessibility markers in generated HTML;
- no new hydration warnings, random output, client-side first-frame geometry, or unlabeled measured-looking values;
- desktop, narrower desktop, mobile, keyboard, reduced-motion, and zoomed-text behavior when a trusted browser runtime is available.
