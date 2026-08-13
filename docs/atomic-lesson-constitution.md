# Atomic Lesson Constitution

This document is the binding build contract for atomic lesson pages in Education Station 64.

The Design Docket governs visual/product behavior. The Learning Design Playbook governs pedagogy across page types. This constitution is narrower and stricter: it defines what an **atomic lesson must contain, how it should flow, and when it is ready to build**.

Its purpose is to stop discovering lesson architecture through repeated screenshot tweaks. We should be able to name an atomic topic, write a compact lesson brief, build the complete instructional arc, visually verify it, and move on.

## Prime directive

> **An atomic lesson must explain the idea, let the learner do the idea, and let the learner check whether they understood the idea.**

An interaction is not a substitute for explanation. A paragraph is not a substitute for a model. A quiz is not a substitute for guided practice.

Every atomic lesson must satisfy the three-part gate:

1. **Explain** — make the mental model clear.
2. **Do** — let the learner enact the central process or relationship.
3. **Check** — require a fresh case, prediction, construction, classification, or explanation.

If one of these is missing, the page is not a finished atomic lesson.

---

## 1. Start with a seven-line lesson brief

Before layout or code, write these seven lines:

1. **Learner outcome:** After this page, the learner can...
2. **Prerequisite:** This assumes the learner already understands...
3. **Mental model:** The learner should picture / understand...
4. **Core rule or relationship:** In one sentence...
5. **Primary action:** The learner will physically/intellectually do...
6. **Likely misconception:** The tempting wrong idea is...
7. **Transfer check:** A new case proves understanding if the learner can...

If these seven lines are fuzzy, do not begin visual composition. Clarify the lesson first.

### Atomicity test

The lesson is probably too broad if:

- the outcome contains several independent verbs joined by “and”;
- the page needs multiple unrelated primary instruments;
- the misconception list describes several different conceptual families;
- the transfer check requires a different mental model from the main lesson;
- the page needs a mini-dashboard to hold all of its content.

Split the topic instead of compressing several lessons into one page.

---

## 2. Use one instructional spine

The default atomic lesson rhythm is:

### A. Orient
Answer: **What are we learning, and why does it matter here?**

- Connect to prior knowledge in one compact paragraph or visual statement.
- Put the central learner question in plain language.
- Avoid throat-clearing, module codes, and generic “explore” copy.

### B. Model
Answer: **What does the idea look like when it works?**

- Show one carefully chosen worked example or canonical representation.
- Keep the example simple enough that the intended structure is visible.
- If the lesson is procedural, show the process in order rather than revealing only the final state.

### C. Distill
Answer: **What reusable rule, relationship, or distinction should I keep?**

- State the rule explicitly after or alongside the model.
- Include the reason when the reason is central to understanding.
- Use canonical terminology without turning the section into a definition dump.

### D. Do
Answer: **Can I perform or manipulate the idea myself?**

- Use one primary instrument whenever possible.
- The learner’s action should mirror the real mathematical, scientific, linguistic, historical, or practical process being taught.
- Controls and consequences must be visually close.

### E. Stress-test
Answer: **Where does this rule stop, fail, or get confused with something nearby?**

- Show at least one misconception, invalid case, boundary, or legal-but-unhelpful move when relevant.
- Explain why it fails or why it is less useful.

### F. Check transfer
Answer: **Can I use the idea in a new case without being walked through the exact same example?**

- Use 2–4 concise questions or one stronger construction/prediction task.
- Assess the learning goal, not familiarity with the page controls.

### G. Connect
Answer: **What does this unlock next?**

- Usually one sentence plus normal previous/next navigation is enough.
- Do not add a giant summary card merely to announce that the lesson ended.

These functions may share a section. A short lesson does not need seven giant cards. The **instructional jobs must exist; the UI containers do not need to map one-to-one to them**.

---

## 3. The primary instrument must enact the concept

The main interaction is the page’s laboratory, not its decoration and not its pre-test.

Before building it, answer:

- What learner action represents the actual concept?
- What changes because of that action?
- What remains invariant?
- What should the learner notice after the action?
- What mistake can the instrument diagnose meaningfully?

### Instrument validity test

A strong primary instrument:

- begins from a meaningful example, not a blank sandbox;
- teaches through a sequence the learner can understand;
- lets the learner cause the important transformation;
- shows cause and effect together;
- gives explanatory feedback for wrong or unhelpful choices;
- ends in a state that connects naturally to the stated rule;
- can be understood without reading UI-development language.

### Forbidden inversion

Do not ask the learner to supply knowledge the lesson has not taught yet just to make the primary interaction function.

Examples:

