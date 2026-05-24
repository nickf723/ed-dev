import { AssessmentQuestion } from '@/app/_components/Assessment';

export const quadraticsQuiz: AssessmentQuestion[] = [
  {
    id: 'quad1',
    type: 'matching',
    prompt: 'Match the quadratic form to what it reveals most easily.',
    leftItems: ['Standard Form (y = ax² + bx + c)', 'Vertex Form (y = a(x-h)² + k)', 'Intercept Form (y = a(x-p)(x-q))'],
    rightItems: ['The y-intercept (where x=0)', 'The turning point / peak (h, k)', 'The roots / solutions (where y=0)'],
    correctPairs: {
      'Standard Form (y = ax² + bx + c)': 'The y-intercept (where x=0)',
      'Vertex Form (y = a(x-h)² + k)': 'The turning point / peak (h, k)',
      'Intercept Form (y = a(x-p)(x-q))': 'The roots / solutions (where y=0)'
    },
    explanation: 'Each form has a superpower. Standard gives the y-intercept instantly. Vertex gives the peak. Intercept gives the roots.'
  },
  {
    id: 'quad2',
    type: 'mcq',
    prompt: 'If the "a" value in a quadratic equation is negative (e.g., y = -2x² + 4), what does the parabola look like?',
    options: ['A U-shape opening upwards', 'An n-shape opening downwards', 'A straight horizontal line', 'A circle'],
    correctAnswer: 'An n-shape opening downwards',
    explanation: 'The sign of the leading coefficient (a) dictates the direction. A positive "a" smiles (opens up). A negative "a" frowns (opens down).'
  },
  {
    id: 'quad3',
    type: 'tf',
    prompt: 'True or False: Every single parabola will always cross the x-axis at least once.',
    correctAnswer: false,
    explanation: 'False! A parabola can float entirely above or below the x-axis. When this happens, there are no real roots (the solutions are imaginary numbers).'
  }
];
