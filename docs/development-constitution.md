# Education Station 64 Development Constitution

This is the operating contract for autonomous and collaborative page development. It sits above individual page briefs and works alongside the Design Constitution, Academic World Design Contract, Educational Content Playbook, Atomic Lesson Constitution, Scene Composition rules, and Page Foundry.

The purpose is to turn repeated feedback into durable production defaults.

> **A development pass is complete only when the correct parent structure exists, the learner can navigate it, the interaction is coherent, the visual system protects attention, validation passes, and the commit is pushed.**

---

## 1. Build from parent to child

- Stabilize a subject or branch parent before expanding its children.
- A child page should inherit a trustworthy ancestry, sidebar position, breadcrumb path, environmental family, and navigation context.
- Do not produce a deep collection of polished descendants beneath a weak or misleading parent.
- When a child exposes a missing parent rule, repair the parent in the same development round before adding more descendants.
- The curriculum registry, filesystem route, sidebar ancestry, and page-local breadcrumbs must agree before deeper work continues.

### Parent-first gate

Before beginning a child page, verify:

1. its direct parent route exists and communicates the branch;
2. the parent exposes the child as a direct destination or an unmistakable planned node;
3. the parent background and composition establish a family the child can specialize;
4. sibling relationships are visible and accurate.

---

## 2. Navigation comes before demonstrations on non-lesson pages

- Subject hubs, branch hubs, unit pages, reference pages, and tool pages must make their direct-child navigation prominent near the top.
- Demonstrations, widgets, examples, principles, and reference blurbs may support navigation, but may not visually impersonate it.
- Direct destinations need stronger route affordances than explanatory content: explicit section labels, route arrows, open/planned states, and predictable placement.
- Non-navigation regions should say what they are when ambiguity is plausible, for example `reference, not navigation`, `evaluation criteria`, or `worked example`.
- Planned nodes must remain visible as ontology without behaving like active links.

---

## 3. Component form must reveal component role

Navigation, instruments, explanation, reference, metrics, and status should not all use the same rounded card grammar.

- **Navigation** uses route affordances, hierarchy labels, destination states, and directional movement.
- **Interactive instruments** keep controls, visual response, state, and interpretation together.
- **Reference material** uses quieter bands, ledgers, callouts, tables, or continuous strips without route arrows or destination hover behavior.
- **Metrics** use compact aligned readouts rather than full navigation-sized panels.
- **Explanations** use prose rhythm and local emphasis, not a grid of pseudo-buttons.
- **Status** uses badges, markers, or inline labels rather than destination-shaped containers.

If two neighboring regions have different jobs, they should differ in at least two of these: silhouette, spacing, border treatment, motion, icon placement, typography, hover behavior, or internal alignment.

---

## 4. One signature widget, one coherent learner question

- A signature widget should answer one coherent question through one reasoning loop.
- Keep prompt, controls, visual response, result, and interpretation within the same functional field.
- Split graph traversal, sorting, complexity, or similarly independent ideas into separate widgets rather than tabbing unrelated laboratories inside one shell.
- Shared state is appropriate only when the concepts genuinely depend on one another.
- A widget may contain multiple views when they are representations of the same phenomenon, not merely neighboring topics.
- At 1440×900, the complete primary reasoning loop should normally fit beneath the anchored header.
- At 1366×768, controls and consequence must remain visible together even when supporting prose moves below.

---

## 5. Academic worlds have attention modes

Every behavioral background should be designed in one of three attention modes for a given page region:

### Ambient

Slow, legible motion establishes subject identity without competing with reading or controls.

### Showcase

The world becomes a primary explanatory object inside a reserved stage or world window. Motion may be richer because the learner is attending to it directly.

### Quiet

During dense manipulation, assessment, or precision reading, motion reduces, pauses, or simplifies while preserving the page identity.

Rules:

- Foreground-to-background synchronization is optional, not automatic.
- Synchronize only when the background clarifies the same concept at a useful timescale.
- Do not mirror every slider tick, queue mutation, comparison, or keystroke into the full viewport.
- Prefer scene-level, section-level, or settled-state transitions over high-frequency reactive motion.
- Background behavior must remain meaningful when reduced motion is enabled.
- A memorable environment can be calm. Spectacle is not measured in frame velocity.

---

## 6. Scale transformations must be honest and explicit

- Use a linear scale when the learner is comparing absolute magnitude unless the transformation itself is the lesson.
- Logarithmic, normalized, indexed, or otherwise transformed axes must be labeled directly on the chart.
- Do not use a transformed scale that visually erases the distinction the surrounding explanation claims to teach.
- When a linear chart compresses smaller values near the baseline, preserve them through exact readouts, a table, or a clearly labeled secondary detail view.
- Separate asymptotic family from machine-specific runtime, constant factors, and implementation effects.

### Scale check

Ask:

1. What quantity is on each axis?
2. Is either axis transformed?
3. Does the display support the intended comparison?
4. Are exact values available when the visual scale compresses them?

---

## 7. Parent and child environments should rhyme, not duplicate

- A parent establishes the branch's broad environmental family.
- A child specializes one behavior, mechanism, scale, or material from that family.
- Neighboring children should not reuse the same dominant motion grammar with different colors.
- Parent pages should usually be calmer and more navigational; child lessons and tools may become more focused and mechanistic.
- Grayscale structure should still distinguish the pages.

---

## 8. Validation and publishing are part of implementation

A code change is not complete while it exists only as a local file, patch, unreferenced blob, draft tree, or unpushed commit.

The required closeout sequence is:

1. run available syntax, type, readability, and production-build checks;
2. create the commit on the intended branch;
3. push or move the branch ref;
4. verify the remote branch points to the new commit;
5. inspect the triggered build result;
6. report the commit and honest validation status.

Do not describe an unpublished change as made, completed, live, or implemented. Use `planned`, `prepared`, or `not yet published` only when the user explicitly asked for design work without repository mutation.

For this project, the default branch for active page development is `studio` unless the user says otherwise.

---

## 9. Production sequence

For each substantial page round:

1. **TREE**: inspect ancestry, parent, direct children, live routes, planned routes, and registry state.
2. **PARENT**: repair or establish the parent before deeper child expansion.
3. **NAVIGATION**: make direct descent prominent before secondary content.
4. **QUESTION**: define one center of gravity and one learner question per signature widget.
5. **GRAMMAR**: choose distinct visual roles for navigation, instruments, reference, metrics, and explanation.
6. **WORLD**: choose ambient, showcase, and quiet behavior with an explicit motion budget.
7. **SCALE**: verify axes, transformations, units, and comparisons.
8. **FRAME**: test viewport budget, readability, responsive fallback, and stable geometry.
9. **VALIDATE**: run the repository checks.
10. **PUBLISH**: commit, push to `studio`, verify the remote ref, and inspect CI.

No page round advances to the next target before step 10.

---

## 10. Definition of done

A substantial development pass is done only when:

- the parent is coherent before the child is expanded;
- direct-child navigation is prominent on non-lesson pages;
- navigation and non-navigation components are unmistakably different;
- independent learner questions use independent widgets;
- controls and consequences remain together;
- the background is visible, subject-specific, and attention-aware;
- reactive motion does not compete with the active task;
- chart scales and transformations are honest and labeled;
- the route, curriculum, sidebar, and breadcrumbs agree;
- readability and responsive geometry meet the shared rules;
- available validation succeeds or any failure is reported precisely;
- the commit is pushed and the remote branch is verified.

The repository, not an invisible workspace, is the source of truth the user can inspect.
