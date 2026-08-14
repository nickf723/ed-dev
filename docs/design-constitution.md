# Education Station 64 Design Constitution

This is the binding production contract for page design across Education Station 64.

The Design Docket is the deeper visual/product reference. The Educational Content Playbook governs pedagogy. The Atomic Lesson Constitution governs atomic lesson structure. This document is the fast contract we use on **every page build** so we do not rediscover the same corrections through repeated screenshot tweaks.

Its purpose is simple:

> **Decide the hierarchy, visual grammar, navigation topology, atmosphere, and page density before polishing individual components.**

A page should normally reach a coherent first version in one substantial development pass, followed by verification, not a chain of small corrective edits.

---

## 1. Ontology comes before layout

The page must express the actual knowledge hierarchy, not the most convenient set of links to place on screen.

- Primary navigation on a hub should expose its **direct children**.
- Do not promote grandchildren into peer status merely because they are useful or already built.
- A deeper descendant may be previewed inside its parent region, but it must remain visually subordinate to that parent.
- Conceptual cross-links are allowed, but they must look like cross-links rather than primary ancestry navigation.
- Breadcrumbs, sidebar nesting, page-local navigation, and curriculum ancestry must agree.
- If the hierarchy feels unintuitive, fix the curriculum model before styling around it.

### Hierarchy test

Ask:

1. What is this page's parent?
2. What are its direct children?
3. Which visible destinations are grandchildren or cross-links?
4. Does the composition make those relationships obvious without reading explanatory copy?

If a learner could reasonably infer the wrong parent-child relationship from the layout, the page fails this gate.

---

## 2. Route, curriculum, and sidebar are one change

Creating an academic route is not complete until the curriculum registry knows where it belongs.

- New, moved, or deleted academic pages must update the relevant curriculum module in the **same development pass**.
- The sidebar is derived from the curriculum registry. Do not hand-edit `Sidebar.tsx` to surface a new academic child.
- A live child should appear in the sidebar automatically once it is registered as active.
- Planned nodes may exist in the curriculum as placeholders, but must not masquerade as live navigation.
- Substantial subject branches should use a focused curriculum module under `lib/curriculum/...` rather than repeatedly expanding the broad migration tree.
- When a live route moves, preserve the old route with a redirect when practical.
- Page-local breadcrumbs and ancestry should be derived from curriculum context whenever the architecture supports it.

### Route-completeness test

A route is not done until all four agree:

`filesystem route = curriculum node = sidebar ancestry = page breadcrumbs`

---

## 3. Navigation topology should teach the subject structure

A rectangular card grid is a fallback, not the default navigation design.

Choose the visual topology that matches the relationship being taught:

- **Hierarchy:** tree, atlas, constellation, nested regions, branching diagram.
- **Sequence or prerequisite path:** timeline, route, stepping path, progression rail.
- **Scale:** spectrum, zoom ladder, magnitude axis, nested scale bands.
- **Containment:** nested regions, set-like enclosures, part-whole composition.
- **Process:** flow, pipeline, cycle, state machine, transformation path.
- **Spatial subject:** map, field, anatomical layout, coordinate space.
- **Comparison:** matrix, aligned columns, shared-axis comparison.
- **True flat peers:** grid or cards.

Cards may still label nodes or hold local summaries. They should not automatically become the whole composition.

### Shape test

Before coding a hub, finish this sentence:

> The structure of this subject is best understood as a ______, so the page navigation will behave like a ______.

If the second blank is always “grid,” stop and reconsider.

---

## 4. Page depth determines the job

The deeper the page, the more specific and instructional it should become.

- **Domain / subject hub:** reveal the field's ontology and major relationships.
- **Branch hub:** explain the branch's internal structure and route learners to its direct children.
- **Unit page:** present the throughline and deliberate lesson sequence.
- **Atomic lesson:** teach one coherent idea through Explain -> Do -> Check.
- **Reference / tool:** optimize retrieval or application rather than pretending to be a lesson.

