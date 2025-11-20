// lib/glossary-db.ts
export const termCategories = {
  GENERAL: "General",
  MATH_FOUNDATIONS: "Math Foundations",
  NUMBER_SYSTEMS: "Number Systems",
  ALGEBRA: "Algebra",
  PHYSICS: "Physics",
  SOCIAL_SCIENCE: "Social Science",
  APPLIED_SCIENCE: "Applied Science",
};

export const glossaryTerms = {
  // --- General Terms (from /glossary page) ---
  Abstraction: {
    definition:
      "Simplifying a system by focusing on the essential pattern or rule and ignoring unnecessary detail.",
    category: termCategories.GENERAL,
  },
  Model: {
    definition:
      "A representation that captures how something works, often expressed with diagrams, formulas, or code.",
    category: termCategories.GENERAL,
  },
  Heuristic: {
    definition:
      "A rule of thumb that guides problem solving when an exact method is impractical or unknown.",
    category: termCategories.GENERAL,
  },
  Decomposition: {
    definition:
      "Breaking a complex challenge into smaller parts that are easier to understand and solve.",
    category: termCategories.GENERAL,
  },
  Iteration: {
    definition: "Repeating a process with feedback so each pass improves on the last.",
    category: termCategories.GENERAL,
  },
  Proof: {
    definition:
      "A logical argument that demonstrates why a statement must be true in every valid case.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Feedback Loop": {
    definition:
      "When the output of a system circles back as input, amplifying or dampening future behavior.",
    category: termCategories.GENERAL,
  },
  Symmetry: {
    definition:
      "A transformation that leaves an object unchanged — a shared idea in art, physics, and algorithms.",
    category: termCategories.GENERAL,
  },
  Optimization: {
    definition:
      "Finding the best solution under given constraints, whether that’s cost, time, or accuracy.",
    category: termCategories.GENERAL,
  },

  // --- Math ---
  "Number System": {
    definition:
      "A collection of numbers (e.g., Natural, Integers, Rationals) defined by a specific set of rules and properties.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Natural Numbers": {
    definition:
      "The 'counting numbers' starting from 1. (1, 2, 3, ...)",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Whole Numbers": {
    definition:
      "The set of Natural Numbers plus zero. (0, 1, 2, 3, ...)",
    category: termCategories.NUMBER_SYSTEMS,
  },
  Integers: {
    definition:
      "All Whole Numbers and their negative opposites. (...-2, -1, 0, 1, 2...)",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Rational Numbers": {
    definition:
      "Any number that can be written as a ratio (fraction) of two integers, like a/b, where b is not zero.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Irrational Numbers": {
    definition:
      "Numbers that cannot be written as a simple fraction. Their decimals are non-repeating and non-terminating (e.g., π, √2).",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Real Numbers": {
    definition:
      "The set of all Rational and Irrational numbers. Represents every point on the number line.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Imaginary Unit": {
    definition:
      "The number defined as i = √-1. It is the foundation of complex numbers.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Complex Numbers": {
    definition:
      "Numbers with both a real and an imaginary part, written in the form 'a + bi'.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Commutative Property": {
    definition:
      "The rule stating that order does not matter for addition or multiplication (e.g., a + b = b + a).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Associative Property": {
    definition:
      "The rule stating that grouping does not matter for addition or multiplication (e.g., (a + b) + c = a + (b + c)).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Identity Property": {
    definition:
      "A property involving a number that leaves another number unchanged (0 for addition, 1 for multiplication).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Additive Identity": {
    definition: "The identity for addition, which is 0. (e.g., a + 0 = a).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Multiplicative Identity": {
    definition:
      "The identity for multiplication, which is 1. (e.g., a × 1 = a).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Inverse Property": {
    definition:
      "A property involving a number that 'cancels out' another, returning it to the identity (e.g., a + (-a) = 0).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Additive Inverse": {
    definition:
      "A number's 'opposite' that, when added, results in 0. (e.g., 5 and -5).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Multiplicative Inverse": {
    definition:
      "A number's 'reciprocal' that, when multiplied, results in 1. (e.g., 7 and 1/7).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Distributive Property": {
    definition:
      "The rule that links multiplication and addition (e.g., a(b + c) = ab + ac).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Order of Operations": {
    definition:
      "The standard sequence for calculations: Parentheses, Exponents, Multiply/Divide, Add/Subtract.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Absolute Value": {
    definition:
      "A number's distance from zero on the number line, which is always positive or zero.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Factor: {
    definition:
      "A number that is multiplied to get a product. (e.g., factors of 12 are 1, 2, 3, 4, 6, 12).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Multiple: {
    definition:
      "The result of multiplying a number by an integer (e.g., multiples of 3 are 3, 6, 9...)",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Greatest Common Factor": {
    definition: "The largest factor that two or more numbers share.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Least Common Multiple": {
    definition: "The smallest multiple that two or more numbers share.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Ratio: {
    definition:
      "A comparison of two quantities, often written as a fraction or with a colon (e.g., 3:4).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Rate: {
    definition:
      "A ratio that compares two quantities with different units (e.g., miles per hour).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Percentage: {
    definition:
      "A ratio where the second number is always 100. 'Per cent' means 'per hundred'.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Proportion: {
    definition:
      "A statement that two ratios are equal, usually written in fraction form (e.g., a/b = c/d).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Unit Rate": {
    definition:
      "A rate in which the second quantity (denominator) in the comparison is one unit (e.g., 60 miles per 1 hour).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Variable: {
    definition:
      "A symbol (usually a letter like x) that represents an unknown value or a value that can change.",
    category: termCategories.ALGEBRA,
  },
  Constant: {
    definition: "A fixed number whose value does not change (e.g., 5, -10, π).",
    category: termCategories.ALGEBRA,
  },
  Coefficient: {
    definition:
      "The number multiplied by a variable in an algebraic term (e.g., the '2' in 2x).",
    category: termCategories.ALGEBRA,
  },
  Expression: {
    definition:
      "A mathematical phrase made of variables, constants, and operations. It does not have an equals sign (e.g., 2x + 5).",
    category: termCategories.ALGEBRA,
  },
  Equation: {
    definition:
      "A mathematical statement that sets two expressions equal to each other using an equals sign (e.g., 2x + 5 = 11).",
    category: termCategories.ALGEBRA,
  },
  Evaluate: {
    definition:
      "To find the numerical value of an expression by replacing the variables with specific numbers.",
    category: termCategories.ALGEBRA,
  },
  Substitution: {
    definition:
      "The act of replacing a variable with a specific number (e.g., replacing 'x' with '3').",
    category: termCategories.ALGEBRA,
  },
  
  // --- Physics ---
 Kinematics: {
    definition:
      "The branch of mechanics that describes the motion of objects (displacement, velocity, acceleration) without reference to the forces causing the motion.",
    category: termCategories.PHYSICS,
  },
  Dynamics: {
    definition:
      "The branch of classical mechanics concerned with the study of forces and torques and their effect on motion.",
    category: termCategories.PHYSICS,
  },
  Distance: {
    definition:
      "A scalar quantity representing the total path length traveled by an object.",
    category: termCategories.PHYSICS,
  },
  Displacement: {
    definition:
      "A vector quantity representing the change in an object's position, measured from the starting point to the ending point.",
    category: termCategories.PHYSICS,
  },
  Speed: {
    definition:
      "A scalar quantity representing how fast an object is moving (rate of change of distance).",
    category: termCategories.PHYSICS,
  },
  Velocity: {
    definition:
      "A vector quantity representing the rate of change of an object's displacement. It includes both speed and direction.",
    category: termCategories.PHYSICS,
  },
  Acceleration: {
    definition:
      "A vector quantity representing the rate of change of an object's velocity. It occurs when an object speeds up, slows down, or changes direction.",
    category: termCategories.PHYSICS,
  },
  Force: {
    definition:
      "A push or a pull that can change the motion of an object (change its velocity). Measured in Newtons (N).",
    category: termCategories.PHYSICS,
  },
  Mass: {
    definition:
      "The measure of an object's inertia (its resistance to acceleration). It is a fundamental property and is measured in kilograms (kg).",
    category: termCategories.PHYSICS,
  },
  Inertia: {
    definition:
      "The tendency of an object to resist changes in its state of motion. The more mass an object has, the greater its inertia.",
    category: termCategories.PHYSICS,
  },
  "Net Force": {
    definition:
      "The vector sum of all individual forces acting on an object. Often denoted as ΣF or F_net.",
    category: termCategories.PHYSICS,
  },
  "Newton's First Law": {
    definition:
      "An object in motion stays in motion, and an object at rest stays at rest, unless acted upon by a net force.",
    category: termCategories.PHYSICS,
  },
  "Newton's Second Law": {
    definition:
      "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass (F = ma).",
    category: termCategories.PHYSICS,
  },
  "Newton's Third Law": {
    definition:
      "For every action (force) there is a reaction force that is equal in magnitude and opposite in direction. Forces always occur in pairs.",
    category: termCategories.PHYSICS,
  },
  Work: {
    definition:
      "The transfer of energy resulting from a force acting over a distance (W = Fd). Measured in Joules (J).",
    category: termCategories.PHYSICS,
  },
  Energy: {
    definition:
      "The capacity to do work. It exists in many forms (e.g., kinetic, potential, thermal). Measured in Joules (J).",
    category: termCategories.PHYSICS,
  },
  "Kinetic Energy": {
    definition:
      "The energy of motion (KE = 1/2 mv^2). An object must be moving to have kinetic energy.",
    category: termCategories.PHYSICS,
  },
  "Potential Energy": {
    definition:
      "Stored energy based on an object's position, configuration, or state (e.g., gravitational potential energy, PE = mgh).",
    category: termCategories.PHYSICS,
  },
  "Conservation of Energy": {
    definition:
      "The principle that the total energy of an isolated system remains constant; energy cannot be created or destroyed, only transformed.",
    category: termCategories.PHYSICS,
  },
  Momentum: {
    definition:
      "A vector quantity defined as the product of an object's mass and velocity (p = mv). It measures the 'quantity of motion'.",
    category: termCategories.PHYSICS,
  },
  Impulse: {
    definition:
      "A vector quantity equal to the change in an object's momentum, or the average net force multiplied by the time over which the force acts (J = FΔt).",
    category: termCategories.PHYSICS,
  },
  "Conservation of Momentum": {
    definition:
      "The principle that the total momentum of a closed system remains constant, especially during collisions.",
    category: termCategories.PHYSICS,
  },
  Torque: {
    definition:
      "The rotational equivalent of force, causing an object to rotate or change its rotational motion (τ = rF sinθ).",
    category: termCategories.PHYSICS,
  },
  "Angular Momentum": {
    definition:
      "The rotational equivalent of linear momentum. A vector quantity (L = Iω).",
    category: termCategories.PHYSICS,
  },
  Gravitation: {
    definition:
      "The fundamental force of attraction that exists between any two particles of mass in the universe.",
    category: termCategories.PHYSICS,
  },
  "Gravitational Constant (G)": {
    definition:
      "The proportionality constant in Newton's Law of Gravitation (G ≈ 6.67 × 10⁻¹¹ N·m²/kg²).",
    category: termCategories.PHYSICS,
  },
  "Universal Law": {
    definition:
      "The law stating that the gravitational force between two masses is proportional to the product of the masses and inversely proportional to the square of the distance between them.",
    category: termCategories.PHYSICS,
  },
  "Orbital Mechanics": {
    definition:
      "The study of the motion of spacecraft, planets, and other celestial bodies under the influence of gravitational forces.",
    category: termCategories.PHYSICS,
  },

  // --- Social Studies ---
  "Supply and Demand": {
    definition:
      "An economic model determining price in a market. Supply relates to quantity, and demand relates to consumer desire.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  GDP: {
    definition:
      "Gross Domestic Product: The total monetary value of all finished goods and services made within a country during a specific period.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Scarcity: {
    definition:
      "The fundamental economic problem of having seemingly unlimited human wants in a world of limited resources.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Microeconomics: {
    definition:
      "The branch of economics that studies how individual households and firms make decisions and allocate resources.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Macroeconomics: {
    definition:
      "The branch of economics that studies the behavior and performance of an economy as a whole (e.g., inflation, GDP, unemployment).",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Cognition: {
    definition:
      "The mental process of acquiring knowledge and understanding through thought, experience, and the senses.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Behaviorism: {
    definition:
      "A psychological theory suggesting all behaviors are acquired through conditioning, emphasizing observable behavior over internal mental states.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  "Political System": {
    definition:
      "A system that comprises the formal and informal procedures for making authoritative public decisions and enforcing them (e.g., democracy, monarchy).",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Governance: {
    definition:
      "The process of decision-making and the process by which decisions are implemented (or not implemented).",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Culture: {
    definition:
      "The cumulative deposit of knowledge, experience, beliefs, values, attitudes, and meanings shared by a group of people.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Ethnography: {
    definition:
      "The systematic study and recording of human cultures, often through fieldwork and participant observation.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Geography: {
    definition:
      "The study of places and the relationships between people and their environments.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  GIS: {
    definition:
      "Geographic Information System: A computer system for capturing, storing, checking, and displaying data related to positions on Earth’s surface.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Phonetics: {
    definition:
      "The branch of linguistics concerned with the production and perception of speech sounds.",
    category: termCategories.SOCIAL_SCIENCE,
  },
  Syntax: {
    definition:
      "The set of rules, principles, and processes that govern the structure of sentences in a given language.",
    category: termCategories.SOCIAL_SCIENCE,
  },

  // --- Applied Science ---
  Engineering: {
    definition:
      "The application of scientific, mathematical, and technical knowledge to design, build, and maintain structures, machines, and systems.",
    category: termCategories.APPLIED_SCIENCE,
  },
  Biotechnology: {
    definition:
      "The use of living systems and organisms to develop or make products (e.g., medicine, food).",
    category: termCategories.APPLIED_SCIENCE,
  },
  "Drug Development": {
    definition:
      "The process of bringing a new pharmaceutical drug to the market once a lead compound has been identified.",
    category: termCategories.APPLIED_SCIENCE,
  },
  "Data Structures": {
    definition:
      "A specialized format for organizing, processing, retrieving, and storing data efficiently (e.g., arrays, linked lists, trees).",
    category: termCategories.APPLIED_SCIENCE,
  },
  Thermodynamics: {
    definition:
      "The study of heat and its relation to other forms of energy and work, particularly in physical systems.",
    category: termCategories.PHYSICS,
  },
  Metallurgy: {
    definition:
      "The branch of materials science that studies the physical and chemical behavior of metallic elements, their intermetallic compounds, and their mixtures, called alloys.",
    category: termCategories.APPLIED_SCIENCE,
  },
};

export type GlossaryTermKey = keyof typeof glossaryTerms;