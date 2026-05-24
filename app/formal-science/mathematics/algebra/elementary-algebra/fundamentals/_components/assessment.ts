import { AssessmentQuestion } from '@/app/_components/Assessment';

export const fundamentalsQuiz: AssessmentQuestion[] = [
  {
    id: 'f1',
    type: 'matching',
    prompt: 'Match the Real Number category to its correct example.',
    leftItems: ['Integers (ℤ)', 'Rationals (ℚ)', 'Irrationals'],
    rightItems: ['1/2, 0.75, -4.5', 'π, √2, non-repeating', '-5, 0, 42'],
    correctPairs: {
      'Integers (ℤ)': '-5, 0, 42',
      'Rationals (ℚ)': '1/2, 0.75, -4.5',
      'Irrationals': 'π, √2, non-repeating'
    },
    explanation: 'Integers are whole numbers and their negatives. Rationals are any number that can be written as a fraction. Irrationals go on forever without repeating.'
  },
  {
    id: 'f2',
    type: 'mcq',
    prompt: 'Using the Order of Operations, evaluate: 10 - 2 × 3 + 1',
    options: ['25', '5', '11', '15'],
    correctAnswer: '5',
    explanation: 'Multiplication comes first: 2 × 3 = 6. Then addition and subtraction are evaluated left to right: 10 - 6 = 4, and 4 + 1 = 5.'
  },
  {
    id: 'f3',
    type: 'tf',
    prompt: 'True or False: A variable acts as a permanent label for one specific, unchanging number.',
    correctAnswer: false,
    explanation: 'False. A variable is a placeholder or a "container". It can represent an unknown number we need to find, or a value that changes depending on the equation.'
  }
];
