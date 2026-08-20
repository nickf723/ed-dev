# Education Station 64 Learning Design Playbook

This document governs how educational content is organized, explained, modeled, interacted with, and assessed across Education Station 64.

The prime directive is simple:

> **Optimize for durable understanding, not maximum information density or maximum visual novelty.**

A page succeeds when the learner leaves with a clearer mental model, knows how the new idea connects to nearby ideas, and can use or recognize the idea in a new case.

---

## 1. Begin with the learner model

Before choosing components, write down:

- **Learning goal:** What should the learner understand or be able to do?
- **Prior knowledge:** What must already be understood?
- **Mental model:** What internal picture, structure, relationship, or rule should the learner leave with?
- **Evidence of understanding:** What could the learner do that would demonstrate the idea was understood?
- **Likely misconception:** What tempting but incorrect model might form?

Do not start a lesson by asking, “What widget can we build?” Start by asking, “What needs to become obvious?”

---

## 2. Match page depth to instructional responsibility

### Domain / field hub
Purpose: **orient and navigate**.

- Show the field's major branches and how they relate.
- Give just enough insight to make navigation meaningful.
- Do not turn a field hub into a giant lesson.
- Preserve all live child navigation.

### Subject / branch hub
Purpose: **organize an ontology**.

- Explain the organizing principle of the subject.
- Group children by durable conceptual relationships, not arbitrary “phase 1 / phase 2” buckets.
- Use a compact signature interaction only when it clarifies the branch as a whole.

### Unit page
Purpose: **chunk and sequence**.

- Explain the throughline connecting its lessons.
- Expose a deliberate learning path.
- Keep previews compact. Full interactive instruments usually belong to child lessons.
- A unit page should reduce cognitive load, not collect every good widget from its descendants.

### Atomic lesson
Purpose: **teach one coherent idea deeply**.

- Prefer one primary mental model and one primary instrument.
- Surround the instrument with explanation, examples, reference material, misconceptions, and transfer.
- If the page needs several independent full-strength instruments, it probably contains several lessons.

### Reference page / atlas
Purpose: **support lookup and comparison**.

- Optimize for scanning, filtering, cross-linking, and stable terminology.
- Reference pages may be denser than lessons because the learner is retrieving rather than following a sequence.

### Application / tool page
Purpose: **perform a task using knowledge**.

- Controls can be richer, but the interface must still expose why outputs change.
- Do not confuse a tool with the lesson that teaches the underlying concept.

---

## 3. Organize content ontologically

Prefer structures that describe what the knowledge **is**, not how a particular textbook happened to divide chapters.

Good organizing dimensions include:

- object type
- representation
- operation
- transformation
- scale
- constraint
- cause and effect
- part-whole containment
- input-output relationship
- chronological development when chronology is intrinsic
- prerequisite dependency

Avoid arbitrary numbering, school-grade labels, or UI-shaped categories when a stronger conceptual hierarchy exists.

When a subject spans educational levels, organize by **conceptual abstraction or structure**, not by age band unless the age band itself matters pedagogically.

---

## 4. Chunk around learner questions

A chunk should usually answer one question.

Examples:

- What is a term?
- What stays invariant when I solve an equation?
- What does slope measure?
- When is an inequality boundary included?
- Why does multiplying by a negative reverse order?

Rules:

- Keep one dominant idea per chunk.
- Use headings that name the knowledge, not interface mechanics.
- Prefer 2-4 compact chunks over one wall of prose.
- Do not repeat the same explanation in a heading, subtitle, pill, and card.
- Let a learner complete one conceptual step before presenting the next.
- Use progressive disclosure when optional complexity would distract from the first model.

---

## 5. Use a deliberate explanation sequence

The default lesson rhythm is:

1. **Orient** - state the learner question and connect it to prior knowledge.
2. **Model** - show the structure using the clearest representation.
3. **Explain** - name the important parts and relationships.
4. **Manipulate** - let the learner change one meaningful variable or state.
5. **Test** - check a case, prediction, or boundary.
6. **Generalize** - state the reusable rule or pattern.
7. **Contrast** - show a misconception, exception, or neighboring concept.
8. **Connect** - explain what this enables next.

