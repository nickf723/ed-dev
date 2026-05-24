import { AssessmentQuestion } from '@/app/_components/Assessment';

export const expressionsQuiz: AssessmentQuestion[] = [
  {
    id: 'expr1',
    type: 'mcq',
    prompt: 'Which of the following is an EXPRESSION (not an equation)?',
    options: ['4x + 7 = 15', 'y = 2x', '7x - 3', '10 = 5 + 5'],
    correctAnswer: '7x - 3',
    explanation: 'An expression is a mathematical phrase WITHOUT an equals sign. Once you add an equals sign, it becomes an equation.'
  },
  {
    id: 'expr2',
    type: 'matching',
    prompt: 'Match the part of the expression "5x + 8" to its correct vocabulary word.',
    leftItems: ['5', 'x', '8'],
    rightItems: ['Coefficient', 'Variable', 'Constant'],
    correctPairs: {
      '5': 'Coefficient',
      'x': 'Variable',
      '8': 'Constant'
    },
    explanation: 'The Coefficient multiplies the Variable, and the Constant is a standalone number.'
  },
  {
    id: 'expr3',
    type: 'tf',
    prompt: 'True or False: You can simplify the expression "3x + 4y" into "7xy".',
    correctAnswer: false,
    explanation: 'False! You can only combine "Like Terms." Since x and y represent different unknown numbers (like apples and oranges), they cannot be combined.'
  }
];
