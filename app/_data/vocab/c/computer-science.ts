import { VocabTerm } from '../_registry';

export const computerScienceVocab: VocabTerm[] = [
    {
        id: "cs-polymorphism",
        word: "Polymorphism",
        definition: "In object-oriented programming, the provision of a single interface to entities of different types, or the use of a single symbol to represent multiple different types.",
        domain: "Computer Science",
        tags: ["OOP", "Software Engineering"],
        isAdult: false
    },
    {
        id: "cs-recursion",
        word: "Recursion",
        definition: "A method of solving a computational problem where the solution depends on solutions to smaller instances of the same problem. Often implemented as a function that calls itself.",
        domain: "Computer Science",
        tags: ["Algorithms", "Logic"],
        relatedTerms: ["cs-stack-overflow"],
        isAdult: false
    },
    {
        id: "cs-pointer",
        word: "Pointer",
        definition: "A variable that stores the memory address of another object or variable, rather than storing the data itself.",
        domain: "Computer Science",
        tags: ["Memory Management", "C/C++"],
        isAdult: false
    },
    {
        id: "cs-latency",
        word: "Latency",
        definition: "The delay before a transfer of data begins following an instruction for its transfer. In networking, it's the time it takes for a data packet to travel from source to destination.",
        domain: "Computer Science",
        tags: ["Networking", "Performance"],
        isAdult: false
    }
];