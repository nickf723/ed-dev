# Education Station 64 Development Constitution

This is the operating contract for autonomous and collaborative page development. It works alongside the Design Constitution, Academic World Design Contract, Educational Content Playbook, Atomic Lesson Constitution, Scene Composition rules, and Page Foundry.

The purpose is to turn repeated feedback into durable production defaults.

> **A development pass is complete only when the correct parent structure exists, the learner can navigate it, the interaction is coherent, the visual system protects attention, every design gate passes simultaneously, existing strengths are preserved, validation succeeds, and the commit is pushed.**

---

## 1. Build from parent to child

- Stabilize a subject or branch parent before expanding its children.
- A child page should inherit trustworthy ancestry, sidebar position, breadcrumb path, environmental family, and navigation context.
- Do not produce a deep collection of polished descendants beneath a weak or misleading parent.
- When a child exposes a missing parent rule, repair the parent in the same development round before adding more descendants.
- The curriculum registry, filesystem route, sidebar ancestry, and page-local breadcrumbs must agree before deeper work continues.

### Parent-first gate

Before beginning a child page, verify:

1. its direct parent route exists and communicates the branch;
2. the parent exposes the child as a direct destination or unmistakable planned node;
3. the parent background and composition establish a family the child can specialize;
4. sibling relationships are visible and accurate.

---

## 2. Navigation comes before demonstrations on non-lesson pages

- Subject hubs, branch hubs, unit pages, reference pages, and tool pages must make direct-child navigation prominent near the top.
- Demonstrations, widgets, examples, principles, and reference blurbs may support navigation, but may not visually impersonate it.
- Direct destinations need stronger route affordances than explanatory content: explicit section labels, route arrows, open or planned states, and predictable placement.
- Non-navigation regions should say what they are when ambiguity is plausible, for example `reference, not navigation`, `evaluation criteria`, or `worked example`.
- Planned nodes remain visible as ontology without behaving like active links.
- Prominent navigation does not mean a solid wall. A route atlas, stack, timeline, map, or field should preserve the academic world around it.

---

## 3. Component form must reveal component role

Navigation, instruments, explanation, reference, metrics, and status should not all use the same rounded-card grammar.

- **Navigation** uses route affordances, hierarchy labels, destination states, and directional movement.
- **Interactive instruments** keep controls, visual response, state, and interpretation together.
- **Reference material** uses quieter bands, ledgers, callouts, tables, or continuous strips without route arrows or destination hover behavior.
- **Metrics** use compact aligned readouts rather than navigation-sized panels.
- **Explanations** use prose rhythm and local emphasis, not a grid of pseudo-buttons.
- **Status** uses badges, markers, or inline labels rather than destination-shaped containers.

If neighboring regions have different jobs, they should differ in at least two of these: silhouette, spacing, border treatment, motion, icon placement, typography, hover behavior, or internal alignment.

### Glass treatment

- Glass separates foreground from world through **moderate local blur and saturation before added opacity**.
- Use enough blur to soften moving detail behind text, generally around 8 to 18 pixels depending on density.
- Do not turn glass into opaque plastic. Background silhouettes, color, and subject-specific motion must remain legible through the surface.
- Use stronger blur behind dense controls and sustained reading; use lighter blur around navigation, labels, and open scene furniture.
- Blur is not a substitute for hierarchy. A beautifully frosted wall is still a wall.

---

## 4. One signature widget, one coherent learner question

- A signature widget should answer one coherent question through one reasoning loop.
- Keep prompt, controls, visual response, result, and interpretation within the same functional field.
- Split graph traversal, sorting, complexity, or similarly independent ideas into separate widgets rather than tabbing unrelated laboratories inside one shell.
- Shared state is appropriate only when the concepts genuinely depend on one another.
- A widget may contain multiple views when they are representations of the same phenomenon, not merely neighboring topics.
- At 1440 by 900, the complete primary reasoning loop should normally fit beneath the anchored header.
- At 1366 by 768, controls and consequence remain visible together even when supporting prose moves below.

