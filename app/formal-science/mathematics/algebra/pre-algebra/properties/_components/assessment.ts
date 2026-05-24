import { AssessmentQuestion } from '@/app/_components/Assessment';

export const propertiesQuiz: AssessmentQuestion[] = [
  {
    id: 'prop1',
    type: 'mcq',
    prompt: 'Which property is demonstrated by this equation: 4 × (3 + 5) = (4 × 3) + (4 × 5)?',
    options: ['Commutative Property', 'Associative Property', 'Distributive Property', 'Identity Property'],
    correctAnswer: 'Distributive Property',
    explanation: 'The Distributive Property allows you to distribute the 4 to both the 3 and the 5 inside the parentheses.'
  },
  {
    id: 'prop2',
    type: 'matching',
    prompt: 'Match the mathematical property to its definition.',
    leftItems: ['Commutative Property', 'Associative Property', 'Identity Property'],
    rightItems: ['Changes the order of the numbers', 'Changes the grouping of the numbers', 'Leaves the number exactly the same'],
    correctPairs: {
      'Commutative Property': 'Changes the order of the numbers',
      'Associative Property': 'Changes the grouping of the numbers',
      'Identity Property': 'Leaves the number exactly the same'
    },
    explanation: 'Commutative is about order (movement), Associative is about grouping (parentheses), and Identity is about preserving the original value.'
  },
  {
    id: 'prop3',
    type: 'tf',
    prompt: 'True or False: The Commutative Property works for Addition, Multiplication, AND Subtraction.',
    correctAnswer: false,
    explanation: 'False! Order matters a lot in subtraction. 5 - 3 is 2, but 3 - 5 is -2. The Commutative Property only works for Addition and Multiplication.'
  }
];
