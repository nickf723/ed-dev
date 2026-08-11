# Visual Verification Queue

Use this queue when code, curriculum, or educational structure changes while a reliable rendered preview is unavailable.

A successful type check is not visual verification. A page leaves this queue only after someone has looked at the rendered page at the relevant viewport sizes and exercised its important states.

---

## Preview-offline mode

When Vercel or another trusted preview path is unavailable, work may continue on high-confidence structural tasks:

- curriculum ontology and route wiring
- parent / child / sibling relationships
- prerequisite structure
- canonical terminology and notation
- educational chunk plans
- learner-facing copy when the correction is unambiguous
- accessibility and semantic markup
- type safety and compile errors
- removal of known implementation-facing labels
- documentation and audit work
- known structural anti-patterns whose fix does not depend on rendered composition

Do **not** make blind judgment calls about:

- spacing or whitespace balance
- viewport occupancy
- card/panel proportions
- font-size tuning beyond an obvious documented violation
- background opacity
- palette balance
- border intensity
- responsive composition
- whether a panel is visually too busy or too sparse
- major page redesigns whose success depends on seeing the result

If a structural change affects rendered composition anyway, add the page here.

---

## Verification protocol

For each queued page:

1. Open at a normal desktop width.
2. Open at a narrower desktop/tablet width.
3. Check the first viewport's hierarchy and density.
4. Exercise every curated example/preset.
5. Exercise the longest text/equation state.
6. Check hover, selected, empty, error, and boundary states where applicable.
7. Confirm no instructional content clips or bleeds.
8. Confirm navigation relationships are visually distinct.
9. Confirm the background remains visible without fighting content.
10. Confirm required text meets the readability floor.
11. Check that the page's primary learning goal is clearer than its controls.
12. Record any issue in this file before starting the next new page.

---

## Priority 0: verify before new Algebra production

### Algebraic Inequalities

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/inequalities`

**Why queued:** latest restructuring occurred while Vercel previews were rate-limited.

Verify:

- Boundary Reference reads as a reference, not another overwhelming widget.
- Test a Value clearly demonstrates valid and invalid cases.
- `x = 0` against `x < 3` reads naturally as true.
- `x = 4` against `x < 3` reads naturally as false.
- Guided examples dominate before the optional sandbox.
- Number-line and half-plane modes feel like a progression rather than two competing lessons.
- Optional sandbox disclosure does not distort layout.
- Compound inequality material still feels subordinate to the central lesson.
- No container bleed at long states or narrow widths.

**Status:** Verification required

### Systems of Inequalities

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems`

**Why queued:** new page created without rendered verification.

Verify:

- Overlap shading is geometrically accurate and legible.
- Constraint A, Constraint B, and the final feasible region are visually distinguishable.
- Wedge, horizontal-band, and empty-region presets all render correctly.
- Point-testing feedback is synchronized with the graph.
- Solid/dashed boundary conventions are correct.
- No SVG polygon or boundary clips unexpectedly.
- The page feels like a child of Algebraic Inequalities but has its own identity.

**Status:** Verification required

---

## Priority 1: regression verification after container-system changes

These pages were visually refined before the global geometry patch tower was removed. They should receive a fast regression pass before being treated as locked.

### Expressions & Variables

Verify:

- all three term examples `3x²`, `−2x`, `+5` remain visible
- every selector state fits naturally
- the inspector no longer changes outer geometry unexpectedly

**Status:** Quick regression check

### Graphing Linear Equations

Verify:

- Read the Line does not bleed into Same Line, Different Forms
- all alternate equation forms remain legible
- graph/control/right-inspector columns stay balanced

**Status:** Quick regression check

### Systems of Equations

Verify:

- all graph/substitution/elimination steps fit
- the third method step is fully visible
- changing method does not create a major layout jump

**Status:** Quick regression check

---

## Priority 2: legacy Algebra pages to inspect before remastering

### Pre-Algebra hub

**Route:** `/formal-science/mathematics/algebra/pre-algebra`

Known source-level debt:

- module-code framing
- module count
- Course Directory
- chapter codes
- Enter Module copy
- Simulation Deck
- duplicated equation-balance interaction
- Verification Protocol

Visual decisions to defer until preview returns:

- final page composition
- whether the existing background should survive
- how the eight-child learning path should occupy the viewport
- whether unit reference/assessment belongs on the first viewport or lower down

**Status:** Legacy, structural plan ready

### Solving for X

**Route:** `/formal-science/mathematics/algebra/pre-algebra/equations`

Known source-level debt:

- `Module_08 // The Finale`
- exaggerated culmination language
- `SADMEP`
- `The Ultimate Cheat Code`
- Verification Protocol
- fake completion/mastery language

**Status:** Legacy, content cleanup ready

### Remaining Pre-Algebra children

Routes:

- `/formal-science/mathematics/algebra/pre-algebra/integers`
- `/formal-science/mathematics/algebra/pre-algebra/pemdas`
- `/formal-science/mathematics/algebra/pre-algebra/properties`
- `/formal-science/mathematics/algebra/pre-algebra/ratios`
- `/formal-science/mathematics/algebra/pre-algebra/fractions`
- `/formal-science/mathematics/algebra/pre-algebra/exponents`
- `/formal-science/mathematics/algebra/pre-algebra/expressions`

**Status:** Legacy audit required

### Quadratic Equations

**Route:** `/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations`

Do not visually remaster blind. First decide whether Quadratics is one lesson or a unit containing roots, graph/vertex, forms, completing the square, and quadratic formula.

**Status:** Legacy scope audit required

---

## First session when previews return

Do not immediately create the next page.

Recommended order:

1. Algebraic Inequalities
2. Systems of Inequalities
3. Expressions & Variables regression
4. Graphing Linear Equations regression
5. Systems of Equations regression
6. Pre-Algebra hub screenshot/audit
7. Solving for X screenshot/audit

Once these are clean, resume new Algebra lesson production.

---

## Queue maintenance rule

Whenever a page changes without reliable visual verification:

- add it here in the same development pass
- state what changed
- state the exact states that need checking
- do not silently declare it visually finished

Remove or mark an entry verified only after rendered inspection.