This is a default, not a rigid template. The sequence may change when the subject demands it, but the learner should not be dropped into free-form control before the basic model exists.

---

## 6. Model the concept, not the metaphor

Visuals should expose real structure.

Prefer:

- graphs for relationships
- number lines for order and intervals
- nested regions for set containment
- tables for discrete input-output comparison
- diagrams for part-whole structure
- maps/networks for relationships
- timelines for genuine chronology
- equations aligned with the transformation they undergo
- physical balance only when equality/invariance is the concept

Avoid metaphors that introduce false properties merely because they look engaging.

Whenever possible, make **containment look like containment, overlap look like overlap, transformation look like transformation, and invariance look stable**.

---

## 7. Coordinate multiple representations around one object

Multiple views are valuable when translation between them is itself part of the learning goal.

Examples:

- equation ↔ graph ↔ table ↔ verbal rule
- inequality ↔ number line ↔ interval notation
- system ↔ two graphs ↔ algebraic elimination
- ingredient ↔ technique ↔ transformation ↔ dish

Rules:

- All coordinated views should share the same state.
- Changing one representation should visibly update the others.
- Do not place unrelated widgets side by side and call them “multiple representations.”
- Explicitly name what remains the same across forms.

### Representation-parity check

Coordination includes every instructional-looking layer, including the page background.

- Use the same named example, data, membership decisions, and state across views that claim to depict one object.
- If the opening uses physical specimens, keep those specimens while translating into a table, diagram, notation, or formal rule.
- If a later instrument introduces a different case, identify it as a new case and explain which relationship is unchanged.
- Do not use random numbers, labels, or decorative geometry in a background when learners could reasonably read them as part of the worked example.
- Prefer immediately perceptible properties for the first classification model, then formalize the same decisions symbolically.

---

## 8. Guide before sandboxing

Free-form sandboxes are powerful after the learner understands the controls.

Default progression:

1. meaningful default example
2. curated contrasting examples
3. explicit interpretation
4. test or prediction
5. optional free exploration

A sandbox should answer a question, not merely expose parameters.

Bad first experience:

> six sliders, four toggles, blank graph, “explore!”

Better first experience:

> “Compare these three boundary cases.” Then offer **Explore your own** after the rule is visible.

---

## 9. Every control must reveal causality

For each interactive control, answer:

- What concept does changing this control reveal?
- Where will the learner see the effect?
- Is the effect immediate and visually close enough to connect cause and result?
- Can the learner predict the effect before changing it?

Avoid controls whose primary value is novelty.

If several controls change different concepts at once, sequence or group them so the learner can isolate cause and effect.

---

## 10. Test membership, validity, and predictions explicitly

When a concept defines whether something qualifies, provide a way to test examples.

Examples:

- Does `x = 0` satisfy `x < 3`?
- Does point `(2, 4)` lie in this half-plane?
- Does a point satisfy both inequalities in a system?
- Does this transformation preserve equality?
- Is this value rational?

A strong test-case interaction shows:

1. original rule
2. chosen case
3. substitution / application
4. true or false result
5. interpretation in the model

The learner should see both **why a case works and why a nearby case fails**.

---

## 11. Reference material should live near the decision

Use compact atlases, legends, rule tables, and comparison charts when learners repeatedly need a distinction.

Good reference material:

- `<` vs `≤`: open vs closed endpoint
- strict vs inclusive inequality: dashed vs solid border
- common equation forms and when each is useful
- ingredient technique compatibility
- taxonomy legends

Reference blocks should reduce memory load without interrupting the lesson flow.

Do not make a learner repeatedly infer a convention that can be stated once in a compact visual reference.

---

## 12. Examples must be selected, not generated arbitrarily

Choose examples that reveal structure.

A useful example set often contains:

- a simplest case
- a contrasting case
- a boundary case
- a common misconception
- a transfer case

