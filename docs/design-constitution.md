# Education Station 64 Design Constitution

This is the binding production contract for page design across Education Station 64.

The Design Docket is the deeper visual/product reference. The Educational Content Playbook governs pedagogy. The Atomic Lesson Constitution governs atomic lesson structure. This document is the fast contract we use on **every page build** so we do not rediscover the same corrections through repeated screenshot tweaks.

> **Decide the knowledge structure, learner task, visual grammar, atmosphere, density, and interaction before polishing components.**

The site should feel like a knowledge network learners can explore, not a collection of encyclopedia articles wearing glass panels.

---

## 1. Ontology comes before layout

The page must express the actual knowledge hierarchy.

- Hubs expose direct children as primary navigation.
- Grandchildren may be previewed, but they remain visually subordinate.
- Cross-links must look like cross-links, not ancestry.
- Breadcrumbs, sidebar nesting, curriculum ancestry, and local navigation must agree.
- If the hierarchy feels wrong, fix the curriculum model before styling around it.

A route is not complete until these agree:

`filesystem route = curriculum node = sidebar ancestry = page breadcrumbs`

---

## 2. Page depth determines the job

- **Domain / subject hub:** reveal the field and its major relationships.
- **Branch hub:** explain internal structure and route to direct children.
- **Unit page:** establish a throughline and lesson sequence.
- **Atomic lesson:** teach one coherent idea through explanation, discovery, application, and transfer.
- **Reference / tool:** optimize retrieval or use instead of pretending to be a lesson.

Do not make a hub behave like a lesson dashboard. Do not make an atomic lesson behave like a directory.

---

## 3. Navigation topology should teach the subject

A rectangular card grid is a fallback, not the default.

Choose a topology that matches the relationship:

- hierarchy: tree, atlas, constellation, nested regions;
- sequence: timeline, route, progression rail;
- scale: spectrum, zoom ladder, magnitude axis;
- containment: nested regions or set-like enclosures;
- process: flow, cycle, state machine, transformation path;
- spatial subject: map, field, anatomy, coordinate space;
- comparison: aligned columns, matrix, shared axis;
- true flat peers: cards or grid.

Before coding a hub, finish:

> The structure of this subject is best understood as a ______, so the page will behave like a ______.

If the second blank is always “grid,” reconsider.

---

## 4. Atomic lessons begin with a learner task, not an encyclopedia entry

When a topic has a recognizable task, phenomenon, source, experiment, or conventional school representation, put that in front of the learner early.

Examples:

- mathematics: “Solve this system by elimination. Show your work and check the ordered pair.”
- physics: “The laws do not forbid all the gas particles from returning to one corner. Why does that effectively never happen?”
- history: present the conflicting sources, map, timeline, or decision before summarizing the event;
- language: let the learner hear, sort, transform, or compare examples before presenting terminology;
- computer science: let the learner trace or manipulate the process before presenting an inventory of definitions.

**Conventional representation is part of usability.** Learners should recognize how the idea appears in homework, exams, labs, source documents, diagrams, code, maps, or real practice.

Use Education Station styling around that representation. Borrow the clarity and structure of a worksheet or lab sheet without importing an alien paper skin into the interface.

---

## 5. Discovery comes before vocabulary when the concept supports it

A strong lesson often follows this rhythm:

1. **Phenomenon / task:** give the learner a concrete reason to act or wonder.
2. **Primary interaction:** let them manipulate the central mechanism.
3. **Conceptual bridge:** name and explain what they just experienced.
4. **Formal structure:** organize the reusable rule, facts, laws, or sequence.
5. **Pitfall / boundary:** show the tempting wrong interpretation or where the rule changes.
6. **Application / transfer:** require the idea in a fresh case.

This is a learning grammar, not a mandatory six-card component template. Short lessons may merge functions. Different subjects should express the sequence differently.

### Critical rule

> **Copy the learning logic, not the component arrangement.**

Substitution can use clickable replacement and a derivation rail. Entropy can use particle multiplicity. History can use evidence sequencing. Anatomy can use spatial labeling. The constitution should make pages more coherent without making them look interchangeable.

---

## 6. Progressive disclosure orders attention; it does not lock the lesson

Progressive disclosure means sequencing and emphasis, not access control.

- Required lesson content remains scrollable and revisitable without completing earlier interactions.
- Leaving and returning to a page must not require replaying the sandbox merely to reach the explanation or reference material.
- A stateful widget may reveal its **own internal next step** after a learner action.
- Do not gate definitions, navigation, conceptual explanations, accessibility content, or later lesson sections behind completion state.
- Advanced detail may use tabs, disclosure panels, presets, or later chunks when it is optional rather than prerequisite.

If the page feels busy, sequence the ideas before shrinking typography or hiding required content.

---

## 7. The interaction must enact the academic action

The primary instrument is a laboratory, not decoration and not a disguised pre-test.

Ask before building it:

- What action represents the actual concept?
- What changes because of the action?
- What remains invariant?
- What should the learner notice?
- What wrong or unhelpful move can the instrument explain?

Examples:

