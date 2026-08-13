# Education Station 64 Agent Instructions

This repository is an educational knowledge system. The primary product goal is not to maximize visual novelty or widget count. It is to help a learner build accurate mental models through intuitive, well-chunked, well-organized instruction.

Before changing educational UI or curriculum content, read:

- `docs/site-architecture.md` for repository/product architecture, source-of-truth boundaries, page context, shared shell responsibilities, and migration strategy.
- `docs/design-docket.md` for visual, layout, navigation, density, and interaction rules.
- `docs/educational-content-playbook.md` for learning design, chunking, modeling, explanation, practice, and assessment rules.
- `docs/atomic-lesson-constitution.md` before creating or substantially remastering an atomic lesson. It is the binding Explain → Do → Check build contract for lesson structure and workflow.
- `docs/page-planning-template.md` when creating or substantially remastering a hub, unit, or lesson page.
- `docs/cohesion-audit.md` for site-wide consistency without homogenizing subject identity.
- `docs/visual-verification-queue.md` before making visual claims or continuing work while rendered previews are unavailable.

For atomic lessons, the constitution is not optional guidance. Do not begin visual composition until the seven-line lesson brief and a simple text storyboard are clear. If repeated small fixes fail to resolve a lesson, return to that brief instead of continuing cosmetic patchwork.

## Non-negotiable rules

1. **Start with the learning goal, not the widget.** State what the learner should understand or be able to do before choosing a layout or interaction.
2. **Respect page depth.** Hubs organize fields. Units sequence lessons. Atomic lessons teach one coherent idea deeply. Do not make every page a dashboard.
3. **Preserve the knowledge graph.** The curriculum registry is the structural source of truth. Never silently remove live navigation. Planned nodes must look planned and must not behave like live links.
4. **Derive semantic relationships instead of duplicating them.** When the registry knows the parent, ancestry, sibling order, children, route, or status, use the page-context layer rather than hard-coding a parallel version in page files.
5. **Chunk deliberately.** One chunk should answer one learner question. Prefer progressive disclosure over showing several full-strength instruments at once.
6. **Model before decorating.** Use diagrams, graphs, equations, maps, tables, simulations, or other representations because they expose structure. Do not add visual metaphors that distort the concept.
7. **Guide before sandboxing.** Interactive lessons should normally begin with meaningful defaults or curated cases. Free-form controls come after the learner understands what the controls represent.
8. **Show cause and effect together.** A control and the representation it changes should be visually and conceptually connected. Do not make learners hunt across the page for consequences.
9. **Use multiple representations when they genuinely reinforce the same object.** Coordinate equation, graph, table, language, geometry, or data views around a shared state when translation between them is part of the learning goal.
10. **Teach boundaries and exceptions.** If a rule changes under a condition, show the condition clearly. Do not bury edge cases after teaching an overgeneralization.
11. **No instructional clipping.** Text, examples, equations, controls, and navigation must fit legitimate states. Use minimum heights and natural growth rather than global hard-height patches or `overflow: hidden` on instructional content.
12. **No microtext for required information.** Follow the readability floors in the Design Docket.
13. **No fake pedagogy.** Avoid decorative progress labels, "mastered" states, fake practice areas, arbitrary module numbers, or meta copy that does not help the learner.
14. **Different navigation relationships must look different.** Parent/up, previous/next sibling, child, cross-link, and planned destinations are semantically distinct.
15. **Accuracy outranks cleverness.** Use canonical terminology, definitions, notation, and category boundaries. Do not blend informal frameworks with formal ones without labeling the distinction.
16. **Batch meaningful changes.** Avoid a series of tiny commits that each trigger a deployment. Prefer one coherent commit per development pass when practical.
17. **Cohesion is not homogenization.** Reuse shell behavior, navigation semantics, geometry rules, and feedback grammar. Let subject-specific structure, models, backgrounds, interactions, and local visual identity become more distinct with depth.
18. **Keep shell, context, and presentation separate.** The shell owns persistent product behavior, page context owns semantic curriculum relationships, and route-local code owns the learning experience and subject-specific vibe.
19. **Atomic lessons must Explain → Do → Check.** An interaction cannot substitute for explanation, and a quiz cannot substitute for guided practice. The primary instrument must enact the concept rather than require the learner to know the untaught answer first.

## Required workflow for substantial page work

Before coding:

1. Inspect the current page and its existing live routes.
2. Inspect the curriculum registry for the page, parent, siblings, and children.
3. Decide whether the page is a hub, unit, atomic lesson, reference tool, or application/tool page.
4. If it is an atomic lesson, write the seven-line lesson brief from `docs/atomic-lesson-constitution.md` and a simple text storyboard before choosing visual composition.
5. Resolve or define the page's semantic context rather than manually inventing ancestry/navigation.
6. Fill out the questions in `docs/page-planning-template.md` at least mentally, and write them down for large changes.
7. Identify the primary mental model and the learner sequence.
8. Decide which content belongs here and which content deserves a deeper child page.

While coding:

- Keep one obvious instructional center of gravity per viewport.
- Prefer one primary instrument on an atomic lesson.
- Build the model and instructional sequence before spending time on decorative polish.
- Use meaningful defaults and curated examples.
- Keep reference material close to the decision it supports.
- Preserve live navigation and semantic breadcrumbs.
- Let each component own its geometry. Global layouts must not reach into descendant components to patch internal rows.
- Prefer server-side curriculum/page-context resolution and pass small serializable contracts into client instruments.
- Keep instructional content in normal document flow unless intrinsic diagram geometry requires bounded positioning. Do not repair lesson-structure problems with z-index or overlap patches.

Before calling the pass complete:

- Check that an atomic lesson visibly contains Explain → Do → Check.
- Check that the learner sees a worked/model example and an explicit reusable rule or relationship.
- Check that the primary instrument enacts the concept rather than pre-testing knowledge that has not been taught.
- Check that the main misconception or boundary is addressed and that practice transfers to a fresh case.
- Test the default state, longest text state, multiline equation/example state, important edge cases, and narrower desktop widths.
- Check that interactive selections do not unexpectedly resize or overlap adjacent content.
- Check that sticky utilities never cover headings, equations, controls, breadcrumbs, or feedback.
- Check that every control teaches or reveals something specific.
- Check that the learner can explain what the page is about without first discovering how the UI works.
- Check the Design Docket audit, Learning Design audit, and Atomic Lesson Constitution definition of done.
- Run the available build/type checks when the environment supports them.

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

The current project workflow favors direct, meaningful production improvements and preserving existing routes. Use `main` as the target unless the user explicitly requests a different workflow or a temporary branch is needed to assemble a coherent batch safely.

When a recurring design, pedagogy, or site-architecture correction appears more than once, update the appropriate repository rule document so the same correction does not need to be rediscovered page by page.

When auditing a haphazardly developed branch, work branch-by-branch rather than page-by-page at random. Establish its ontology, identify legacy patterns, queue visual verification, then descend deliberately.