Do not make a hub behave like a lesson dashboard. Do not make an atomic lesson behave like a directory.

---

## 5. The top context must stay anchored

Long pages should preserve local orientation while the learner scrolls.

- The local context layer should normally remain sticky or otherwise anchored below the global shell.
- At minimum, ancestry and current page identity must remain easy to recover without scrolling back to the top.
- A large hero may scroll away, but a compact context/header state should remain when useful.
- Sticky UI must reserve clearance and may never cover headings, equations, controls, feedback, or breadcrumbs.
- On smaller screens, reduce sticky height before sacrificing content area.
- A sticky bar should use translucency and local theme cues, not become an opaque slab that disconnects the page from its background.

### Anchor test

Scroll halfway down the page. Can the learner still answer “where am I?” and “what branch am I in?” immediately?

---

## 6. Backgrounds must be visibly alive

A background is part of the page identity, not an almost-invisible texture hidden beneath black panels.

- The subject background must be recognizable in a normal screenshot without squinting.
- If turning the background off barely changes the composition, it is too weak.
- Glass and panel surfaces must preserve enough transparency for the environment to participate.
- Avoid full-page dark overlays whose main effect is to erase the visual system underneath them.
- Dynamic motion is encouraged when it expresses the subject: trajectories, fields, waves, particles, flow, orbit, growth, diffusion, topology, chronology, or other meaningful structure.
- **Clarity is the floor, not a mandate for restraint.** When a subject naturally supports spectacle, the page may be flashy, saturated, animated, and dramatic as long as the spectacle communicates something true about the subject and preserves readability.
- A high-level subject or branch with a naturally dynamic visual language should aim for at least one **memorable environmental behavior**: a particle field, reactive atmosphere, field-line system, living map, wave environment, orbital structure, dynamic geometry, or equivalent subject-specific moment.
- Do not remove a distinctive legacy visual merely because it is less minimal than the new shell. Preserve it or replace it with something at least as memorable, intuitive, and semantically appropriate.
- Hover or selection may retune the background when that reinforces branch identity, as long as layout geometry remains stable.
- Motion should be perceptible but not frantic. Prefer slow continuous motion, phase shifts, drift, pulse, rotation, field movement, and smooth palette transitions.
- Respect reduced-motion preferences by preserving the visual state without requiring animation.
- Child pages may inherit the parent's environmental family, but should specialize the motif around the child concept.

### Background test

At default state and at one meaningful hover/selection state:

1. Is the background clearly visible?
2. Does it communicate subject identity rather than generic neon ambience?
3. Does it change enough to be noticed when the interaction is supposed to retune it?
4. Can all required text still be read comfortably?
5. Is there at least one visual behavior a learner is likely to remember after leaving the page?

---

## 7. Meaningful density beats both emptiness and clutter

A page should feel intentionally occupied, not sparse by accident and not filled with decorative fragments.

- Meaningful content should normally occupy most of the useful first viewport below the persistent shell.
- Do not leave large unexplained voids while the subject has useful relationships that could be shown.
- When a hub feels sparse, add **structure**, not filler: relationships, scales, overlaps, dependency paths, canonical examples, contrasts, shared principles, or a live inspector.
- Do not solve sparseness by adding another row of generic cards, pills, counters, or “quick facts.”
- A large panel must do real work: navigation, explanation, comparison, visualization, interaction, or subject-specific atmosphere.
- Allow the next meaningful section to enter the viewport rather than artificially stretching a weak section to fill height.
- If the page feels crowded, sequence or nest information before shrinking typography.

### Density test

Every major region should answer at least one of:

- What is this field?
- How is it organized?
- How do these ideas relate?
- Where should I go next?
- What should I notice or do?

If a region answers none of them, remove it.

---

## 8. Subject identity must be structural, not merely chromatic

A page is not unique because its accent changed from blue to orange.

Subject identity may come from:

