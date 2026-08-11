# Education Station 64 Design Docket

This document is the standing design contract for the site. It is intentionally stricter than a mood board and looser than a component API. New pages should inherit these rules unless a deliberate page-specific reason overrides them.

## 1. Preserve the knowledge graph

- Redesigning a page must never silently remove navigation to existing content.
- The curriculum registry is the source of truth for academic structure. Page-local presentation may group or reinterpret that structure, but it must not erase live routes.
- Before deleting an old navigation item, verify whether the route exists. Preserve live routes, repair stale registry entries, and avoid reviving dead links unless we intend to build them.
- Planned destinations may appear as visibly disabled placeholders. They must not behave like working links.
- Prefer ontological groupings that can survive future growth over one-off lists made for a single screenshot.

## 2. Shared shell, increasingly unique descendants

- High-level domain pages may share a common front-door grammar: shared header, breadcrumbs, glass language, large title, and obvious navigation.
- As the user descends into a subject, the layout should become increasingly specific to that discipline.
- Reuse interaction patterns when they improve learnability, not merely because they already exist.
- A child page should answer: “What visual or interactive structure belongs specifically to this subject?”

## 3. Navigation is primary content

- On hub pages, navigation to real subject matter is more important than decorative explanatory widgets.
- The primary destinations should be visible without requiring hover, selection, tabs, or a secondary navigation mode.
- Do not hide a large subject tree behind a single selected card when the available space can show the choices directly.
- Planned routes should be quieter than live routes, but their place in the ontology may be shown when that helps explain future structure.
- Avoid UI copy that explains obvious navigation mechanics, such as “choose a field,” “click to explore,” child counts, or implementation-facing labels.

## 4. Use the viewport intentionally

Desktop pages should feel composed, not merely centered inside a large canvas.

- At common desktop sizes, meaningful page content should occupy roughly 80–95% of the useful area below the global shell/header unless deliberate negative space is part of the concept.
- An unexplained empty band larger than roughly 20% of the visible content area is a design smell.
- Do not stretch a low-information widget merely to fill height. Add meaningful structure, recompose the grid, or allow the next section into view.
- Conversely, do not let headers/filter controls consume more visual area than the content they control.
- Prefer stable grids with deliberate row heights over content-driven panels that visibly jump as selections change.
- When adjacent interactive panels share a row, their outer geometry should remain fixed while content changes inside them.

## 5. Density before decoration

- Every large panel should justify its footprint with information, interaction, navigation, or a strong subject-specific visual.
- Avoid “one icon + two sentences in a giant card.” Compress it or give the space a second job.
- Decorative pills, labels, counters, and micro-panels should not multiply simply because empty space exists.
- Before adding another widget, ask whether the existing layout can be reorganized to use its space better.
- Prefer a few information-rich regions over many floating cards in the void.

## 6. Readability floor

Tiny type is for metadata, not primary interaction.

- Primary body/explanatory text: target 12–16 px on desktop.
- Navigation titles and card titles: target 15 px or larger.
- Interactive labels/chips/buttons: target 10 px or larger.
- Secondary metadata/eyebrows: target 9 px or larger.
- 7–8 px text is reserved for genuinely tertiary decoration and should never carry information required to use or understand the page.
- If a label must become microscopic to make a layout fit, the layout is too dense or the label should be shortened.

## 7. Stable interaction

- Hover should reveal emphasis, not rearrange the page.
- Selection-dependent panels should reserve enough height for their longest normal content state.
- Size interactive containers against the longest known normal title, description, example, or inspector state before styling the shorter states. Short content lives inside the reserved frame; it does not shrink the frame.
- If a legitimate state would overflow that reserved geometry, rewrite or recompose the content rather than allowing the surrounding layout to jump or clipping the content.
- Avoid content shifts caused by different title lengths, child counts, descriptions, or inspector states.
- Do not make users chase controls that move after hover/selection.
- Hover motion should be subtle. Prefer border/glow changes and tiny translations over dramatic card movement.

## 8. Visual hierarchy and borders

- Borders should support grouping, not become the brightest object on the page.
- Default glass/panel borders should be low-alpha and theme-tinted where appropriate.
- Avoid accidental pure-white outlines around major components unless the subject concept explicitly calls for them.
- One page should have a clear hierarchy of: background → shell/panel → selected/accented state → text/content.
- Selected states may be brighter, but should not destroy the surrounding palette.

## 9. Backgrounds must participate

- Subject backgrounds should be visible enough to establish atmosphere, but never compete with reading or navigation.
- If a background exists, do not bury it under nearly opaque overlays until it becomes functionally invisible.
- Glass surfaces should let some of the page identity through.
- Background animation should be slow, low-contrast, and pointer-independent unless interaction is genuinely useful.
- Decorative subject icons/shapes belong primarily in the background layer, not as additional interface chrome.
- Closely related atomic lessons may share a shell, but should use distinct background or environmental motifs when the lesson concepts naturally suggest different visual grammars.

## 10. Scrollbars and overflow are designed surfaces

