import { AssessmentQuestion } from '@/app/_components/Assessment';

export const folQuiz: AssessmentQuestion[] = [
  {
    id: 'fol1',
    type: 'mcq',
    prompt: 'Which of the following is the best definition of a "Predicate"?',
    options: [
      'A statement that is always true.',
      'A symbol that represents a fixed object.',
      'A property or relation whose truth value depends on a variable.',
      'A quantifier that means "For All".'
    ],
    correctAnswer: 'A property or relation whose truth value depends on a variable.',
    explanation: 'While a proposition like "5 is prime" is fixed, a predicate like "x is prime" changes based on what value we plug in for x.'
  },
  {
    id: 'fol2',
    type: 'tf',
    prompt: 'True or False: In a domain of integers, the statement ∃x (x * x = -1) is True.',
    correctAnswer: false,
    explanation: 'False. There is no integer whose square is -1. The truth of a quantifier depends entirely on the Domain of Discourse.'
  },
  {
    id: 'fol3',
    type: 'matching',
    prompt: 'Match the quantifier to its logical expansion.',
    leftItems: ['∀x P(x)', '∃x P(x)'],
    rightItems: ['P(a) ∨ P(b) ∨ P(c)...', 'P(a) ∧ P(b) ∧ P(c)...'],
    correctPairs: {
      '∀x P(x)': 'P(a) ∧ P(b) ∧ P(c)...',
      '∃x P(x)': 'P(a) ∨ P(b) ∨ P(c)...'
    },
    explanation: 'The Universal quantifier acts like a giant chain of ANDs (everything must match), while the Existential quantifier acts like a giant chain of ORs (at least one must match).'
  },
  {
    id: 'fol4',
    type: 'short_answer',
    prompt: 'What is the term for a variable that is NOT governed by a quantifier within a formula?',
    acceptableAnswers: ['Free variable', 'Free', 'free variable'],
    explanation: 'A free variable is like an "unbound" parameter. We cannot determine the truth of the formula until that variable is either bound by a quantifier or assigned a specific constant.'
  }
];
