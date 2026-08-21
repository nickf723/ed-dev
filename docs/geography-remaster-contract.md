# Geography Remaster Contract

## Identity

- **Route:** `/social-science/geography`
- **Curriculum node:** `social.geography`
- **Parent:** Social Science
- **Page kind:** navigation hub with reference instruments
- **Active direct children:** none yet

This consolidation pass preserves the existing GIS light table, inhabited-globe world, eight bounded direct children, population-pyramid instrument, and six-question spatial-reasoning ledger. It brings that strong earlier design into the current development contract: registry enforcement, deterministic server scenery, curriculum-owned vocabulary, an evidence check, source boundaries, and a physical-geography cross-link.

## Learning contract

- **Learner outcome:** The learner can distinguish a spatial observation from an explanatory claim, identify how location, distribution, connection, scale, place, and change guide geographic questions, and explain why counts, averages, and co-located patterns need context.
- **Prior knowledge:** Maps can show where features or events are located.
- **Mental model:** Geographic inquiry overlays several kinds of evidence on the same world. Each layer makes some relationships visible while hiding or aggregating others.
- **Evidence of understanding:** Given a fresh map or data description, the learner selects the strongest claim supported without confusing counts with rates, aggregate averages with local uniformity, or spatial association with a complete causal mechanism.
- **Main misconception:** A visible map pattern explains itself.

## Scope and depth ceiling

The existing eight direct children remain the bounded introductory Human Geography layer:

1. Population & Demography
2. Migration & Mobility
3. Urban & Settlement Geography
4. Cultural Geography
5. Political Geography
6. Economic Geography
7. Development Geography
8. Geographic Methods & GIS

All eight are direct peers and remain planned, non-clickable, and absent from live sidebar navigation until a child receives a complete page. Agriculture, rural land use, environmental relationships, transport, health, and tourism can be taught inside or below these broad branches before any case is made for another direct peer. Physical Geography remains canonically owned by Natural Science → Earth Science.

## Navigation and sequence

The first useful viewport remains a **GIS light table**. It presents all eight direct children as translucent question layers over one place. A separate scale rail demonstrates site, local, regional, and global observation without inventing false curriculum ancestry.

The hub then flows:

`navigate → inspect a demographic instrument → name the spatial reasoning moves → test an evidence claim → cross-link and source`

## Canonical model and representation parity

`geographyModel.ts` owns:

- the exact eight direct-child IDs;
- the nine age groups and three normalized population profiles;
- the calculated young, core-adult, and older cohort shares;
- three geographic evidence cases and deterministic answer checking.

The population-pyramid bars, share readouts, evidence lab, tests, and generated-HTML assertions consume this shared model. The population profiles remain deliberately schematic and symmetric; the page never presents them as country observations.

## Interaction contract

### Population structure instrument

- **Question:** What can a population pyramid reveal before a full demographic explanation is available?
- **Default:** Expansive profile
- **Action:** Select expansive, column-like, or constrictive.
- **Consequence:** The co-visible bars, cohort-share readouts, shape description, and interpretation update from one model.
- **Boundary:** Shape is a snapshot influenced by fertility, mortality, migration, cohort aging, and data quality; it is not destiny.

### Map evidence lab

- **Denominator case:** Distinguish event counts from exposure-adjusted risk.
- **Scale case:** Recognize that a valid whole-area average can hide local variation.
- **Mechanism case:** Treat co-location as spatial association that motivates investigation rather than proof of cause.
- **States:** unanswered, correct, incorrect, changed answer, switched file, and reset.
- **Checker:** Stable case and option IDs with one deterministic verdict and explanatory feedback.

## Vocabulary ownership

Geography owns ten terms taught directly by this hub: geography, location, spatial distribution, spatial pattern, geographic scale, place, region, flow, geographic information system, and population pyramid.

The Social Science root receives Geography as a source group through curriculum-derived aggregation. Terms are not hand-copied into the parent.

## Sources and evidence boundary

- The Association of American Geographers provides the discipline-level people, place, environment, relationship, and change framing.
- College Board’s Human Geography course guidance supports the emphasis on map/data interpretation, spatial patterns, and analysis across scales.
- The U.S. Census Bureau provides the age-sex pyramid representation reference and warns through its data work that observed shape can reflect demographic processes and data quality.

Every globe light, route, layer motif, population profile, and evidence map on the page is a teaching schematic, not a measurement from a real location.

## Visual grammar

- **Material:** translucent GIS sheets, deep-ocean glass, cyan graticules, green land traces, amber inhabited points, and selective violet/rose/emerald flows.
- **Dominant silhouette:** one inhabited globe at the right of the world, balanced by a locator register and generous dark map field.
- **Background contract:** deterministic server-rendered SVG/CSS with no canvas, random values, viewport measurements, or animation loop.
- **Macro-layout:** layer deck → demographic instrument → spatial-reasoning ledger → evidence lab → ontology/source band.
- **Quiet zones:** larger vertical corridors expose the globe between dense instruments.

## Important responsive and verification states

- 1600px desktop, narrower desktop/tablet, and mobile reading order;
- all eight long direct-child labels and prompts;
- planned/non-clickable treatment and sidebar omission;
- four-level scale rail;
- all three population presets and exact share readouts;
- all three evidence cases and all response states;
- vocabulary at Geography and Social Science;
- cross-link and external-source semantics;
- reduced motion;
- no canvas, random draw loop, clipping, overlapping labels, or hydration shift.

## One-sentence postmortem target

> This page is better for learning because it preserves a memorable GIS world while teaching the learner to separate what a spatial layer shows from what a geographic explanation must still establish.