- navigation geometry;
- background behavior;
- diagrams and models;
- typography or notation treatment;
- motion language;
- data organization;
- spatial composition;
- interaction mechanics;
- the relationship between foreground content and environment.

The global shell creates cohesion. The page's central visual grammar creates identity.

### Uniqueness test

If all accent colors were converted to grayscale, would the page still look meaningfully specific to its subject?

If not, the theme is too color-dependent.

---

## 9. One viewport needs one center of gravity

Every viewport should have an obvious primary object or learner question.

- Hubs may center an atlas, tree, timeline, map, spectrum, or other navigation structure.
- Lessons should center the main explanatory model or primary instrument.
- Supporting panels should frame the center, not compete with it.
- Avoid several equally loud card groups, dashboards, or unrelated interactives at once.
- Progressive disclosure is preferred when several rich ideas deserve attention.

The goal is not minimalism. The goal is **directed attention**.

---

## 10. Navigation relationships must look different

Do not use one visual treatment for every link.

- **Breadcrumb:** ancestry.
- **Parent / up:** one-level structural movement.
- **Direct child:** primary descent into the current branch.
- **Previous / next:** sequence among siblings.
- **Cross-link:** related idea outside the current ancestry path.
- **Planned node:** known ontology, unavailable route.

These relationships should differ in placement, labeling, or visual weight.

A large hub should not give a grandchild shortcut the same visual prominence as a direct child.

---

## 11. Mathematical and technical notation must render cleanly

Visible notation is content, not an implementation string.

- Mathematical expressions must use the shared math renderer (`M` / KaTeX or the current canonical equivalent).
- Never display raw LaTeX commands, escaped backslashes, regex artifacts, or developer-oriented formatting strings.
- Do not build visible equations through ad hoc regex replacement when a structured renderer exists.
- Test fractions, subscripts, superscripts, deltas, inequalities, vectors, units, and multiline notation before calling a page complete.
- Plain-text notation is acceptable only when it is intentionally plain language or a compact label that does not require mathematical typesetting.

### Notation test

Search the rendered page mentally for anything that would look like `\\frac`, `\\Delta`, escaped braces, or raw syntax. None should reach the learner.

---

## 12. Stable geometry, natural growth

- Hover may emphasize but should not reflow the page.
- Selection-dependent regions reserve enough space for their longest normal state.
- Instructional text and controls use natural document flow.
- `overflow: hidden` is for decorative geometry, not legitimate content.
- Use minimum heights plus growth instead of screenshot-specific hard heights.
- Let the owning component solve its geometry. Do not patch descendant layouts from global CSS.
- Test narrower desktop widths and zoomed text before concluding that a fixed composition is safe.

---

## 13. The default page production flow

This is the normal workflow for a new or substantially remastered page.

### Pass 1: Structure

Before styling:

1. classify the page type;
2. inspect parent, siblings, direct children, prerequisites, and live descendants;
3. update or create the focused curriculum module;
4. decide which routes are live, planned, moved, or redirected;
5. confirm the sidebar hierarchy that should result.

### Pass 2: Page contract

Define:

- the page's one-sentence job;
- its primary learner/user question;
- its direct-child navigation;
- its main relationships to show;
- what belongs on deeper pages instead.

For atomic lessons, complete the seven-line lesson brief and storyboard from the Atomic Lesson Constitution.

### Pass 3: Visual grammar

Decide before coding polish:

- navigation topology;
- center of gravity;
- subject-specific structure;
- background motif and dynamic behavior;
- local accent palette;
- anchored header/context behavior;
- how the first viewport will be meaningfully occupied.

### Pass 4: Build the structural version

Implement:

- route and registry together;
- semantic breadcrumbs/context;
- primary navigation topology;
- main model / content / instrument;
- live versus planned states;
- responsive fallback that preserves hierarchy.

Do not spend this pass micro-tuning glows and borders.

### Pass 5: Atmosphere and composition

