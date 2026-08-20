# Education Station 64 Development Constitution

This is the operating contract for autonomous and collaborative page development. It works alongside the Design Constitution, Academic World Design Contract, Educational Content Playbook, Atomic Lesson Constitution, Scene Composition rules, and Page Foundry.

The purpose is to turn repeated feedback into durable production defaults.

> **A development pass is complete only when the correct parent structure exists, the learner can navigate it, the interaction is coherent, the visual system protects attention, every design gate passes simultaneously, existing strengths are preserved, validation succeeds, and the commit is pushed.**

## Product north star

Education Station 64 exists to **explain and model anything a person can learn, intuitively and inside an honest, navigable ontology**.

That creates six simultaneous product responsibilities:

1. organize knowledge so the learner can understand where an idea belongs;
2. teach ideas through accurate mental models, explanation, action, and assessment;
3. expose real things through references, collections, repositories, media, maps, and data;
4. make every subject memorable through a distinct academic world and interaction grammar;
5. derive shared product behavior—sidebar, ancestry, vocabulary, assessment contracts, and validation—from stable semantic data;
6. preserve and improve older pages as the system evolves instead of only expanding outward.

The number **64 is brand identity, not an ontology quota**. Fields are promoted because their questions, methods, evidence, practices, and child curriculum justify first-order status—not to satisfy a count.

Formal Science, Natural Science, Social Science, Humanities, and Applied Science are the five canonical knowledge branches. Interdisciplines is a relational atlas that reveals meaningful connections and points to canonical homes; it does not own duplicate versions of fields.

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

### Complete curriculum-bundle gate

A new or substantially rebuilt page is one coherent curriculum contribution. The development pass must account for:

- route and redirect behavior;
- curriculum node, stable ID, canonical parent, status, and page kind;
- automatically derived sidebar ancestry and page context;
- the vocabulary introduced by this page and inherited by its ancestors;
- the assessment or retrieval contract appropriate to the page kind;
- the page's unique academic world, foreground topology, and responsive behavior;
- citations, provenance, API adapters, collection facets, or simulation boundaries when used;
- tests, audits, visual-verification state, commit, push, and remote verification.

Do not create placeholder pages. A planned curriculum node may remain visible and non-clickable when it clarifies the ontology, but a route becomes active only when its page is substantive and functional.

---

## 2. Navigation comes before demonstrations on non-lesson pages

- Subject hubs, branch hubs, unit pages, reference pages, and tool pages must make direct-child navigation prominent near the top.
- Demonstrations, widgets, examples, principles, and reference blurbs may support navigation, but may not visually impersonate it.
- Direct destinations need stronger route affordances than explanatory content: explicit section labels, route arrows, open or planned states, and predictable placement.
- Non-navigation regions should say what they are when ambiguity is plausible, for example `reference, not navigation`, `evaluation criteria`, or `worked example`.
- Planned nodes remain visible as ontology without behaving like active links.
- Prominent navigation does not mean a solid wall. A route atlas, stack, timeline, map, or field should preserve the academic world around it.

### Umbrella-hub navigation gate

Broad labels such as Engineering, Culture, Biology, History, Technology, or Business usually describe an **umbrella field** rather than one lesson-sized idea. On those pages, choosing where to descend is normally the learner's primary task.

- The direct-child navigation should be the **largest and most memorable foreground object in the first useful viewport**, not a preamble before a widget.
- Keep the introductory definition compact enough that it does not delay route choice.
- A signature widget may still appear on a broad hub, but it should support the field after the learner understands its branches. It should not visually outrank the branch map unless the page has a specific pedagogical reason.
- The navigation itself should teach the structure of the field. Grouping, position, connection, scale, ordering, or material should communicate relationships among branches rather than merely listing them.
- A hub does not pass because navigation is technically near the top. It must *read* as the page's center of gravity.
- When several branches are planned rather than live, keep them visible so the field map remains honest, but make active destinations unmistakably stronger.

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

### Layout-diversity gate

A unique background is not enough if the foreground keeps repeating the same page skeleton.

Before developing or substantially revising a page, compare it with the nearest three to five recently developed pages. The new page should not default to the same macro-composition of `header → intro → card/grid navigation → widget → reference band` unless the academic structure genuinely demands it.

- Derive macro-layout from the subject: drafting board, archive shelf, stage, field notebook, score, map, catalog, timeline, workbench, specimen tray, courtroom, studio wall, or another academically meaningful topology.
- Navigation topology is part of subject identity. Do not repeatedly reuse the same centered atlas, symmetric left/right rails, three-column card bank, or radial hub with only different labels and colors.
- Neighboring pages should differ in at least **two macro-layout dimensions**: dominant axis, grouping logic, focal placement, navigation silhouette, foreground/background interlock, section rhythm, or scroll behavior.
- Vary large-scale composition before adding decorative variation. Changing border radius, icon color, or card tilt does not count as a distinct layout.
- Asymmetry must have a reason. Do not randomize positions merely to manufacture uniqueness.
- Mobile may collapse to a simpler reading order, but should preserve the navigation metaphor through labels, grouping, separators, or sequence.
- A page fails this gate when a grayscale wireframe of it could be mistaken for several neighboring pages.

