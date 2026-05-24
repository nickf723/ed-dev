import { AssessmentQuestion } from '@/app/_components/Assessment';

export const foundationsQuiz: AssessmentQuestion[] = [
  {
    id: 'mf1',
    type: 'mcq',
    prompt: 'The Peano Axioms are primarily used to formally define which of the following?',
    options: [
      'The rules of Euclidean geometry',
      'The set of natural numbers and basic arithmetic',
      'The laws of statistical probability',
      'The properties of infinite limits'
    ],
    correctAnswer: 'The set of natural numbers and basic arithmetic',
    explanation: 'The Peano Axioms define natural numbers recursively: starting at a base number (like 0) and stating that every number has a successor (n+1).'
  },
  {
    id: 'mf2',
    type: 'matching',
    prompt: 'Match the arithmetic operation to the mathematical term that describes its final result.',
    leftItems: ['Addition', 'Subtraction', 'Multiplication', 'Division'],
    rightItems: ['Sum', 'Difference', 'Product', 'Quotient'],
    correctPairs: {
      'Addition': 'Sum',
      'Subtraction': 'Difference',
      'Multiplication': 'Product',
      'Division': 'Quotient'
    },
    explanation: 'Addition yields a Sum, Subtraction yields a Difference, Multiplication yields a Product, and Division yields a Quotient.'
  },
  {
    id: 'mf3',
    type: 'tf',
    prompt: 'True or False: In terms of magnitude and inequality, the statement "-10 > -2" is correct.',
    correctAnswer: false,
    explanation: 'False. While 10 has a larger absolute magnitude than 2, on the standard number line, -10 is further to the left (more negative) than -2, meaning -10 is less than -2.'
  },
  {
    id: 'mf4',
    type: 'short_answer',
    prompt: 'What is the mathematical term for a well-defined grouping or collection of distinct objects?',
    acceptableAnswers: ['Set', 'set', 'Sets', 'sets'],
    explanation: 'A Set is the fundamental way we group objects in mathematics, forming the basis of Set Theory and logic.'
  }
]