import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return { id, label, href, description, domainId: "natural", status };
}

export const WAVES_OPTICS_CURRICULUM: CurriculumNode = {
  id: "natural.physics.waves-optics",
  label: "Waves & Optics",
  href: "/natural-science/physics/waves-optics",
  description: "Oscillation, wave propagation, interference, diffraction, reflection, refraction, resonance, and imaging.",
  domainId: "natural",
  status: "active",
  children: [
    node(
      "natural.physics.waves-optics.wave-motion",
      "Wave Motion",
      "/natural-science/physics/waves-optics/wave-motion",
      "Connect wavelength, frequency, amplitude, phase, and propagation speed in traveling waves.",
    ),
    node(
      "natural.physics.waves-optics.superposition",
      "Superposition & Interference",
      "/natural-science/physics/waves-optics/superposition",
      "Add overlapping waves and explain constructive and destructive interference through phase.",
      "placeholder",
    ),
    node(
      "natural.physics.waves-optics.reflection-refraction",
      "Reflection & Refraction",
      "/natural-science/physics/waves-optics/reflection-refraction",
      "Model how rays change direction at boundaries and connect refraction to wave speed and wavelength.",
      "placeholder",
    ),
    node(
      "natural.physics.waves-optics.diffraction",
      "Diffraction",
      "/natural-science/physics/waves-optics/diffraction",
      "Understand wave spreading through openings and around obstacles, especially when scales approach the wavelength.",
      "placeholder",
    ),
    node(
      "natural.physics.waves-optics.lenses",
      "Lenses & Imaging",
      "/natural-science/physics/waves-optics/lenses-imaging",
      "Construct images with converging and diverging lenses and connect ray geometry to focal length.",
      "placeholder",
    ),
    node(
      "natural.physics.waves-optics.resonance",
      "Standing Waves & Resonance",
      "/natural-science/physics/waves-optics/resonance",
      "Build standing-wave modes from interference and connect natural frequencies to resonance.",
      "placeholder",
    ),
  ],
};
