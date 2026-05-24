import { AssessmentQuestion } from '@/app/_components/Assessment';

export const pemdasQuiz: AssessmentQuestion[] = [
  {
    id: 'pem1',
    type: 'mcq',
    prompt: 'In the expression "5 + (3² × 2)", which operation must you perform absolutely first?',
    options: [
        'Addition', 
        'Multiplication', 
        'The Exponent inside the Parentheses', 
        'Parentheses from the outside'
    ],
    correctAnswer: 'The Exponent inside the Parentheses',
    explanation: 'You must always resolve Parentheses first. Once inside the parentheses, the hierarchy applies again, meaning the Exponent (3²) is calculated before the Multiplication.'
  },
  {
    id: 'pem2',
    type: 'matching',
    prompt: 'Match the acronym letter to its corresponding mathematical operation.',
    leftItems: ['E', 'M / D', 'A / S'],
    rightItems: [
        'Equal Rank: Left to Right Addition/Subtraction', 
        'Powers and Square Roots', 
        'Equal Rank: Left to Right Multiplication/Division'
    ],
    correctPairs: {
      'E': 'Powers and Square Roots',
      'M / D': 'Equal Rank: Left to Right Multiplication/Division',
      'A / S': 'Equal Rank: Left to Right Addition/Subtraction'
    },
    explanation: 'E stands for Exponents. MD and AS are paired together because they share equal rank and must be solved left-to-right.'
  },
  {
    id: 'pem3',
    type: 'tf',
    prompt: 'True or False: According to PEMDAS, you must always complete all Multiplication in an equation before you are allowed to do any Division.',
    correctAnswer: false,
    explanation: 'False! Multiplication and Division have the EXACT same priority. You do not always do multiplication first. You simply do whichever one appears first when reading from left to right.'
  }
];