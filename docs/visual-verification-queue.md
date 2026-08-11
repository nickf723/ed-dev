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

### Pre-Algebra hub

**Route:** `/formal-science/mathematics/algebra/pre-algebra`

**Why queued:** structurally cleaned while previews were unavailable.

Changed blind:

- removed the duplicated equation-balance lab from the hub
- removed module count and `Mod_01` / `CH_XX` framing
- changed `Course Directory` to a learner-facing Learning Path
- changed `Enter Module` to Study Topic
- replaced `Verification Protocol` with Reference & Check
- changed the assessment label to Pre-Algebra Checkpoint
- added a concise arithmetic-to-symbolic throughline
- hid the redundant floating Vocabulary trigger on this route

Verify:

- removal of the Simulation Deck did not leave an awkward dead band
- the eight-topic path feels like the page's center of gravity
- the throughline block earns its space without becoming decorative chrome
- learning-path cards remain balanced despite differing descriptions
- Reference & Check is subordinate to navigation rather than competing with it
- the existing background still suits the calmer structure

**Status:** Verification required

### Solving for X

**Route:** `/formal-science/mathematics/algebra/pre-algebra/equations`

**Why queued:** instructional copy and semantics were cleaned while previews were unavailable.

Changed blind:

- module/finale framing was replaced with equality/invariance framing
- `The Golden Rule` became Preserve Equality
- `SADMEP` was replaced by a scoped explanation of undoing outer operations first
- `The Ultimate Cheat Code` became Check by Substitution
- `Verification Protocol` became Reference & Check
- fake Pre-Algebra mastery language became neutral continuation into Integrated Algebra
- the redundant floating Vocabulary trigger was hidden

Verify:

- the revised left-column explanation still balances the Equation Lab visually
- the reverse-order explanation fits without crowding
- substitution example reads naturally at common widths
- Reference & Check remains readable and subordinate
- the final continuation block clearly reads as cross-unit navigation, not a mastery badge

**Status:** Verification required

### Pre-Algebra child lesson sweep

All seven pages below received source-level cohesion and accuracy cleanup while previews were unavailable. Their backgrounds and primary layouts were intentionally preserved.

#### Integers & Negatives

**Route:** `/formal-science/mathematics/algebra/pre-algebra/integers`

Changed blind:

- module code became conceptual metadata
- negative-number explanation was reframed around reference points and the number line
- the misleading `− + − = +` visual was replaced with `a − (−b) = a + b`
- absolute value now says never negative and explicitly includes `|0| = 0`
- multiplication “cheat sheet” became a sign reference
- Reference & Check replaced Verification Protocol
- a Connect Forward block and next-topic link were added

Verify:

- the new subtracting-a-negative card reads cleanly
- the added footer does not create an overly long dead tail
- the number-line lab remains the visual center of gravity

**Status:** Verification required

#### Order of Operations

**Route:** `/formal-science/mathematics/algebra/pre-algebra/pemdas`

Changed blind:

- module code became conceptual metadata
- equation language was corrected to expression language
- grouping symbols replaced parentheses-only framing
- multiplication/division and addition/subtraction are explicitly equal-precedence pairs
- GEMA is labeled as another mnemonic rather than a competing rule system
- Verification Protocol became Reference & Check
- fake Rule Mastery became Connect Forward

Verify:

- the G/E/MD/AS hierarchy scans intuitively
- the left-to-right example remains easy to parse
- the alternate mnemonic card does not compete with the canonical hierarchy

**Status:** Verification required

#### Number Properties

**Route:** `/formal-science/mathematics/algebra/pre-algebra/properties`

Changed blind:

- module/“physics of math” framing became conceptual metadata
- properties are described as value-preserving rewrites of expressions
- commutative and associative scopes are stated explicitly
- identity language was made canonical
- the distributive area model is described as a model of equivalent partitioning rather than a universal proof claim
- Verification Protocol became Reference & Check
- fake Rule Mastery became Connect Forward

Verify:

- the left rule stack and right area model still feel balanced
- warnings about noncommutative/nonassociative operations are readable but not visually dominant

**Status:** Verification required

#### Ratios & Proportions

**Route:** `/formal-science/mathematics/algebra/pre-algebra/ratios`

Changed blind:

- module code became conceptual metadata
- ratios now emphasize ordered comparison and proportions as equality of ratios
- unit rate language was clarified
- “Butterfly Method” was demoted to an optional mnemonic
- cross multiplication is explained through clearing nonzero denominators
- Verification Protocol became Reference & Check
- fake Rule Mastery became Connect Forward

Verify:

- the cross-products explanation fits without becoming too text-heavy
- map scale, unit rate, and proportion lab feel like one lesson rather than three mini-lessons

**Status:** Verification required

#### Advanced Fractions

**Route:** `/formal-science/mathematics/algebra/pre-algebra/fractions`

Changed blind:

- module code became conceptual metadata
- common denominator vs least common denominator was corrected
- reciprocal is correctly described as a multiplicative inverse, not an “opposite”
- Keep/Change/Flip is explicitly labeled as a mnemonic after the actual rule
- fraction multiplication is described as a fraction of a fraction
- Verification Protocol became Reference & Check
- fake Rule Mastery became Connect Forward

Verify:

- addition/subtraction and division explanations fit cleanly in the left column
- the reciprocal equation remains legible at narrower widths
- the area model still reads as the primary interaction

**Status:** Verification required

#### Powers & Exponents

**Route:** `/formal-science/mathematics/algebra/pre-algebra/exponents`

Changed blind:

- module code became conceptual metadata
- repeated multiplication is explicitly scoped to positive whole-number exponents
- base and exponent definitions were made precise
- scientific notation copy was tightened
- Verification Protocol became Reference & Check
- fake Rule Mastery became Connect Forward

Verify:

- decide whether power anatomy + exponential growth + scientific notation is one coherent lesson or should be split
- confirm the Growth Model supports the page's primary mental model rather than competing with it
- check that scientific notation reads as transfer/application, not a second primary lesson

**Status:** Verification + scope review required

#### Algebraic Expressions

**Route:** `/formal-science/mathematics/algebra/pre-algebra/expressions`

Changed blind:

- module code became conceptual metadata
- coefficient definition became numerical factor rather than “number at the front”
- constant term and variable language were tightened
- like terms now require the same variable part and exponents
- the contrast example now uses `3x² + 2x`
- translation language highlights order-sensitive phrases
- Verification Protocol became Reference & Check
- fake Rule Mastery / Final Module language became Connect Forward / Next: Solving for X

Verify:

- hover labels are supplementary rather than required to understand the anatomy
- the new not-like-terms example is visually clear
- translation guide and Expression Lab feel coordinated rather than separate lessons

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

## Priority 2: legacy Algebra scope audits

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
3. Pre-Algebra hub
4. Solving for X
5. Pre-Algebra children in learning-path order
6. Expressions & Variables regression
7. Graphing Linear Equations regression
8. Systems of Equations regression

Once these are clean, resume new Algebra lesson production.

---

## Queue maintenance rule

Whenever a page changes without reliable visual verification:

- add it here in the same development pass
- state what changed
- state the exact states that need checking
- do not silently declare it visually finished

Remove or mark an entry verified only after rendered inspection.