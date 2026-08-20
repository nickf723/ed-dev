# Atomic Lesson Constitution

This document is the binding build contract for atomic lesson pages in Education Station 64.

The Design Constitution governs site-wide production behavior. This constitution is narrower: it defines how one coherent idea becomes a lesson that a learner can understand, manipulate, formalize, and use elsewhere.

## Prime directive

> **An atomic lesson must make the learner understand the idea, do the idea, and recognize or use the idea in a fresh conventional context.**

An interaction is not a substitute for explanation. A paragraph is not a substitute for a model. A quiz is not a substitute for guided practice. Discovery and formal instruction are partners, not rivals.

---

## 1. Start with a seven-line lesson brief

Before layout or code, write:

1. **Learner outcome:** After this page, the learner can...
2. **Prerequisite:** This assumes the learner already understands...
3. **Mental model:** The learner should picture / understand...
4. **Core relationship:** In one sentence...
5. **Primary action:** The learner will physically or intellectually do...
6. **Likely misconception:** The tempting wrong idea is...
7. **Transfer check:** A fresh case proves understanding if the learner can...

If these are fuzzy, do not solve the problem with more cards.

### Atomicity test

Split the lesson if:

- the outcome contains several independent skills;
- multiple unrelated instruments compete for attention;
- the misconceptions belong to different conceptual families;
- the transfer task requires a new mental model;
- the page needs a dashboard just to hold the ideas.

---

## 2. Use a discovery-to-formalization spine

A strong default rhythm is:

### A. Phenomenon or task

Give the learner something concrete to solve, notice, predict, compare, or explain.

Use the conventional representation when one exists. A student learning substitution should recognize a system of equations. A student learning entropy should recognize a box of particles or gas expansion. A history learner should see sources, events, places, or claims rather than only a summary paragraph.

### B. Primary sandbox / model

Let the learner manipulate the mechanism before over-explaining it.

The sandbox should begin from a meaningful example, not an empty toy.

### C. Conceptual bridge

After the learner has something to name, give them the vocabulary and causal explanation.

Answer: **what did you just do or observe, and why did it work?**

### D. Formal structure

Organize the reusable rule, law, procedure, distinctions, timeline, or notation.

Keep it compact and structured. Formal structure is where clarity lives, not where prose accumulates.

### E. Pitfall / boundary

Expose the tempting misconception, invalid move, legal-but-unhelpful move, limiting case, or scope condition.

### F. Application / transfer

Require the idea in a fresh context without repeating the exact guided path.

### G. Connect

Use ordinary previous/next navigation and a brief forward connection. Do not add a victory dashboard just because the lesson ended.

These are instructional functions, not mandatory one-to-one UI blocks.

---

## 3. Progressive disclosure is not progression gating

This distinction is binding.

**Progressive disclosure orders attention. It does not lock required lesson content.**

- The learner can scroll to the explanation, formal structure, pitfall, and application without completing the sandbox.
- Returning to the page must not require replaying prior interactions just to access the lesson.
- A widget may stage its own internal states. For example, a derivation can reveal the next operation after the current operation is performed.
- Do not gate required definitions, navigation, accessibility content, or reference material behind completion.
- Optional depth may use disclosure controls when it is truly optional.

The page is a lesson, not an escape room.

---

## 4. The primary instrument must enact the concept

Ask before building it:

- What action represents the real academic process?
- What changes because of that action?
- What remains invariant?
- What should the learner notice?
- What wrong or inefficient move can we explain meaningfully?

### Strong examples

- expressions: vary a variable and watch the expression value respond;
- equation solving: apply equivalent operations to both sides;
- substitution: replace one quantity with an equal expression;
- elimination: add or scale whole equations and visibly cancel additive inverses;
- geometry: construct, drag, measure, or preserve an invariant;
- entropy: compare macrostates by how many microstates realize them;
- history: sequence evidence, compare accounts, map consequences, or construct a claim from sources;
- programming: trace state changes or modify an algorithm and observe consequences.

### Forbidden inversion

Do not make the learner guess knowledge the lesson has not taught merely to operate the widget.

A slider is appropriate for continuous variation. It is usually a poor replacement for symbolic reasoning, proof, classification, construction, or causal analysis.