Avoid random examples when randomness makes the concept harder to compare.

Numbers should be chosen to keep the intended relationship visible. Use awkward numbers only when handling awkward numbers is itself part of the goal.

---

## 13. Teach rules with their scope

Never teach a rule without its domain of validity when the limitation matters.

Examples:

- multiplying or dividing an inequality by a negative reverses order
- division requires a nonzero divisor
- open/closed endpoints encode whether the boundary is included
- slope-intercept form does not represent vertical lines
- an irrational plus an irrational is not necessarily irrational

Prefer a compact **Rule / Why / Boundary** structure over a rule followed by a surprise exception several screens later.

---

## 14. Separate canonical definitions from useful heuristics

It is fine to teach informal strategies, but label them as strategies.

Do not blend:

- canonical scientific categories
- culinary balancing heuristics
- mnemonic devices
- implementation conventions

as if they had the same status.

When the formal definition and the practical heuristic differ, show both with their roles clearly distinguished.

---

## 15. Minimize extraneous cognitive load

Remove anything that consumes attention without improving understanding or navigation.

Common offenders:

- decorative micro-pills
- redundant labels
- arbitrary counts
- fake module codes
- debug or implementation language
- multiple simultaneous animations
- several equally loud widgets
- giant cards with one sentence
- tiny required text
- unnecessary hover-only information
- “click here” instructions for obvious controls

Visual polish is valuable when it clarifies hierarchy and state. It becomes noise when it competes with the concept.

---

## 16. Use whitespace as grouping, not abandonment

Whitespace should clarify chunks and hierarchy.

Avoid:

- large unexplained empty thirds of a viewport
- stretching a low-information card merely to fill space
- filling dead space with decorative controls

If a page feels empty, first ask whether:

- the content is under-chunked
- navigation is underrepresented
- a useful reference block is missing
- a deeper child page should exist
- the layout is using the wrong composition

Do not add filler.

---

## 17. Feedback should explain, not merely judge

For practice and test cases:

- give immediate feedback when appropriate
- explain the relevant relationship
- distinguish calculation errors from conceptual errors when possible
- preserve the learner's work long enough to compare it with the correction
- avoid gamified “mastered” language without real evidence

A red X alone is not instruction.

---

## 18. Assessment should match the learning goal

If the goal is recognition, a classification task may be enough.

If the goal is reasoning, require prediction, construction, explanation, or transfer.

Useful assessment forms include:

- classify an example
- predict what a parameter change will do
- choose which representation matches
- test a case and justify the verdict
- construct an example satisfying constraints
- diagnose a misconception
- explain why two forms are equivalent

Avoid assessing button familiarity instead of knowledge.

### Use insight and fluency together

Every atomic lesson needs an explicit transfer or reasoning check. When the knowledge also supports deterministic generation, pair that check with a small amount of generated, code-verifiable practice.

- **Insight / transfer** asks the learner to predict, construct, explain, diagnose, compare, or apply the idea in a fresh case.
- **Fluency / retrieval** varies bounded parameters so the learner can practice repeatedly with a deterministic answer and explanatory feedback.

Do not use generated practice for claims that require interpretation, judgment, source evaluation, or multiple defensible answers unless the checker can represent that nuance honestly.

## 18A. Collections and repositories can teach through retrieval

A reference or repository page does not need to imitate a linear lesson, but it still needs a learning contract.

- Finite collections should make completeness and ordering legible.
- Open-ended collections should state their curation boundary.
- API-backed collections should preserve provenance, freshness, and failure states.
- Filters should expose real disciplinary distinctions: taxonomy, chronology, geography, medium, mechanics, publisher, genre, habitat, or other meaningful facets.
- Detail pages should explain why the item matters, how it relates to neighboring items, and what can be compared, modeled, or simulated.
- Maps, images, media, and live data should add a representation the learner could not obtain as clearly from prose alone.

The shared collection engine may normalize search and filters, but the subject determines the useful facets and the shape of the detail view.

---

## 19. Navigation is part of pedagogy

The knowledge graph teaches structure.

