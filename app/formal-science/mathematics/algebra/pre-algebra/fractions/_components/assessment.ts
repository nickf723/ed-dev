import { AssessmentQuestion } from '@/app/_components/Assessment';

export const fractionsQuiz: AssessmentQuestion[] = [
  {
    id: 'frac1',
    type: 'mcq',
    prompt: 'Before you can add or subtract two fractions, what MUST be true?',
    options: ['They must be improper fractions', 'They must have the same denominator', 'They must have the same numerator', 'You must multiply them first'],
    correctAnswer: 'They must have the same denominator',
    explanation: 'You can only add slices of the same size. Finding a common denominator ensures you are combining equal-sized pieces.'
  },
  {
    id: 'frac2',
    type: 'matching',
    prompt: 'Match the mathematical operation to its primary rule for fractions.',
    leftItems: ['Addition & Subtraction', 'Multiplication', 'Division'],
    rightItems: ['Requires a common denominator', 'Multiply straight across the top and bottom', 'Keep the first, Change to multiply, Flip the second'],
    correctPairs: {
      'Addition & Subtraction': 'Requires a common denominator',
      'Multiplication': 'Multiply straight across the top and bottom',
      'Division': 'Keep the first, Change to multiply, Flip the second'
    },
    explanation: 'Addition requires matching slices. Multiplication is straightforward. Division uses the "Keep-Change-Flip" reciprocal trick.'
  },
  {
    id: 'frac3',
    type: 'tf',
    prompt: 'True or False: The reciprocal of 3/4 is -3/4.',
    correctAnswer: false,
    explanation: 'False! The reciprocal flips the top and bottom numbers, so the reciprocal of 3/4 is 4/3. Changing the sign creates an "opposite," not a reciprocal.'
  }
];