- Bad: choose the correct value of `x` before the equation-solving process has been taught.
- Better: perform balanced operations to solve, then substitute the derived value into the original equation as verification.
- Bad: guess which number set contains a value before the containment model has been explained.
- Better: model the set extensions first, then classify fresh values.

The instrument should **engineer the understanding**, not reverse-engineer whether the learner already has it.

---

## 4. Explanation is mandatory, but must stay concise

An atomic lesson cannot be “just interactives.” It also should not become a textbook wall.

Every lesson should normally contain:

- one clear orientation;
- one worked/model example;
- one explicit rule or relationship statement;
- one short explanation of **why** the rule works or what structure it expresses;
- one misconception, limitation, or contrast where relevant;
- one transfer check.

### Explanation density

- Prefer 1–3 short paragraphs per explanatory chunk.
- Put explanations next to the representation they explain.
- Use equations, diagrams, tables, annotated examples, and short callouts to reduce prose when they encode the concept faithfully.
- Do not hide required explanation behind hover.
- Do not create a separate “Quick Reference” section when the lesson itself already provides the needed rule at the point of use.

A learner should be able to skim headings, examples, and highlighted rules and reconstruct the lesson’s logic.

---

## 5. Examples form a deliberate ladder

Do not choose examples merely because the arithmetic is convenient.

A complete atomic lesson should draw from this ladder as appropriate:

1. **Canonical case** — the cleanest example of the idea.
2. **Contrast case** — nearby case that changes one important feature.
3. **Misconception case** — tempting wrong move or classification.
4. **Boundary case** — where the rule changes, stops, or needs a condition.
5. **Transfer case** — unfamiliar surface, same underlying idea.

The primary instrument usually needs only the first 2–3. The transfer check can carry the later cases.

Keep numbers and labels simple unless handling complexity is itself the lesson.

---

## 6. One viewport, one center of gravity

Atomic lessons should feel like a guided path, not a dashboard.

- One major instructional region should dominate each viewport.
- Supporting explanation should frame the active model rather than compete with it.
- Avoid several equally loud glass panels stacked or overlapping around the same concept.
- Do not duplicate the same information in the header, orientation card, instrument label, and footer.
- Let the page scroll naturally from concept → model → action → check.

### No instructional overlap

- Instructional content belongs in normal document flow by default.
- Absolute positioning is for decorative backgrounds, glows, canvases, and bounded diagrams whose geometry is intrinsic.
- Sticky utilities must reserve enough clearance that they never cover headings, equations, controls, breadcrumbs, or feedback.
- Selection states must not grow over neighboring instructional content.
- Glass effects may layer visually, but readable content must retain a clear foreground/background hierarchy.

If a screenshot exposes overlap, first ask whether the composition is violating the lesson flow before patching z-indexes or offsets.

---

## 7. Progressive disclosure beats simultaneous completeness

Do not show every explanation, control, edge case, and advanced variation at once.

Preferred sequence:

1. model the default case;
2. explain the relationship;
3. unlock or emphasize the meaningful action;
4. show the consequence;
5. introduce the contrast/boundary;
6. offer independent practice.

Optional complexity may use details, tabs, presets, or later chunks, but the first state should make the lesson’s central idea obvious.

A learner should not need to learn the interface before learning the concept.

---

## 8. Feedback must preserve the learner’s reasoning

Wrong choices are opportunities to compare models.

Good feedback says one of:

- **invalid because...**
- **valid, but it does not move toward the goal because...**
- **almost; this part is correct, but...**
- **this boundary behaves differently because...**

Avoid feedback that is only red/green or “try again.”

When possible, keep the learner’s attempted state visible long enough to compare it with the correction.

---

## 9. Practice comes after instruction

Practice should not be the first time the lesson explains the rule.

A normal atomic lesson ends with a concise check that:

- uses a new example;
- changes at least one surface feature from the worked example;
- includes explanation after submission;
- contains at least one item that diagnoses the primary misconception;
- stays subordinate to the lesson, rather than becoming a giant assessment dashboard.

If the learner can pass only by memorizing which page button was correct, the check is invalid.

---

## 10. Visual identity supports the lesson process

Atomic lessons should inherit shell consistency while becoming more subject-specific in the instrument and local environment.

Use visual identity to reinforce structure:

- equality may use balance/invariance;
- set theory may use containment;
- transformations may use before/after mapping;
- graphing may coordinate equation and coordinate plane;
- anatomy may use spatial labeling;
- chronology may use ordered sequence.

Do not make every lesson a differently colored card grid.

The local visual grammar should answer: **what kind of thinking does this concept require?**

---

## 11. The atomic lesson build flow

This is the default production workflow.

### Pass 1 — Lesson brief
Write the seven lines. Confirm scope and sequence.

### Pass 2 — Text storyboard
Before styling, write the lesson as a simple vertical outline:

- orientation;
- model/example;
- rule/why;
- primary learner action;
- misconception/boundary;
- transfer check;
- forward connection.

If the storyboard does not teach the topic clearly without decoration, do not proceed.

### Pass 3 — Primary model and instrument
Build the representation and causal interaction first.

Do not spend the pass tuning glows, background intensity, or tiny spacing while the instructional model is still changing.

### Pass 4 — Explanatory spine and feedback
Add the concise prose, labels, rule callout, misconception handling, and immediate feedback around the model.

### Pass 5 — Practice and navigation
Add the transfer check, vocabulary access when useful, and correct semantic previous/next navigation.

### Pass 6 — Visual composition
Tune spacing, hierarchy, glass treatment, background participation, responsive layout, and local subject identity.

### Pass 7 — Verification
Test:

- default state;
- all guided states;
- wrong/unhelpful states;
- longest explanation;
- multiline notation;
- narrower desktop width;
- sticky utilities;
- final transfer check;
- previous/next navigation.

Then run available code/build checks.

---

## 12. Stop-tweaking protocol

Repeated cosmetic edits are a signal to diagnose the layer that is actually failing.

### If the page feels empty
Do not add filler. Check whether explanation, a worked example, a misconception, or transfer is missing.

### If the page feels busy
Do not shrink everything. Check whether several learner questions or instruments are competing and should be sequenced or split.

### If the interaction feels awkward
Do not immediately restyle the controls. Re-check whether the learner action actually enacts the concept.

### If the page “doesn’t explain anything”
Do not add tooltips to every control. Restore the explanatory spine: model → rule → why → guided action.

### If elements overlap
Do not begin with z-index patches. Verify normal flow, sticky clearance, container ownership, and whether too many surfaces occupy the same instructional moment.

### If we have made two rounds of small fixes without resolving the problem
Stop implementation and return to the seven-line lesson brief and text storyboard.

The constitution outranks sunk-cost attachment to an existing layout.

---

## 13. Definition of done

An atomic lesson is complete only if a learner can answer all five questions after using it:

1. **What is this idea?**
2. **How do I use or recognize it?**
3. **Why does the central rule/process work?**
4. **What is a common wrong interpretation or boundary?**
5. **Can I handle a fresh example?**

And the page itself must pass these gates:

- the learner outcome is one coherent idea;
- Explain → Do → Check is present;
- one obvious primary instrument exists;
- the instrument enacts the concept rather than pre-testing it;
- at least one worked/model example exists;
- the reusable rule is stated explicitly;
- the main misconception or boundary is addressed;
- practice requires transfer to a new case;
- required content does not overlap or clip;
- visual polish reinforces hierarchy rather than replacing instruction;
- navigation is semantically correct;
- available build/type checks pass;
- the page has been visually verified in its important states when preview capability is available.

---

## 14. Worked planning examples

### Solving Two-Step Equations

- **Outcome:** solve equations of the form `ax + b = c` using equivalent transformations.
- **Mental model:** equality is preserved while operations are peeled away from the variable.
- **Model:** `2x + 6 = 14 → 2x = 8 → x = 4` with the same operation visibly applied to both sides.
- **Rule:** undo the outer additive layer, then undo the multiplicative coefficient; preserve equality at every move.
- **Primary action:** choose and apply operations to both sides.
- **Misconception:** an operation can be mathematically balanced but unhelpful; changing only one side is invalid.
- **Check:** substitute the derived solution into the original equation, then solve a fresh equation independently.

The substitution check belongs **after** the solution is engineered.

### Number Systems

- **Outcome:** identify the smallest standard real-number set that classifies a value and understand the containment hierarchy.
- **Mental model:** number systems are nested extensions; irrational numbers occupy the real numbers outside the rationals.
- **Model:** build outward from natural → integer → rational → real, while placing irrationals within real but outside rational.
- **Rule:** membership accumulates outward; the smallest containing set is the most specific useful label.
- **Primary action:** classify curated values after the containment structure is explained.
- **Misconception:** “real” is often true but too broad; repeating decimals are rational; irrational + irrational need not be irrational.
- **Check:** classify unfamiliar values and explain one boundary case.

The containment model must be taught before the classification lab becomes the center of the page.

---

## 15. Relationship to the other rule documents

When rules appear to conflict:

1. **Accuracy and curriculum ontology** win first.
2. **This Atomic Lesson Constitution** decides atomic lesson structure and workflow.
3. **Learning Design Playbook** supplies broader pedagogical principles and edge-case guidance.
4. **Design Docket** governs visual/product composition and interaction quality.
5. **Page Planning Template** records the concrete plan for the page being built.

These documents are complementary. The constitution exists to make the atomic-lesson workflow fast enough to use every time, not to replace the deeper references.