- Breadcrumbs teach ancestry.
- Unit maps teach sequence.
- Child links teach decomposition.
- Cross-links teach conceptual relationships.
- Previous/next links teach progression.

Only add a cross-link when the target page teaches the specific relationship being referenced. Prefer a future dedicated `Health / Nutrition` page over linking vaguely to all of Health Sciences.

Planned destinations may be shown only when their place in the ontology helps explain the structure, and they must be visually disabled.

---

## 20. Design for transfer, not only the default example

After a model works for the default state, ask:

- Does it still make sense with a negative value?
- What happens at zero?
- What happens at the boundary?
- What if there is no solution?
- What if there are infinitely many solutions?
- What if a label wraps?
- What if the learner zooms text?

Conceptual edge cases and layout edge cases both matter.

---

## 21. Educational content should become more specialized with depth

A high-level page can communicate a field with atmosphere and navigation.

A deep lesson should increasingly prioritize:

- precise definitions
- worked examples
- comparison
- explanation
- test cases
- manipulable models
- misconceptions
- practice

The deeper the page, the less “vibes” should carry instructional weight.

---

## 22. Anti-patterns

### Widget buffet
Several excellent interactions compete simultaneously.

**Fix:** split into lessons or choose one primary instrument.

### Sandbox first
Learner sees parameters before knowing what they mean.

**Fix:** guided examples first, optional sandbox later.

### Dashboard cosplay
Fake module codes, status readouts, verification panels, or developer-looking chrome replace educational structure.

**Fix:** use learner-facing labels and real content hierarchy.

### Diagram as decoration
A visual looks mathematical/scientific but does not encode the concept accurately.

**Fix:** make every visual property correspond to a real relationship.

### Definition dump
Several definitions appear without a model or comparison.

**Fix:** organize them around a question, structure, or reference table.

### Hidden curriculum
Important navigation is buried behind hover, selection, or an inspector.

**Fix:** expose live destinations directly on hubs and unit maps.

### Geometry patch tower
Global CSS or fixed heights hide legitimate content to preserve a screenshot.

**Fix:** component-owned minimum heights, natural growth, and explicit state testing.

---

## 23. Learning Design audit

Before calling an educational pass finished, ask:

1. What single sentence describes what the learner should understand after this page?
2. Is the page depth correct: hub, unit, lesson, reference, or tool?
3. Is there one obvious instructional center of gravity?
4. Does every major chunk answer a distinct learner question?
5. Is the primary mental model mathematically/scientifically accurate?
6. Are multiple representations coordinated around the same object when used?
7. Does the lesson guide before offering free exploration?
8. Can the learner test at least one valid and one invalid case where appropriate?
9. Are important conventions available as compact reference material?
10. Are rules presented with relevant boundaries and exceptions?
11. Is required text readable without relying on hover?
12. Does any control exist without a clear pedagogical purpose?
13. Does any live navigation disappear or become harder to find?
14. Does any content clip, overlap, or change layout unexpectedly in legitimate states?
15. Does the final page teach the concept better than the page it replaced, or is it merely prettier?

---

## 24. Preferred development sequence

For a substantial educational page:

1. **Audit the ontology** - parent, siblings, children, prerequisites, existing routes.
2. **Choose page depth** - hub, unit, lesson, reference, tool.
3. **Write the learning contract** - goal, prior knowledge, mental model, evidence, misconception.
4. **Outline chunks** - learner questions in sequence.
5. **Choose representations** - only those that expose needed structure.
6. **Choose interaction** - one primary causal relationship where possible.
7. **Choose examples** - simple, contrast, boundary, misconception, transfer.
8. **Design navigation semantics** - ancestry, sequence, children, cross-links.
9. **Build** - content and model first, decorative polish second.
10. **Test states** - conceptual edges, longest content, responsive layout, accessibility.
11. **Audit** - Design Docket + Learning Design audit.
12. **Commit as one coherent pass** when practical.

The goal is not to make every page identical. The goal is to make every page feel like it was designed by the same educational philosophy.
