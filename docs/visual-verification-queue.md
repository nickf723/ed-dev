# Visual Verification Queue

Use this queue when code, curriculum, or educational structure changes while a reliable rendered preview is unavailable.

A successful type check is not visual verification. A page leaves this queue only after someone has looked at the rendered page at the relevant viewport sizes and exercised its important states.

### Classroom route map and Unit 1 starters

**Routes:** `/`, `/classroom`, all four `/classroom/[subject]` hubs; the active Algebra I, AP Biology, Global II, and Literature course pages; each active Unit 1 page; all five Algebra I Unit 1 lessons; the first three AP Biology and Global II lessons; and the first two Literature lessons.

Verify:

- the lesson's dark emerald, colorful neoglass identity carries through every navigation layer without overwhelming the reading path
- Math stays red, Science green, Social Studies blue, and English yellow from the Classroom root through each subject header
- Math uses a coordinate axis, Science a specimen grid, Social Studies a timeline, and English a reading shelf without changing the underlying course semantics
- Math, Science, Social Studies, and English all open real subject hubs
- AP Biology opens from Science, Global II from Social Studies, Literature from English, and all remaining planned courses stay visible but cannot be opened
- Algebra I opens from Math, Unit 1 opens from Algebra I, and Units 2–7 remain visibly planned
- each new course opens Unit 1 while its later units remain visibly planned
- Algebra I units use a deliberate red-to-pink sequence palette while preserving their course order and active/planned states
- every Unit 1 page shows its opening lesson first and a coherent planned lesson line after it; AP Biology and Global II expose three live destinations and Literature exposes two
- lesson cards preview real lesson content: algebraic terms, molecular charge, elemental fingerprints, polymer bonds, a 1750 world map, an Ottoman–Mughal comparison, an Edo–Versailles institutional network, highlighted textual evidence, or shifted narrative perspective
- hovering a live route moves only its destination surface; the numbered marker and connecting line stay fixed
- standards codes, teacher notes, pacing, duration, prerequisites, evidence plans, and source panels do not appear in the learner path
- classroom lesson breadcrumbs and previous/next links stay inside `/classroom`
- the Classroom lesson alias omits Vocabulary while the canonical atlas lesson retains it
- the AP Biology lesson opens with two visible drops, clearly changes from separated to joined without clipping, then supports charge prediction, molecular-motion exploration, structure-to-function comparison, and scenario transfer
- Elements of Life opens with four formulas to notice before introducing CHNOPS, then coordinates all six element selectors, exact atom counts, and molecule fingerprints without implying that an element list alone identifies a molecule
- the Elements of Life fingerprint lab handles empty, single-element, no-match, and multiple-match combinations; glucose, palmitic acid, cysteine, and AMP stay chemically exact across the formula, scanner, and filtering views
- the Elements of Life transfer cases distinguish a nucleotide, fatty acid, and amino acid by combining elemental evidence with structural evidence before the three-question practice check
- Building & Breaking Polymers opens with the H/OH reaction pattern, then keeps monomers, bonds, separate chains, free monomers, and water counts coordinated as students build and hydrolyze a linear chain
- changing the polymer bench among three through six monomers resets it cleanly; build and break controls stop at valid boundaries; the n − 1 pattern and partial-hydrolysis transfer remain readable without implying that lipids are true polymers
- the Global II lesson teaches the 1750 baseline and map legend before asking for analysis
- the Global II map renders Natural Earth coastlines plus six colored geographic footprints instead of schematic continents or floating labels
- selecting Ottoman, Mughal, Qing, Tokugawa, Bourbon France, and Asante from either the map or keyboard-operable list preserves the state color and moves the map to a useful regional view
- the map legend distinguishes physical coastline, reconstructed footprint, and approximate near-period edge; the 1715/1783 source-snapshot limitation remains readable without dominating the lesson
- the Global II lesson supports a fixed-lens comparison and a claim backed by evidence from multiple regions after the learner has been oriented
- the Ottoman–Mughal lesson first establishes the court-to-region governing problem, then lets learners predict what a territorial map cannot show before revealing the focused comparison map
- the Ottoman–Mughal map supports both-empires, Ottoman-only, and Mughal-only views from its controls and keyboard-operable list; its two reconstructed footprints fit useful regional bounds without suggesting uniform control
- all four Ottoman–Mughal lenses coordinate the evidence dossiers, similarity, contextual difference, and claim-verdict workshop; switching lenses or resetting a verdict does not leave stale feedback behind
- the Ottoman–Mughal claim workshop distinguishes supported, overgeneralized, and not-shown-by-evidence claims before its three-question practice check, while the 1715 near-period limitation stays visible
- the Tokugawa–Bourbon map supports both-case, Japan-only, and France-only views; its 1715 and 1783 source-snapshot limitation remains explicit and its world-scale comparison does not imply uniform administration
- the Tokugawa–Bourbon fixed lenses coordinate each case's political center, elite control, administrative reach, and limitation; the mechanism → intended effect → limit chain changes cleanly between alternate attendance and court-centered politics
- the Tokugawa–Bourbon claim workshop distinguishes a supported similarity from identical-system, absolute-control, and map-proves-administration overreach
- the Literature lesson supports numbered-line evidence selection, explicit-detail/inference separation, and claim-evidence-reasoning revision using only the original microfiction
- Narrator & Perspective compares original retellings before naming the technique, then coordinates the selected telling with voice, perceiving character, reader-access ledger, interpretive effect, and transfer feedback
- the Mara, Theo, and outside-observer tellings preserve the same core event while directly demonstrating that first person is not the author and third person is not automatically omniscient
- keyboard focus, 200% text zoom, mobile widths, and long course titles do not clip or create horizontal overflow

**Status:** The cross-subject Unit 1 checks previously passed. The AP Biology opening and Global II historical-map pass also passed their model and route checks. The Elements of Life and Ottoman–Mughal checkpoint passed its full verification pass. The Narrator & Perspective, Building & Breaking Polymers, and Tokugawa–Bourbon checkpoint now passes route type generation, TypeScript, focused React/Next lint, deterministic formula/filter/comparison/access/reaction/centralization model tests, all three informational audits, explicit 11px and learner-chrome scans, the 430-page production build, generated seven-stage/lesson-link/learner-chrome HTML assertions, and deferred Leaflet map-chunk assertions. The preferred browser runner is absent, and the available cloud browser is blocked from localhost by workspace policy, so rendered responsive, keyboard, zoom, map-shape, and interaction verification remains pending until a hosted preview is available.

### Expressions & Variables discovery flow

**Routes:** `/classroom/math/algebra-1/unit-1/expressions-variables` and `/formal-science/mathematics/algebra/elementary-algebra/fundamentals/expressions-variables`.

Verify:

- changing x from −3 through 3 produces totals 38, 21, 10, 5, 6, 13, and 26
- contribution bars extend left for negative values and right for positive values, with +5 staying fixed
- the learner predicts before experimenting; feedback stays provisional until at least two distinct x values have been tested
- selecting each signed term reveals its coefficient, variable, and exponent, with the sign included in coefficient −2
- the sorter accepts only matching variable structures and keeps placed terms visible in the correct family bins
- combining coefficients reveals `(3 − 2)x² + (4 − 1)x + 5` and then `x² + 3x + 5`
- the introduce → predict → experiment → conceptualize → organize → practice → conclude arc reads as one lesson rather than a widget stack
- the 1050px lesson frame, shallower panels, compact controls, and larger instructional blurbs improve density without shrinking essential text
- all seven lesson stages remain obvious and usable at desktop, tablet, mobile, keyboard-only, and 200% text zoom
- required lesson, header, toolbar, and navigation text never drops below 11px
- the always-visible five-question Stage 6 assessment and compact conclusion remain part of the main scroll path
- the Classroom alias omits Vocabulary while the canonical atlas lesson retains it

**Status:** Regenerated route types, TypeScript, targeted React/Next lint, all three informational audits, the 416-page production build, the seven-value math model, the lesson-specific 11px scan, five-question source assertions, and generated-HTML checks for all seven stages, always-visible practice, and alias-specific Vocabulary behavior pass. Rendered responsive, keyboard, zoom, and interaction verification remains pending for the hosted preview.

### Variables as Changing Quantities

**Routes:** `/classroom/math/algebra-1/unit-1/variables-changing-quantities` and `/formal-science/mathematics/algebra/elementary-algebra/fundamentals/variables-changing-quantities`.

Verify:

- selecting each hour value from 0 through 6 coordinates the equation, ordered pair, table highlight, and stacked quantity bar
- the prediction remains distinct from the revealed value and reset restores the opening state
- the variable, input, output, rate, and constant distinctions stay readable without turning the lesson into a glossary
- the misconception boundary distinguishes a changing quantity from an unknown in an equation
- all three transfer cases provide deterministic feedback and preserve their own response state
- the seven-stage discovery arc, subject background, semantic navigation, keyboard focus, mobile widths, and 200% text zoom remain clear
- the Classroom alias omits Vocabulary while the canonical atlas lesson retains it

**Status:** TypeScript, focused lint, vocabulary aggregation, classroom model tests, architecture/readability audits, and the 432-page production build pass. Local preview startup is blocked by the workspace network-interface restriction, so rendered responsive, keyboard, zoom, and interaction verification remains pending for the hosted preview.

---

## Verification protocol

For each queued page:

1. Open at a normal desktop width.
2. Open at a narrower desktop/tablet width.
3. Check first-viewport hierarchy and density.
4. Exercise every curated example or preset.
5. Exercise the longest text/equation state.
6. Check selected, wrong-answer, boundary, empty, and completed states where applicable.
7. Confirm no instructional content clips, overlaps, or bleeds.
8. Confirm navigation relationships are visually distinct.
9. Confirm the background participates without competing with reading.
10. Confirm required text meets the readability floor.
11. Check that the learning goal is clearer than the controls.
12. Record any issue here before starting another visual polish pass.

