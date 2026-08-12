# Architecture Visual Verification Queue

This branch contains substantial Architecture work created while Vercel previews were intermittently rate-limited. Do not promote `architecture-cohesion` to `main` until the current branch receives a successful build and the pages below are visually inspected.

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
- all four child lessons are active and clearly navigable
- child cards do not become visually identical dashboard tiles
- unit page remains an organizer rather than competing with its atomic lessons
- progression reads as what must fit → what should be near → how people move → whether people can fit and maneuver

## Program & Area

Route: `/applied-science/architecture/spatial-design/program-area`

Verify:

- Compact, Balanced, and Generous presets keep stable geometry
- all five sliders fit without clipping
- area-composition bar remains legible at extreme states
- square area diagram does not imply a preferred room shape
- illustrative/non-code caveat is visible but not visually dominant
- net programmed area and rough gross planning area are clearly distinguished
- next navigation points to Adjacency & Zoning as a live sibling

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
- Service-first correctly treats Stacks ↔ Staff as Near
- next navigation points to Circulation & Wayfinding

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
- next navigation points to Human Scale & Accessibility

## Human Scale & Accessibility

Route: `/applied-science/architecture/spatial-design/human-scale-accessibility`

Verify:

- passage and turning diagrams read as two applications of one fit model
- all slider extremes stay inside their panels
- fail/pass state changes are clear without looking like a legal compliance checker
- illustrative profile presets do not look like canonical accessibility standards
- the disclaimer that dimensions are illustrative remains visible
- physical-clearance model is balanced by reference material about sensory, cognitive, communication, and other accessibility considerations
- the unit-ending navigation is clearly distinct from sibling lesson navigation

## Site & Context unit

Route: `/applied-science/architecture/site-context`

Verify:

- composite site diagram remains legible and does not feel like a fake GIS dashboard
- property/study area, contours, drainage, climate, access, vegetation, and neighbor layers can be visually distinguished
- all four child lessons are active and clearly navigable
- Observe → Interpret → Respond hierarchy is clearer than the drawing itself
- lesson cards and layered map feel connected
- progression reads as evidence → directional climate → terrain/water → site-edge relationships

## Site Analysis & Constraints

Route: `/applied-science/architecture/site-context/analysis-constraints`

Verify:

- terrain, water, vegetation, utilities, access, surroundings, and review-band layers can each be hidden and restored
- hiding a layer does not resize the map or imply that the real condition vanished
- selecting any condition updates the ledger without layout jump
- longest ledger text does not clip or bleed
- the hypothetical-site caveat is visible and clear
- the illustrative review band cannot be mistaken for a real setback or easement
- mapped fact, question, verification source, and possible response remain visually distinct

## Climate & Orientation

Route: `/applied-science/architecture/site-context/climate-orientation`

Verify:

- compass convention is immediately understandable: 0° north, clockwise bearings
- rotating the building preserves face-label readability
- sun and wind source arrows remain inside the diagram at slider extremes
- face exposure bars update coherently as bearings change
- amber sun and violet wind encodings remain distinguishable
- geometric-facing percentages do not look like heat-gain, daylight, energy, comfort, or wind-load scores
- next navigation points to Topography & Water

## Topography & Water

Route: `/applied-science/architecture/site-context/topography-water`

Verify:

- Uniform Slope, Swale/Valley, and Ridge/Spur produce unmistakably different contour forms
- adjustable contour spacing remains readable at both extremes
- swale V-shapes visually point uphill and ridge/spur V-shapes point downhill
- water arrows communicate collection in a swale and shedding from a ridge
- arbitrary teaching elevations do not look like survey data
- the hydrology caveat remains visible without overwhelming the model
- next navigation points to Access & Surroundings

## Access & Surroundings

Route: `/applied-science/architecture/site-context/access-surroundings`

Verify:

- north neighbor, east service lane, south public street, and west landscape edge are easy to distinguish
- public arrival, service access, outlook, and noise controls can change independently
- arrows/markers remain legible when multiple intentions share the same edge
- the relationship panel updates without changing outer geometry
- active relationship states read as tradeoffs, not warnings or failures
- the explicit no-score explanation is clear
- final navigation reads as unit completion / return, not another sibling lesson

## Promotion rule

Before merging to `main`:

1. receive one successful Vercel build for the current branch head
2. visually inspect the Architecture hub and both complete units at normal desktop width
3. spot-check a narrower desktop/tablet width
4. exercise every preset, longest content state, and important boundary/failure state listed above
5. fix any clipping, density, contrast, hierarchy, or responsive issues found
6. confirm planned Architecture branches remain non-clickable
7. only then promote `architecture-cohesion` to `main`

## Current scope boundary

Do not begin a full visual build of Structure & Construction until the current Architecture hub, Spatial Design unit, and Site & Context unit have received rendered review. Structural planning for later units is safe, but the existing visual surface is already large enough to require verification before expansion.
