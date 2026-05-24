import { AssessmentQuestion } from '@/app/_components/Assessment';

export const algebraQuiz: AssessmentQuestion[] = [
  {
    id: 'alg1',
    type: 'mcq',
    prompt: 'Which branch of algebra primarily deals with vector spaces, matrices, and linear mappings?',
    options: ['Pre-Algebra', 'Elementary Algebra', 'Linear Algebra', 'Abstract Algebra'],
    correctAnswer: 'Linear Algebra',
    explanation: 'Linear Algebra focuses on vector spaces and the linear transformations between them, often represented and manipulated using matrices.'
  },
  {
    id: 'alg2',
    type: 'matching',
    prompt: 'Match the algebraic domain to its primary focus.',
    leftItems: ['Pre-Algebra', 'Elementary Algebra', 'Abstract Algebra'],
    rightItems: ['Foundational rules & integers', 'Solving for x & polynomials', 'Groups, rings, and fields'],
    correctPairs: {
      'Pre-Algebra': 'Foundational rules & integers',
      'Elementary Algebra': 'Solving for x & polynomials',
      'Abstract Algebra': 'Groups, rings, and fields'
    },
    explanation: 'Pre-Algebra bridges arithmetic to variables. Elementary Algebra focuses on solving equations. Abstract Algebra studies high-level logical structures.'
  },
  {
    id: 'alg3',
    type: 'tf',
    prompt: 'True or False: Abstract Algebra is primarily concerned with calculating the exact numerical distances between physical objects.',
    correctAnswer: false,
    explanation: 'False. Geometry deals with physical distances. Abstract algebra studies logical structures like groups, rings, and fields rather than computing simple numerical answers.'
  }
];
