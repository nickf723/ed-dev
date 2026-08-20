# Education Station 64 Agent Instructions

This repository is an educational knowledge system whose north star is to **explain and model anything a person can learn, intuitively and inside an honest ontology**. The primary product goal is not to maximize visual novelty, page count, or widget count. It is to help a learner build accurate mental models, move naturally through knowledge, practice what they learned, and inspect real collections of the things being studied.

Before changing educational UI or curriculum content, read:

- `docs/development-constitution.md` for the binding end-to-end production contract, including ontology, page bundles, vocabulary inheritance, assessment, collections/APIs, validation, and publishing.
- `docs/site-architecture.md` for repository/product architecture, source-of-truth boundaries, page context, shared shell responsibilities, and migration strategy.
- `docs/design-constitution.md` for the binding fast production defaults used on every substantial page build: ontology, navigation topology, registry/sidebar synchronization, anchored context, background participation, density, notation, and the TREE / FRAME / FIELD / FLOW preflight.
- `docs/design-docket.md` for deeper visual, layout, navigation, density, and interaction rules.
- `docs/educational-content-playbook.md` for learning design, chunking, modeling, explanation, practice, and assessment rules.
- `docs/atomic-lesson-constitution.md` before creating or substantially remastering an atomic lesson. It is the binding Explain -> Do -> Check build contract for lesson structure and workflow.
- `docs/page-planning-template.md` when creating or substantially remastering a hub, unit, or lesson page.
- `docs/cohesion-audit.md` for site-wide consistency without homogenizing subject identity.
- `docs/site-remaster-audit.md` for the complete route inventory, remaster acceptance gates, scenery-corridor standard, and active branch-by-branch audit waves.
- `docs/visual-verification-queue.md` before making visual claims or continuing work while rendered previews are unavailable.
- `docs/development-branch-workflow.md` for the active development branch, cost-control, push, promotion, and remote-verification workflow.

For atomic lessons, the lesson constitution is not optional guidance. Do not begin visual composition until the seven-line lesson brief and a simple text storyboard are clear. If repeated small fixes fail to resolve a lesson, return to that brief instead of continuing cosmetic patchwork.

For all substantial pages, the Design Constitution is not optional guidance. Resolve hierarchy, route/registry placement, navigation topology, anchored context behavior, background/environment behavior, and first-viewport density before micro-polish.

## Non-negotiable rules

