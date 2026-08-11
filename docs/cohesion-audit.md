# Education Station 64 Cohesion Audit

This document tracks site-wide cohesion without flattening subject identity.

The goal is **one educational system with many local vibes**, not one visual template copied across every page.

Use this audit alongside:

- `AGENTS.md`
- `docs/design-docket.md`
- `docs/educational-content-playbook.md`
- `docs/page-planning-template.md`
- `docs/visual-verification-queue.md`

---

## 1. What must stay cohesive

These are global product rules. A page should need a deliberate reason to break them.

### Knowledge structure

- The curriculum registry is the structural source of truth.
- Live routes remain reachable.
- Hubs, units, atomic lessons, reference pages, and tools have different jobs.
- Parent, child, sibling, sequence, and cross-link relationships are semantically distinct.
- Arbitrary module numbers, fake progress systems, and implementation-facing labels are not substitutes for ontology.

### Learning design

- Begin from a learner goal and mental model.
- Chunk around learner questions.
- Guide before sandboxing.
- Prefer meaningful defaults and curated contrasts.
- Keep reference material near the decision it supports.
- Teach rules with their relevant boundaries and exceptions.
- Where membership or validity matters, let learners test valid, invalid, and boundary cases.

### Interface behavior

- Required information meets the readability floor.
- Interactive state changes do not clip, overlap, or unexpectedly move neighboring content.
- Components own their geometry.
- Global layouts do not reach into descendant components to repair one screenshot.
- Borders, scrollbars, focus states, and navigation relationships use the same semantic grammar across the product.

### Shared shell

- Breadcrumbs express ancestry.
- Domain/subject headers use a recognizable family resemblance.
- Persistent navigation does not cover primary content.
- Backgrounds participate without becoming foreground noise.
- Common controls should feel related even when their local styling differs.

---

## 2. What should become more unique with depth

Cohesion should create a stable frame for subject identity, not erase it.

As the learner descends, pages should increasingly specialize through:

- subject-specific spatial organization
- appropriate mathematical/scientific/humanistic representations
- local background motifs
- distinct interaction models
- local accent palettes inside the parent-domain palette
- typography choices when they serve the discipline
- examples, diagrams, reference systems, and motion that belong to the subject

A deep child page should not merely be its parent with a different icon and accent color.

---

## 3. Cohesion dimensions

Every substantial audit should inspect these dimensions separately.

### A. Page job

- Is this a hub, unit, atomic lesson, reference page, or tool?
- Is it doing the correct job for its depth?
- Is a hub trying to teach too much?
- Is an atomic lesson behaving like a directory?

### B. Ontology and navigation

- Are all live children present?
- Are planned destinations clearly disabled?
- Are groupings conceptual rather than arbitrary?
- Does the page expose ancestry, sequence, and decomposition accurately?

### C. Educational flow

- Is there a clear learner question?
- Does the page orient before it asks the learner to manipulate?
- Are explanations chunked into distinct conceptual steps?
- Does the interaction reveal causality rather than novelty?

### D. Representation quality

- Does the visual model encode the real structure?
- Are multiple views coordinated around one object where appropriate?
- Are containment, overlap, transformation, order, and invariance shown honestly?

### E. Density and hierarchy

- Is there one obvious center of gravity?
- Is navigation prominent enough on hubs?
- Are large panels earning their footprint?
- Is whitespace grouping content or abandoning it?

### F. Typography and labels

- Is required information readable?
- Are headings learner-facing?
- Have module codes, debug labels, arbitrary counts, and obvious UI instructions leaked into the page?

### G. Geometry and state safety

- Longest text state
- multiline equation/example state
- selected/unselected states
- error/empty/boundary states
- narrower desktop width
- text zoom

No legitimate instructional state should clip or bleed into another container.

### H. Subject identity

- What makes this page belong to this subject?
- Is that identity semantic or merely a color swap?
- Does it still clearly belong to the larger site?

---

## 4. Audit status vocabulary

Use these labels in this document and the verification queue.

- **Refined**: recently rebuilt under the current design and learning rules and visually reviewed.
- **Structurally refined**: ontology/content/navigation were improved, but the latest state still needs visual verification.
- **Legacy**: predates the current docket/playbook and should receive a deliberate audit before new feature work.
- **Verification required**: recently changed while preview/deployment was unavailable.
- **Planned**: known place in the ontology with no finished page yet.

Do not call a page refined simply because it compiles.

---

## 5. Current audit wave: Algebra

Algebra is the first branch being brought through the full cohesion process because it spans branch hubs, units, atomic lessons, reference material, and interactive models.

### Recently refined

- Mathematics hub
- Algebra hub
- Integrated Algebra hub
- Algebra Fundamentals unit
- Expressions & Variables
- Equality & Equations
- Algebraic Properties
- Number Systems
- Graphing Linear Equations
- Systems of Equations

