# Anatomy & Physiology Remaster Contract

## Identity

- **Route:** `/applied-science/medicine/anatomy-physiology`
- **Curriculum node:** `applied.medicine.anatomy-physiology`
- **Parent:** Medicine
- **Page kind:** root unit
- **Existing live child:** Skeletal System

This pass preserves the page's nested structure–function scale, regional body scanner, pink biological material language, and the Skeletal System route. It repairs the missing curriculum subtree, derives semantic page context from the registry, replaces random full-screen canvases with deterministic subject worlds, introduces curriculum-owned vocabulary, and gives the unit an evidence action.

## Learning contract

- **Learner outcome:** The learner can distinguish anatomy from physiology, trace human organization from chemical components through the organism, distinguish a body region from an organ system, and explain why structure–function relationships require systems to be studied together.
- **Prior knowledge:** Cells are living units and the human body contains specialized structures.
- **Mental model:** The body is simultaneously nested by scale and cross-connected by function. Cells form tissues, tissues form organs, organs participate in systems, and several systems meet in every anatomical region.
- **Evidence of understanding:** Given a fresh structure or regional case, the learner can select the explanation that connects physical organization to function without treating a region, organ, or named system as an isolated machine.
- **Main misconception:** An anatomical region and an organ system are interchangeable groupings, or each organ belongs functionally to only one system.

## Scope and depth ceiling

The direct-child layer follows the recognizable introductory Anatomy & Physiology curriculum rather than an arbitrary small count:

1. Body Organization & Anatomical Language
2. Homeostasis & Feedback
3. Integumentary System
4. Skeletal System
5. Muscular System
6. Nervous System
7. Endocrine System
8. Cardiovascular System
9. Lymphatic & Immune System
10. Respiratory System
11. Digestive System
12. Urinary System
13. Reproductive System

The count is justified by two foundations plus the conventional eleven human organ systems. The page groups these direct peers into study families for orientation, but the groups are not additional curriculum nodes. No speculative grandchildren are added. Only Skeletal System is active; every other direct child remains visibly planned, non-clickable, and absent from live sidebar navigation.

Chemistry, detailed histology, embryology, regional dissection, pathology, diagnostics, and clinical management remain outside this overview. Comparative anatomy remains canonically owned by Natural Science → Biology.

## Navigation and sequence

The first useful viewport is a **body-course atlas**, not a card directory. It moves from shared foundations into six functional study families:

- foundations;
- boundary, support, and movement;
- regulation and control;
- transport and defense;
- exchange, nutrition, and elimination;
- continuity.

Every item is a direct child from the curriculum registry. Group position communicates why subjects are studied together; it does not create false ancestry.

## Canonical model and representation parity

`anatomyModel.ts` owns the shared six-level organization scale, four regional profiles, and evidence cases. The page scale, deterministic background, regional scanner, and unit check consume that model or use the same named relationships.

The six levels are:

`chemical → cellular → tissue → organ → organ system → organism`

The page's background is a deterministic translucent anatomy study plate: a human silhouette, a six-level scale, and system traces. It is instructional atmosphere rather than a second unlabeled specimen. It contains no random values, random particles, generated labels, or request-time browser measurements.

## Interaction contract

### Regional anatomy scanner

- **Question:** How can one location contain structures from several systems?
- **Default:** Thorax
- **Action:** Select head and neck, thorax, abdomen and pelvis, or limbs.
- **Consequence:** The co-visible panel updates systems, structures, and the boundary statement for that region.
- **Invariant:** Region describes location; system groups coordinated function.

### Structure–function evidence check

- **Transfer:** Infer why thin alveolar walls and large surface area support gas exchange.
- **Regional reasoning:** Explain why restricted thoracic movement can impair ventilation even when lung tissue is not the initial injury.
- **Organization reasoning:** Identify why a bone is an organ rather than merely mineral material.
- **Checker:** Stable option IDs with one deterministic answer and explanatory feedback per case.

## Vocabulary ownership

- **Medicine:** etiology, pathogenesis, diagnosis
- **Anatomy & Physiology:** anatomy, physiology, tissue, organ, organ system, homeostasis, regional anatomy
- **Skeletal System:** axial skeleton, appendicular skeleton, cortical bone, trabecular bone, synovial joint, bone remodeling

Medicine vocabulary scopes are derived from curriculum containment. The Applied Science root receives the Medicine subtree as a source group; the parent does not hand-copy descendant terms.

## Sources and accuracy boundary

The unit sequence and six-level organization model are checked against OpenStax _Anatomy and Physiology 2e_, especially its course scope, structural organization, and homeostasis sections. Education Station presents an introductory teaching map, not patient-specific advice, a diagnostic tool, or a substitute for laboratory instruction.

## Visual grammar

- **Material:** translucent histology glass, rose tissue glow, cyan circulation/innervation traces, amber support landmarks, violet regulation traces.
- **Dominant silhouette:** one upright human study plate with nested-scale apertures rather than a floating particle field.
- **Macro-layout:** grouped longitudinal atlas → nested-scale explanation → regional scanner → evidence check → source and cross-link band.
- **Quiet zones:** sustained prose and assessment use local frost; the silhouette and system traces remain visible in scenery corridors.
- **Child rhyme:** Skeletal System keeps the medical imaging family but specializes it as an axial/appendicular radiograph plate.

## Important responsive and verification states

- 1540px desktop, narrower desktop/tablet, and mobile reading order;
- all thirteen direct children, including long labels;
- active Skeletal route versus planned peers;
- six-level scale at narrow widths;
- all four regional scanner selections;
- correct, incorrect, unanswered, and reset assessment states;
- vocabulary scopes at Medicine, Anatomy & Physiology, Skeletal System, and Applied Science;
- reduced motion;
- server-rendered active ancestry and omission of planned children from the live sidebar;
- no instructional clipping, overlay collision, or hydration mismatch.

## One-sentence postmortem target

> This page is better for learning because it turns a manually drawn partial list into a truthful body-course map and asks the learner to use the same nested, cross-system model to interpret fresh anatomical evidence.
