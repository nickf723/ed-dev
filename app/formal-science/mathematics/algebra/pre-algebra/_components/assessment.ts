import { AssessmentQuestion } from '@/app/_components/Assessment';

export const preAlgebraQuiz: AssessmentQuestion[] = [
  {
    id: 'pa1',
    type: 'mcq',
    prompt: 'In the expression "3x + 5", what is the number 5 called?',
    options: ['Variable', 'Coefficient', 'Constant', 'Exponent'],
    correctAnswer: 'Constant',
    explanation: 'The number 5 is a constant because its value is fixed and it does not change, unlike the variable x.'
  },
  {
    id: 'pa2',
    type: 'matching',
    prompt: 'Match the operation with its correct Inverse Operation used for balancing equations.',
    leftItems: ['Addition (+)', 'Multiplication (×)', 'Subtraction (-)'],
    rightItems: ['Division (÷)', 'Addition (+)', 'Subtraction (-)'],
    correctPairs: {
      'Addition (+)': 'Subtraction (-)',
      'Multiplication (×)': 'Division (÷)',
      'Subtraction (-)': 'Addition (+)'
    },
    explanation: 'To isolate a variable, you always use the opposite (inverse) operation to cancel things out on the balance scale.'
  },
  {
    id: 'pa3',
    type: 'tf',
    prompt: 'True or False: According to the Order of Operations (PEMDAS), you should always add before you multiply.',
    correctAnswer: false,
    explanation: 'False! Multiplication and Division always come BEFORE Addition and Subtraction in the order of operations.'
  }
];
