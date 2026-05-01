import { VocabTerm } from '../_registry'

export const formalScienceVocab: VocabTerm[] = [
    // --- LOGIC & FOUNDATIONS ---
    {
        id: "fs-axiom",
        word: "Axiom",
        definition: "A statement or proposition that is regarded as being established, accepted, or self-evidently true, used as a starting point for further reasoning.",
        domain: "Formal Logic",
        tags: ["Foundations", "Proof", "Reasoning"],
        relatedTerms: ["fs-theorem", "fs-proposition"],
        isAdult: false
    },
    {
        id: "fs-theorem",
        word: "Theorem",
        definition: "A general proposition or mathematical statement that has been proven true based on previously established statements, such as axioms and other theorems.",
        domain: "Mathematics",
        tags: ["Proof", "Logic"],
        relatedTerms: ["fs-axiom", "fs-lemma", "fs-corollary"],
        isAdult: false
    },
    {
        id: "fs-lemma",
        word: "Lemma",
        definition: "A subsidiary or intermediate theorem in an argument or proof, often used as a stepping stone to prove a larger theorem.",
        domain: "Formal Logic",
        tags: ["Proof", "Structure"],
        relatedTerms: ["fs-theorem"],
        isAdult: false
    },
    {
        id: "fs-corollary",
        word: "Corollary",
        definition: "A proposition that follows with little or no proof required from an already proven theorem.",
        domain: "Formal Logic",
        tags: ["Proof", "Deduction"],
        relatedTerms: ["fs-theorem"],
        isAdult: false
    },
    {
        id: "fs-proposition",
        word: "Proposition",
        definition: "A declarative statement that is either true or false, but not both.",
        domain: "Formal Logic",
        tags: ["Truth", "Semantics"],
        relatedTerms: ["fs-tautology", "fs-contradiction"],
        isAdult: false
    },
    {
        id: "fs-tautology",
        word: "Tautology",
        definition: "A formula or assertion that is true in every possible interpretation or truth assignment.",
        domain: "Formal Logic",
        tags: ["Truth Table", "Boolean"],
        relatedTerms: ["fs-contradiction", "fs-proposition"],
        isAdult: false
    },
    {
        id: "fs-contradiction",
        word: "Contradiction",
        definition: "A proposition that is always false under every possible interpretation.",
        domain: "Formal Logic",
        tags: ["Truth Table", "Boolean"],
        relatedTerms: ["fs-tautology"],
        isAdult: false
    },
    {
        id: "fs-modus-ponens",
        word: "Modus Ponens",
        definition: "A rule of inference stating that if a conditional statement ('if p then q') is accepted, and the antecedent (p) holds, then the consequent (q) may be inferred.",
        domain: "Formal Logic",
        tags: ["Inference", "Deduction"],
        isAdult: false
    },
    {
        id: "fs-boolean",
        word: "Boolean",
        definition: "A system of algebraic notation used to represent logical propositions, particularly by means of the binary digits 0 (false) and 1 (true).",
        domain: "Computer Science",
        tags: ["Logic Gates", "Binary", "Algebra"],
        relatedTerms: ["fs-tautology"],
        isAdult: false
    },

    // --- PURE MATHEMATICS ---
    {
        id: "fs-variable",
        word: "Variable",
        definition: "A symbol (often a letter) that acts as a placeholder for an unknown numerical value or a value that can change.",
        domain: "Algebra",
        tags: ["Fundamentals", "Equations"],
        relatedTerms: ["fs-coefficient", "fs-constant"],
        isAdult: false
    },
    {
        id: "fs-coefficient",
        word: "Coefficient",
        definition: "A numerical or constant quantity placed before and multiplying the variable in an algebraic expression.",
        domain: "Algebra",
        tags: ["Fundamentals", "Terms"],
        relatedTerms: ["fs-variable"],
        isAdult: false
    },
    {
        id: "fs-constant",
        word: "Constant",
        definition: "A specific, fixed number in an equation or expression that does not change its value.",
        domain: "Algebra",
        tags: ["Fundamentals"],
        relatedTerms: ["fs-variable"],
        isAdult: false
    },
    {
        id: "fs-function",
        word: "Function",
        definition: "A relation from a set of inputs to a set of possible outputs where each input is related to exactly one output.",
        domain: "Mathematics",
        tags: ["Mapping", "Calculus", "Algebra"],
        isAdult: false
    },
    {
        id: "fs-derivative",
        word: "Derivative",
        definition: "A mathematical tool that calculates the instantaneous rate of change of a function with respect to one of its variables.",
        domain: "Calculus",
        tags: ["Motion", "Change", "Rates"],
        relatedTerms: ["fs-integral"],
        isAdult: false
    },
    {
        id: "fs-integral",
        word: "Integral",
        definition: "A mathematical object that can be interpreted as an area or a generalization of area, representing the accumulation of quantities.",
        domain: "Calculus",
        tags: ["Area", "Accumulation"],
        relatedTerms: ["fs-derivative"],
        isAdult: false
    },
    {
        id: "fs-matrix",
        word: "Matrix",
        definition: "A rectangular array of numbers, symbols, or expressions, arranged in rows and columns, heavily used in linear algebra.",
        domain: "Linear Algebra",
        tags: ["Structures", "Transformations"],
        relatedTerms: ["fs-vector"],
        isAdult: false
    },
    {
        id: "fs-vector",
        word: "Vector",
        definition: "A quantity that possesses both magnitude (size) and direction, commonly used in physics and linear algebra.",
        domain: "Linear Algebra",
        tags: ["Space", "Direction"],
        relatedTerms: ["fs-matrix"],
        isAdult: false
    },
    {
        id: "fs-asymptote",
        word: "Asymptote",
        definition: "A line that a curve approaches, as it heads towards infinity, getting arbitrarily close but never actually touching.",
        domain: "Geometry",
        tags: ["Limits", "Graphs"],
        isAdult: false
    },
    {
        id: "fs-prime",
        word: "Prime Number",
        definition: "A whole number greater than 1 whose only divisors are 1 and itself.",
        domain: "Number Theory",
        tags: ["Integers", "Cryptography"],
        isAdult: false
    },

    // --- COMPUTER SCIENCE & COMPUTATION ---
    {
        id: "fs-algorithm",
        word: "Algorithm",
        definition: "A finite sequence of rigorous instructions, typically used to solve a class of specific problems or to perform a computation.",
        domain: "Computer Science",
        tags: ["Code", "Logic", "Processing"],
        relatedTerms: ["fs-heuristic", "fs-big-o"],
        isAdult: false
    },
    {
        id: "fs-recursion",
        word: "Recursion",
        definition: "A method of solving a computational problem where the solution depends on solutions to smaller instances of the same problem. A function calling itself.",
        domain: "Computer Science",
        tags: ["Functions", "Algorithms"],
        isAdult: false
    },
    {
        id: "fs-heuristic",
        word: "Heuristic",
        definition: "A problem-solving approach that employs a practical method not guaranteed to be optimal, perfect, or rational, but sufficient for reaching an immediate, short-term goal.",
        domain: "Computer Science",
        tags: ["Algorithms", "AI", "Optimization"],
        relatedTerms: ["fs-algorithm"],
        isAdult: false
    },
    {
        id: "fs-big-o",
        word: "Big O Notation",
        definition: "A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. Used to classify algorithms by their run time or space requirements.",
        domain: "Computer Science",
        tags: ["Complexity", "Performance"],
        relatedTerms: ["fs-algorithm"],
        isAdult: false
    },
    {
        id: "fs-turing-machine",
        word: "Turing Machine",
        definition: "A mathematical model of computation describing an abstract machine that manipulates symbols on a strip of tape according to a table of rules.",
        domain: "Theory of Computation",
        tags: ["Abstract", "Foundations"],
        isAdult: false
    },
    {
        id: "fs-polymorphism",
        word: "Polymorphism",
        definition: "The provision of a single interface to entities of different types, or the use of a single symbol to represent multiple different types.",
        domain: "Computer Science",
        tags: ["OOP", "Architecture"],
        relatedTerms: ["fs-encapsulation"],
        isAdult: false
    },
    {
        id: "fs-encapsulation",
        word: "Encapsulation",
        definition: "The bundling of data with the methods that operate on that data, restricting direct access to some of an object's components.",
        domain: "Computer Science",
        tags: ["OOP", "Security", "Architecture"],
        relatedTerms: ["fs-polymorphism"],
        isAdult: false
    },
    {
        id: "fs-compiler",
        word: "Compiler",
        definition: "A computer program that translates computer code written in one programming language (the source language) into another language (the target language).",
        domain: "Computer Science",
        tags: ["Translation", "Systems"],
        isAdult: false
    },

    // --- APPLIED MATH, CRYPTO & GAME THEORY ---
    {
        id: "fs-nash-equilibrium",
        word: "Nash Equilibrium",
        definition: "A proposed solution of a non-cooperative game involving two or more players in which each player is assumed to know the equilibrium strategies of the other players, and no player has anything to gain by changing only their own strategy.",
        domain: "Game Theory",
        tags: ["Strategy", "Economics", "Equilibrium"],
        relatedTerms: ["fs-zero-sum", "fs-dominant-strategy"],
        isAdult: false
    },
    {
        id: "fs-zero-sum",
        word: "Zero-Sum Game",
        definition: "A mathematical representation of a situation in which each participant's gain or loss of utility is exactly balanced by the losses or gains of the utility of the other participants.",
        domain: "Game Theory",
        tags: ["Competition", "Strategy"],
        relatedTerms: ["fs-nash-equilibrium"],
        isAdult: false
    },
    {
        id: "fs-dominant-strategy",
        word: "Dominant Strategy",
        definition: "A strategy is dominant if, regardless of what any other players do, the strategy earns a player a larger payoff than any other strategy.",
        domain: "Game Theory",
        tags: ["Strategy", "Decisions"],
        relatedTerms: ["fs-nash-equilibrium"],
        isAdult: false
    },
    {
        id: "fs-cipher",
        word: "Cipher",
        definition: "An algorithm for performing encryption or decryption—a series of well-defined steps that can be followed as a procedure.",
        domain: "Cryptography",
        tags: ["Security", "Algorithms"],
        relatedTerms: ["fs-hash"],
        isAdult: false
    },
    {
        id: "fs-hash",
        word: "Hash Function",
        definition: "Any function that can be used to map data of arbitrary size to fixed-size values, often used to index data or verify integrity.",
        domain: "Cryptography",
        tags: ["Security", "Data Structures"],
        relatedTerms: ["fs-cipher"],
        isAdult: false
    },
    {
        id: "fs-public-key",
        word: "Public-Key Cryptography",
        definition: "A cryptographic system that uses pairs of keys: public keys (which may be known to others), and private keys (which may never be known by any except the owner).",
        domain: "Cryptography",
        tags: ["Security", "Encryption"],
        isAdult: false
    },

    // --- DATA, STATS & SYSTEMS ---
    {
        id: "fs-entropy",
        word: "Entropy",
        definition: "In information theory, the average level of 'information', 'surprise', or 'uncertainty' inherent to the variable's possible outcomes.",
        domain: "Information Science",
        tags: ["Data", "Uncertainty", "Physics"],
        isAdult: false
    },
    {
        id: "fs-variance",
        word: "Variance",
        definition: "The expectation of the squared deviation of a random variable from its population mean or sample mean. A measure of dispersion.",
        domain: "Statistics",
        tags: ["Data", "Spread"],
        relatedTerms: ["fs-standard-deviation"],
        isAdult: false
    },
    {
        id: "fs-standard-deviation",
        word: "Standard Deviation",
        definition: "A measure of the amount of variation or dispersion of a set of values, mathematically the square root of the variance.",
        domain: "Statistics",
        tags: ["Data", "Spread"],
        relatedTerms: ["fs-variance"],
        isAdult: false
    },
    {
        id: "fs-regression",
        word: "Regression Analysis",
        definition: "A set of statistical processes for estimating the relationships between a dependent variable and one or more independent variables.",
        domain: "Data Science",
        tags: ["Machine Learning", "Prediction"],
        isAdult: false
    },
    {
        id: "fs-normalization",
        word: "Normalization",
        definition: "The process of organizing data in a database or adjusting values measured on different scales to a notionally common scale.",
        domain: "Data Science",
        tags: ["Database", "Preparation"],
        isAdult: false
    },
    {
        id: "fs-cybernetics",
        word: "Cybernetics",
        definition: "A transdisciplinary approach for exploring regulatory systems—their structures, constraints, and possibilities—particularly exploring feedback loops.",
        domain: "Systems Science",
        tags: ["Feedback", "Control"],
        relatedTerms: ["fs-feedback-loop"],
        isAdult: false
    },
    {
        id: "fs-feedback-loop",
        word: "Feedback Loop",
        definition: "A system structure that causes output from one node to eventually influence input to that same node, creating a circuit of cause and effect.",
        domain: "Systems Science",
        tags: ["Dynamics", "Control"],
        relatedTerms: ["fs-cybernetics", "fs-emergence"],
        isAdult: false
    },
    {
        id: "fs-emergence",
        word: "Emergence",
        definition: "When an entity is observed to have properties its parts do not have on their own, properties or behaviors which emerge only when the parts interact in a wider whole.",
        domain: "Systems Science",
        tags: ["Complexity", "Chaos Theory"],
        relatedTerms: ["fs-feedback-loop"],
        isAdult: false
    }
];