---

## 5. Procedural lessons use state -> move -> state

When an object changes through reasoning, the representation should distinguish **what the object is** from **what caused it to change**.

A useful visual grammar is:

`state 1 -> move 1.5 -> state 2 -> move 2.5 -> state 3`

Whole/half numbering is optional. The distinction is mandatory when ambiguity would otherwise arise.

### Trace rules

- Put the operation or explanation between the states it connects.
- Do not label a result with the operation that produced it in a way that makes the learner think the operation comes afterward.
- Keep earlier states and completed moves visible when space permits.
- The final interaction state should read as a coherent worked artifact, not a pile of button history.
- Show invariants directly: the same operation on both sides, conservation across reservoirs, equal transformations of equivalent structures, or preserved constraints.
- For group operations such as distribution or scaling, show the operation reaching every affected term.

The same grammar can describe algebra, code execution, reaction sequences, source-to-inference reasoning, or any other transformation process.

---

## 6. Formal task grammar anchors discovery

Where learners will encounter a conventional prompt outside the site, teach the bridge explicitly.

Examples:

- “Solve the system by elimination. Show your work. State the solution as an ordered pair and check it.”
- “Use the graph to estimate the intersection.”
- “Rank these macrostates from least to most likely.”
- “Use the evidence to support or challenge the claim.”

The site can explain more intuitively than a worksheet while still preparing the learner to recognize the worksheet.

Use Education Station visual language around the task. Do not paste unrelated paper, textbook, or LMS aesthetics into the page merely to signal schoolwork.

---

## 7. Intuition belongs beside the formal move

Whenever possible, attach a small conceptual reason to the exact point where it matters.

Examples:

- `+y` and `-y` cancel because they are additive inverses;
- dividing both sides by 3 keeps equality because equal quantities split into the same number of equal groups;
- a coefficient outside parentheses reaches every term in the group;
- high entropy corresponds to high multiplicity because far more microstates produce that macrostate;
- a historical claim is stronger when the cited evidence actually supports the inference being made.

Prefer local mathematical/scientific/historical structure to distant analogies. The representation itself should carry as much intuition as possible.

---

## 8. Explanation is mandatory, but concise

A normal lesson should contain:

- one clear orientation or task;
- one canonical model or worked case;
- one explicit reusable relationship;
- one short explanation of why it works;
- one misconception or boundary when relevant;
- one transfer task.

Prefer 1-3 short paragraphs per explanatory chunk. Put explanation next to the object it explains. Do not hide required explanation behind hover.

A learner should be able to skim headings, representations, and highlighted rules and reconstruct the logic.

---

## 9. Example selection forms a ladder

Choose examples deliberately:

1. **Canonical case:** cleanest view of the idea.
2. **Contrast case:** one meaningful feature changes.
3. **Misconception case:** tempting wrong move or interpretation.
4. **Boundary case:** where a condition matters.
5. **Transfer case:** unfamiliar surface, same underlying structure.

Not every lesson needs all five in the primary instrument. Use them across the worked example, guided transfer, and independent practice.

---

## 10. Practice ladder

When the subject supports conventional practice, prefer:

### 1. Worked canonical example

The learner sees the recognizable task and receives guided reasoning.

### 2. Guided transfer

Change an important surface feature. Require more action and less narration.

### 3. Independent practice

Offer a small number of fresh tasks in the notation or format learners are likely to meet outside the site.

Multiple choice is a fallback. Prefer solving, constructing, predicting, ranking, tracing, sorting, transforming, annotating, classifying, or explaining when those actions better match the learning goal.

### Assessment has two complementary jobs

Every atomic lesson ends with an explicit check of understanding. When the subject permits deterministic generation, include both:

1. **Insight / transfer:** a fresh prediction, construction, explanation, diagnosis, or comparison that reveals whether the mental model transferred.
2. **Fluency / retrieval:** a small bank of constrained generated practice with code-verifiable answers and explanatory feedback.

Generated practice must define valid parameter ranges, a deterministic solution/checker, edge cases, and reproducible cases for debugging. Do not call a page complete because it contains a generic multiple-choice quiz, and do not declare mastery from one score.

---

## 11. One viewport, one center of gravity