---

## Priority 0: shared systems, Interdisciplines, and Game Repository

These passes repaired the shared curriculum tree, added curriculum-derived Mathematics vocabulary, and established the first playable board-game shelf. Their source, type, and production-build checks are required before push; rendered states remain queued until a trusted browser runner is available.

### Shared curriculum sidebar

Verify:

- the server-rendered tree and first client frame match without a hydration warning
- the active branch opens after hydration without shifting or duplicating nodes
- a manual collapse remains respected on the current route
- selecting a route closes the mobile drawer
- the Humanities → Gaming → Game Repository → Board Games branch is complete and ordered correctly

**Status:** The hydration-only expansion gate was removed, active ancestry now appears in the prerendered route HTML, planned Graph Theory children remain absent from the shell, targeted shell lint and the 403-page production build passed, and route selection still closes the mobile drawer in the click event. A trusted browser pass is still required to confirm console silence, manual collapse, client navigation, and visual stability.

### Curriculum-derived Mathematics vocabulary

**Representative routes:**

- `/formal-science/mathematics/calculus`
- `/formal-science/mathematics/algebra`
- `/formal-science/mathematics/algebra/pre-algebra`

Verify:

- the global drawer still opens on a Mathematics descendant that uses the shared trigger
- Mathematics groups terms by its own scope, Foundations, and Algebra without duplicate filter chips
- Algebra and Pre-Algebra scopes reflect direct-child curriculum groups in registry order
- Axiom, Derivative, Integral, and Group each resolve to one canonical visible entry
- search, safe-mode filtering, group filters, and long definitions remain stable at narrow widths

**Status:** Structural tests and production build passed; rendered verification required

### Interdisciplines relational atlas

**Route:** `/interdisciplines`

Verify:

- the page presents five canonical branches and treats Interdisciplines as a relational view
- matrix hover, focus, click, and crosshair states remain stable without console style warnings
- domain boundaries remain legible at desktop, tablet, and horizontal-scroll widths
- the inspector remains visible while the full matrix is usable
- Game Studies links to its canonical Humanities/Gaming home

**Status:** Verification required

### Game Repository

**Route:** `/humanities/gaming/repository`

Verify:

- Board Game Repository and Magic: The Gathering read as primary child destinations
- specimen cards remain visually subordinate to those repository paths
- the local archive styling stays readable at narrow widths
- `/interdisciplines/game-studies` permanently redirects to `/humanities/gaming/ludology`
- `/interdisciplines/game-studies/library` permanently redirects to this route

**Status:** Verification required

### Board Game Repository

**Route:** `/humanities/gaming/repository/board-games`

Verify:

- text search matches titles, aliases, mechanics, and descriptions
- alignment, connection, and sowing filters produce the expected subsets
- weight and mechanic selects combine with family and search filters
- option counts remain contextual to search and other active filters
- zero-result guidance is readable and reset works
- curated status, review date, and named-reference count are legible without competing with results
- each game card opens the correct record

**Status:** Verification required

### Playable board-game records

**Routes:**

- `/humanities/gaming/repository/board-games/tic-tac-toe`
- `/humanities/gaming/repository/board-games/four-in-a-row`
- `/humanities/gaming/repository/board-games/kalah`

Verify:

- rules, component inventory, and simulator anchors stay legible and distinct
- each record identifies its curated ruleset boundary, review date, and named external reference
- Tic-Tac-Toe detects rows, columns, diagonals, and a draw
- Four in a Row respects gravity, full columns, wins in all four directions, and a draw
- Kalah handles stores, opponent-store skipping, captures, extra turns, sweeping, and final scoring
- every simulator resets cleanly and remains usable at narrow widths

**Status:** Verification required

### Magic: The Gathering repository landing

**Route:** `/humanities/gaming/repository/magic-the-gathering`

Verify:

- Fundamentals and Strategy are clearly different learning paths
- card lookup handles success, no-match, and network-error states
- battlefield cards can be added, tapped, untapped, and removed
- the sandbox scope note is visible and does not imply comprehensive rules adjudication
- the old humanities route permanently redirects here
- the former Interdisciplines board-game, Magic, and Game Studies Lab routes permanently redirect to their canonical Humanities routes

**Status:** Verification required

---

### Visual Arts museum collection

**Route:** `/humanities/visual-arts`

Verify:

- the curated teaching wall identifies itself before any provider search
- a Met search reports sampled records separately from the provider's total match count
- cached and partial provider states remain legible without dominating the artworks
- department, medium, and image-rights facets appear only when at least two values are available
- facet counts remain contextual and clearing filters restores the provider sample
- a valid zero-result search stays distinct from an upstream failure
- a failed or rate-limited request switches to the explicitly labeled curated fallback wall
- rapidly starting a second search cannot allow the first response to overwrite it
- source links, retrieval time, record metadata, images, and detail drawers remain usable at narrow widths

**Status:** Targeted React/Next lint, TypeScript, deterministic hue/evidence fixtures, Met adapter fixtures, all collection regressions, vocabulary aggregation, architecture/readability/remaster audits, prior-model regressions, the 404-page production build, generated-HTML branch/source/model checks, and an in-process HTTP smoke passed; rendered verification required

---

### Recorded Music collection

**Route:** `/humanities/music/recordings`

Verify:

- the curated listening shelf identifies itself before any provider search
- artist and album searches both return relevant MusicBrainz release groups
- a provider search reports sampled records separately from the provider-wide match count
- MusicBrainz and Cover Art Archive provenance links remain legible without dominating the shelf
- release-type and decade facets appear only when at least two values are available, combine correctly, and reset cleanly
- a valid zero-result search remains distinct from a provider failure or 503 rate limit
- a failed or rate-limited request switches to the explicitly labeled curated fallback shelf
- rapidly starting or clearing searches cannot allow an older response to replace the latest state
- shelf and mosaic layouts remain stable after the readability increase
- missing cover art falls back to the existing record surface without hiding the title or creator
- the shared detail drawer exposes readable facts, sources, dialog semantics, Escape dismissal, overlay dismissal, and its close button at desktop and narrow widths

**Status:** Structural tests passed; rendered verification required

---

### Psychology observation laboratory

**Route:** `/social-science/psychology`

Verify:

- six direct planned branches appear before the cognition laboratory and remain non-clickable
- registry breadcrumbs and sidebar ancestry identify Social Science → Psychology without a hydration shift
- the static observation-room background remains visible without competing with required text
- perception controls keep signal, noise, expectation, and organized-signal cues coordinated
- attention trials reset cleanly, target selection works, and reaction time remains absent until a trial is completed
- working-memory controls and directional readouts remain explicitly conceptual rather than diagnostic
- all four evidence files provide deterministic correct/wrong feedback and the score means remain 8, 5, and a difference of 3
- research-ethics and clinical-practice boundaries remain legible at desktop, tablet, and mobile widths

**Status:** Targeted React/Next lint, TypeScript, deterministic model tests, vocabulary aggregation, all three informational audits, the 404-page production build, and generated-HTML branch/source/model checks passed; rendered verification required

---

### Earth Science field transect

**Route:** `/natural-science/earth-science`

Verify:

- the five direct branch bands appear before the system lesson and preserve registry order
- Mineralogy reads as a nested active child inside Geology rather than a sixth root peer
- the existing Geology, Mineralogy, Hydrology, Meteorology, and Physical Geography routes remain reachable, while planned Climatology remains inert
- Human Geography reads as a cross-link rather than direct Earth Science descent
- the ridge-to-coast background exposes atmosphere, rain, snow, terrain, stream, groundwater, ocean, strata, and stations without overwhelming the foreground
- all flux sliders remain co-visible with the equation and storage response at desktop and narrow widths
- the 120 / 45 / 55 fixture produces +20 mm, zero and negative cases remain legible, and reset restores the canonical fixture
- all four field files provide deterministic correct/wrong feedback and preserve system, spatial, and temporal boundaries
- source links and the invented-fixture boundary remain readable without looking like live provider data

**Status:** Targeted React/Next lint, TypeScript, deterministic model tests, vocabulary aggregation, all three informational audits, the 404-page production build, and generated-HTML hierarchy/model/source/background checks passed; rendered verification required

---

### Information Science record desk and classification atelier

**Routes:** `/formal-science/information-science` and `/formal-science/information-science/taxonomy-ontology`

Verify:

- the root record inspector appears before the lesson and reflects exactly seven direct branches
- Metadata is structurally and visually nested under Encoding & Representation, while Knowledge Graphs is structurally and visually nested under Taxonomy & Ontology
- Taxonomy & Ontology is linked and every planned route remains inert
- the root source marks, representation gate, records, and query path and the child broader/narrower and typed-graph scenery remain legible without canvas, randomness, viewport measurement, animation loops, or hydration shift
- empirical entropy remains correct for empty, binary, Unicode, and `BANANA_BANDANA` samples
- all retrieval presets, distances, top-three connectors, and ranking boundaries stay coordinated
- the Library of Congress protocol keeps query, field selection, pagination, rate limit, provenance, item rights, live JSON, and official documentation boundaries visible without a render-time fetch
- all four root evidence files provide deterministic correct/wrong feedback across switch and reset states
- the child begins with its direct Knowledge Graphs specialization and keeps that planned route inert
- the same fictional game remains coordinated across five taxonomy nodes, five graph triples, and the mode toggle
- polyhierarchy, mapping, governance, RDF, SKOS, and OWL boundaries remain legible without presenting a taxonomy as inevitable or an ontology as a decorative AI web
- all four child challenges provide deterministic correct/wrong feedback across switch and reset states
- fifty-eight vocabulary terms retain narrow ownership and aggregate through Taxonomy & Ontology, Information Science, and Formal Science
- keyboard focus, zoomed text, responsive flow, and long-label behavior produce no clipping or overlap

