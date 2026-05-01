import { AssessmentQuestion } from '@/app/_components/Assessment';

export const propLogicQuiz: AssessmentQuestion[] = [
  {
    id: 'pl1',
    type: 'mcq',
    prompt: 'Which of the following statements is a valid proposition?',
    options: [
      'Stop talking!',
      'What time is the train arriving?',
      'Tokyo is the capital of Japan.',
      'This sentence is false.'
    ],
    correctAnswer: 'Tokyo is the capital of Japan.',
    explanation: 'A proposition must be a declarative statement that is definitively True or definitively False. Commands, questions, and paradoxes are not propositions.'
  },
  {
    id: 'pl2',
    type: 'matching',
    prompt: 'Match the logical equivalent according to De Morgan\'s Laws.',
    leftItems: ['¬(P ∧ Q)', '¬(P ∨ Q)', '¬(¬P)'],
    rightItems: ['¬P ∨ ¬Q', '¬P ∧ ¬Q', 'P'],
    correctPairs: {
      '¬(P ∧ Q)': '¬P ∨ ¬Q',
      '¬(P ∨ Q)': '¬P ∧ ¬Q',
      '¬(¬P)': 'P'
    },
    explanation: 'When distributing a negation into a parenthesis, the variables are negated, and the operator flips (AND becomes OR, OR becomes AND). Double negation cancels out.'
  },
  {
    id: 'pl3',
    type: 'tf',
    prompt: 'True or False: If two complex logical statements have the exact same final outputs in a Truth Table for all possible inputs, they are "Logically Equivalent".',
    correctAnswer: true,
    explanation: 'True. Logical equivalence (≡) simply means that two statements, no matter how they are written, will always evaluate to the exact same truth value under the same conditions.'
  },
  {
    id: 'pl4',
    type: 'short_answer',
    prompt: 'What is the specific 5-letter term for a statement that evaluates to True under EVERY possible assignment of truth values?',
    acceptableAnswers: ['Tautology', 'tautology', 'Tautologies', 'tautologies'],
    explanation: 'A Tautology is a statement that is always true, like (P ∨ ¬P). It is raining OR it is not raining.'
  }
];