- equation solving: perform equality-preserving operations, not guess a value with a slider;
- expressions: a slider may be excellent when the lesson is about how changing a variable changes output;
- elimination: add or scale whole equations and visibly cancel additive inverses;
- entropy: manipulate or compare macrostates and discover multiplicity rather than merely reading `S = k_B ln Ω`;
- proof: construct or test logical steps rather than click through a definition carousel.

Never require knowledge the lesson has not taught just to make the instrument work.

---

## 8. For transformations, separate states from moves

When a lesson teaches a sequence of transformations, the learner must be able to distinguish:

- **state:** what the mathematical object, system, text, diagram, or evidence set looks like now;
- **move:** what operation or reasoning transforms that state into the next one.

A useful pattern is:

`state 1 -> move 1.5 -> state 2 -> move 2.5 -> state 3`

Whole-step / half-step numbering is optional. The underlying distinction is not.

### Derivation-trace rules

- Put the explanation **between** the states it connects, not underneath the result in a way that makes chronology ambiguous.
- Keep completed moves visible when possible so the final state reads as a coherent worked example.
- Show invariants visually. If the same operation must affect both sides of an equation, align it on both sides. If a coefficient distributes across a group, show its reach. If a conserved quantity moves between reservoirs, show the conservation.
- Legal-but-unhelpful and invalid moves should receive different feedback.
- A completed guided interaction should leave behind something a learner could recognize as legitimate conventional work.

This principle also applies outside mathematics: timeline events and causes, code state and execution step, evidence and inference, chemical state and reaction, or anatomical structure and transformation.

---

## 9. Formalism and intuition must reinforce each other

Do not choose between intuitive explanation and conventional procedure. Bridge them.

For every important formal move, ask whether a short local intuition can make it visible:

- `2y + y = 3y`: three quantities of the same kind;
- divide both sides by 3: split two equal quantities into the same number of groups;
- `+y + (-y) = 0`: additive inverses cancel;
- high multiplicity: many microscopic arrangements correspond to the same macroscopic appearance;
- a source supports a claim: identify the evidence-to-inference link rather than merely color-coding the citation.

Keep the intuition beside the move it explains. Avoid analogy detours that compete with the actual representation.

---

## 10. Lessons need breathing room and a readable measure

Atomic lessons should feel like a guided path, not a widescreen dashboard.

- A normal lesson reading frame should usually be roughly `900-1050px` wide unless the primary instrument genuinely requires more room.
- Explanatory prose should often be narrower than the instrument.
- One major learner question or object dominates each viewport.
- Use vertical space to establish pacing between meaningful ideas.
- Let the subject background appear in the margins and between sections.
- Do not stretch weak content across the screen merely because horizontal space exists.
- If content is sparse, condense it. If content is rich, let the page scroll and breathe.

### Readability floor

For school-facing lessons:

- normal instructional prose should generally be at least about `15-17px` on desktop;
- important equations, source excerpts, labels, and task prompts should be clearly larger than supporting chrome;
- structural metadata may be smaller, but it must never carry essential instruction;
- strong contrast is mandatory for required text;
- fix crowding with layout and sequencing before making text smaller.

---

## 11. Examples form a deliberate practice ladder

Where appropriate, use three layers:

1. **Canonical worked case:** clean structure, explicit task, guided reasoning.
2. **Guided transfer:** change an important surface feature and require more learner action.
3. **Independent conventional practice:** a few fresh examples in the notation or format learners will meet outside the site.

Add contrast, misconception, and boundary cases when they teach something real.

Multiple choice is a fallback, not the default. Prefer construction, prediction, tracing, ranking, sorting, transforming, annotating, classifying, or solving when those better match the learning goal.

---

## 12. One viewport needs one center of gravity

Every viewport should have an obvious primary object or learner question.

- Hubs may center an atlas, tree, timeline, map, spectrum, or other navigation structure.
- Lessons center the main explanatory model, worked example, or primary instrument.
- Supporting panels frame the center rather than compete with it.
- Avoid several equally loud card groups and unrelated widgets at once.

The goal is not minimalism. The goal is **directed attention**.

---

## 13. Backgrounds are part of the subject identity

A background is not a nearly invisible texture under black panels.

- It should be recognizable in a normal screenshot without squinting.
- Glass surfaces must preserve enough transparency for the environment to participate.
- Motion is encouraged when it expresses the subject: trajectories, fields, waves, particles, flow, orbit, growth, diffusion, chronology, topology, and similar structures.
- Motion must not compete with the lesson. A background should not become a second uncontrolled simulation.
- Child pages may inherit an environmental family, but should specialize it around the child concept.
- Respect reduced-motion preferences.

If turning off the background barely changes the composition, it is too weak. If the learner is tracking the background instead of the lesson, it is too loud.

---

## 14. Subject identity is structural, not merely chromatic

A page is not unique because its accent changed.

Identity may come from:

- navigation geometry;
- background behavior;
- diagrams and models;
- notation or source treatment;
- motion language;
- spatial composition;
- data organization;
- interaction mechanics.

If all accent colors became grayscale, the page should still feel specific to its subject.

---

## 15. Navigation relationships must look different