1. **Start with the learning goal, not the widget.** State what the learner should understand or be able to do before choosing a layout or interaction.
2. **Respect page depth.** Hubs organize fields. Units sequence lessons. Atomic lessons teach one coherent idea deeply. Do not make every page a dashboard.
3. **Preserve the knowledge graph.** The curriculum registry is the structural source of truth. Never silently remove live navigation. Planned nodes must look planned and must not behave like live links.
4. **Route and curriculum are one change.** Creating, moving, or deleting an academic route is incomplete until the relevant curriculum module is updated in the same development pass. The sidebar is derived from the curriculum registry and must not be hand-edited to expose academic children.
5. **Primary hub navigation follows direct children.** Do not promote grandchildren into peer status simply because they are useful or already built. Preview deeper descendants inside their parent region or label them as cross-links.
6. **Derive semantic relationships instead of duplicating them.** When the registry knows the parent, ancestry, sibling order, children, route, or status, use the page-context layer rather than hard-coding a parallel version in page files.
7. **Choose navigation topology from the knowledge relationship.** Hierarchy should look hierarchical, sequence should look sequential, scale should look scalar, containment should look nested, process should look like flow, and true flat peers may use a grid. A card grid is a fallback, not the site-wide default.
8. **Chunk deliberately.** One chunk should answer one learner question. Prefer progressive disclosure over showing several full-strength instruments at once.
9. **Model before decorating.** Use diagrams, graphs, equations, maps, tables, simulations, or other representations because they expose structure. Do not add visual metaphors that distort the concept.
10. **Guide before sandboxing.** Interactive lessons should normally begin with meaningful defaults or curated cases. Free-form controls come after the learner understands what the controls represent.
11. **Show cause and effect together.** A control and the representation it changes should be visually and conceptually connected. Do not make learners hunt across the page for consequences.
12. **Use multiple representations when they genuinely reinforce the same object.** Coordinate equation, graph, table, language, geometry, or data views around a shared state when translation between them is part of the learning goal.
13. **Teach boundaries and exceptions.** If a rule changes under a condition, show the condition clearly. Do not bury edge cases after teaching an overgeneralization.
14. **No instructional clipping.** Text, examples, equations, controls, and navigation must fit legitimate states. Use minimum heights and natural growth rather than global hard-height patches or `overflow: hidden` on instructional content.
15. **No microtext for required information.** Follow the readability floors in the Design Docket.
16. **No fake pedagogy.** Avoid decorative progress labels, "mastered" states, fake practice areas, arbitrary module numbers, or meta copy that does not help the learner.
17. **Different navigation relationships must look different.** Parent/up, previous/next sibling, direct child, cross-link, and planned destinations are semantically distinct.
18. **Anchor local context on long pages.** Preserve ancestry and current page identity with a sticky or otherwise persistent local context layer when useful. Sticky UI must never cover instructional content.
19. **Backgrounds must participate.** Subject environments should be clearly visible in a normal screenshot, meaningfully subject-specific, and dynamically responsive when interaction calls for it. Do not erase them with opaque black overlays.
20. **Fix sparsity with structure, not filler.** Add relationships, scales, overlaps, examples, dependency paths, or meaningful continuation into the viewport before adding generic cards, pills, counters, or decorative facts.
21. **Render technical notation through canonical components.** Mathematical expressions use the shared math renderer. Never allow raw LaTeX, escaped syntax, regex artifacts, or developer formatting strings into learner-facing UI.
22. **Accuracy outranks cleverness.** Use canonical terminology, definitions, notation, and category boundaries. Do not blend informal frameworks with formal ones without labeling the distinction.
23. **Batch meaningful changes.** Avoid a series of tiny commits that each trigger a deployment. Prefer one coherent commit per development pass when practical.
24. **Cohesion is not homogenization.** Reuse shell behavior, navigation semantics, geometry rules, and feedback grammar. Let subject-specific structure, models, backgrounds, interactions, and local visual identity become more distinct with depth.
25. **Keep shell, context, and presentation separate.** The shell owns persistent product behavior, page context owns semantic curriculum relationships, and route-local code owns the learning experience and subject-specific vibe.
26. **Atomic lessons must Explain -> Do -> Check.** An interaction cannot substitute for explanation, and a quiz cannot substitute for guided practice. The primary instrument must enact the concept rather than require the learner to know the untaught answer first.
27. **Five branches own knowledge; Interdisciplines reveals relationships.** Formal, Natural, Social, Humanities, and Applied are the canonical homes for fields. Interdisciplines is a relational atlas and cross-linking surface, not a sixth duplicate curriculum. The number 64 is brand identity, not a field quota.
28. **No placeholder pages.** Planned nodes may clarify the ontology, but they remain non-clickable. A route becomes active only when its page is substantive, functional, connected, and ready to teach, orient, reference, or perform its declared job.
29. **A page is a curriculum bundle.** A new or substantially rebuilt page updates its route, curriculum node, sidebar ancestry, page context, vocabulary contribution, assessment or retrieval contract when applicable, unique academic world, and verification record in one coherent pass.
30. **Vocabulary builds upward.** Curate stable-ID vocabulary at the narrowest page that teaches it. Parent, branch, domain, and global vocabulary views aggregate descendant terms, deduplicate them, and preserve the source grouping. Do not maintain unrelated parallel glossaries.
31. **Every atomic lesson checks understanding.** Include both an insightful transfer/reasoning check and, when the subject permits deterministic generation, a small bank of coded, generated, and verifiable practice. Feedback explains the reasoning; it does not merely score.
32. **Every page has a local academic identity.** Even the smallest page gets a subject-specific environmental idea and a deliberate variation of the shared shell. Children may rhyme with or borrow from relatives, but may not become palette-swapped copies.
33. **Collections are learning surfaces.** Finite sets, curated open-ended repositories, and API-backed catalogs must support useful search/filter facets, provenance, item detail, and meaningful comparison or simulation. External data enhances the product but must fail honestly and may not be fabricated.
34. **Publish completed work.** Follow `docs/development-branch-workflow.md` for the active branch. After a coherent implementation pass, validate, commit the confirmed scope, push that branch, verify the remote commit, and report CI/deployment status honestly. Do not leave finished work only in the local workspace, and do not promote to `main` without the user-requested release step.