**Status:** Targeted React/Next lint, TypeScript, deterministic root/child model tests, vocabulary aggregation, all three informational audits, the 404-page production build, and generated-HTML hierarchy/model/source/background checks passed; rendered verification required

---

### History source workshop

**Route:** `/humanities/history`

Verify:

- Time, Place, and Theme appear first, in registry order, and retain their existing active routes
- the recipe background and printing-press case stay visually stable with motion disabled
- the source workshop clearly separates observation, contextualization, and corroboration
- the canonical 44 BCE → 14 CE fixture reports 57 years and never inserts a year zero
- the two same-era presets report 177 and 336 years, editable controls remain usable, and reset restores the canonical interval
- all four evidence files provide deterministic correct/wrong feedback and preserve source, causation, and periodization boundaries
- History, Time, Place, and Theme vocabulary groups inherit into Humanities without duplicate term IDs
- Library of Congress, National Archives, Chronicling America, and Smithsonian links expose collection and method boundaries without implying live repository coverage
- typography, amber surfaces, and background breathing room remain legible at desktop, tablet, and narrow widths

**Status:** Targeted React/Next lint, TypeScript, deterministic history-model tests, vocabulary aggregation, all three informational audits, the 404-page production build, and generated-HTML lens/model/source/metadata checks passed; rendered responsive and interaction verification required

---

### Agriculture whole-farm transect

**Route:** `/applied-science/agriculture`

Verify:

- all nine planned direct branches appear first, remain inert, preserve registry order, and do not become children of the two visual banks
- the static isometric world keeps grain, cover crop, orchard, pasture, residue, protected culture, pond, building, lane, hedgerows, irrigation, soil profile, and roots legible without canvas or hydration shift
- the canonical grain-legume scenario begins at 24 external units, 35% loss pressure, and 75% residue retention
- the canonical ledger preserves 69 starting units, 9.4875 modeled loss, 59.5125 soil uptake before fixation, 2.4875 fixation, 39.68 harvest export, 16.74 retained residue, and zero shortfall
- cereal and cover-crop presets, all three sliders, conditional fixation/shortfall surfaces, and reset remain coordinated at narrow and wide widths
- all four field files provide deterministic correct/wrong feedback across reset and case switching
- Agriculture and all nine branch vocabulary groups inherit into Applied Science without duplicate IDs
- NASS, Web Soil Survey, Soil Data Access, and ERS links preserve provider, key, query, geography, method, update, unit, and revision boundaries

**Status:** Targeted React/Next lint, TypeScript, deterministic agriculture-model tests, vocabulary aggregation, all three informational audits, the 404-page production build, and generated-HTML branch/model/source/metadata/background checks passed; rendered responsive and interaction verification required

---

### Sociology social-scale field

**Route:** `/social-science/sociology`

Verify:

- seven planned direct branches remain inert and preserve registry order inside analytical—not curricular—micro, meso, macro, and cross-cutting bands
- the fixed social field clearly separates encounters, networks/organizations, and institutions without random nodes, canvas, or hydration shift
- seed 64 begins with 54 vacancies, 182 group-A agents, 164 group-B agents, 81 dissatisfied agents, 77% satisfied, and 48% mean local similarity at 30%
- one seeded step preserves every population count while producing 32 dissatisfied, 91% satisfied, and 62% mean local similarity
- run, pause, step, threshold, seeded reset, and settled states remain coordinated
- all four evidence cases and all 29 vocabulary terms preserve their tested ownership and feedback
- Census and BLS links keep dataset, universe, variable, denominator, unit, geography, period, series, release, revision, suppression, and key boundaries visible

**Status:** Targeted React/Next lint, TypeScript, deterministic sociology-model tests, vocabulary aggregation, all three informational audits, the 404-page production build, and generated-HTML branch/non-link/seed/source/metadata/no-random-canvas checks passed; rendered responsive and interaction verification required

---

### Physics measurement field

**Route:** `/natural-science/physics`

Verify:

- all eight direct active branches preserve registry order and destination parity inside two analytical—not curricular—banks
- the fixed trajectory, velocity vector, field response, wave trace, grid, and ruler form a readable measurement world without animated glow or first-render shift
- all eight regime scenarios select the correct primary route and every companion link resolves from server-provided registry context
- initial positions −4 m and +8 m across 3 s produce +12 m displacement, 12 m distance, +4 m/s average velocity, and 4 m/s average speed
- reversed, coincident, and endpoint-overlap states keep marker labels and signed/nonnegative outputs coordinated
- the four exact defining constants remain legible at narrow widths and do not imply exactness for all CODATA values
- all four evidence cases and all 35 vocabulary terms preserve tested ownership and feedback
- NIST constants and ASD links keep exact/measured status, unit, uncertainty, version, species, ionization, wavelength convention, observed/derived status, and bibliography boundaries visible

**Status:** Targeted React/Next lint, TypeScript, deterministic physics-model and vocabulary aggregation tests, all three informational audits, the 404-page production build, and generated-HTML branch/initial-math/constant/source/assessment/metadata/no-instability checks passed; rendered responsive and interaction verification required

---

### Philosophy dialectic field and argument review

**Route:** `/humanities/philosophy`

Verify:

- all seven direct branches preserve registry order; Metaphysics, Ethics, and Aesthetics are live, while Epistemology, Philosophy of Mind, Political Philosophy, and Philosophy of Science remain inert
- the question matrix is the first major object after the header and reads as overlapping emphases rather than a rigid coordinate taxonomy
- the fixed dialogue threads and junctions establish a recognizable philosophical world without motion, random values, viewport measurement, or a first-render shift
- the canonical six-node argument keeps question, claim, two reasons, objection, and reply readable and correctly nested at desktop, tablet, and mobile widths
- selecting each node updates the inspector without changing the argument map's outer geometry or hiding required copy
- Logic reads as a cross-disciplinary route rather than a Philosophy child
- all four evidence cases preserve correct and incorrect feedback across case switching and reset
- all 28 vocabulary terms retain tested ownership and aggregate through Philosophy into Humanities without duplicate IDs
- Stanford Encyclopedia current and archive links keep changing-reference and fixed-citation roles distinct; Crossref remains bibliographic metadata rather than full text or philosophical authority

**Status:** Deterministic model and vocabulary aggregation tests, TypeScript, targeted React/Next lint, all three informational audits, the 404-page production build, and generated-HTML hierarchy/active-link/planned-non-link/model/assessment/source/metadata/background-stability checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is unavailable, so rendered console, responsive, and interaction verification remains pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this entry is committed.

---

### Education learning-evidence wall and alignment conference

**Route:** `/applied-science/education`

Verify:

- all nine direct branches preserve registry order and remain visibly planned, inert, and distributed exactly once across the three conceptual folios
- the overlapping desktop sheets remain legible without clipping at wide and narrower desktop sizes; the mobile folios flatten cleanly and retain complete descriptions
- the folio sheets read as overlapping work areas rather than curriculum parents, sequence, or learner stages
- the static learning-evidence wall establishes attempt → feedback → revision → transfer and changing concept connections without animation, random values, viewport reads, or first-render movement
- all goal, activity, and evidence combinations update the direct / partial / weak labels and next-design question consistently; the default explanation combination begins directly aligned
- all four evidence cases preserve correct and incorrect feedback across case switching and reset
- the loop remains framed as a reusable lens rather than a universal stage theory
- all 28 vocabulary terms retain tested narrow ownership and aggregate through Education into Applied Science without duplicate IDs
- WWC, NCES CCD, CAST UDL, and IDEA links preserve research-review, descriptive-data, design-reference, legal-source, and no-render-fetch boundaries
- keyboard focus, 200% zoom, reduced motion, and required text remain usable across the folio, alignment controls, assessment, and source shelf

**Status:** Deterministic education-model and vocabulary aggregation tests, TypeScript, targeted React/Next lint, all three informational audits, the 413-route production build, and generated-HTML hierarchy/planned-non-link/default-model/assessment/source/metadata/background-stability checks passed. The production server cannot start reliably in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is unavailable, so rendered console, responsive, and interaction verification remains pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this entry is committed.

---

## Priority 0: constitution-built Algebra lessons

These lessons were built or substantially rebuilt without a trusted rendered preview. Their instructional structure is intentional; visual claims remain provisional until inspected.

### Algebraic Inequalities

#### One-Variable Inequalities

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/inequalities/one-variable`

Verify:

- solve → region → test reads as one sequence rather than three separate widgets
- positive-divisor, negative-divisor, and inclusive-boundary cases all remain stable
- the negative-reflection explanation makes the order reversal intuitive without overpowering the main lesson
- correct operations advance cleanly and legal-but-unhelpful feedback remains readable
- open/closed endpoints and interval notation remain synchronized
- probe markers do not collide with number-line labels

**Status:** Verification required

#### Compound Inequalities

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/inequalities/compound`

Verify:

- AND visually reads as intersection and OR as union before the terminology becomes abstract
- separate input regions and the combined region are easy to distinguish
- bounded intersection, split union, and empty intersection all render correctly
- the empty-intersection case shows no misleading solution endpoints
- chained notation `−2 < x ≤ 5` remains clearly connected to the overlap model
- point probes stay synchronized with the combined region

**Status:** Verification required

