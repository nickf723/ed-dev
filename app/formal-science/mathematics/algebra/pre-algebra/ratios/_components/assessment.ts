import { AssessmentQuestion } from '@/app/_components/Assessment';

export const ratiosQuiz: AssessmentQuestion[] = [
  {
    id: 'ratio1',
    type: 'mcq',
    prompt: 'Which of the following is an example of a Unit Rate?',
    options: ['$10 for 2 boxes', '60 miles per hour', '3 apples to 4 oranges', '1/2 = 2/4'],
    correctAnswer: '60 miles per hour',
    explanation: 'A unit rate always has a denominator (or second quantity) of 1. "Per hour" means "per 1 hour".'
  },
  {
    id: 'ratio2',
    type: 'matching',
    prompt: 'Match the mathematical concept to its definition.',
    leftItems: ['Ratio', 'Proportion', 'Cross Multiplication'],
    rightItems: ['A comparison of two numbers', 'An equation showing two ratios are equal', 'A method to solve for a missing piece of a proportion'],
    correctPairs: {
      'Ratio': 'A comparison of two numbers',
      'Proportion': 'An equation showing two ratios are equal',
      'Cross Multiplication': 'A method to solve for a missing piece of a proportion'
    },
    explanation: 'A ratio is the raw comparison, a proportion connects two ratios, and cross multiplication is how we solve them.'
  },
  {
    id: 'ratio3',
    type: 'tf',
    prompt: 'True or False: The ratios 2:3 and 4:6 form a valid proportion.',
    correctAnswer: true,
    explanation: 'True! If you multiply both the 2 and the 3 by a scale factor of 2, you get 4 and 6. They represent the exact same relationship.'
  }
];
