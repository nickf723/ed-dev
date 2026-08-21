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

## 5. Current audit wave: Mathematics

Algebra was the first branch brought through the full cohesion process because it spans branch hubs, units, atomic lessons, reference material, and interactive models. The wave has now advanced into the remaining Mathematics parents.

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
- Pre-Algebra hub and its eight-child learning path
- Solving for X and the remaining Pre-Algebra child sweep
- Quadratic Equations unit and its five atomic lessons
- Number Theory hub
- Discrete Mathematics hub
- Set Theory root unit
- Graph Theory root unit
- Combinatorics root unit
- Recursion & Recurrence root unit

The latest work on these pages occurred without a trusted rendered browser pass, so their conceptual structure is intentional but their composition must be checked before they are treated as visually refined.

### Completed scope corrections

- Pre-Algebra now behaves as a learning path from arithmetic structure into symbolic algebra rather than a module dashboard.
- Solving for X centers equality-preserving inverse operations and treats substitution as a check rather than a trick or mastery event.
- The remaining Pre-Algebra lessons preserve their distinct primary instruments while using canonical terminology and semantic continuation.
- Quadratic Equations is an honest five-lesson unit covering patterns and parabolas, vertex form, roots and intercepts, completing the square, and the quadratic formula with discriminant.
- Number Theory is a curriculum-derived hub organized around four integer lenses: multiplicative structure, cyclic structure, integer constraints, and global distribution. Diophantine Equations is the only active child; the other three remain non-clickable planned nodes.
- Number Theory's first sieve-grid background did not meet the memorable-background gate. It has been replaced by a deterministic integer causeway whose prime positions become illuminated landmarks, its formerly continuous atlas slab has been separated into scenery-aware foreground regions, and two unreferenced random-canvas background experiments were removed.
- Discrete Mathematics now behaves as a four-lens hub around one finite specimen: set membership, graph connection, combinatorial arrangement, and recursive construction. Its four live routes come from the curriculum registry, vocabulary is registered at the narrowest nodes, navigation precedes the preserved graph builder, and the former random network/remote-photo implementation world has become a deterministic discrete-structure drafting table.
- Set Theory is now a bounded six-lesson root unit rather than a client-heavy topic panel or an endlessly subdivided taxonomy. Its overview workshop follows Explain → Do → Check: the Venn-operation strength is preserved as a membership scanner with number, library, and disjoint presets; the page teaches four membership regions before notation, distinguishes elements from subsets, adds a real-world transfer check and deterministic generated practice, and contributes difference, empty-set, and disjoint-set vocabulary through the registry. Its random canvas and remote hero were replaced by a deterministic classification conservatory.
- Graph Theory is now a bounded six-lesson root unit rather than a client-heavy algorithm showcase. One canonical seven-vertex campus graph powers its network-drafting background, worked model, degree ledger, BFS/DFS traversal, and connectivity transfer; the former random maze, random constellation, remote hero, implementation chrome, and isolated glossary were removed. The parent graph builder remains available as a distinct construction tool, while the root adds deterministic degree/handshake practice and curriculum-owned vocabulary.
- Recursion & Recurrence is now a bounded six-lesson root unit rather than a whole-page client demo. The stable route is preserved while the learner-facing terminology is corrected. One canonical three-disk Hanoi system coordinates the deterministic recursive-stair world, seven-move register, call/return trace, recurrence ledger, guided/manual workbench, and checks; the old remote hero, joke definition, arbitrary unit code, random canvas loop, implementation labels, and isolated glossary were removed. Deterministic practice and six stable vocabulary terms complete the curriculum bundle.

### Active Mathematics family target

- Continue to the remaining Mathematics families after rendered verification of the completed Discrete Mathematics root layer.

The Discrete Mathematics parent and all four root units are structurally refined. Their planned direct lessons remain non-clickable until each lesson is substantive; no deeper placeholder taxonomy is required.

### Completed bounded-rotation checkpoint

- Natural Science → Earth Science → Mineralogy

After the coherent Graph Theory pass, production rotated from a Formal Science unit/network world to a Natural Science reference/specimen world. Mineralogy preserves its composition → structure → property → identification throughline while replacing the random shard cloud and isolated four-specimen demo with a deterministic crystal cabinet, a reviewed teaching collection, disciplinary facets, source-linked records, and a co-visible comparison ledger.

### Completed bounded-rotation checkpoint

- Humanities → Literature → Narrative & Fiction

The existing Literature reading room is preserved as a hub instead of being cosmetically replaced. Narrative & Fiction activates the hub's first honest child and bounds the unit at six planned lessons: narrator and perspective; story, plot, and time; character and desire; setting and world; scene, conflict, and structure; genre and convention. A deterministic four-event station story coordinates the background, worked registers, disclosure editor, reader-knowledge ledger, and transfer check. Its curriculum-owned vocabulary aggregates upward into Literature through the first Humanities vocabulary scope.

### Completed bounded-rotation checkpoint

- Formal Science → Mathematics → Discrete Mathematics → Recursion & Recurrence

The return pass preserves Hanoi and the self-similar recursive world while changing the macro-composition to a vertical call/return spine and the interaction to an exact deterministic trace plus legal manual play.

### Completed bounded-rotation checkpoint

- Applied Science → Medicine → Anatomy & Physiology

The parent-first repair preserves the nested structure–function scale, regional scanner, and Skeletal System route while replacing the handwritten partial map with a registry-owned layer of two foundations and the conventional eleven organ systems. Six functional study families teach relationships without adding false hierarchy. The page and its Skeletal child now use deterministic human-study and radiograph worlds instead of random full-screen canvases; Medicine, Anatomy & Physiology, and Skeletal vocabulary aggregate through the first Applied Science vocabulary scope; and a three-case evidence check tests structure–function, region-versus-system, and organization-scale reasoning. Rendered verification remains required.

Next, rotate to **Social Science → Geography** for a contrasting spatial-evidence hub audit before returning to another medical system.

---

## 6. Site-wide audit waves

After Algebra, proceed by coherent branches rather than random pages.

The complete route inventory and site-wide remaster acceptance criteria now live in `docs/site-remaster-audit.md`. Every route is in scope, but work remains branch-by-branch so ontology, family resemblance, and preserved strengths are repaired together instead of applying a global cosmetic skin.

### Wave 2: Remaining Mathematics · active

- Foundations
- Geometry and descendants: parent developed
- Calculus: parent developed
- Statistics: parent developed
- Number Theory: structurally refined; rendered verification required
- Discrete Mathematics: parent and all four root units structurally refined; rendered verification required
- Applied Mathematics: parent developed
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

For normal production, apply this as bounded rotation: finish and publish a coherent bundle, then prefer a contrasting branch or page kind before repeating the same academic world. Record the return target so variety does not become random abandonment.

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