#### Systems of Inequalities

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems`

Verify:

- the builder shows the boundary without pre-revealing the correct shaded side
- solid/dashed boundary conventions are visually obvious
- above/below choices correspond correctly to the inequality symbols
- wedge, horizontal-band, and empty-overlap cases all render geometrically correctly
- final feasible-region shading is visibly the intersection, not merely two transparent overlays
- point testing reports each individual constraint and the final verdict accurately
- no SVG polygon clips or label collisions occur at narrower widths

**Status:** Verification required

---

### Graphing Linear Equations

#### Slope & Rate of Change

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/linear-equations/slope-rate`

Verify:

- table → change ratio → graph reads as one coherent lesson
- all same-line point-pair presets produce the same slope
- reversing point order reverses both deltas while preserving slope
- rise/run labels do not collide with point labels
- positive, negative, zero, and undefined slope cases stay subordinate to the constant-rate model

**Status:** Verification required

#### Slope-Intercept Form

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/linear-equations/slope-intercept`

Verify:

- b-as-anchor and m-as-rate are obvious before the parameter lab
- changing b keeps m fixed and visually creates parallel translation
- changing m keeps b fixed and visually pivots through the same y-intercept
- equation, graph, sample values, and highlighted intercept stay synchronized
- horizontal/vertical boundary notes remain subordinate to the main model

**Status:** Verification required

#### Graphing a Line

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/linear-equations/graphing-line`

Verify:

- plot b → use m → extend reads as a clear construction sequence
- positive, negative, and fractional slope cases keep required points visible
- candidate points stay synchronized with the graph
- the line does not appear early enough to give away the construction task
- point verification remains subordinate to graph construction

**Status:** Verification required

#### Line Forms & Special Cases

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/linear-equations/forms-special-cases`

Verify:

- slope-intercept, point-slope, and standard forms read as lenses on one solution set
- rewrite-workbench states fit without layout jumps
- horizontal and vertical cases remain clear but subordinate
- vertical-line treatment never implies a finite slope

**Status:** Verification required

---

### Systems of Equations

#### Intersections & Solution Types

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/solution-types`

Verify:

- the worked intersection makes “satisfies A AND B” visually obvious
- one / none / infinite classifications remain subordinate to the shared-solution definition
- coincident-line rendering communicates infinitely many shared points
- point stress-test feedback stays correct after switching presets

**Status:** Verification required

#### Solving by Graphing

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/graphing`

Verify:

- graph → choose intersection → verify both equations reads as one method
- all curated candidate points remain visible and distinguishable
- selected/correct point states remain synchronized with the graph
- approximate-intersection limitations read as a method boundary, not a second lesson

**Status:** Verification required

#### Substitution

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/substitution`

Verify:

- equality → replacement → one-variable equation is visually obvious
- y-isolated and x-isolated cases both fit cleanly
- invalid replacement feedback remains readable without covering adjacent content
- solve and back-substitution states stay stable
- the ordered-pair conclusion remains subordinate to the replacement idea

**Status:** Verification required

#### Elimination

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/elimination`

Verify:

- aligned equations and cancellation read clearly
- direct-cancellation and scale-then-cancel cases remain distinct
- prepared/scaled equations are obvious before combination
- legal-but-unhelpful versus invalid feedback is clear
- whole-equation operations fit at narrower widths
- final back-substitution remains subordinate to cancellation

**Status:** Verification required

---

## Priority 1: existing Algebra regression / cleanup verification

### Expressions & Variables

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/fundamentals/expressions-variables`

Verify:

- the symbolic hierarchy reads clearly before the sorter
- all sorter states fit naturally
- negative signs remain visibly attached to their terms
- the inspector/workbench does not change outer geometry unexpectedly

**Status:** Quick regression check

### Pre-Algebra hub

**Route:** `/formal-science/mathematics/algebra/pre-algebra`

Verify:

- the eight-topic learning path remains the center of gravity
- throughline/reference material earns its space without becoming dashboard chrome
- cards remain balanced despite differing descriptions
- the background still suits the calmer structure

**Status:** Verification required

### Solving for X

**Route:** `/formal-science/mathematics/algebra/pre-algebra/equations`

Verify:

- equality/invariance explanation balances the Equation Lab
- reverse-order explanation fits without crowding
- substitution verification reads naturally
- continuation into Integrated Algebra looks like navigation, not a mastery badge

**Status:** Verification required

### Pre-Algebra child sweep

Routes:

- `/formal-science/mathematics/algebra/pre-algebra/integers`
- `/formal-science/mathematics/algebra/pre-algebra/pemdas`
- `/formal-science/mathematics/algebra/pre-algebra/properties`
- `/formal-science/mathematics/algebra/pre-algebra/ratios`
- `/formal-science/mathematics/algebra/pre-algebra/fractions`
- `/formal-science/mathematics/algebra/pre-algebra/exponents`
- `/formal-science/mathematics/algebra/pre-algebra/expressions`

Verify the preserved primary instrument, revised canonical terminology, new continuation footer, longest copy state, and narrower desktop layout on each route. For **Powers & Exponents**, also decide whether power anatomy + exponential growth + scientific notation should remain one lesson or be split.

**Status:** Verification required; Powers & Exponents also needs scope review

---

## Priority 2: legacy Algebra scope audits

