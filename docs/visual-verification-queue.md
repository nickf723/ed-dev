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
