import { AssessmentQuestion } from '@/app/_components/Assessment';

export const equationsQuiz: AssessmentQuestion[] = [
  {
    id: 'eq1',
    type: 'mcq',
    prompt: 'To solve the equation "4x - 5 = 15", what should be your VERY FIRST step?',
    options: ['Divide both sides by 4', 'Subtract 15 from both sides', 'Add 5 to both sides', 'Multiply both sides by 4'],
    correctAnswer: 'Add 5 to both sides',
    explanation: 'When solving equations, we generally work PEMDAS in reverse. You must clear the loose constant (-5) by adding 5 before you can deal with the coefficient attached to x.'
  },
  {
    id: 'eq2',
    type: 'matching',
    prompt: 'Match the Equation Type to its definition.',
    leftItems: ['One-Step Equation', 'Two-Step Equation', 'Multi-Step Equation'],
    rightItems: ['Requires a single inverse operation (x + 3 = 10)', 'Requires clearing a constant then a coefficient (2x + 1 = 9)', 'Requires distributing or combining like terms first (2(x+3) = 14)'],
    correctPairs: {
      'One-Step Equation': 'Requires a single inverse operation (x + 3 = 10)',
      'Two-Step Equation': 'Requires clearing a constant then a coefficient (2x + 1 = 9)',
      'Multi-Step Equation': 'Requires distributing or combining like terms first (2(x+3) = 14)'
    },
    explanation: 'Equations are categorized by how many logical steps it takes to isolate the variable.'
  },
  {
    id: 'eq3',
    type: 'tf',
    prompt: 'True or False: If you multiply the left side of an equation by 3, you only need to multiply the variable on the right side by 3 to keep it balanced.',
    correctAnswer: false,
    explanation: 'False! The Golden Rule of algebra dictates that whatever you do to one side, you must do to the ENTIRE other side to maintain balance.'
  }
];
