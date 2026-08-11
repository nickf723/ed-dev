# Architecture Visual Verification Queue

This branch contains substantial Architecture work created while Vercel previews were intermittently rate-limited. Do not promote `architecture-cohesion` to `main` until the branch receives a successful build and the pages below are visually inspected.

## Architecture hub

Route: `/applied-science/architecture`

Verify:

- blueprint background remains subordinate to content
- building-section diagram is readable without tiny essential labels
- Spatial Design & Program and Site & Context read as active destinations
- Structure & Construction, Envelope & Building Science, Building Systems, and Practice, Codes & Delivery remain visibly planned and non-clickable
- six branch cards and the building section feel like one composition rather than two dashboards
- adjacent-lenses panel remains subordinate to the Architecture ontology
- cross-link to Architecture as Visual Art makes the applied/aesthetic distinction clear
- no dead band remains from removal of the old Vitruvian widget

## Spatial Design & Program unit

Route: `/applied-science/architecture/spatial-design`

Verify:

- brief → spaces → adjacency → circulation sequence scans naturally
- all four child lessons are now active and clearly navigable
- child cards do not become visually identical dashboard tiles
- unit page remains an organizer rather than competing with its atomic lessons

## Program & Area

Route: `/applied-science/architecture/spatial-design/program-area`

Verify:

- Compact, Balanced, and Generous presets keep stable geometry
- all five sliders fit without clipping
- area-composition bar remains legible at extreme states
- square area diagram does not imply a preferred room shape
- illustrative/non-code caveat is visible but not visually dominant
- net programmed area and rough gross planning area are clearly distinguished

## Adjacency & Zoning

Route: `/applied-science/architecture/spatial-design/adjacency-zoning`

Verify:

- 6×6 matrix is readable at normal and narrower desktop widths
- clicking any non-diagonal cell cycles Near → Flexible → Separate
- symmetric room relationships remain visually consistent
- relationship graph does not become spaghetti in the densest preset
- selected-pair panel stays stable
- Near and Separate line styles are easy to distinguish
- Balanced, Quiet-first, and Service-first presets produce meaningfully different diagrams

Source cleanup before promotion:

- fix the Service-first preset key `staff-stacks` to the canonical sorted pair key `stacks-staff`

## Circulation & Wayfinding

Route: `/applied-science/architecture/spatial-design/circulation-wayfinding`

Verify:

- each connection can be toggled from both the connection list and SVG path
- route highlighting updates immediately
- disconnected destinations produce a clear no-route state
- Direct Spine, Loop, and Sparse presets create visibly different networks
- amber decision-point halos do not clutter the network
- `plan units` reads as illustrative, not a real building-distance claim
- shortest-path visualization does not visually imply that shortest always means best wayfinding

## Human Scale & Accessibility

Route: `/applied-science/architecture/spatial-design/human-scale-accessibility`

Verify:

- passage and turning diagrams read as two applications of one fit model
- all slider extremes stay inside their panels
- fail/pass state changes are clear without looking like a legal compliance checker
- illustrative profile presets do not look like canonical accessibility standards
- the disclaimer that dimensions are illustrative remains visible
- physical-clearance model is balanced by the reference material about sensory, cognitive, communication, and other accessibility considerations

## Site & Context unit

Route: `/applied-science/architecture/site-context`

Verify:

- composite site diagram remains legible and does not feel like a fake GIS dashboard
- property/study area, contours, drainage, climate, access, vegetation, and neighbor layers can be visually distinguished
- all four child lessons read as planned and non-clickable
- Observe → Interpret → Respond hierarchy is clearer than the drawing itself
- lesson cards and layered map feel connected

## Promotion rule

Before merging to `main`:

1. receive one successful Vercel build for the current branch head
2. perform the checks above
3. fix the known Adjacency preset key
4. correct any clipping, density, contrast, or hierarchy issues found in screenshots
5. promote only after the Architecture hub and at least the Spatial Design sequence have been visually reviewed