Atomic lessons are guided paths, not dashboards.

- One major instructional object should dominate each viewport.
- Supporting explanation frames the active model rather than competing with it.
- A normal reading frame is usually around 900-1050px unless the instrument needs more width.
- Prose can be narrower than the instrument.
- Rich lessons may scroll and breathe.
- Short lessons should condense rather than stretching themselves across empty screen space.
- Sequence ideas before shrinking typography.

### Readability floor

For school-facing content:

- instructional prose is generally at least about 15-17px on desktop;
- primary equations, prompts, excerpts, and labels are larger;
- tiny structural metadata never carries essential instruction;
- contrast must remain comfortable over the subject background.

---

## 12. Feedback preserves reasoning

Wrong choices are comparison opportunities.

Good feedback distinguishes:

- invalid because...
- valid, but it does not move toward the goal because...
- almost; this part works, but...
- this boundary behaves differently because...

Keep the learner’s attempted state visible long enough to compare when practical.

---

## 13. Visual identity supports the thinking mode

The shell supplies cohesion. The local lesson supplies cognitive identity.

Examples:

- equality: alignment, balance, invariance;
- elimination: stacked rows and cancellation;
- sets: containment;
- graphing: equation and coordinate plane;
- entropy: many microstates funneling into fewer macrostates;
- anatomy: spatial relationships;
- chronology: ordered sequence;
- source analysis: evidence and inference links.

Do not turn a successful lesson’s component layout into a universal template.

> **Reuse the learning logic. Re-invent the interaction for the subject.**

---

## 14. Atomic lesson build flow

### Pass 1: Brief

Write the seven lines and confirm atomic scope.

### Pass 2: Storyboard

Write the vertical lesson as plain structure:

- task / phenomenon;
- canonical model;
- learner action;
- conceptual bridge;
- formal structure;
- misconception / boundary;
- transfer;
- connection.

If the storyboard cannot teach without decoration, fix it first.

### Pass 3: Primary representation

Build the academic object and its interaction before atmosphere.

### Pass 4: Reasoning and feedback

Attach concise intuition to transitions, states, and consequential choices.

### Pass 5: Transfer and navigation

Add guided transfer, independent practice when useful, vocabulary access, and semantic previous/next navigation.

### Pass 6: Composition

Tune spacing, readability, background participation, responsive behavior, and local identity.

### Pass 7: Push and verify

Push coherent work to `main` promptly. Test the default state, guided states, mistakes, longest content, narrow desktop, mobile fallback, transfer task, and generated-practice boundaries. Run available build/type checks and verify a preview when possible.

---

## 15. Stop-tweaking protocol

If the page feels empty, check for missing explanation, example, misconception, or transfer before adding filler.

If it feels busy, sequence or split the learner questions before shrinking them.

If the interaction feels awkward, re-check whether the action represents the concept.

If it feels like an encyclopedia, move the phenomenon/task and manipulation earlier.

If the learner understands the page but would freeze on ordinary coursework, add the conventional task bridge.

If two rounds of small fixes do not solve the problem, return to the brief and storyboard.

---

## 16. Definition of done

An atomic lesson is complete when the learner can answer:

1. What is this idea or task?
2. What does it look like or do?
3. Why does the central rule/process work?
4. What is a common wrong interpretation or boundary?
5. Can I handle a fresh case in recognizable notation or context?

And the page passes these gates:

- one coherent outcome;
- recognizable task or phenomenon;
- one primary interaction or model;
- required lesson content is not progression-gated;
- the interaction enacts the academic process;
- formal terminology follows or accompanies meaningful experience;
- procedural transformations distinguish state from move;
- important invariants are visible;
- a worked/model case exists;
- the reusable rule is explicit;
- the primary misconception or boundary is addressed;
- transfer uses a fresh case;
- an explicit assessment checks the learner outcome;
- deterministic generated practice is included and tested when the subject supports it;
- readability is appropriate for the target learner;
- the environment reinforces the subject without competing with it;
- content does not overlap or clip;
- semantic navigation is correct;
- the current change is pushed to `main` and the remote ref is verified;
- available build/type checks and preview verification pass when available.

These rules exist so every new lesson can inherit what we learned without inheriting the same exact layout.
