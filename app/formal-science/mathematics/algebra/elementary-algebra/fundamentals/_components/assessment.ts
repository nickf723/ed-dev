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
    explanation: 'Integers are whole numbers and their negatives. Rationals can be written as fractions of integers. Irrationals cannot be written as ratios of integers.'
  },
  {
    id: 'f2',
    type: 'mcq',
    prompt: 'Solve: 2x + 6 = 14',
    options: ['4', '8', '10', '16'],
    correctAnswer: '4',
    explanation: 'Subtract 6 from both sides to get 2x = 8, then divide both sides by 2 to get x = 4.'
  },
  {
    id: 'f3',
    type: 'tf',
    prompt: 'True or False: A variable acts as a permanent label for one specific, unchanging number.',
    correctAnswer: false,
    explanation: 'False. A variable can represent an unknown value, a changing value, or a generalized value depending on the context.'
  }
];