- breadcrumb: ancestry;
- parent / up: one-level structural movement;
- direct child: primary descent;
- previous / next: sibling sequence;
- cross-link: related idea outside ancestry;
- planned node: known ontology, unavailable route.

Do not give every link the same visual treatment.

---

## 16. Notation and representation are content

- Use the shared math renderer for notation that needs typesetting.
- Never expose raw LaTeX, regex artifacts, escaped commands, or developer strings.
- Align mathematical operations when alignment carries meaning.
- Keep source text, code, maps, diagrams, timelines, and tables large enough to function as primary instructional objects.
- Do not fake runtime data, scientific precision, historical certainty, or simulation behavior for visual flavor.

---

## 17. Stable geometry, natural growth

- Hover may emphasize but should not reflow the page.
- Instructional text and controls use normal document flow.
- Selection-dependent regions reserve enough space for their longest ordinary state.
- `overflow: hidden` belongs to decorative geometry, not legitimate content.
- Use minimum heights plus growth instead of screenshot-specific fixed heights.
- Test narrower desktop widths and zoomed text.

---

## 18. Production flow

### Pass 1: Structure

1. classify the page type;
2. inspect ancestry, siblings, direct children, prerequisites, and live descendants;
3. update the curriculum when routes or hierarchy change;
4. write the one-sentence page job and learner task;
5. for atomic lessons, write the seven-line lesson brief.

### Pass 2: Storyboard

Before polish, establish the vertical instructional sequence. For lessons, identify:

- phenomenon or task;
- canonical model / worked case;
- primary action;
- conceptual bridge;
- formal structure;
- pitfall or boundary;
- transfer task.

### Pass 3: Primary representation and interaction

Build the academic object first. Do not tune glows while the mental model is still changing.

### Pass 4: Explanation and feedback

Attach concise reasoning to the representation and to transitions between states.

### Pass 5: Practice and navigation

Add guided transfer, independent practice when useful, vocabulary access, and semantic previous/next navigation.

### Pass 6: Atmosphere and composition

Tune spacing, typography, glass, background participation, responsive behavior, and subject-specific identity.

### Pass 7: Verification and push

Test important states and run available build/type checks.

**A coherent inspectable development change must be pushed to `studio` promptly.** Do not let finished work accumulate on hidden validation branches. If the deployment system needs a separate exact-head trigger, keep the runtime work on `studio` and use the trigger branch only to verify that exact tree.

---

## 19. TREE / FRAME / FIELD / FLOW preflight

### TREE

- registry ancestry, sidebar, breadcrumbs, and routes agree;
- primary hub navigation uses direct children;
- cross-links and planned nodes are honest.

### FRAME

- one clear center of gravity per viewport;
- lesson width and typography are readable for the target learner;
- no accidental voids, clipping, overlap, or unstable geometry;
- rich lessons breathe rather than compressing into dashboards.

### FIELD

- the background is visibly subject-specific;
- motion is meaningful and readable;
- glass reveals the environment;
- subject identity survives grayscale.

### FLOW

- the learner knows what task or question they are addressing;
- discovery, explanation, and formalism connect rather than compete;
- progressive disclosure does not gate required page content;
- controls enact the actual academic process;
- transformations distinguish state from move;
- practice transfers the idea to a fresh case;
- conventional notation or representation is recognizable.

---

## 20. Stop the micro-edit loop

A repeated correction is evidence that the rule or mental model is missing.

- If the page feels empty, add missing instructional structure, not filler.
- If it feels busy, sequence or split ideas before shrinking them.
- If an interaction feels awkward, re-check whether the learner action actually enacts the concept.
- If the page explains too much before the learner can act, move the phenomenon or sandbox earlier.
- If the learner can interact but would freeze on ordinary homework or practice, add the conventional task bridge.
- If two rounds of small fixes fail, return to the lesson brief and storyboard.
- If the same issue appears on two pages, promote the correction into this constitution or a shared component before building the third.

---

## 21. Definition of done

A substantial page pass is complete when:

- ontology and navigation are honest;
- the page job is obvious;
- the first viewport has a center of gravity;
- the background contributes real subject identity;
- required text is comfortably readable;
- the primary interaction or representation expresses the actual academic process;
- atomic lessons bridge phenomenon, intuition, formal structure, and conventional application;
- page content is not locked behind lesson progression;
- important transformations preserve a readable trace when appropriate;
- practice requires genuine transfer;
- live/planned and navigation relationship types are clear;
- notation and technical representations are clean;
- responsive states do not clip or overlap;
- available build/type checks pass;
- the current work is pushed to the inspectable `studio` branch;
- preview verification is performed when available.

If these are true, move on. Do not polish indefinitely.

---

## 22. Relationship to other rule documents

When guidance overlaps:

1. accuracy and curriculum ontology win first;
2. this Design Constitution defines site-wide production defaults;
3. the Atomic Lesson Constitution defines atomic lesson pedagogy and workflow;
4. the Educational Content Playbook supplies broader teaching guidance;
5. the Design Docket supplies deeper visual/product guidance;
6. Site Architecture defines source-of-truth and implementation boundaries.

The constitution should make development faster by preserving what we learn from real pages without turning successful pages into rigid templates.