### Glass treatment

- Glass separates foreground from world through **moderate local blur and saturation before added opacity**.
- Use enough blur to soften moving detail behind text, generally around 8 to 24 pixels depending on density; dense reading or control regions may use stronger local frost.
- Do not turn glass into opaque plastic. Background silhouettes, color, and subject-specific motion must remain legible through the surface.
- Use stronger blur behind dense controls and sustained reading; use lighter blur around navigation, labels, and open scene furniture.
- Blur is not a substitute for hierarchy. A beautifully frosted wall is still a wall.

### Text-background collision gate

Foreground text may share a scene with a rich academic world, but it may not compete with that world for basic legibility.

- Semantic text must not sit directly over detailed moving linework, diagram labels, high-contrast nodes, dense texture, or another readable text layer.
- Reserve **protected text lanes** using local frost, soft scrims, spatial clearance, background attenuation, or a dedicated strip before reaching for heavier opacity.
- A background connector, route, waveform, orbit, grid annotation, or decorative label must route around important headings and dense controls when practical. Do not let two information systems occupy the same visual channel.
- Prefer blur before darkness. Increase opacity only enough to establish figure/ground separation, and keep the world recognizable around the protected region.
- Text shadow, glow, or heavier font weight does not count as solving a collision when the underlying diagram is still visually competing.
- If a background contains its own labels or telemetry, treat them as real text during readability review. They may not hide behind foreground copy and remain legible enough to create accidental double-reading.
- On compact navigation cells, protect the complete label-and-description area rather than frosting only the icon or heading.
- In a still screenshot, a reviewer should be able to identify the foreground reading order without first mentally subtracting the background.

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

Every page, including the smallest atomic lesson or record, gets a deliberate local identity. A child may reuse a parent's environmental system or borrow a proven component, but it must specialize at least one meaningful academic behavior, representation, material, silhouette, or interaction. A palette swap alone is not specialization.

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

## Vocabulary inheritance contract

Vocabulary is curriculum data, not page decoration.

- Curate a page's terms at the narrowest curriculum node that actually teaches them.
- Use stable term IDs, concise canonical definitions, useful tags, and explicit relationships when relevant.
- A parent vocabulary scope is the deduplicated union of its own terms and descendant terms. Branch, domain, and global views therefore grow automatically as pages are added.
- Preserve source groups so a learner can tell which child topic contributed a term.
- When the same term appears in several descendants, prefer one canonical entry and contextual notes rather than silently competing definitions.
- A lesson-local presentation may exist, but it must consume or contribute to the same semantic vocabulary system rather than creating an isolated glossary fork.
- Adding a page without registering the vocabulary it introduces is an incomplete curriculum pass. A page that genuinely introduces no durable vocabulary should say so in its planning contract.

The current route-scoped vocabulary implementation is an evolutionary base. As branches are touched, migrate manual parent composition toward curriculum-node registration plus automatic descendant aggregation. Do not build a second vocabulary database.

## Assessment and practice contract

Every atomic lesson contains an explicit check of understanding. A strong lesson assessment has two complementary layers when the subject permits them:

1. **Insight / transfer:** prediction, construction, explanation, diagnosis, comparison, source reasoning, or a fresh case that reveals the learner's mental model.
2. **Fluency / retrieval:** a small amount of rote or procedural practice generated from constrained parameters and checked by deterministic code.

Rules:

- Assessment follows explanation and guided practice; it cannot substitute for either.
- Each item maps to the learner outcome and provides explanatory feedback.
- Generated tasks must have a transparent generator, bounded valid inputs, a deterministic solution/checker, edge-case tests, and reproducible cases for debugging.
- Prefer domain-authentic actions over universal multiple choice.
- Do not declare mastery from completion or one score. Report evidence and invite another case.
- Hubs, references, repositories, and tools do not need quiz-shaped endings, but they should support an appropriate evidence action: route choice, comparison, retrieval, classification, simulation, construction, or interpretation.

## Collections, repositories, and API contract

Collections connect abstract learning to real objects. Classify the collection before building it:

- **finite/completable:** a stable set such as the periodic table;
- **curated/open:** a deliberately selected window into a potentially limitless set such as zoological taxa or games;
- **federated/API-backed:** records normalized from one or more external providers;
- **modeled/playable:** records that include rules, components, procedures, comparison, or simulation.

Every collection defines:

- a stable internal record ID and canonical detail route;
- source and provenance for each externally derived fact or asset;
- a typed source adapter that separates provider data from presentation;
- useful facets derived from the subject—such as genre, publisher, release date, habitat, phylum, class, order, period, region, medium, or mechanic;
- text search, filter combination behavior, clear/reset behavior, and honest result counts;
- loading, empty, partial, stale, rate-limited, and error states;
- caching/revalidation and API cost boundaries;
- an accessible text alternative for visual maps, media, and diagrams;
- a detail view that teaches why the record matters rather than merely repeating provider metadata.