These still return to the visual verification queue whenever later shared changes touch their shell or geometry.

### Structurally refined / verification required

- Algebraic Inequalities
- Systems of Inequalities

The latest work on these pages occurred while Vercel preview builds were rate-limited, so their conceptual structure is intentional but their rendered composition must be checked before they are treated as visually finished.

### Legacy: Pre-Algebra hub

Known structural debt from source inspection:

- `Mod_01` framing
- a module-count card whose count does not help the learner
- `Course Directory` rather than a learner-facing sequence/ontology
- `CH_XX` labels
- `Enter Module` interaction copy
- a large `Simulation Deck`
- a balance-scale interaction that is narrowly about solving equations even though Solving for X is already a child lesson
- `Verification Protocol` framing

The eight real child routes are registry-driven and should remain intact.

Safe structural direction:

- treat Pre-Algebra as a learning-path/unit page
- preserve all eight children
- make the sequence and conceptual bridge from arithmetic to symbolic algebra explicit
- keep full equation-solving interaction on the Solving for X child page rather than duplicating it on the hub
- retain reference/checking features only if they support the unit without competing with navigation

Do not visually remaster this hub until it can be rendered and reviewed.

### Legacy: Solving for X

Known structural/content debt from source inspection:

- `Module_08 // The Finale`
- exaggerated finale/graduation language
- the mnemonic `SADMEP`, which should not be presented as a general algebraic law
- `The Ultimate Cheat Code` instead of direct substitution/checking language
- `Verification Protocol`
- `Pre-Algebra Complete!` mastery language without evidence

Safe structural direction:

- frame the lesson around preserving equality and inverse operations
- explain undoing operations in reverse structural order without inventing a universal acronym
- call substitution a check, not a cheat code
- use assessment language that reports evidence rather than declaring mastery
- distinguish the parent/unit link from the next cross-unit link to Integrated Algebra

### Remaining Pre-Algebra children

The remaining child lessons are legacy and should be audited for the same old-era patterns before visual remastering:

- Integers & Negatives
- Order of Operations
- Number Properties
- Ratios & Proportions
- Advanced Fractions
- Exponents
- Expressions

Audit their pedagogy individually. Do not mechanically apply the same layout to all seven.

### Next Algebra target after Pre-Algebra

- Quadratic Equations

Source search indicates it still belongs to the old presentation generation. Do not remaster it blind. First plan its learning contract, likely child lessons, and primary model.

---

## 6. Site-wide audit waves

After Algebra, proceed by coherent branches rather than random pages.

### Wave 2: Remaining Mathematics

- Foundations
- Geometry and descendants
- Calculus
- Statistics
- Number Theory
- Discrete Mathematics
- Applied Mathematics
- Linear Algebra
- Abstract Algebra

### Wave 3: Formal Science outside Mathematics

- Logic
- Computer Science
- Information Science
- Data Science
- Systems Science

### Wave 4: Natural Science

Audit field hubs first, then descend branch by branch. Preserve each science's own representational grammar rather than importing Mathematics UI wholesale.

### Wave 5: Social Science

Favor scale, populations, institutions, evidence, networks, maps, timelines, and data representations where they fit the subject.

### Wave 6: Humanities

Preserve stronger editorial/archival/cultural identities while keeping navigation and learning semantics consistent.

### Wave 7: Applied Science

Favor design constraints, workflows, prototypes, systems, decisions, and real-world outputs. Keep Applied's violet identity at the domain level without forcing every child into the same workbench composition.

### Wave 8: Interdisciplines

Re-audit after the five core domains have stronger child structures. Interdisciplinary navigation should connect specific developed concepts, not vague top-level fields.

---

## 7. The anti-homogenization rule

When fixing cohesion, never default to copying a successful page.

Reuse:

- shell behavior
- semantic navigation patterns
- geometry principles
- readability standards
- interaction feedback grammar
- curriculum-driven navigation

Reinvent when useful:

- page composition
- primary model
- background
- local palette
- interaction
- reference system
- diagram language
- information density

The question is not “How do we make this match the previous page?”

The question is:

> **What should feel familiar because it is the same product, and what should feel different because it is different knowledge?**

---

## 8. Audit completion rule

A branch is not cohesion-audited when every page merely shares the same header.

A branch is cohesion-audited when:

- its ontology is coherent
- every live route is preserved
- page depth matches page responsibility
- learning sequences are intentional
- repeated conventions are consistent
- subject-specific models are accurate
- old implementation-facing chrome is removed
- visual states have been rendered and reviewed
- child pages become meaningfully more specialized with depth

The final test is whether the branch feels like **one curriculum designed deliberately over time**, rather than a folder containing pages from different development eras.