## Required workflow for substantial page work

Before coding:

1. Inspect the current page and its existing live routes.
2. Inspect the curriculum registry for the page, parent, siblings, direct children, prerequisites, and deeper live descendants.
3. Decide whether the page is a hub, unit, atomic lesson, reference tool, or application/tool page.
4. Confirm the intended hierarchy before composing navigation. Separate direct children from grandchildren and conceptual cross-links.
5. If routes are being added or moved, update or create the focused curriculum module as part of the same pass and decide whether redirects are needed.
6. Choose the navigation topology that expresses the subject relationship: tree/atlas, path/timeline, spectrum/scale, containment, flow, map, matrix, or true peer grid.
7. If it is an atomic lesson, write the seven-line lesson brief from `docs/atomic-lesson-constitution.md` and a simple text storyboard before choosing visual composition.
8. Resolve or define the page's semantic context rather than manually inventing ancestry/navigation.
9. Fill out the questions in `docs/page-planning-template.md` at least mentally, and write them down for large changes.
10. Identify the primary mental model and the learner sequence.
11. Decide which content belongs here and which content deserves a deeper child page.
12. Decide the subject-specific visual grammar, background motif, background dynamic behavior, anchored-header behavior, and first-viewport center of gravity before polishing components.
13. Identify the page's vocabulary contribution and how it aggregates into its ancestors.
14. For an atomic lesson, define the reasoning/transfer check and any deterministic generated-practice model before composing the assessment UI.
15. For a repository or API-backed page, define the collection type, source/provenance, filter facets, detail contract, loading/empty/error states, caching boundary, and fallback behavior.

While coding:

- Keep one obvious instructional or navigational center of gravity per viewport.
- Prefer one primary instrument on an atomic lesson.
- Build the model and instructional sequence before spending time on decorative polish.
- Use meaningful defaults and curated examples.
- Keep reference material close to the decision it supports.
- Preserve live navigation and semantic breadcrumbs.
- Keep primary hub navigation focused on direct children. Grandchildren may be previewed inside their parent region but should not become false peers.
- Update curriculum modules whenever academic routes change. Do not patch `Sidebar.tsx` to expose new subject children.
- Let each component own its geometry. Global layouts must not reach into descendant components to patch internal rows.
- Prefer server-side curriculum/page-context resolution and pass small serializable contracts into client instruments.
- Keep instructional content in normal document flow unless intrinsic diagram geometry requires bounded positioning. Do not repair lesson-structure problems with z-index or overlap patches.
- Keep the local context/header anchored on long pages when useful and reserve enough space that it never covers content.
- Make the background visible before adding extra foreground decoration. Glass surfaces should reveal the environment.
- Route mathematical expressions through the shared math renderer rather than hand-formatting escaped strings.
- Add vocabulary at the page that teaches it; do not patch several ancestor lists by hand when the composition layer can derive them.
- Keep assessment items aligned to the learning outcome. Generated practice must use a deterministic answer model and produce explanatory feedback.
- Normalize API responses through a typed adapter before presentation. Preserve source attribution and distinguish source facts from Education Station interpretation.