- Avoid bright browser-default internal scrollbars inside polished instruments.
- Prefer natural page scrolling when possible.
- When an internal scroll region is necessary, use a subdued themed scrollbar or visually hide it while preserving wheel, trackpad, keyboard, and touch scrolling.
- Do not create nested scrolling merely because a panel was given a fixed height.
- Horizontal filter rails may scroll, but the active state and purpose should remain clear.

## 11. Content language stays user-facing

- Remove implementation notes, design commentary, debug labels, arbitrary domain numbers, and instructions obvious from the interface.
- Labels should describe knowledge, not our development process.
- Avoid redundant labels such as a heading followed by a sentence that merely restates the heading.
- Counts are useful only when the count itself helps the user make a decision.

## 12. Subject identity is semantic, not just color

- Color is a domain cue, not the entire theme.
- Each page should express its subject through structure, motion, visual metaphors, data organization, typography, or interaction.
- Interdisciplines stays orange; Applied stays violet; other domain colors should remain consistent unless a deeper page has a strong local reason to introduce a secondary palette.
- Local accent colors may distinguish subfields without erasing the parent-domain identity.

## 13. Live, planned, and absent are different states

- **Live:** real route, normal navigation treatment.
- **Planned:** known place in the ontology, visibly muted/disabled, no fake click target.
- **Absent:** speculative idea not yet accepted into the ontology; do not surface it as navigation.
- Planned nodes may live in the registry as placeholders so future implementation activates an existing structure instead of inventing a parallel one.

## 14. Proactive page audit

Before calling a visual pass finished, check:

1. Did any existing live navigation disappear?
2. Is the primary purpose of the page obvious in the first viewport?
3. Is navigation at least as prominent as decorative/explanatory widgets on a hub page?
4. Is there a large unexplained empty region?
5. Is any required text smaller than the readability floor?
6. Do hover/selection states change outer layout geometry?
7. Are borders, scrollbars, and backgrounds consistent with the page aesthetic?
8. Did implementation/meta copy leak onto the page?
9. Does the page become more subject-specific than its parent?
10. Are disabled/planned routes clearly different from live routes?
11. Does the page still work at a narrower desktop width without collapsing into a pile of cards?
12. Is there anything on screen whose only purpose is to fill space?
13. Does any legitimate content state clip, overlap a sibling, or escape its panel?

## 15. Current product direction

The site should feel like one coherent knowledge system whose pages become increasingly specialized as the user descends through academia. Consistency lives in the shell, hierarchy, navigation behavior, typography discipline, and interaction quality. Variety lives in the subject-specific instrument inside that shell.

## 16. Page depth changes the job

The deeper a page sits in the knowledge tree, the less it should behave like a directory and the more it should behave like instruction.

- **Hub pages** organize a field. Their primary job is to expose structure, preserve navigation, and communicate the shape of the subject.
- **Unit pages** chunk a broad topic into a deliberate learning sequence. They should explain the throughline, state what each lesson contributes, and avoid placing several full-sized interactive labs on screen at once.
- **Atomic lesson pages** teach one coherent idea deeply. Prefer one primary interactive instrument, surrounded by explanation, examples, misconceptions, and a clear connection to adjacent ideas.
- A lesson should normally introduce the idea before or alongside the interaction rather than expecting the widget to teach itself.
- Progressive disclosure is preferred to simultaneous stimulation. If several excellent widgets compete for attention, they probably belong on separate lessons.
- One viewport should have one obvious instructional center of gravity.

## 17. Navigation relationships are semantic

Navigation styling should communicate the relationship between destinations, not merely that they are clickable.

- Breadcrumbs express ancestry and are the default way to move several levels upward.
- A dedicated **parent / up-one-level** link, when useful, should be compact and visually subordinate to lesson progression.
- **Previous / next siblings** are sequential navigation and should use explicit direction, sequence labels, and matching visual weight.
- Moving from the final lesson of a unit into the next topic at the parent level is a different relationship from moving to the next sibling; label it accordingly.
- Do not place a redundant large “back to parent” card at the bottom of a hub when the breadcrumb and persistent navigation already provide that route.
- Floating utilities must not cover breadcrumbs, sequence controls, or other primary navigation.

## 18. Containers own their content

Stable geometry must never be achieved by hiding legitimate content.

- Text-bearing instruments should use **minimum heights plus natural growth**, not hard heights, unless every state is provably bounded inside the fixed frame.
- `overflow: hidden` is appropriate for decorative canvases, glows, and intentional clipping. It should not be used to silence overflowing instructional text, examples, controls, or navigation.
- Reserve enough space for the longest normal state, but let the instrument grow if responsive wrapping or accessibility settings require more room.
- A parent layout or global stylesheet must not reach into a child page and rewrite its internal grid rows to repair one screenshot. Geometry belongs to the component that owns the content.
- Neighboring panels should align through shared minimums and grid stretching, not by forcing every descendant into identical pixel heights.
- Before shipping an interactive panel, test the longest label, longest explanation, multiline equation/example, smallest supported desktop width, and at least one zoomed-text state.