---

## 5. Academic worlds have attention modes

Every behavioral background should be designed in one of three attention modes for a given page region.

### Ambient

Slow, legible motion establishes subject identity without competing with reading or controls.

### Showcase

The world becomes a primary explanatory object inside a reserved stage or world window. Motion may be richer because the learner is attending to it directly.

### Quiet

During dense manipulation, assessment, or precision reading, motion reduces, pauses, or simplifies while preserving page identity.

Rules:

- Foreground-to-background synchronization is optional, not automatic.
- Synchronize only when the background clarifies the same concept at a useful timescale.
- Do not mirror every slider tick, queue mutation, comparison, or keystroke into the full viewport.
- Prefer scene-level, section-level, settled-state, or slow aggregate transitions over high-frequency reactive motion.
- Background behavior remains meaningful when reduced motion is enabled.
- A memorable environment can be calm. Spectacle is not measured in frame velocity.
- Increasing blur must not be paired with stronger black overlays that erase the world.

### Memorable-background gate

A background must be both **exciting enough to remember and calm enough to ignore when the learner needs to focus**.

- Give each subject one dominant environmental idea before adding secondary effects. A torch revealing stratigraphy, a weather field bending around pressure, or a globe carrying migration flows is stronger than six unrelated particle systems.
- The dominant idea should be recognizable in a static screenshot. Motion enriches the scene; it cannot be the only reason the scene is interesting.
- Prefer composed focal scenery, silhouettes, depth, layers, terrain, diagrams, or large-scale structures over evenly distributed dots, circles, generic grids, and ambient noise.
- Decorative particles may support a scene but may not be the scene.
- Keep most ambient cycles slow enough to read as environmental change rather than UI activity. Avoid flicker, rapid pulsing, constant full-screen response, or several equally fast systems competing at once.
- Dense widget regions need quiet pockets. Background complexity should fall behind sustained reading and precision controls without disappearing from the rest of the viewport.
- Excitement comes from a truthful visual transformation, reveal, scale shift, physical process, spatial metaphor, or memorable composition, not from increasing animation count.
- Neighboring pages must differ in dominant silhouette and behavior, not merely palette.

Before publishing, ask: **What single background behavior or scene would someone remember ten minutes after leaving this page?** If the answer is only “moving particles” or “a glowing grid,” the world is not finished.

---

## 6. Density and world visibility are simultaneous requirements

The design gates are conjunctive, not tradeable.

- Do not expose the background by leaving large unexplained voids.
- Do not fix sparseness by covering the world with opaque slabs.
- Add relationships, comparison, evidence, structure, and meaningful interaction before adding filler.
- Use composition, staggered widths, scenery corridors, local scrims, and glass blur to keep the page occupied while the world remains visible.
- A first viewport should contain one clear center of gravity, prominent navigation when appropriate, meaningful supporting structure, and a recognizable environmental behavior.
- A page fails if hierarchy, density, readability, world visibility, directed attention, component distinction, or viewport usability is sacrificed to improve another.

---

## 7. Scale transformations must be honest and explicit

- Use a linear scale when comparing absolute magnitude unless the transformation itself is the lesson.
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

## 8. Parent and child environments should rhyme, not duplicate

- A parent establishes the branch's broad environmental family.
- A child specializes one behavior, mechanism, scale, or material from that family.
- Neighboring children should not reuse the same dominant motion grammar with different colors.
- Parent pages are usually calmer and more navigational; child lessons and tools may become more focused and mechanistic.
- Grayscale structure should still distinguish the pages.

---

## 9. Existing-page preservation is a hard gate

An existing page is not a blank canvas. Its successful traits are part of the product contract.

Before changing an existing page, inventory its distinctive systems:

- background engine and motion grammar;
- navigation topology and spatial composition;
- signature widgets and interactions;
- typography, imagery, material language, and component silhouettes;
- useful content, data, examples, and route relationships;
- responsive behaviors and memorable visual moments.

Rules:

- The requested adjustment defines the maximum scope. A request for blur, readability, spacing, navigation emphasis, or one widget fix does **not** authorize a page remaster.
- Default to surgical evolution. Preserve the page's identity and change the smallest layer that solves the problem.
- Do not delete, replace, flatten, or genericize a distinctive system unless the user explicitly requested its removal or the replacement preserves every valued capability and is demonstrably stronger in the same dimensions.
- New shared conventions must wrap around successful local identity rather than overwrite it.
- When a global rule conflicts with a page's proven strength, satisfy both through composition or a local exception. Do not silently trade one away.
- If the value of an existing feature is uncertain, keep it and build beside it until comparison is possible.
- Compare the before and after page, not merely the new code in isolation. A change fails when the new version is cleaner but less distinctive, less useful, less legible, less navigable, less complete, or less memorable.
- Restoration of accidentally removed strengths takes priority over further page expansion.

### Preservation gate

Before publishing an existing-page change, verify:

1. Which distinctive systems existed before the edit?
2. Which were intentionally changed, and why was that within scope?
3. Is every untouched strength still present and functioning?
4. Does the new version add value without erasing identity?
5. Would a user familiar with the page recognize it as an evolution rather than an unrelated replacement?

---

## 10. Validation and publishing are implementation

A code change is not complete while it exists only as a local file, patch, unreferenced blob, draft tree, or unpushed commit.

The required closeout sequence is:

1. run available syntax, type, readability, and production-build checks;
2. create the commit on the intended branch;
3. push or move the branch ref;
4. verify the remote branch points to the new commit;
5. inspect the triggered build result;
6. report the commit and honest validation status.

Do not describe an unpublished change as made, completed, live, or implemented. For this project, the default branch for active page development is `studio` unless the user says otherwise.

---

## 11. Production sequence

For each substantial page round:

1. **PRESERVE**: inventory the existing page's distinctive systems and constrain the edit to the requested scope.
2. **TREE**: inspect ancestry, parent, direct children, live routes, planned routes, and registry state.
3. **PARENT**: repair or establish the parent before deeper child expansion.
4. **NAVIGATION**: make direct descent prominent before secondary content.
5. **QUESTION**: define one center of gravity and one learner question per signature widget.
6. **GRAMMAR**: choose distinct visual roles for navigation, instruments, reference, metrics, and explanation.
7. **WORLD**: choose one memorable environmental idea, then assign ambient, showcase, and quiet behavior with an explicit motion budget.
8. **GLASS**: set local blur and opacity together so text separates without erasing the world.
9. **DENSITY**: add meaningful structure while preserving visible scenery corridors.
10. **SCALE**: verify axes, transformations, units, and comparisons.
11. **FRAME**: test viewport budget, readability, responsive fallback, stable geometry, background memorability, and before-versus-after preservation.
12. **VALIDATE**: run repository checks.
13. **PUBLISH**: commit, push to `studio`, verify the remote ref, and inspect CI.

No page round advances to the next target before step 13.

---

## 12. Definition of done

A substantial development pass is done only when:

- the parent is coherent before the child is expanded;
- direct-child navigation is prominent on non-lesson pages;
- navigation and non-navigation components are unmistakably different;
- independent learner questions use independent widgets;
- controls and consequences remain together;
- the page is meaningfully dense without filler;
- the background is visible, subject-specific, attention-aware, and memorable in a static composition;
- one dominant environmental idea carries the background instead of generic ambient noise;
- glass blur separates content without turning the page opaque;
- reactive motion does not compete with the active task;
- chart scales and transformations are honest and labeled;
- route, curriculum, sidebar, and breadcrumbs agree;
- readability and responsive geometry meet the shared rules;
- every successful pre-existing system outside the requested scope remains intact;
- the page is an evolution of its established identity rather than a generic replacement;
- every design gate passes at the same time;
- available validation succeeds or any failure is reported precisely;
- the commit is pushed and the remote branch is verified.

The repository, not an invisible workspace, is the source of truth the user can inspect.