Before calling the pass complete, run the Design Constitution's **TREE / FRAME / FIELD / FLOW** preflight.

### TREE

- Registry ancestry is correct.
- Sidebar hierarchy follows automatically.
- Breadcrumbs match the registry.
- Primary hub navigation uses direct children.
- Grandchildren and cross-links are visually distinct from direct descent.
- Moved routes redirect when practical.

### FRAME

- An anchored local context remains available on long pages when appropriate.
- The first viewport has one clear center of gravity.
- There are no large accidental voids or filler regions.
- Required text meets readability floors.
- Legitimate states do not clip, overlap, or cause unstable hover geometry.
- Narrower desktop and mobile fallbacks preserve hierarchy.

### FIELD

- The background is visible at a glance.
- The motif belongs to the subject rather than generic neon ambience.
- Dynamic behavior is noticeable when specified but does not harm reading.
- Glass/panels reveal the environment.
- The page still has subject identity without relying only on accent color.

### FLOW

- Navigation styling communicates ancestry, child descent, sequence, cross-link, and planned states correctly.
- Atomic lessons visibly contain Explain -> Do -> Check.
- The learner sees a worked/model example and an explicit reusable rule or relationship when the page is instructional.
- The primary instrument enacts the concept rather than pre-testing knowledge that has not been taught.
- The main misconception or boundary is addressed and practice transfers to a fresh case when applicable.
- Every control teaches or reveals something specific.
- Mathematical/technical notation contains no raw rendering artifacts.
- The learner can explain what the page is about without first discovering how the UI works.

Then run the available build/type checks when the environment supports them.
Commit and push the coherent batch to the active development branch, verify the matching remote ref points to the pushed commit, and check the resulting CI/deployment state when accessible.

## Preview-offline maintenance mode

When a reliable rendered preview is unavailable, development continues in a deliberately narrower mode.

### Safe work while blind

Prefer changes whose correctness can be established from structure, content, or code rather than visual judgment:

- curriculum ontology and route wiring
- page-context and source-of-truth cleanup
- parent / child / sibling relationships
- prerequisites and dependency structure
- semantic navigation labels
- canonical terminology, definitions, notation, and category boundaries
- page-depth and scope decisions
- learning contracts and chunk plans
- clearly implementation-facing copy such as debug labels or arbitrary module codes
- accessibility and semantic markup
- type safety and compile fixes
- documentation and audits
- removal of known structural anti-patterns when the fix does not depend on rendered composition

### Do not guess at visual composition

Without a trusted render, avoid making claims or tuning decisions about:

- spacing and whitespace balance
- viewport occupancy
- panel/card proportions
- font-size tuning unless a documented readability violation is unambiguous
- background opacity
- border intensity
- palette balance
- responsive composition
- whether a page feels visually too busy or too sparse
- major visual remasters whose success depends on seeing the result

### Verification queue is mandatory

If a change made while blind can affect rendered composition, add the route and its important states to `docs/visual-verification-queue.md` in the same development pass.

A page is not visually finished because it compiles. Once preview capability returns, clear the verification queue before resuming rapid new-page production in that branch.

## Current development workflow

The current project workflow favors direct, meaningful improvements and preserving existing routes. The active development branch is `studio`; `main` is the production promotion branch. A later explicit user instruction may change that workflow.

When a recurring design, pedagogy, or site-architecture correction appears more than once, update the appropriate repository rule document so the same correction does not need to be rediscovered page by page.

When auditing a haphazardly developed branch, work branch-by-branch rather than page-by-page at random. Establish its ontology, identify legacy patterns, queue visual verification, then descend deliberately.

The preferred rhythm for normal page production is now:

**preserve -> ontology -> page contract -> vocabulary/data/assessment contracts -> visual grammar -> structural build -> atmosphere/composition -> TREE / FRAME / FIELD / FLOW preflight -> build verification -> commit/push/remote verification -> move on**.

Do not turn routine page development into an endless micro-polish loop once those gates pass.