### Quadratic Equations

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations`

Before visually remastering, decide whether Quadratics is one lesson or a unit containing roots, graph/vertex, forms, completing the square, and quadratic formula.

**Status:** Legacy scope audit required

---

## First session when trusted previews are available

Recommended order:

1. One-Variable Inequalities
2. Compound Inequalities
3. Systems of Inequalities
4. Slope & Rate of Change
5. Slope-Intercept Form
6. Graphing a Line
7. Line Forms & Special Cases
8. Systems of Equations lessons in order
9. Expressions & Variables regression
10. Pre-Algebra hub / children

Do not tune several pages at once. Inspect one atomic lesson, diagnose against the constitution, fix the actual layer, then continue.

---

## Queue maintenance rule

Whenever a page changes without reliable visual verification:

- add it here in the same development pass
- state the exact states that need checking
- do not silently declare it visually finished
- remove or mark an entry verified only after rendered inspection

### Zoology living atlas

**Route:** `/natural-science/biology/zoology`

**Check:** Desktop and mobile layouts; habitat/lineage/ecology lens changes; collection loading; partial live-enrichment notice; global search with provider-wide count; class filter and all sort modes; empty, curated fallback, rate-limited, failed, and image-missing states; animal detail modal and keyboard focus.

**Status:** Structural validation required in this pass; rendered verification pending.

### Chemistry periodic-table collection

**Route:** `/natural-science/chemistry`

**Check:** Desktop and narrow horizontal-table layouts; complete 118-element state; reviewed partial fallback state; provider error notice; name/symbol/atomic-number search; period, family, and standard-state filters alone and combined; contextual counts; empty/reset state; element selection and expanded inspector; keyboard traversal across visible table cells.

**Status:** Structural validation required in this pass; rendered verification pending.

### Planetary Astronomy observatory

**Route:** /natural-science/astronomy/planetary-astronomy

**Check:** Desktop and mobile lesson flow; sticky header and four-step orientation; simulator launch, long-lived orbit, impact, escape, slider-disabled, and reset states; canvas scaling and model-limit copy; archive default and search results; method, decade, and radius-band filters alone and combined; honest provider-wide versus loaded counts; selected-world detail and external source link; missing-parameter labels; loading, empty, partial, curated fallback, rate-limited, and failed states; both assessment answers, feedback, and generated-case reset; keyboard navigation; reduced-motion behavior.

**Status:** Structural validation required in this pass; rendered verification pending.

### Number Theory integer atlas

**Route:** `/formal-science/mathematics/number-theory`

**Check:** Desktop, narrower desktop, and mobile composition; sticky header clearance; the 360 specimen and four-lens branch ledger; planned versus live branch treatment; Diophantine navigation; integer-causeway visibility, prime-landmark glow, reduced-motion state, and text protection; scenery corridors between the header, atlas, factorization workbench, and cross-links; factorization presets 60, 97, 2026, and 65,536; prime, composite, invalid, lower-bound, and upper-bound inputs; prime powers, repeated-factor count, and positive-divisor count; cross-link semantics; vocabulary drawer scope and inherited Mathematics grouping; keyboard and zoomed-text behavior.

**Status:** Structural validation required in this pass; rendered verification pending.

### Diophantine deterministic background regression

**Route:** `/formal-science/mathematics/number-theory/diophantine`

**Check:** Confirm the deterministic integer lattice hydrates without a server/client mismatch, the local CSS grid replaces the remote background asset, and existing explanation and solver states remain visually unchanged apart from the repaired background notation.

**Status:** Targeted regression verification pending.

### Discrete Mathematics finite-structure hub

**Route:** `/formal-science/mathematics/discrete`

**Check:** Desktop, narrower desktop, and mobile composition; sticky header clearance; first-viewport dominance of the four direct-child lenses; registry-derived Set Theory, Graph Theory, Combinatorics, and Recursion & Recurrence routes; shared six-object specimen; drafting-table background visibility and slow inspection-light behavior; reduced-motion state; scenery corridor before the graph workshop; triangle, path, and star presets; custom vertex placement by pointer and keyboard; edge linking by pointer and keyboard; duplicate-edge prevention; degree, maximum-degree, connectivity, and handshake readouts; empty/reset states; long curriculum descriptions without clipping; conceptual cross-link semantics; vocabulary drawer grouping at the parent and all four children; focus visibility and zoomed-text behavior.

**Status:** TypeScript, full lint, vocabulary aggregation, architecture/readability audits, collection regressions, and production build passed; rendered verification pending.

### Set Theory membership conservatory

**Route:** `/formal-science/mathematics/discrete/set-theory`

**Check:** Desktop, narrower desktop, and mobile unit-navigation → Explain → Do → Check flow; sticky header clearance; first-viewport six-stop learning path; all six direct lessons visibly planned and non-clickable; Infinity, Paradoxes & Foundations visibly deferred; sidebar omission of planned child routes; color × shape property matrix and background using the exact same six specimens, rules, memberships, and four addresses; matrix horizontal-scroll fallback; classification-conservatory background visibility, slow inspection-light motion, and reduced-motion state; scenery corridors before the worked model, rule table, scanner, boundary cases, and assessment; operation-rule rosters matching the physical-specimen example; Numbers, Library, and Disjoint scanner presets clearly reading as later cases; Union, Intersection, and Difference highlight geometry; numeric member circles and long-label thematic capsules preserving region identity in selected and unselected states; empty intersection, singleton result, long library labels, and result rosters without clipping; element-versus-subset notation; transfer-check correct and incorrect feedback; deterministic generated practice across union, intersection, and difference, including empty and full-looking distractors; registry-derived parent/next navigation; Set Theory vocabulary in the inherited drawer; keyboard focus, zoomed text, and narrow-width control/result co-visibility.

**Status:** Targeted React/Next lint, TypeScript, vocabulary aggregation, architecture/readability audits, collection regressions, and the 403-page production build passed. Full-repository lint remains blocked by the pre-existing legacy baseline. The browser runner is unavailable in this workspace, so rendered verification remains pending.

### Graph Theory network drafting room

**Route:** `/formal-science/mathematics/discrete/graph-theory`

**Check:** Desktop, narrower desktop, and mobile unit-navigation → model → explain → do → boundary → check flow; sticky header clearance; the six-stop planned learning route with no clickable placeholder destinations; omission of planned child routes from the sidebar; active sidebar ancestry present in the server frame without a post-hydration tree shift; exact seven-vertex, ten-edge parity across the background, worked campus graph, degree ledger, and traversal default; network-drafting background visibility and reduced-motion state; scenery corridors before the canonical graph, language ledger, traversal, boundaries, and assessment; degree labels and the `Σ deg(v) = 2|E|` calculation; BFS queue and DFS stack orders from several start/goal combinations; play, pause, replay, previous, next, scrubber, and all three pace states; start-equals-goal and late-goal cases; frontier, visited, current, and discovered-route mark identity; BFS shortest-edge claim versus DFS reachability wording; edge-crossing boundary diagram; walk/trail/path distinction; transfer-check correct and incorrect feedback; deterministic degree and handshake practice across five- and six-vertex cases; graph vocabulary in the inherited drawer; parent graph-builder and Algorithms cross-link semantics; keyboard focus, zoomed text, and narrow-width control/result co-visibility.

**Status:** Targeted React/Next lint, TypeScript, vocabulary aggregation, architecture/readability audits, collection regressions, deterministic-practice generation, the 403-page production build, generated-HTML ancestry/placeholder checks, and a production HTTP smoke test passed. Full-repository lint remains blocked by the pre-existing 1,636-finding legacy baseline. The browser runner is unavailable in this workspace, so rendered verification remains pending.

### Mineralogy specimen cabinet

**Route:** `/natural-science/earth-science/mineralogy`

**Check:** Desktop, narrower desktop, and mobile composition; sticky header clearance; parent-derived Earth Science ancestry and `reference` page classification; deterministic crystal-cluster and lattice background visibility; reduced-motion state; structure → property orientation; scenery corridors before the cabinet and category boundary; all 14 curated records; text search for `FeS2` and `gem`; chemical-class, Mohs-band, luster, crystal-system, and gem-relationship facets alone and combined; contextual counts; empty/reset state; record selection and hash address; selected specimen and comparison target never matching; Quartz versus Calcite default; all five diagnostic rows; horizontal comparison-table fallback; record source links; mineral / rock / gem boundary copy; vocabulary drawer inheritance at Mineralogy, Earth Science, and Natural Science; keyboard focus, internal-scroll behavior, zoomed text, and no content clipping.

**Status:** Targeted React/Next lint, TypeScript, collection-query fixtures, vocabulary aggregation, architecture/readability audits, collection regressions, the 403-page production build, and generated-HTML ancestry/content checks passed. The browser runner is unavailable in this workspace, so rendered verification remains pending.

### Combinatorics counting chamber

**Route:** `/formal-science/mathematics/discrete/combinatorics`

**Check:** Desktop, narrower desktop, and mobile unit-navigation → model → explain → do → boundary → check flow; sticky header clearance; the two-leaf six-lesson counting ledger; all six direct lessons visibly planned and non-clickable; omission of planned child routes from the sidebar; active sidebar ancestry present in the server frame without a post-hydration tree shift; exact four-token parity across the deterministic background, canonical decision register, and default chamber; all 12 ordered sequences and six unordered selections; slow counter-rotating ring behavior and reduced-motion state; scenery corridors before the canonical model, counting rules, chamber, boundaries, assessment, and continuation; numbered-slot versus one-collection modes; `n` from 3 through 7 and `k` from 1 through 4 within bounds; exact permutation and combination counts; representative-outcome cap and remainder message; native color/shape token identity; mode, range, and reset controls; formula overflow at narrow widths; distinct-object/no-repetition/fixed-size boundary copy; transfer-check correct and incorrect feedback; deterministic generated practice across ordered and unordered cases; advanced-horizon treatment; combinatorics vocabulary inheritance at the child, Discrete Mathematics, Mathematics, and Formal Science scopes; keyboard focus, zoomed text, and no clipping or unstable geometry.

**Status:** Targeted React/Next lint, TypeScript, deterministic counting fixtures, vocabulary aggregation, architecture/readability audits, collection regressions, the 403-page production build, and generated-HTML metadata/content/ancestry/planned-route checks passed. Remote publication and the deployment guard are recorded in the commit handoff because they occur after this verification entry is committed. The trusted browser runner is unavailable in this workspace, so rendered verification remains pending.

### Literature reading room and Narrative & Fiction editing table

**Routes:** `/humanities/literature` and `/humanities/literature/narrative-fiction`

**Check:** Desktop, narrower desktop, and mobile composition; sticky header clearance; the Literature contents spread with Narrative & Fiction as the only live direct child and the other seven branches visibly planned; active sidebar ancestry without a post-hydration tree shift; removal of the root's duplicate local lexicon in favor of the inherited drawer; Literature drawer grouping for the root and Narrative & Fiction; first-viewport dominance of the six direct narrative lessons; all six lessons planned, non-clickable, and omitted from the live sidebar; exact A/B/C/D identity and A → B → C → D versus C → A → D → B parity across the background, header, canonical register, and disclosure editor; slow reading-head sweep and reduced-motion position; scenery corridors before the canonical model, editor, boundary, and continuation; story/plot toggle; all four reveal steps in both orders; co-visible reader-knowledge ledger; reset state; all three transfer answers and feedback; narrator-versus-author boundary; horizontal event-track fallback; keyboard focus, zoomed text, and no clipping or unstable geometry.

**Status:** Targeted React/Next lint, TypeScript, deterministic narrative fixtures, vocabulary aggregation, architecture/readability audits, collection regressions, the 404-page production build, and generated-HTML metadata/content/ancestry/vocabulary/active-child/planned-route checks passed. A production HTTP smoke server could not start because this workspace denies `uv_interface_addresses`, and the trusted browser runner remains unavailable, so rendered verification is pending.

### Recursion & Recurrence recursive stair

**Route:** `/formal-science/mathematics/discrete/recursion-theory`

**Check:** Desktop, narrower desktop, and mobile unit-navigation → orient → explain → formalize → do → boundary → check flow; sticky header clearance; learner-facing Recursion & Recurrence name on the stable legacy route; two-branch six-lesson learning ladder with every child visibly planned, non-clickable, and omitted from the live sidebar; active ancestry present in the server frame without a post-hydration tree shift; exact three-disk/seven-move parity across the header readout, recursive-stair world, opening peg model, move register, call/return spine, recurrence ledger, and default workbench; stable cyan/violet/rose disk identity; slow world pulse and reduced-motion state; scenery corridors before the canonical model, call trace, recurrence, workbench, boundaries, assessment, and continuation; guided trace previous/next/play/pause/scrub/reset states; disk counts two through five; manual source/destination selection; empty-source, same-peg, and larger-on-smaller feedback; minimum and nonminimum completion messages; T(1), T(n), and `2^n - 1` notation; linear move-count ledger and exact values; termination, iteration, and computability terminology boundaries; list-length transfer correct and incorrect feedback; deterministic Hanoi practice for two through eight disks; six recursion vocabulary terms inherited by Discrete Mathematics, Mathematics, and Formal Science; keyboard focus, zoomed text, formula overflow, control/consequence co-visibility, and no clipping or unstable geometry.

**Status:** Targeted React/Next lint, TypeScript, deterministic Hanoi/practice fixtures, vocabulary aggregation, architecture/readability/remaster audits, collection regressions, Combinatorics and Narrative model regressions, the 404-page production build, and generated-HTML metadata/content/ancestry/planned-route checks passed. Remote publication and the deployment guard are recorded in the commit handoff because they occur after this verification entry is committed. The trusted browser runner is unavailable in this workspace, so rendered verification remains pending.

### Anatomy & Physiology human study plate

**Route:** `/applied-science/medicine/anatomy-physiology`

**Check:** Desktop, narrower desktop, and mobile course-atlas → six-level model → regional scanner → evidence-check flow; sticky header clearance; registry-derived Applied Science and Medicine ancestry; all thirteen direct children present exactly once; Skeletal System active and the other twelve destinations visibly planned, non-clickable, and omitted from the live sidebar; six functional study families reading as grouping rather than false ancestry; six-level chemical → cellular → tissue → organ → organ system → organism parity across the deterministic ring field and scale ledger; human-study background silhouette, system traces, slow scan behavior, scenery corridors, protected text lanes, and reduced-motion state; all four regional scanner selections with co-visible systems, structures, and boundary copy; all three evidence cases in unanswered, correct, incorrect, changed-answer, switched-case, and reset states; stable long descriptions and labels; OpenStax source links and comparative-anatomy cross-link semantics; Medicine, Anatomy & Physiology, Skeletal System, and Applied Science vocabulary scope grouping; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic anatomy/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, all collection regressions, prior Recursion/Combinatorics/Narrative model regressions, the 404-page production build, and generated-HTML metadata/ancestry/direct-child/placeholder-link/source/background/vocabulary checks passed. The dev server cannot start in this workspace because Node reports `uv_interface_addresses`, so the browser-verification skill cannot attach and rendered verification remains pending.

### Skeletal System radiograph regression

**Route:** `/applied-science/medicine/anatomy-physiology/skeletal`

**Check:** Registry-derived four-level breadcrumbs and parent return; deterministic axial-amber versus appendicular-cyan radiograph background; scan-band motion and reduced-motion state; preservation of the axial/appendicular comparison, five-function ledger, living-bone tissue distinctions, joint selector, remodeling boundary, and common pitfall; hinge, ball-and-socket, pivot, and plane joint states; longest joint copy; Skeletal System vocabulary scope; keyboard focus; narrower desktop and mobile geometry; no random floating bones, animation-loop leak, clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, the 404-page production build, and generated-HTML ancestry/background/no-canvas/vocabulary checks passed. The dev server cannot start in this workspace because Node reports `uv_interface_addresses`, so the browser-verification skill cannot attach and rendered regression verification remains pending.

### Geography GIS light table and evidence lab

**Route:** `/social-science/geography`

**Check:** Desktop, narrower desktop, and mobile layer-deck → demographic-instrument → reasoning-ledger → evidence-lab → cross-link/source flow; sticky header clearance; registry-derived Social Science ancestry; all eight direct children present exactly once, visibly planned, non-clickable, and omitted from the live sidebar; four-level site/local/regional/global scale rail; long branch prompts at readable sizes; deterministic inhabited-globe SVG with land, graticules, illustrative cities, conceptual flows, night band, route motion, reduced-motion state, scenery corridors, and no canvas or post-hydration draw; expansive, column-like, and constrictive population presets with exact bars, 41/49/10 default shares, descriptions, interpretations, symmetric-teaching-data boundary, and focus state; counts, scale, and mechanism evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; denominator, aggregation, and association-versus-cause explanations; Geography and Social Science vocabulary scope grouping; Physical Geography cross-link and all three external source links; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic Geography/population/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, all collection regressions, Anatomy/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, and generated-HTML metadata/ancestry/direct-child/placeholder-link/model/source/background/no-canvas/vocabulary checks passed. The dev server cannot start in this workspace because Node reports `uv_interface_addresses`, so the browser-verification skill cannot attach and rendered verification remains pending.

### Botany living field station

**Route:** `/natural-science/biology/botany`

**Check:** Desktop, narrower desktop, and mobile six-branch atlas → stomatal model → whole-plant flow → scale ladder/boundary ledger → evidence-lab → collection/source flow; sticky header clearance; registry-derived Natural Science and Biology ancestry; all six direct children present exactly once, visibly planned, non-clickable, and omitted from the live sidebar; deterministic venation/transport background with scenery corridors and reduced-motion state; aperture values from 0 through 100; humid and dry presets at fixed aperture; exact 50% outputs of 54% CO₂ capacity, 23% humid water-vapor flux, and 50% dry water-vapor flux; normalized-indicator boundary; four transport cards and six scale cells; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; exact 0/4 through 4/4 progress; source–sink and lineage explanations; Botany, Biology, and Natural Science vocabulary grouping; herbarium database and all source links; explicit Animalia-adapter collection boundary; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic Botany/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, all collection regressions, Anatomy/Geography/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, generated-HTML metadata/ancestry/six-branch/non-link/model/source/no-canvas/vocabulary checks, and an isolated in-process HTTP 200 smoke request passed. The dev server reaches Ready, but PTY localhost is isolated from follow-up processes and the required browser CLI is not installed, so rendered console, responsive, and interaction verification remains pending. The repository-wide lint command still reports the known legacy backlog outside this checkpoint; every touched TypeScript/TSX file passes the targeted lint gate.

### Visual Arts studio, museum wall, and evidence lab

**Route:** `/humanities/visual-arts`

**Check:** Desktop, narrower desktop, and mobile practice-studio → object lenses → museum wall → formal tools → evidence-lab → source-boundary flow; registry-derived Home and Humanities ancestry; exact six-branch parity with Painting & Drawing and Sculpture active and Photography, Printmaking, Digital & Media Art, and Art History visibly planned, non-clickable, and omitted from live sidebar navigation; deterministic pigment background and reduced-motion state; ample open intervals between major surfaces; museum search submit and suggestion controls; curated, valid empty, cached, partial, failed, and rate-limited states; stale-request protection; contextual department, medium, and image-rights facets; salon/catalog layouts; provider-image failure fallback; record details, focus trap, Escape/overlay dismissal, and focus restoration; exact complementary, analogous, triadic, and split-complementary hue angles; saturation/lightness controls and reset; none, thirds, and golden-ratio composition guides; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; exact 18° + 180° = 198° result; observation-versus-intention, edition-process, and museum-record boundaries; Visual Arts and Humanities vocabulary grouping; official Met API and Open Access links; keyboard focus, zoomed text, and no clipping, overlap, canvas, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic hue/evidence fixtures, Met URL/normalization fixtures, vocabulary aggregation, architecture/readability/remaster audits, all collection regressions, Anatomy/Geography/Botany/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, generated-HTML metadata/ancestry/six-branch/active-link/planned-non-link/model/source/no-canvas checks, and an isolated in-process page-200/API-400 HTTP smoke request passed. The required browser CLI is not installed, so rendered console, responsive, image-provider, and interaction verification remains pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Data Science analytical workbench and evidence audit

**Route:** `/formal-science/data-science`

**Check:** Desktop, narrower desktop, and mobile eight-branch map → K-means instrument → evaluation ledger → description/prediction/causation boundary → evidence-audit → source-boundary flow; registry-derived Home and Formal Science ancestry; exact eight direct children present once, visibly planned, non-clickable, and omitted from live sidebar navigation; deterministic server-rendered raw-table → feature-space → model-view background with evaluation rail and no viewport measurement, random values, canvas, or post-hydration draw; ample intervals between major surfaces; exact 72-point and four-centroid fixture parity between background and laboratory; `k = 2`, `3`, and `4`; assign, recenter, full-iteration, objective, iteration-count, and reset states; model-boundary language for scaling, initialization, geometry, outliers, local solutions, and ground truth; all six evaluation checks; exact 90% accuracy and approximately 95.5% recall; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; prediction-time leakage, test-set contamination, and association-versus-causation explanations; Data Science and Formal Science vocabulary grouping; all three official source links; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic Data Science/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, all collection regressions, Anatomy/Geography/Botany/Visual Arts/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, and generated-HTML metadata/ancestry/eight-branch/planned-non-link/model/source/background/no-canvas checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, and interaction verification remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Materials Science tensile bench and specimen review

**Route:** `/applied-science/materials-science`

**Check:** Desktop, narrower desktop, and mobile two-track atlas → processing/structure/property/performance rail → mechanical-response instrument → selection ledger → specimen-review → source-boundary flow; registry-derived Home and Applied Science ancestry; exact eight direct children present once, visibly planned, non-clickable, and omitted from live sidebar navigation; three cross-cutting lenses and five material families labeled as coordinated tracks; no required atlas copy below 11px; deterministic server-rendered tensile frame, force arrows, gauge length, crack cue, microscope window, grains, lattice, defects, and relationship rail with no viewport measurement, random values, canvas, or post-hydration draw; ample intervals between major surfaces; brittle-like, ductile-like, and elastomer-like profiles; strain 0–22%; exact regime boundaries, normalized response, curve, fracture, profile-change, and reset states; all six selection questions; exact 18 kN / 60 mm² = 300 MPa calculation; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; stiffness-versus-strength/toughness, processing–microstructure, and service-selection explanations; Materials Science and Applied Science vocabulary grouping; all three official NIST source links; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic Materials Science/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, all collection regressions, Data Science/Visual Arts/Botany/Geography/Anatomy/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, and generated-HTML metadata/ancestry/eight-branch/planned-non-link/model/source/background/no-canvas/no-small-required-text checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, and interaction verification remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Economics market ledger and claim review

**Route:** `/social-science/economics`

**Check:** Desktop, narrower desktop, and mobile orientation → seven-branch atlas → circular-flow topology → normalized market instrument → claim-review → source-boundary flow; registry-derived Home and Social Science ancestry; exact seven direct children present once, visibly planned, non-clickable, and omitted from live sidebar navigation; Microeconomics, Macroeconomics, and Econometrics presented as scale/tool foundations with four cross-cutting applications; no required route copy below 11px; deterministic server-rendered exchange streams, institutional nodes, and accounting ledger with no viewport measurement, random values, canvas, SVG motion loop, or post-hydration draw; ample intervals between major surfaces; micro, macro, and policy topology modes; all six flow selections; demand and supply shifts from −2 through 2; exact 25 market states, `P = 50` and `Q = 40` baseline, simultaneous one-step-right `P = 50` and `Q = 50` fixture, interpretation, and reset; explicit normalized-index and equilibrium boundaries; exact `C + I + G + X − M = 760` calculation; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; one-price-versus-inflation and association-versus-causation explanations; Economics and Social Science vocabulary grouping; all three official BEA/BLS source links; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic Economics/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, all collection regressions, Data Science/Materials Science/Visual Arts/Botany/Geography/Anatomy/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, and generated-HTML metadata/ancestry/seven-branch/planned-non-link/model/source/background/no-canvas/no-motion-loop/no-small-required-text checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, and interaction verification remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Chemistry representation bench and periodic repository

**Route:** `/natural-science/chemistry`

**Check:** Desktop, narrower desktop, and mobile seven-branch atlas → elements/structures/reactions topology → periodic repository → molecule/equation models → evidence-lab → source/safety-boundary flow; registry-derived Home and Natural Science ancestry; exact seven direct children present once; General and Quantum active; Organic, Inorganic, Physical, Analytical, and Biochemistry visibly planned, non-clickable, and omitted from live sidebar navigation; no required route copy below 11px; deterministic server-rendered element inventory, water geometry, methane ledger, and representation rail with no root viewport measurement, random values, canvas, animation loop, or post-hydration draw; ample intervals between major surfaces; all three topology scenes; five fixed molecular specimens; four repeatable projection views and molecule-change reset; exact molecule geometry and polarity copy; methane coefficients 1–9, exact C/H/O ledgers, unbalanced and balanced states, and smallest `1 : 2 : 1 : 2` ratio; PubChem complete, cached, partial, failed, rate-limited, fallback, valid empty, retry, reset, provenance, facet, and direct-record states; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; coefficient-versus-subscript, isotope identity, molecular polarity, and unknown-chemical safety explanations; Chemistry and Natural Science vocabulary grouping; IUPAC, PubChem, NIST, and OSHA source links; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic Chemistry/model/evidence fixtures, vocabulary aggregation, the PubChem adapter, architecture/readability/remaster audits, all collection regressions, Economics/Materials Science/Data Science/Visual Arts/Botany/Geography/Anatomy/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, and generated-HTML metadata/ancestry/seven-branch/active-and-planned-link/model/repository/source/background/no-canvas/no-small-required-text checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, API-state, and interaction verification remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Music listening room and recordings boundary

**Route:** `/humanities/music`

**Check:** Desktop, narrower desktop, and mobile five-channel branch mixer → composition/performance/recording distinction → sound/structure/meaning layers → evidence files → repository-boundary flow; registry-derived Home and Humanities ancestry; exact five direct children present once; Theory, Performance, and Recorded Music directly linked; Acoustics and Music History & Culture visibly planned, non-clickable, and omitted from live sidebar navigation; no required route copy below 11px; deterministic server-rendered staff, notes, signal trace, record grooves, and channel console with no root viewport measurement, random values, canvas, animation loop, or post-hydration draw; ample intervals between major surfaces; mixer selection, active-route links, planned states, and selected-channel description; exact half + quarter + eighth + eighth = four-beat ledger; exact C–E–G + two semitones = D–F♯–A transposition; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; composition/performance/recording and catalog-versus-sonic-evidence explanations; Music and Humanities vocabulary grouping; MusicBrainz API, release-group, and Cover Art Archive source links; Recorded Music curated, live, cached, partial, valid-empty, failed, rate-limited, stale-request, fallback, facet, cover-failure, provenance, and detail-drawer states; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic Music/model/evidence fixtures, vocabulary aggregation, the MusicBrainz adapter, architecture/readability/remaster audits, all collection regressions, Chemistry/Economics/Materials Science/Data Science/Visual Arts/Botany/Geography/Anatomy/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, and generated-HTML metadata/ancestry/five-branch/active-and-planned-link/model/assessment/repository/source/background/no-canvas/no-small-required-text checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, provider, and interaction verification remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Architecture section sheet and coordination review

**Route:** `/applied-science/architecture`

**Check:** Desktop, narrower desktop, and mobile eight-branch section atlas → body/room/building/site/city scale stack → Vitruvian question slabs → integration desk → coordination review → standards boundary; registry-derived Home and Applied Science ancestry; exact eight direct children present once, visibly planned, non-clickable, and omitted from live sidebar navigation; no required route copy below 11px; deterministic server-rendered three-level/four-bay building section, rooms, stairs, courtyard void, tree, plan inset, site contours, dimensions, load cues, and daylight rays with no root viewport measurement, random values, canvas, animation loop, or post-hydration draw; ample intervals between major surfaces; all three Vitruvian slab fronts, backs, independent toggles, and contemporary boundary; all five integration records; exact 8 m × 6 m = 48 m², 72 mm at 1:100 = 7.2 m, and 0.75 m × 12 = 9 m fixtures; all four review sheets in unanswered, correct, incorrect, changed-answer, switched-sheet, and reset states; coordination and arithmetic-versus-compliance explanations; Architecture and Applied Science vocabulary grouping; U.S. Access Board, DOE Building Energy Codes, and NIST Buildings & Construction source links; keyboard focus, zoomed text, and no clipping, overlap, or hydration shift.

**Status:** Targeted React/Next lint, TypeScript, deterministic Architecture/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, all collection regressions, Music/Chemistry/Economics/Materials Science/Data Science/Visual Arts/Botany/Geography/Anatomy/Recursion/Combinatorics/Narrative model regressions, the 404-page production build, and generated-HTML metadata/ancestry/eight-branch/planned-non-link/model/assessment/source/background/no-canvas/no-small-required-text checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, and interaction verification remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Biology living-scale atlas and evidence review

**Route:** `/natural-science/biology`

**Check:** Desktop, narrower desktop, and mobile registry header → four-band scale atlas → cross-scale Evolution rail → recurring-theme strip → magnification bench → evidence review → repository-boundary flow; registry-derived Home and Natural Science ancestry; exact ten direct branches present once; Cytology, Microbiology, Mycology, Botany, Zoology, and Anatomy & Physiology directly linked; Genetics, Molecular Biology, Ecology, and Evolution visibly planned, inert, and omitted from live sidebar navigation; scale bands cover all nine non-Evolution branches exactly once; no required route copy below 11px; deterministic server-rendered molecular, cellular, organismal, and ecological field with no viewport measurement, random values, canvas, animation loop, or post-hydration draw; ample intervals between major surfaces; all four specimen selections; exact 400×, 500×, 800×, and 4,000× fixtures; explicit image/actual unit-conversion ledger and schematic-not-micrograph boundary; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; magnification, dynamic homeostasis, population-level selection, and tree-topology explanations; Biology, Botany, Zoology, and Natural Science vocabulary grouping with 48 unique Biology-subtree terms; all three official NCBI, GBIF, and Open Tree links; keyboard focus, zoomed text, and no clipping, overlap, hydration shift, or shorthand/longhand style conflict.

**Status:** Targeted React/Next lint, TypeScript, deterministic Biology/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, the 413-route production build, and generated-HTML metadata/ancestry/ten-branch/active-and-planned-link/model/assessment/source/background/no-canvas/no-animation checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, keyboard, zoom, and interaction verification remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Anthropology field record and evidence boundary

**Route:** `/social-science/anthropology`

**Check:** Desktop, narrower desktop, and mobile registry header → four-field route atlas/evidence compass → hominin viewer/shared-meal synthesis → four-method rail → evidence review → ethics/collection boundary; registry-derived Home and Social Science ancestry; exact Cultural, Biological, Archaeological, and Linguistic Anthropology branches present once; Archaeology directly linked; three planned fields visibly inert and omitted from live sidebar navigation; no required route copy below 11px; deterministic server-rendered observation note, speech event, claim boundary, stratigraphy, provenience, human-variation overlap, and observe–record–contextualize–consult chain with no viewport measurement, random values, canvas, animation loop, Framer Motion, or post-hydration draw; ample intervals between major surfaces; all five hominin selector states and branching-not-ladder boundary; exact 18 ÷ 48 = 37.5% fixture; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; sampling-frame, observation/inference, overlapping-variation, and contextual-loss explanations; Anthropology and Social Science vocabulary grouping with 18 unique subtree terms; all three official AAA, Smithsonian, and NPS source links; keyboard focus, zoomed text, and no clipping, overlap, hydration shift, or shorthand/longhand style conflict.

**Status:** Targeted React/Next lint, TypeScript, deterministic Anthropology/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, the 413-route production build, and generated-HTML metadata/ancestry/four-field/active-and-planned-link/model/assessment/source/background/no-canvas/no-animation checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, keyboard, zoom, range, and evidence interactions remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Computer Science execution field and trace review

**Route:** `/formal-science/computer-science`

**Check:** Desktop, narrower desktop, and mobile six-layer stack → shared computation loop → abstraction principles → execution review → repository-boundary flow; registry-derived Home and Formal Science ancestry; exact Hardware Architecture, Software, Algorithms & Data, Artificial Intelligence, Computation Theory, and Security & Cryptography branches present once and directly linked; no required route copy below 11px; deterministic server-rendered bit register, state buses, transformation core, and output interfaces with no viewport measurement, random values, canvas, animation frame, or post-hydration draw; 96px scenery corridors; exact 8-bit = 256-pattern fixture; all four trace files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; representation-versus-meaning, sorting contract, API contract, and confidentiality/integrity/availability explanations; Computer Science and Formal Science vocabulary grouping with 18 unique subtree terms; all three official GitHub, RFC Editor, and NVD links; keyboard focus, zoomed text, and no clipping, overlap, hydration shift, or shorthand/longhand style conflict.

**Status:** Targeted React/Next lint, TypeScript, deterministic Computer Science/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, the 413-route production build, and generated-HTML metadata/ancestry/six-active-branch/model/assessment/source/vocabulary/background/no-canvas/no-animation checks passed. A broad descendant lint scan recorded pre-existing errors in older sorting, hardware, and automata components for later bounded cleanup. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, keyboard, zoom, and evidence interactions remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Religion comparative reading table and evidence review

**Route:** `/humanities/religion`

**Check:** Desktop, narrower desktop, and mobile eight-field route atlas → comparative fieldnote instrument → study boundaries → evidence review → source shelf; registry-derived Home and Humanities ancestry; exact Religious Studies & Methods, Religious Traditions & Communities, Sacred Texts & Interpretation, Ritual, Practice & Experience, Material Religion, Art & Place, Religion, Society & Politics, Theology & Philosophy of Religion, and Mythology & Sacred Narrative branches present once; Mythology directly linked; seven planned fields visibly inert and omitted from live sidebar navigation; no required route copy below 11px; deterministic server-rendered archive fragments, oral trace, analytical lenses, bounded claim, and provisional dossier with no viewport measurement, random values, canvas, animation loop, or post-hydration draw; ample intervals between major surfaces; all analytical lens states in the preserved fieldnote instrument; exact 9 ÷ 24 = 37.5% fixture; all four evidence files in unanswered, correct, incorrect, changed-answer, switched-file, and reset states; text-and-reception, dimension-specific comparison, and rights/access/context explanations; Religion and Humanities vocabulary grouping with 26 unique subtree terms; all three official AAR, Library of Congress, and Met source links; keyboard focus, zoomed text, and no clipping, overlap, hydration shift, or shorthand/longhand style conflict.

**Status:** Targeted React/Next lint, TypeScript, deterministic Religion/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, the 413-route production build, and generated-HTML metadata/ancestry/eight-branch/active-and-planned-link/model/assessment/source/vocabulary/background/no-canvas/no-animation checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, keyboard, zoom, lens, and evidence interactions remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Astronomy light-cone observatory and signal review

**Route:** `/natural-science/astronomy`

**Check:** Desktop, narrower desktop, and mobile five-stop scale expedition plus cross-cutting Methods rail → four-messenger signal laboratory → five-case lookback comparison → evidence review → archive-boundary flow; registry-derived Home and Natural Science ancestry; exact Planetary Astronomy, Stellar Astronomy, Galactic Astronomy, Extragalactic Astronomy, Cosmology, and Astronomical Methods branches present once in primary navigation; Planetary directly linked; five planned fields visibly inert and omitted from live sidebar navigation; no required route copy below 11px; deterministic server-rendered conceptual light cone, nested lookback intervals, four canonical source marks, cosmic-web field, observer, and gravitational-wave trace with no root viewport measurement, random values, canvas, animation loop, or post-hydration draw; explicit not-to-scale boundary and exact shared colors/data across background and lookback instrument; ample intervals between major surfaces; all three scene controls; visible, radio, X-ray, and gravitational-wave signal states; Moon, Sun, Proxima Centauri, Andromeda, and cosmic-microwave-background lookback states; exact `(721.93 − 656.30) / 656.30 = 0.100` fixture; all four evidence signals in unanswered, correct, incorrect, changed-answer, switched-signal, and reset states; detector, multi-wavelength, redshift-versus-distance, and received-past-versus-present explanations; Astronomy and Natural Science vocabulary grouping with 24 unique subtree terms; all three official MAST, GWOSC, and NASA ADS source links; keyboard focus, zoomed text, reduced motion, and no clipping, overlap, hydration shift, or shorthand/longhand style conflict.

**Status:** Targeted React/Next lint, TypeScript, deterministic Astronomy/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, the 413-route production build, and generated-HTML metadata/ancestry/six-branch/active-and-planned-link/model/assessment/source/vocabulary/background/no-root-canvas/no-animation-loop checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, keyboard, zoom, reduced-motion, scene, signal, lookback, and evidence interactions remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Political Science civic chamber and evidence review

**Route:** `/social-science/political-science`

**Check:** Desktop, narrower desktop, and mobile three-band branch atlas → 125-seat coalition laboratory → recurring-question ledger → evidence review → source-boundary flow; registry-derived Home and Social Science ancestry; exact Political Theory, Comparative Politics, Political Institutions, Political Behavior & Elections, Public Policy & Administration, International Relations, Political Economy, and Political Methodology branches present once, visibly planned, inert, and omitted from live sidebar navigation; analytical bands clearly labeled as visual groupings rather than curriculum parents; no required route copy below 11px; deterministic server-rendered preference bars, 125 seat marks, 63-seat threshold, and rule/action/delivery/outcome record with no viewport measurement, random values, canvas, animation loop, or post-hydration draw; exact shared party labels, colors, seats, total, threshold, and hemicycle geometry across scene and instrument; ample intervals between major surfaces; empty, minority, exact 60-seat shortfall, 65-seat majority, multi-party, toggle, and reset coalition states; exact `40 + 25 = 65 ≥ 63` fixture; all four evidence cases in unanswered, correct, incorrect, changed-answer, switched-case, and reset states; possible-versus-plausible coalition, vote-versus-seat, sequence-versus-cause, and adoption-versus-implementation explanations; Political Science and Social Science vocabulary grouping with 22 unique subtree terms; all three official Congress.gov, World Bank Indicators, and V-Dem links; keyboard focus, zoomed text, and no clipping, overlap, hydration shift, or shorthand/longhand style conflict.

**Status:** Targeted React/Next lint, TypeScript, deterministic Political Science/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, the 413-route production build, and generated-HTML metadata/ancestry/eight-planned-branch/model/assessment/source/vocabulary/background/no-canvas/no-animation checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, keyboard, zoom, coalition, and evidence interactions remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Medicine clinical loop and evidence review

**Route:** `/applied-science/medicine`

**Check:** Desktop, narrower desktop, and mobile four-band branch atlas → fictional reasoning laboratory and body-system lens → safety guardrails → evidence review → education/source-boundary flow; registry-derived Home and Applied Science ancestry; exact ten direct branches present once; Anatomy & Physiology directly linked; nine planned fields visibly inert and omitted from live sidebar navigation; analytical bands clearly labeled as task groupings rather than curriculum parents; no required route copy below 11px; deterministic server-rendered pulse trace and Observe → Interpret → Test → Act → Monitor loop with no viewport measurement, random values, canvas, animation frame, or post-hydration draw; exact shared stage labels across scene and instrument; ample intervals between major surfaces; all five reasoning-stage, five evidence-packet, clear, five body-system, and reset states; empty, default, duplicate-proof, and all-packet support fixtures; exact `90 / (90 + 10) = 90.0%`, `855 / (855 + 45) = 95.0%`, and `90 / (90 + 45) = 66.7%` fixtures; all four evidence cases in unanswered, correct, incorrect, changed-answer, switched-case, and reset states; denominator, registry-record, and follow-up explanations; explicit synthetic-model and education-not-individual-advice boundaries; Medicine, Anatomy & Physiology, Skeletal, and Applied Science vocabulary grouping with 39 unique subtree terms; all three official ClinicalTrials.gov, openFDA, and NCBI links; keyboard focus, zoomed text, and no clipping, overlap, hydration shift, or shorthand/longhand style conflict.

**Status:** Targeted React/Next lint, TypeScript, deterministic Medicine/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, the 413-route production build, and generated-HTML metadata/ancestry/ten-branch/active-and-planned-link/model/assessment/source/vocabulary/safety/background/no-canvas/no-animation checks passed. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, keyboard, zoom, reasoning, body-system, and evidence interactions remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.

### Languages aligned reading desk and evidence review

**Route:** `/humanities/languages`

**Check:** Desktop, narrower desktop, and mobile two-folio branch atlas → five-stage practice loop and Linguistics cross-link → multilingual phrase window → translation-choices studio → learning principles → evidence review → catalog/archive-boundary flow; registry-derived Home and Humanities ancestry; exact Modern, Signed, Classical/Historical, Constructed, Writing/Literacy, Translation/Interpreting, Learning/Proficiency, and Literature/Culture branches present once, visibly planned, inert, and omitted from live sidebar navigation; folios clearly labeled as visual groupings rather than curriculum parents; no required route copy below 11px; deterministic server-rendered facing source/target pages, explicit line alignments, fixed English–Spanish examples, translator margin, script/modality rulers, and Notice → Understand → Retrieve → Use → Adapt loop with no viewport measurement, random values, canvas, animation frame, or post-hydration draw; exact shared stage and translation data across scene and instruments; ample intervals between major surfaces; all three phrase states, seven/eight/nine entry counts, direction and script readouts, all four translation states, and reset; exact `1 / 7 = 14.3%`, `1 / 8 = 12.5%`, and `1 / 9 = 11.1%` fixtures; all four evidence cases in unanswered, correct, incorrect, changed-answer, switched-case, and reset states; sample-versus-population, communicative translation, signed-language, and provider-record explanations; Languages and Humanities vocabulary grouping with 22 unique subtree terms; all three Glottolog, Unicode CLDR, and OLAC links; keyboard focus, zoomed text, reduced motion, and no clipping, overlap, hydration shift, or shorthand/longhand style conflict.

**Status:** Targeted React/Next lint, TypeScript, deterministic Languages/model/evidence fixtures, vocabulary aggregation, architecture/readability/remaster audits, the 413-route production build, and generated-HTML metadata/ancestry/eight-planned-branch/default-model/assessment/source/vocabulary/background/no-canvas/no-animation checks passed. The non-default phrase percentages are verified at the shared-model boundary because only the selected phrase state belongs in initial HTML. The production server cannot start in this workspace because Node reports `uv_interface_addresses`, and the required browser CLI is not installed, so live HTTP, rendered console, responsive, keyboard, zoom, phrase, translation, and evidence interactions remain pending. Remote publication and the zero-deployment guard are recorded in the commit handoff because they occur after this verification entry is committed.
