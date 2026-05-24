import { AssessmentQuestion } from '@/app/_components/Assessment';

export const exponentsQuiz: AssessmentQuestion[] = [
  {
    id: 'exp1',
    type: 'mcq',
    prompt: 'What does 3⁴ mean mathematically?',
    options: ['3 × 4', '3 + 3 + 3 + 3', '3 × 3 × 3 × 3', '4 × 4 × 4'],
    correctAnswer: '3 × 3 × 3 × 3',
    explanation: 'An exponent tells you how many times to multiply the BASE by itself. The base is 3, and it is multiplied 4 times.'
  },
  {
    id: 'exp2',
    type: 'matching',
    prompt: 'Match the mathematical term to its geometric origin.',
    leftItems: ['Squared (Power of 2)', 'Cubed (Power of 3)', 'Square Root'],
    rightItems: ['Finding the area of a flat 2D shape', 'Finding the volume of a 3D box', 'Finding the side length of a flat 2D shape'],
    correctPairs: {
      'Squared (Power of 2)': 'Finding the area of a flat 2D shape',
      'Cubed (Power of 3)': 'Finding the volume of a 3D box',
      'Square Root': 'Finding the side length of a flat 2D shape'
    },
    explanation: 'x² calculates area (Squares), x³ calculates volume (Cubes), and a Square Root goes backwards from Area to Side Length.'
  },
  {
    id: 'exp3',
    type: 'tf',
    prompt: 'True or False: Any number to the power of 1 is just the number itself (e.g., 8¹ = 8).',
    correctAnswer: true,
    explanation: 'True! An exponent of 1 just means you have one copy of the base.'
  }
];
