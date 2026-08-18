export const FUTURES_LENSES = [
  {
    label: "Trend",
    rgb: "103,232,249",
    description: "A measured direction or pattern over an observed period. Extrapolation requires assumptions about whether the underlying conditions continue.",
  },
  {
    label: "Driver",
    rgb: "94,234,212",
    description: "A force or process that can shape several outcomes, such as demographic change, regulation, infrastructure, cost, climate, institutions, or technical capability.",
  },
  {
    label: "Weak signal",
    rgb: "251,191,36",
    description: "Early or ambiguous evidence that may become important later. A weak signal is something to investigate, not proof that a future event will occur.",
  },
  {
    label: "Critical uncertainty",
    rgb: "192,132,252",
    description: "A high-impact condition whose future state is meaningfully uncertain. Scenario planning often explores different combinations of critical uncertainties.",
  },
  {
    label: "Wild card",
    rgb: "244,114,182",
    description: "A low-frequency or difficult-to-anticipate development with potentially large consequences. Wild cards are useful for stress-testing assumptions, not for sensational prediction.",
  },
  {
    label: "Preferred future",
    rgb: "251,146,60",
    description: "A normative vision of what people want to create. It should be labeled as a value-guided goal rather than disguised as a forecast of what will happen.",
  },
] as const;

export const FORECAST_HYGIENE = [
  "State the time horizon and the event or quantity being forecast clearly.",
  "Separate evidence, assumptions, model structure, and value judgments.",
  "Use base rates or reference classes when comparable historical cases exist.",
  "Define what would count as resolution so a probabilistic forecast can later be scored.",
  "Update when important evidence changes rather than defending the original number indefinitely.",
  "Do not attach numerical probabilities to scenarios unless a defensible forecasting method supports them.",
] as const;