Tune:

- background visibility and motion;
- glass transparency;
- typography and spacing;
- panel hierarchy;
- selected/hover states;
- meaningful density;
- subject-specific detail;
- memorable truthful spectacle when the subject supports it.

### Pass 6: Preflight

Run the checks below before asking for screenshot feedback.

---

## 14. The TREE / FRAME / FIELD / FLOW preflight

### TREE: Is the knowledge structure correct?

- registry ancestry is correct;
- sidebar follows automatically;
- breadcrumbs match;
- primary hub navigation uses direct children;
- grandchildren and cross-links are not promoted into false peers;
- moved routes redirect when needed.

### FRAME: Is the page physically composed?

- top context remains anchored when useful;
- no large accidental voids;
- first viewport has a clear center of gravity;
- required text meets readability floors;
- no clipping, overlap, or unstable hover geometry;
- responsive fallback preserves the structure.

### FIELD: Does the page have a real environment?

- background is visible at a glance;
- background motif belongs to the subject;
- dynamic behavior is noticeable but readable;
- glass surfaces reveal the environment;
- grayscale structure still feels subject-specific;
- cleanup has not sterilized a distinctive visual behavior that should have been preserved or evolved.

### FLOW: Can the learner move and understand naturally?

- link styling communicates relationship type;
- hub descent follows the ontology;
- lessons follow Explain -> Do -> Check;
- controls and consequences stay together;
- notation renders cleanly;
- live and planned states are unmistakable.

A page should pass all four groups before small aesthetic tweaks become the main work.

---

## 15. Stop the micro-edit loop

A repeated correction is evidence that the rule is missing or the wrong layer is being fixed.

- If the same issue appears on two pages, update this constitution, the Design Docket, the Atomic Lesson Constitution, or the architecture documentation before building the third.
- If a page requires two rounds of “make it less sparse,” “make the background visible,” “fix the hierarchy,” or “stop using generic cards,” stop patching and revisit the visual grammar / topology decision.
- If a route exists but navigation is wrong, inspect the curriculum registry before editing presentation code.
- If every page needs the same local fix, promote the behavior into a shared component or shell contract.
- If every page looks the same, the shell has swallowed the subject identity.
- If every page looks unrelated, local identity has swallowed the shell.

The constitution exists so we can move quickly **because the defaults are already decided**.

---

## 16. Definition of done for a substantial page pass

Before moving immediately to the next page, verify:

- ontology and direct-child hierarchy are correct;
- route and curriculum registry shipped together;
- sidebar and breadcrumbs reflect that hierarchy;
- navigation topology expresses the subject relationship rather than defaulting to a card grid;
- local context remains anchored on long pages when appropriate;
- the background is visible and meaningfully subject-specific;
- dynamic background behavior works where specified;
- a naturally visual subject has at least one memorable visual behavior rather than being reduced to generic glass panels;
- the page is neither accidentally sparse nor padded with filler;
- first viewport has one clear center of gravity;
- live, planned, parent, child, sequence, and cross-link relationships are visually distinct;
- technical/math notation contains no raw rendering artifacts;
- legitimate content states do not clip or overlap;
- narrower desktop and mobile fallbacks preserve hierarchy;
- available build/type checks pass;
- the page has been visually verified when preview capability is available.

If these are true, move on. Do not polish indefinitely.

---

## 17. Relationship to the other rule documents

When guidance overlaps:

1. Accuracy and curriculum ontology win first.
2. This Design Constitution defines the fast production defaults for every page.
3. The Atomic Lesson Constitution defines lesson structure and workflow for atomic lessons.
4. The Educational Content Playbook supplies broader pedagogical guidance.
5. The Design Docket supplies deeper visual/product guidance and edge cases.
6. The Page Planning Template records the page-specific plan.
7. Site Architecture defines source-of-truth and implementation boundaries.

The purpose of this document is not to add bureaucracy. It is to make **rapid page production predictable**.