External APIs should enable memorable, truthful experiences—maps, current data, images, media, specimens, catalogs, or live comparisons—but core instruction may not disappear when a provider is unavailable. Cache stable data when lawful, keep a small curated local spine when appropriate, identify stale/fallback data, and never fabricate a successful response.

Reusable collection logic should standardize records, facets, queries, provenance, and failure states. It should not erase subject-specific filters, detail layouts, or academic interpretation.

## Additional development philosophies

- **Truth before completeness:** explain scope, uncertainty, model assumptions, and source limitations. A simulation declares what it does and does not model.
- **Progressive depth:** begin with an intuitive default, then allow richer controls, reference detail, and open exploration without hiding required content.
- **Evidence stays attached:** facts, claims, images, and measurements retain provenance close enough for a learner to inspect.
- **Accessibility is another representation:** keyboard access, reduced motion, readable text, semantic structure, and text alternatives are part of teaching quality.
- **Performance protects attention:** avoid shipping oversized client bundles, uncontrolled animation, or unnecessary API waterfalls that make the learning object feel sluggish.
- **Reuse semantics, not sameness:** share adapters, validators, feedback grammar, and state models; reinvent subject-specific worlds, topology, and interaction where that improves understanding.
- **Repair while expanding:** when work enters a branch, audit its parent and nearby legacy pages for structural debt, then make bounded improvements without derailing the current build.

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

Do not describe an unpublished change as made, completed, live, or implemented. For this project, work directly on `main` unless the user explicitly requests another branch or a temporary branch is required to assemble a safe coherent batch. Finished work must not remain unpushed.

---

## 11. Production sequence

For each substantial page round:

1. **PRESERVE**: inventory the existing page's distinctive systems and constrain the edit to the requested scope.
2. **TREE**: inspect ancestry, parent, direct children, live routes, planned routes, and registry state.
3. **PARENT**: repair or establish the parent before deeper child expansion.
4. **CONTRACT**: classify the page and define its learner, retrieval, or tool outcome.
5. **DATA**: define vocabulary, assessment, collection, provenance, and API contracts that apply.
6. **NAVIGATION**: make direct descent prominent before secondary content; on umbrella hubs, make navigation the first viewport's dominant object.
7. **TOPOLOGY**: choose a subject-derived navigation and macro-layout grammar that is visibly different from recent neighboring pages.
8. **QUESTION**: define one center of gravity and one learner question per signature widget.
9. **GRAMMAR**: choose distinct visual roles for navigation, instruments, reference, metrics, and explanation.
10. **WORLD**: choose one memorable environmental idea, then assign ambient, showcase, and quiet behavior with an explicit motion budget.
11. **GLASS**: set local blur and opacity together, create protected text lanes, and route background detail away from semantic copy without erasing the world.
12. **DENSITY**: add meaningful structure while preserving visible scenery corridors.
13. **SCALE**: verify axes, transformations, units, and comparisons.
14. **ASSESS / RETRIEVE**: verify the lesson check or collection retrieval loop, including feedback and failure states.
15. **FRAME**: test viewport budget, readability, text/background collisions, responsive fallback, stable geometry, background memorability, macro-layout distinctness, and before-versus-after preservation.
16. **VALIDATE**: run repository checks.
17. **PUBLISH**: commit and push the coherent batch to `main`, verify `origin/main` points to it, and inspect CI/deployment status when accessible.

No page round advances to the next target before step 17.

---

## 12. Definition of done

A substantial development pass is done only when:

- the parent is coherent before the child is expanded;
- direct-child navigation is prominent on non-lesson pages;
- navigation is the dominant first-viewport object on broad umbrella hubs unless a specific pedagogical reason overrides it;
- the navigation topology teaches the structure of the field rather than merely listing routes;
- the page's macro-layout is distinguishable from recent neighboring pages in grayscale structure, not only palette and decoration;
- navigation and non-navigation components are unmistakably different;
- independent learner questions use independent widgets;
- controls and consequences remain together;
- the page is meaningfully dense without filler;
- the background is visible, subject-specific, attention-aware, and memorable in a static composition;
- one dominant environmental idea carries the background instead of generic ambient noise;
- glass blur separates content without turning the page opaque;
- semantic text has protected visual lanes and does not collide with detailed background linework, labels, or other readable information;
- reactive motion does not compete with the active task;
- chart scales and transformations are honest and labeled;
- route, curriculum, sidebar, and breadcrumbs agree;
- page vocabulary is registered at the correct node and available to ancestor scopes;
- atomic lessons contain an insightful transfer check and deterministic generated practice when appropriate;
- collection/API pages expose truthful provenance, useful facets, stable detail routes, and honest failure states;
- readability and responsive geometry meet the shared rules;
- every successful pre-existing system outside the requested scope remains intact;
- the page is an evolution of its established identity rather than a generic replacement;
- every design gate passes at the same time;
- available validation succeeds or any failure is reported precisely;
- the commit is pushed and the remote branch is verified.

The repository, not an invisible workspace, is the source of truth the user can inspect.
