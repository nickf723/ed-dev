# Visual Verification Queue

Use this queue when code, curriculum, or educational structure changes while a reliable rendered preview is unavailable.

A successful type check is not visual verification. A page leaves this queue only after someone has looked at the rendered page at the relevant viewport sizes and exercised its important states.

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

**Status:** Verification required

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

**Status:** Verification required

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

**Check:** Desktop, narrower desktop, and mobile composition; sticky header clearance; first-viewport dominance of the four direct-child lenses; registry-derived Set Theory, Graph Theory, Combinatorics, and Recursion Theory routes; shared six-object specimen; drafting-table background visibility and slow inspection-light behavior; reduced-motion state; scenery corridor before the graph workshop; triangle, path, and star presets; custom vertex placement by pointer and keyboard; edge linking by pointer and keyboard; duplicate-edge prevention; degree, maximum-degree, connectivity, and handshake readouts; empty/reset states; long curriculum descriptions without clipping; conceptual cross-link semantics; vocabulary drawer grouping at the parent and all four children; focus visibility and zoomed-text behavior.

**Status:** TypeScript, full lint, vocabulary aggregation, architecture/readability audits, collection regressions, and production build passed; rendered verification pending.
